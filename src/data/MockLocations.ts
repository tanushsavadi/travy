import { LatLngTuple } from 'leaflet';

export interface Location {
    name: string;
    coordinates: LatLngTuple;
}

export const mockLocations: Location[] = [ 
        {
            "name": "Boston, MA",
            "coordinates": [42.3555, -71.0565]
        },
        {
            "name": "New York City, NY",
            "coordinates": [40.7128, -74.0060]
        },
        {
            "name": "Los Angeles, CA",
            "coordinates": [34.0522, -118.2437]
        },
        {
            "name": "Chicago, IL",
            "coordinates": [41.8781, -87.6298]
        },
        {
            "name": "Miami, FL",
            "coordinates": [25.7617, -80.1918]
        },
        {
            "name": "Seattle, WA",
            "coordinates": [47.6062, -122.3321]
        },
        {
            "name": "Hartford, CT",
            "coordinates": [41.7630, -72.6851]
        }
]
