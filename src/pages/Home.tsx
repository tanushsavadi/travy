import React from 'react';
import Map from '../components/Map';
import Filter from '../components/Filter';
import TransportOptions from '../components/TransportOptions';
import '../common/InputField.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { mockLocations } from '../data/MockLocations';
import { DummyProfile } from '../data/dummyUserProfile';

interface FilterOptions {
  location: string;
  transport: string[];
  price: { min: number; max: number };
  travelTime: { minHours: number; maxHours: number };
}

const Home: React.FC = () => {

  const locationNames = mockLocations.map(location => location.name);

  const [destination, setDestination] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [filters, setFilters] = React.useState<FilterOptions>({
    location: '',
    transport: ['Car', 'Bus', 'Train', 'Flight'],
    price: { min: 0, max: 1000 },
    travelTime: { minHours: 0, maxHours: 24 }
  });

  const currentUser: DummyProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const handleSubmit = () => {
    const loc = inputValue;
    if (!loc) {
      alert("Please enter a location.");
      return;
    }
    setDestination(loc);
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: loc,
    }));
  };

  return (
    <div className="text-white h-screen flex flex-col items-center justify-center">
      <Map destination={destination} setDestination={setDestination}/>
      <div>
        {currentUser && 
        <h1 className="text-3xl font-bold mb-4">Welcome {currentUser.fullName}</h1>
        }
        <p className="mb-4">Enter your destination to find rides!</p>
        <Autocomplete
          disablePortal
          options={locationNames}
            sx={{
             width: 300, margin: 'auto', padding: 0, textColor: 'white',
            '& label': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '.MuiAutocomplete-input': { color: 'white' },
            '.MuiSvgIcon-root': { color: '#7ac59b' },
          }}
          className="input-field"
          renderInput={(params) => <TextField {...params} label="Enter Location" />}
          onChange={(e, value) => setInputValue(value || '')}
        />
        <Filter filters={filters} setFilters={setFilters}/>
        <button className="submit-btn" onClick={handleSubmit}>Submit</button> 

        <TransportOptions filters={filters}/>
      </div>   
    </div>
  )
}

export default Home;