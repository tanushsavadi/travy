import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";

dotenv.config({path: '../../.env'});

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;

const travelOptionsSchema = z.object({
  source: z.string().min(3, "Source must be at least 3 characters long"),
  destination: z.string().min(3, "Destination must be at least 3 characters long"),
});

// Define the coordinates for each location
const locationLatLng = {
  NYC: { lat: 40.712776, lng: -74.005974 },
  BOS: { lat: 42.386487, lng: -72.531481 }, // UMass
  LAX: { lat: 34.052235, lng: -118.243683 },
  MIA: { lat: 25.761681, lng: -80.191788 },
  HFD: { lat: 41.765804, lng: -72.673372 },
  SEA: { lat: 47.606209, lng: -122.332069 },
  ORD: { lat: 41.974162, lng: -87.907321 },
};

// get airport codes from location names
const locationToIdMap: { [key: string]: string } = {
    "New York City, NY": "NYC",
    "Boston, MA": "BOS",
    "Los Angeles, CA": "LAX",
    "Miami, FL": "MIA",
    "Hartford, CT": "HFD",
    "Seattle, WA": "SEA",
    "Chicago, IL": "ORD"
};

// main API endpoint to get travel options
app.post("/travel-options", async (req: Request, res: Response) => {

  try {
    const { source, destination } = travelOptionsSchema.parse(req.body);

    if (!source || !destination) {
      res.status(400).json({ error: "Source and destination are required" });
    }

    // Fetch data from APIs
    const flightData = await getFlightData(source, destination);
    const { busData, trainData } = await getTransitData(source as keyof typeof locationLatLng, destination as keyof typeof locationLatLng);
    const rideSharingData = await getRideSharingData(source, destination);

    // Combine results
    const travelOptions = [
      ...flightData,
      ...busData,
      ...trainData,
      ...rideSharingData,
    ]

     
    res.json(travelOptions);

  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to fetch travel options" });
  }
});

// Fetch flight data from the API
async function getFlightData(source: string, destination: string) {
  source = locationToIdMap[source] || source;
  destination = locationToIdMap[destination] || destination;
  // get tomorrow's date in YYYY-MM-DD format
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  
  // format the URL
  const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${source}.AIRPORT&toId=${destination}.AIRPORT&departDate=${tomorrow}&stops=none&pageNo=1&adults=1&sort=BEST&cabinClass=ECONOMY&currency_code=USD`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY || '',
      'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!data?.data?.flightOffers) return [];
    
    // Extract top 2-3 flight options
    type airlineInfo = {
      name: string;
      logoUrl: string;
      minPrice: {
        units: number;
        currencyCode: string;
      };
    };
    const airlineInfo = data.data.aggregation?.airlines.map((airline: airlineInfo) => ({
      name: airline.name,
      img: airline.logoUrl || "",
      price: airline.minPrice.units.toString() + airline.minPrice.currencyCode
    })); 
    
    let flightData: any = [];
    data.data.flightOffers.slice(0, 3).map((offer: any) => {
        let minPrice = offer.priceBreakdown?.total.units;
        let flight = offer.segments?.map((segment: any) => {
          // return it in the expected format
          return {
            transport: "Flight",
            name: segment.legs[0]?.carriers[0] + " " + segment.legs[0]?.flightInfo?.flightNumber,
            logo: segment.legs[0]?.carriersData[0]?.logo,
            travelTime: (segment.legs[0]?.totalTime / (60 * 60)).toFixed(1),
            price: minPrice,
            src: source,
            destination: destination,
          }
        })[0];
        flightData.push(flight);
        }
    );
    return flightData;
    
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return [];
  }
}

type TransitInfo = {
  transport: string;
  name: string | null;
  price: number | null;
  travelTime: number;
  src: string;
  destination: string;
};

// Extract transit information from the Google Maps API response
function extractTransitInfo(data: any): TransitInfo[] {
  const entries: TransitInfo[] = [];

  for (const route of data.routes || []) {
    for (const leg of route.legs || []) {
      const allTransitSteps = leg.steps.filter((s: any) => s.travel_mode === 'TRANSIT');
      if (allTransitSteps.length === 0) continue;

      const totalDuration = allTransitSteps.reduce((acc: number, step: any) => acc + (step.duration?.value || 0), 0);

      const firstStep = allTransitSteps[0];
      const lastStep = allTransitSteps[allTransitSteps.length - 1];

      entries.push({
        transport: firstStep.transit_details?.line?.vehicle?.type || 'Transit',
        name: firstStep.transit_details?.line?.agencies?.[0]?.name || null,
        price: null, // Could be updated later from another API
        travelTime: Math.round(totalDuration / (60 * 60)),
        src: leg.start_address || firstStep.transit_details?.departure_stop?.name || '',
        destination: leg.end_address || lastStep.transit_details?.arrival_stop?.name || '',
      });
    }
  }
  return entries;
}

// Fetch transit data from the Google Maps API
async function getTransitData(source: string, destination: string) {
  const url = new URL('https://maps.googleapis.com/maps/api/directions/json');
  url.searchParams.append('origin', source);
  url.searchParams.append('destination', destination);
  url.searchParams.append('mode', 'transit');
  url.searchParams.append('key', process.env.GOOGLE_MAPS_API_KEY || '');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch directions: ${res.statusText}`);

  const data = await res.json();

  // Use extractTransitInfo to get all transit data
  const allTransitInfo = extractTransitInfo(data);

  // Filter for bus and train data
  const busData = allTransitInfo.filter(info => info.transport.toLowerCase() === 'bus');
  const trainData = allTransitInfo.filter(info => info.transport.toLowerCase() === 'train');

  return { busData, trainData };
}

async function getRideSharingData(source: string, destination: string) {
  // Replace with actual API call later, no way to get Uber data now
  const uberData = [
    {
      transport: "Car",
      name: "Uber",
      price: 89,
      travelTime: 1.5,
      src: "Amherst, MA",
      destination: "Boston, MA",
    },
    {
      transport: "Car",
      name: "Uber",
      price: 139,
      travelTime: 2.3,
      src: "Amherst, MA",
      destination: "New York City, NY",
    },
    {
      transport: "Car",
      name: "Uber",
      price: 2524,
      travelTime: 42.1,
      src: "Amherst, MA",
      destination: "Los Angeles, CA",
    },
    {
      transport: "Car",
      name: "Uber",
      price: 870,
      travelTime: 14.5,
      src: "Amherst, MA",
      destination: "Chicago, IL",
    },
    {
      transport: "Car",
      name: "Uber",
      price: 1258,
      travelTime: 20.9,
      src: "Amherst, MA",
      destination: "Miami, FL",
    },
    {
      transport: "Car",
      name: "Uber",
      price: 2488,
      travelTime: 41.5,
      src: "Amherst, MA",
      destination: "Seattle, WA",
    },
    {
      transport: "Car",
      name: "Uber",
      price: 51,
      travelTime: 0.85,
      src: "Amherst, MA",
      destination: "Hartford, CT",
    },
  ];

  return uberData.filter((ride) => {
    return ride.destination.trim() === destination.trim();
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Travel microservice running on http://localhost:${PORT}`);
});