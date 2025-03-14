import React from 'react';
import '../styles/TransportOptions.css';


interface TransportOptionsProps {
    filters: {
        transport: string[],
        price: { min: number, max: number },
        travelTime: { minHours: number, maxHours: number }
    }
}


const TransportOptions: React.FC<TransportOptionsProps> = ({filters}) => {
    // Fetch later
    const data = [{
        'transport': 'Car',
        'price': 50,
        'travelTime': 2
    }]

    const filteredData = data.filter(item =>
        filters.transport.includes(item.transport) &&
        item.price >= filters.price.min &&
        item.price <= filters.price.max &&
        item.travelTime >= filters.travelTime.minHours &&
        item.travelTime <= filters.travelTime.maxHours
    );

    return (
        <div className="transport-options">
            <h3>Available Transport Options</h3>
            {filteredData.length > 0 ? (
                <ul>
                    {filteredData.map((option, index) => (
                        <li key={index} className='transport-option'>
                            <strong>{option.transport}</strong>: ${option.price} | {option.travelTime} hours
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transport options available for the selected filters.</p>
            )}
        </div>
    );

}

export default TransportOptions;