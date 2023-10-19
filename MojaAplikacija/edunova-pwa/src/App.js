import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Osobe from './components/osoba/osobe.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna/>} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
        <Route path='/osobe' element={<Osobe />} />
      </Routes>
    </Router>
  );
}


