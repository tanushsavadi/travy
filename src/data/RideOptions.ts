export interface RideOption {
    transport: string;
    price: number;
    travelTime: number; // in hours
    destination: string; // destination name
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