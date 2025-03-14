import React from 'react';
import { LatLngTuple } from 'leaflet';
import Map from '../components/Map';
import Filter from '../components/Filter';
import TransportOptions from '../components/TransportOptions';
import '../common/InputField.css';


const Home: React.FC = () => {

  const [destination, setDestination] = React.useState<LatLngTuple>();
  const [inputValue, setInputValue] = React.useState<string>('');
  const [filters, setFilters] = React.useState({
    transport: ['Car', 'Bus', 'Train', 'Flight'],
    price: { min: 0, max: 1000 },
    travelTime: { minHours: 0, maxHours: 24 }
  });

  const handleSubmit = () => {
    const coords = inputValue.split(',').map(Number);
    if (coords.length === 2) {
      setDestination([coords[0], coords[1]]);
    }
    else {
      alert('Please enter valid coordinates in the format "latitude,longitude"');
    }
  };

  return (
    <div>
      <Map destination={destination} setDestination={setDestination}/>

      <div>
        <p>Enter your destination to find rides!</p>
        <input 
          type="text" 
          value={inputValue}
          className="input-field" 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter coordinates (lat,long)"
          style={{ width: '200px', marginRight: '10px' }}
        />
        <button className="submit-btn" onClick={handleSubmit}>Submit</button> 
        <Filter filters={filters} setFilters={setFilters}/>
        <TransportOptions filters={filters}/>
      </div>   
    </div>
  )
}

export default Home;