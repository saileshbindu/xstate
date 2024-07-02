import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [message, setMessage] = useState('');

  const fetchCountries = () => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.log("Error while fetching data", err));
  };

  const fetchStates = (country) => {
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.log("Error while fetching data", err));
  };

  const fetchCities = (country, state) => {
    fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.log("Error while fetching data", err));
  };

  const updateMessage = () => {
    if (selectedCountry && selectedState && selectedCity) {
      setMessage(`You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`);
    } else {
      setMessage('');
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
      setSelectedState('');
      setCities([]);
      setSelectedCity('');
    }
    updateMessage();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCities(selectedCountry, selectedState);
      setSelectedCity('');
    }
    updateMessage();
  }, [selectedState]);

  useEffect(() => {
    updateMessage();
  }, [selectedCity]);

  return (
    <div className="App">
      <div className='selectMain'>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value=''>Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
          <option value=''>Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
          <option value=''>Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;