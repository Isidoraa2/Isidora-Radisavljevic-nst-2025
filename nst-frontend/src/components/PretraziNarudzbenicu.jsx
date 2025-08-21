import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNarudzbenicu } from '../services/Service';
//import './AbsoluteFoother.css';

const PretraziNarudzbenicu = () => {
  const [brojNarudzbenice, setBrojNarudzbenice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBrojNarudzbenice(e.target.value);
    setErrorMessage(''); // Reset error message when user starts typing
  };

  const handleSearch = async () => {
    try {
        console.log(brojNarudzbenice);
        const response= await getNarudzbenicu(brojNarudzbenice);
      if (response.data) {
        // Narudžbenica postoji, preusmerite korisnika
        navigate(`/prikazi-narudzbenicu/${brojNarudzbenice}`);
      } else {
        // Narudžbenica ne postoji
        setErrorMessage('Narudžbenica sa unetim brojem ne postoji.');
      }
    } catch (error) {
      // Greška u API pozivu
      setErrorMessage('Narudžbenica sa unetim brojem ne postoji.');
    }
  };
  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Unesite broj narudžbenice"
            value={brojNarudzbenice}
            onChange={(e) => setBrojNarudzbenice((e.target.value))}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Pretraži
          </button>
          
        </div>
        {errorMessage && <div className="alert alert-danger" style={{marginTop:"10px"}}>{errorMessage}</div>}
      </div>
      
    </div>
  </div>
  )
}

export default PretraziNarudzbenicu