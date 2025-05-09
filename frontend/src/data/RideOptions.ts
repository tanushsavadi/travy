export interface RideOption {
    name?: string; // name of the ride option
    logo?: string; // logo of the ride option
    src?: string; // source location
    transport: string;
    price: number;
    travelTime: number; // in hours
    destination: string; // destination name
    steps?: {
        vehicle: string;
        agency: string;
        departure: string;
        arrival: string;
        duration: number; // in minutes
    }[];
}

export const rideData: RideOption[] = [
    {
        "transport": "Car",
        "price": 50,
        "travelTime": 3,
        "destination": "New York City, NY"
    },
    {
        "transport": "Bus",
        "price": 60,
        "travelTime": 4,
        "destination": "New York City, NY"
    },
    {
        "transport": "Train",
        "price": 30,
        "travelTime": 3.5,
        "destination": "New York City, NY"
    },
    {
        "transport": "Flight",
        "price": 100,
        "travelTime": 1,
        "destination": "New York City, NY"
    },
    {
        "transport": "Car",
        "price": 70,
        "travelTime": 3,
        "destination": "Boston, MA"
    },
    {
        "transport": "Bus",
        "price": 50,
        "travelTime": 4,
        "destination": "Boston, MA"
    },
    {
        "transport": "Train",
        "price": 30,
        "travelTime": 5.5,
        "destination": "Boston, MA"
    },
    {
        "transport": "Flight",
        "price": 120,
        "travelTime": 1.5,
        "destination": "Boston, MA"
    },
    {
        "transport": "Flight",
        "price": 250,
        "travelTime": 7,
        "destination": "Los Angeles, CA"
    },
    {
        "transport": "Train",
        "price": 100,
        "travelTime": 20,
        "destination": "Miami, FL"
    },
    {
        "transport": "Flight",
        "price": 200,
        "travelTime": 3.5,
        "destination": "Miami, FL"
    },
    {
        "transport": "Car",
        "price": 40,
        "travelTime": 1,
        "destination": "Hartford, CT"
    },
    {
        "transport": "Bus",
        "price": 15,
        "travelTime": 2.5,
        "destination": "Hartford, CT"
    },
    {
        "transport": "Train",
        "price": 25,
        "travelTime": 2,
        "destination": "Hartford, CT"
    },
    {
        "transport": "Flight",
        "price": 90,
        "travelTime": 0.5,
        "destination": "Hartford, CT"
    },
    {
        "transport": "Flight",
        "price": 200,
        "travelTime": 7,
        "destination": "Seattle, WA"
    },
    {
        "transport": "Flight",
        "price": 150,
        "travelTime": 2.5,
        "destination": "Chicago, IL"
    }
]

export const getRideOptions = async (src: string, dest: string): Promise<RideOption[]> => {

    if (!src || !dest) {
        console.error("Invalid source or destination");
        return [];
    }

    try {
        const response = await fetch(`http://localhost:3001/travel-options`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source: src,
                destination: dest,
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};