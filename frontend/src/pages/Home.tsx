import React, { Suspense } from 'react';
import Map from '../components/Map';
import Filter from '../components/Filter';
import '../common/InputField.css';
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { mockLocations } from '../data/MockLocations';
import { DummyProfile } from '../data/dummyUserProfile';

const TransportOptions = React.lazy(() => import('../components/TransportOptions'));

interface FilterOptions {
  location: string;
  transport: string[];
  price: { min: number; max: number };
  travelTime: { minHours: number; maxHours: number };
}

const Home: React.FC = () => {
  // Retrieve user profile from local storage
  const currentUser: DummyProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const navigate = useNavigate();
  // Redirect to login if no user profile is found
  if (!currentUser) {
    navigate('/login');
  }

  // Get all supported locations
  const locationNames = mockLocations.map(location => location.name);

  // React state hooks for destination selection and filtering
  const [destination, setDestination] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [filters, setFilters] = React.useState<FilterOptions>({
    location: '',
    transport: ['Car', 'Bus', 'Train', 'Flight'],
    price: { min: 0, max: 1000 },
    travelTime: { minHours: 0, maxHours: 10000 }
  });
  const [submitted, setSubmitted] = React.useState(false);

  // Handle form submission
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
    setSubmitted(true);
  };

  return (
    <div className="text-white">
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '60%',
          margin: 'auto',
          ...(window.innerWidth <= 768 && { width: '100%', margin: '0'})
        }}
      >
        <Map destination={destination} setDestination={setDestination} />
      </div>
      {/* User Greeting and Input Section */}
      <div
        style={{
          overflowY: 'auto',
          width: '80%',
          margin: '0 auto',
          textAlign: 'center',
          ...(window.innerWidth <= 768 && { width: '100%' })
        }}
      >
        {currentUser && 
          <h1 className="text-xl sm:text-3xl font-bold mb-1">Welcome {currentUser.fullName}</h1>
        }
        <p className="mb-4 text-md">Enter your destination to find rides!</p>
        <Autocomplete
          disablePortal
          options={locationNames}
          sx={{
            width: 300,
            margin: '0 auto',
            padding: 0,
            textColor: 'white',
            marginBottom: '0.75rem',
            '& label': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '.MuiAutocomplete-input': { color: 'white' },
            '.MuiSvgIcon-root': { color: '#7ac59b' },
          }}
          className="input-field mb-2"
          renderInput={(params) => <TextField {...params} label="Enter Location" />}
          onChange={(_, value) => setInputValue(value || '')}
        />

        <div style={{ margin: 'auto', width: '100%', maxWidth: '600px' }}>
          <Filter filters={filters} setFilters={setFilters} />
        </div>
        
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>

        {/* Lazy-loaded TransportOptions with Suspense fallback */}
        {
        submitted && (
          <div style={{ margin: '1rem auto', width: '100%', maxWidth: '600px' }}>
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <TransportOptions filters={filters} destination={destination} />
            </Suspense>
          </div>
        )
        }
        
      </div>
    </div>
  )
}

export default Home;