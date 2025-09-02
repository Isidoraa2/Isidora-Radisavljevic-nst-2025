import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNarudzbeniceByKriterijum, getNarudzbenicu } from '../services/Service';
//import './AbsoluteFoother.css';

const PretraziNarudzbenicu = () => {
  const [kriterijum, setKriterijum]=useState('');
  const [errorMessage, setErrorMessage]=useState('');
  const[narudzbenice,setNarudzbenice]=useState([]);
  const navigate = useNavigate();
  const {urlParametar}=useParams();
  
      useEffect(() => {
          // Ako postoji parametar kriterijum, odmah izvrši pretragu
          if (urlParametar) {
              setNaziv(urlParametar);
              handleSearch(urlParametar);
          }
      }, [kriterijum]);

  const handleInputChange = (e) => {
    setKriterijum(e.target.value);
    setErrorMessage(''); // Reset error message when user starts typing
  };

  const handleSearch = async () => {
    try {
        console.log(kriterijum);
        const response= await getNarudzbeniceByKriterijum(kriterijum);
      if (response.data && response.data.length!=0) {
        // ovo mi treba za kasnije 
        //navigate(`/prikazi-narudzbenicu/${brojNarudzbenice}`);
        console.log(response.data);
        setNarudzbenice(response.data);
        navigate(`/pretrazi-narudzbenice/${kriterijum}`);
      } else {
        // Narudžbenice ne postoji
        setErrorMessage('Nema narudzbenica sa zadatim kriterijumom pretrage!');
      }
    } catch (error) {
      // Greška u API pozivu
      setErrorMessage('Greska prilikom pretrage narudzbenice!');
    }
  };

  const izaberiNarudzbenicu=(narudzbenicaId)=>{
      navigate(`/prikaz-narudzbenice/${narudzbenicaId}`);
  }

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Unesite kriterijum pretrage"
            value={kriterijum}
            onChange={(e) => setKriterijum((e.target.value))}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Pretraži
          </button>
        </div>
      </div>
          {kriterijum && narudzbenice.length > 0 && (
                        <table className="table table-striped table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Datum</th>
                                    <th>Zaposleni</th>
                                    <th>Dobavljac</th>
                                    <th>Ukupna vrednost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {narudzbenice.map((narudzbenica) => (
                                    <tr key={narudzbenica.id} 
                                          onClick={() => izaberiNarudzbenicu(narudzbenica.id)}
                                          style={{ cursor: "pointer" }}>
                                        <td>{narudzbenica.id}</td>
                                        <td>{narudzbenica.datum}</td>
                                        <td>{narudzbenica.zaposleni.ime +' '+narudzbenica.zaposleni.prezime}</td>
                                        <td>{narudzbenica.dobavljac.naziv}</td>
                                        <td>{narudzbenica.ukupnaVrednost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
        
        {errorMessage && <div className="alert alert-danger" style={{marginTop:"10px"}}>{errorMessage}</div>}
    
    </div>
  </div>
  )
}

export default PretraziNarudzbenicu