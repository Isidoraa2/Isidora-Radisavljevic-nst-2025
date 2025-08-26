import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './assets/HelloWorld'
import ListDobavljaciComponent from './components/ListDobavljaciComponent'
import HeaderComponent from './components/HeaderComponent'
import FootherComponent from './components/FootherComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DobavljacComponent from './components/DobavljacComponent'
import PrikazDobavljaca from './components/PrikazDobavljaca'
import HomeComponent from './components/HomeComponent'
import PretraziNarudzbenicu from './components/PretraziNarudzbenicu'
import PrikaziNarudzbenicu from './components/PrikaziNarudzbenicu'
import DodajStavku from './components/DodajStavku'
import IzmeniStavku from './components/IzmeniStavku'
import DodajNarudzbenicu from './components/DodajNarudzbenicu'
import ProizvodComponent from './components/ProizvodComponent'
import ListProizvodiComponent from './components/ListProizvodiComponent'
import LoginComponent from './components/LoginComponent'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './components/Sidebar'
import ProizvodSearchComponent from './components/ProizvodSearchComponent'

function App() {
  //const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <BrowserRouter>
    {isLoggedIn ? (<><HeaderComponent setIsLoggedIn={setIsLoggedIn}></HeaderComponent>
    <Sidebar setIsLoggedIn={setIsLoggedIn}></Sidebar>
      <div className='container'>
      <Routes>
        <Route path='/'element={<HomeComponent></HomeComponent>}></Route>
        <Route path='/dodaj-proizvod' element={<ProizvodComponent></ProizvodComponent>}></Route>
        <Route path='/izmeni-proizvod/:id' element={<ProizvodComponent></ProizvodComponent>}></Route>
        <Route path='/pretrazi-proizvode' element={<ProizvodSearchComponent></ProizvodSearchComponent>}></Route>
        <Route path='/pretrazi-proizvode/:kriterijum' element={<ProizvodSearchComponent></ProizvodSearchComponent>}></Route>
        <Route path='/proizvodi'element={<ListProizvodiComponent></ListProizvodiComponent>}></Route>
        <Route path='/dobavljaci'element={<ListDobavljaciComponent></ListDobavljaciComponent>}></Route>
        <Route path='/dodaj-dobavljaca' element={<DobavljacComponent></DobavljacComponent>}></Route>
        <Route path='/izmeni-dobavljaca/:id' element={<DobavljacComponent></DobavljacComponent>}></Route>
        <Route path='/prikaz-dobavljaca/:id' element={<PrikazDobavljaca></PrikazDobavljaca>}></Route>
        <Route path='/prikazi-narudzbenicu' element={<PretraziNarudzbenicu></PretraziNarudzbenicu>}></Route>
        <Route path='/prikazi-narudzbenicu/:id' element={<PrikaziNarudzbenicu></PrikaziNarudzbenicu>}></Route>
        <Route path='/dodaj-stavku/:id' element={<DodajStavku></DodajStavku>}></Route>
        <Route path='/izmeni-stavku/:brNarudzbenice/:rbr' element={<IzmeniStavku></IzmeniStavku>}></Route>
        <Route path='/dodaj-narudzbenicu' element={<DodajNarudzbenicu></DodajNarudzbenicu>}></Route>
      </Routes>
      </div></>):(
        <LoginComponent setIsLoggedIn={setIsLoggedIn} />
      )}
      
      
      <FootherComponent></FootherComponent>
    </BrowserRouter>
    </>
  )
}

export default App