import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from "leaflet";

const UMassCoords: LatLngTuple = [42.386487, -72.531481]; // UMass Amherst coordinates

const MapContainerCSS: React.CSSProperties = {
    height: "400px",
    width: "1000px",
    zIndex: 0
};


const ResetButton: React.FC = () => {
    const map = useMap();

    const resetMap = () => {
        if (map) {
            map.setView(UMassCoords, 12); // Reset coordinates
        }
    }

    return (
        <button onClick={resetMap} style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }}>
            Reset Map
        </button>
    );
}


const MyMap: React.FC = () => {

    return (
        <div>
        <MapContainer center={UMassCoords} zoom={12} scrollWheelZoom={true} style={MapContainerCSS}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <ResetButton />
            <Marker position={UMassCoords}>
                <Popup>
                    UMass Amherst
                </Popup>
            </Marker>
        </MapContainer>
      </div>
  )
}

export default MyMap;