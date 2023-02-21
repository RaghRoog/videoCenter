import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom' 
import './App.scss';
import Home from './components/Home';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import SeasonDetailsPage from './components/SeasonDetailsPage';
import PesronDetails from './components/PersonDetails';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/:id' element={<DetailsPage/>}/>
          <Route path='/tv/:id' element={<SeasonDetailsPage/>}/>
          <Route path='/person/:id' element={<PesronDetails/>}/>
        </Routes>
      </BrowserRouter>
      <footer>
        <p>The source of data is </p>
        <a href='https://www.themoviedb.org'>
          <img src='imgs/api_logo.svg'></img>
        </a>
      </footer>
    </div>
  );
}

export default App;
