import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Osobe from './components/osoba/osobe.component';
import DodajOsobu from './components/osoba/dodajOsobu.component';
import Vozila from './components/vozilo/vozila.component';
import DodajVozilo from './components/vozilo/dodajVozilo.component';
import PromjeniOsobu from './components/osoba/promjeniOsobu.component';
import Oglasi from './components/oglas/oglasi.component';
import DodajOglas from './components/oglas/dodajOglas.component';
import PromjeniOglas from './components/oglas/promjeniOglas.component';
import PromjeniVozilo from './components/vozilo/promjeniVozilo.component';
import Upiti from './components/upit/upiti.component';
import DodajUpit from './components/upit/dodajUpit.component';
import PromjeniUpit from './components/upit/promjeniUpit.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna/>} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
        <Route path='/osobe' element={<Osobe />} />
        <Route path='/osobe/dodaj' element={<DodajOsobu/>} />
        <Route path='/osobe/promjeni' element={<PromjeniOsobu/>} />
        <Route path='/osobe/:sifra' element={<PromjeniOsobu/>} />
        <Route path="/vozila" element={<Vozila/>} />
        <Route path='/vozila/dodaj' element={<DodajVozilo/>} />
        <Route path='/vozila/promjeni' element={<PromjeniVozilo/>} />
        <Route path='/oglasi' element={<Oglasi />} />
        <Route path='/oglasi/dodaj' element={<DodajOglas/>} />
        <Route path='/oglasi/promjeni' element={<PromjeniOglas/>} />
        <Route path='/upiti' element={<Upiti />} />
        <Route path='/upiti/dodaj' element={<DodajUpit/>} />
        <Route path='/upiti/promjeni' element={<PromjeniUpit/>} />
         
      

        </Routes>
        </Router>

        
      

        
  );
}



