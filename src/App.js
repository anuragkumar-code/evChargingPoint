import React, { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar.js';
import Map from './components/Map.js';

function App() {
  const [chargingPoints, setChargingPoints] = useState([]);

  const handleSearch = (data) => {
    setChargingPoints(data); 
  };

  return (
    <div className="App">
      <Navbar onChange={handleSearch} />
      <Map chargingPoints={chargingPoints} />
    </div>
  );
}

export default App;
