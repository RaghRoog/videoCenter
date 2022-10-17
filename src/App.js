import { useEffect, useState } from 'react';
import './App.scss';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';

function App() {

  return (
    <div className="App">
      <Navbar/>
      <MobileNavbar/>
      <Home/>
    </div>
  );
}

export default App;
