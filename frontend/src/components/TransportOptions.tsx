import React, { useEffect } from 'react';
import '../styles/TransportOptions.css';
import { getRideOptions, RideOption } from '../data/RideOptions';


interface TransportOptionsProps {
    filters: {
        location: string,
        transport: string[],
        price: { min: number, max: number },
        travelTime: { minHours: number, maxHours: number }
    },
    destination: string
}

const getTransportIcon = (transport: string) => {
    const icons: { [key: string]: string } = {
      car: "🚗",
      uber: "🚖",
      bus: "🚌",
      train: "🚆",
      flight: "✈️",
    };
    return icons[transport.toLowerCase()] || "🚖"; // placeholder for taxis
};
  

const TransportOptions: React.FC<TransportOptionsProps> = ({filters, destination}) => {

    const [rideData, setRideData] = React.useState<RideOption[]>([]);
    const [filteredData, setFilteredData] = React.useState<RideOption[]>([]);
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
    const toggleExpand = (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };
      
    useEffect(() => {
        const fetchRideOptions = async () => {
            try {
                const data = await getRideOptions("Boston, MA", destination);
                console.log("Fetched ride options:", data);
                setRideData(data);
            } catch (error) {
                console.error("Error fetching ride options:", error);
            }
        };

        fetchRideOptions();
    }, [destination]);
      
    const filterData: RideOption[] = React.useMemo(() => {
      return rideData.filter((item: RideOption) =>
        filters.transport.map(item=>item.toLowerCase()).includes(item.transport.toLowerCase()) &&
        item.price >= filters.price.min &&
        item.price <= filters.price.max &&
        item.travelTime >= filters.travelTime.minHours &&
        item.travelTime <= filters.travelTime.maxHours
      );
    }, [filters, rideData]);

    

    useEffect(() => {
        setFilteredData(filterData);
    }, [filterData]);

    return (
      filters.location !== '' && (
          <div className="transport-options">
          <h3 className="pb-1 font-semibold">Available Transport Options</h3>
          {filteredData.length > 0 ? (
              <ul className="rides-list">
              {filteredData.map((option, index) => (
                <li key={index} className="ride-card">
                  <div
                    className="ride-header"
                    onClick={() => toggleExpand(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="transport-icon">{getTransportIcon(option.transport)}</span>
                    {option.logo && (
                      <img src={option.logo} alt={option.transport} className="transport-logo" />
                    )}
                    <strong>{option.name}</strong>
                  </div>

                  <div className="ride-details">
                    <span className="destination">{option.src?.split(",")[0]} - {option.destination?.split(",")[0]}</span>
                    <span className="price">{option.price? "$" + option.price.toString() : "Not available"}</span>
                    <span className="time">
                      {option.travelTime} hour{option.travelTime > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Expanded Details if they exist */}
                  {expandedIndex === index && option.steps && (
                    <ul className="ride-steps">
                      {option.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="ride-step">
                          <div><strong>{step.vehicle}</strong> by {step.agency}</div>
                          <div>{step.departure} → {step.arrival}</div>
                          <div>Duration: {step.duration} min</div>
                        </li>
                      ))}
                    </ul>
                  )}
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