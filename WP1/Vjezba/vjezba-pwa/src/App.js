import React from 'react';
import './App.css';
import { Route, Router } from 'workbox-routing';
import Pocetna from './components/pocetnakomponenta';
import NadzornaPloca from './components/nadzornaploca';
import Djelatnici from './components/Djelatnik/djelatnici.component';
import Izbornik from './components/izbornikkomponenta';
import { Routes } from 'react-router-dom';
import DodajDjelatnika from './components/Djelatnik/dodajdjelatnika.component';
import PromjeniDjelantika from './components/Djelatnik/promjeniDjelatnika.component';
import Dodajprostoriju from './components/Prostorija/dodajprostoriju.component';
import DodajProstoriju from './components/Prostorija/dodajprostoriju.component';
import PromjeniProstoriju from './components/Prostorija/promjeniProstoriju.component';
import Prostorije from './components/Prostorija/prostorije.component';

export default function App(){

  return(
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
        <Route path='/djelatnici' element={<Djelatnici />} />
        <Route path='/djelatnici/dodaj' element={<DodajDjelatnika />} />
        <Route path="/djelatnici/:sifra" element={<PromjeniDjelantika />} />
        <Route path="/prostorije" element={<Prostorije />} />
        <Route path="/prostorije/dodaj" element={<Dodajprostoriju />} />
        <Route path="/prostorije/:sifra" element={<PromjeniProstoriju />} />
      </Routes>
    </Router>
  )
}
