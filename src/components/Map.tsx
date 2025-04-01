import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from "leaflet";
import * as L from 'leaflet';

import { mockLocations } from "../data/MockLocations";

const UMassCoords: LatLngTuple = [42.386487, -72.531481]; // UMass Amherst coordinates

const MapContainerCSS: React.CSSProperties = {
    height: "300px",
    width: "1000px",
    zIndex: 0
};


interface MapProps {
    destination: string;
    setDestination?: React.Dispatch<React.SetStateAction<string>>;
}

const DestinationMarker: React.FC<{ destination: string }> = ({ destination }) => {
    const mapRef = useMap();
    useEffect(() => {
        if (destination && mapRef) {
            const foundLocation = mockLocations.find(location => location.name === destination.toString());
            if (foundLocation) {
                const destinationCoords = foundLocation.coordinates as LatLngTuple;
                const group = L.featureGroup([
                    L.marker(UMassCoords).bindPopup("UMass Amherst"),
                    L.marker(destinationCoords).bindPopup(destination)
                ]);
                mapRef.fitBounds(group.getBounds(), { padding: [20, 20] });
            }
        }
    }, [destination, mapRef]);

    if (!destination) return null;

    const foundLocation = mockLocations.find(location => location.name === destination.toString());
    if (!foundLocation) return null;

    return (
        <Marker position={foundLocation.coordinates as LatLngTuple}>
            <Popup>{destination}</Popup>
        </Marker>
    );
};

const MyMap: React.FC<MapProps> = ({ destination, setDestination }) => {

    const ResetButton: React.FC = () => {
        const mapRef = useMap()
        const resetMap = () => {
            if (mapRef) {
                mapRef.setView(UMassCoords, 12); // Reset coordinates
                if (setDestination) setDestination(''); // Reset destination
            }
        };

        return (
            <button onClick={resetMap} style={{ color: 'black', position: 'absolute', bottom: '10px', right: '110px', zIndex: 1000, cursor: 'pointer' }}>
                Reset Map
            </button>
        );
    };

    return (
        <div>
            <MapContainer
                center={UMassCoords}
                zoom={12}
                scrollWheelZoom={true}
                style={MapContainerCSS}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <ResetButton />
                <Marker position={UMassCoords}>
                    <Popup>
                        UMass Amherst
                    </Popup>
                </Marker>
                <DestinationMarker destination={destination} />
            </MapContainer>
        </div>
    );
};

export default MyMap;