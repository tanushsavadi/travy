import React from 'react';
import '../styles/TransportOptions.css';
import { RideOption, rideData } from '../data/RideOptions';


interface TransportOptionsProps {
    filters: {
        location: string,
        transport: string[],
        price: { min: number, max: number },
        travelTime: { minHours: number, maxHours: number }
    }
}

const getTransportIcon = (transport: string) => {
    const icons: { [key: string]: string } = {
      Car: "🚗",
      Bus: "🚌",
      Train: "🚆",
      Flight: "✈️",
    };
    return icons[transport] || "🚖"; // placeholder for taxis
};
  

const TransportOptions: React.FC<TransportOptionsProps> = ({filters}) => {

    const filteredData: RideOption[] = rideData.filter(item =>
        item.destination === filters.location &&
        filters.transport.includes(item.transport) &&
        item.price >= filters.price.min &&
        item.price <= filters.price.max &&
        item.travelTime >= filters.travelTime.minHours &&
        item.travelTime <= filters.travelTime.maxHours
    );

    return (
            filters.location !== '' && (
                <div className="transport-options">
                <h3>Available Transport Options</h3>
                {filteredData.length > 0 ? (
                    <ul className="rides-list">
                    {filteredData.map((option, index) => (
                      <li key={index} className="ride-card">
                        <div className="ride-header">
                          <span className="transport-icon">{getTransportIcon(option.transport)}</span>
                          <strong>{option.transport}</strong>
                        </div>
                        <div className="ride-details">
                          <span className="price">${option.price}</span>
                          <span className="time">{option.travelTime} hour{option.travelTime > 1? 's': ''}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                    <p>No transport options available for the selected location and filters.</p>
                )}
            </div>
            )
    );

}

export default TransportOptions;