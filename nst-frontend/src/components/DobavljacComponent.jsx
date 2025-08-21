import React, { useEffect, useState } from 'react'
import { dodajDobavljaca, getDobavljaca, izmeniDobavljaca } from '../services/Service'
import {Link, useNavigate,useParams } from 'react-router-dom'
//import './AbsoluteFoother.css'

const DobavljacComponent = () => {
  const [naziv,setNaziv]=useState('')
  const[adresa,setAdresa]=useState('')
  const[tipDobavljaca,setTipDobavljaca]=useState(true)
  const[pib,setPib]=useState('')


  const {id}=useParams();

  const [errors,setErrors]=useState({
    naziv:'',
    adresa:'',
    domaciDobavljac:'',
    pib:''
  })

  function pageTitle(){
    if(id){
      return <h2 className='text-center'>Izmeni dobavljaca</h2>
    }else{
      return <h2 className='text-center'>Dodaj dobavljaca</h2>
    }
  }

  function handleNaziv(e){
    setNaziv(e.target.value);
  }

  function handleAdresa(e){
    setAdresa(e.target.value);
  }

  const handleTipDobavljaca = (e) => {
    setTipDobavljaca(e.target.value === "domaci");
  };
  
  function handlePib(e){
    setPib(e.target.value);
  }

  const navigator=useNavigate();

  useEffect(() => {
  if (id) {
    getDobavljaca(id).then((response) => {
      setNaziv(response.data.naziv);
      setAdresa(response.data.adresa);
      setTipDobavljaca(response.data.domaciDobavljac); 
      setPib(response.data.pib);
    }).catch(console.log);
  }
}, [id]);

  function sacuvajIliIzmeniDobavljaca(e){
    e.preventDefault();

    if(validateForm()){
      const dobavljac = {
      naziv,
      adresa,
      domaciDobavljac: tipDobavljaca, 
      pib
    };
      console.log(dobavljac);
      if(id){
        //ako postoji id u url-u
        izmeniDobavljaca(id,dobavljac).then((response)=>{
          console.log(response.data);
          navigator("/dobavljaci");
        }).catch(error=>{
          console.log(error);
        })
      }
      else{
        dodajDobavljaca(dobavljac).then((response)=>{
          console.log(response.data)
          navigator("/dobavljaci")
        }).catch(error=>{
          console.log(error);
        })
      }
      
      
    
    }
    else{

    }

    
  }

  function validateForm(){
    let valid=true;

    const errorsCopy={...errors};

    if(naziv.trim()){
      errorsCopy.naziv='';
    }else{
      errorsCopy.naziv="Unesite naziv dobavljaca!";
      valid=false;
    }

    if(adresa.trim()){
      errorsCopy.adresa='';
    }else{
      errorsCopy.adresa="Unesite adresu dobavljaca!";
      valid=false;
    }

    if(pib.trim()){
      errorsCopy.pib='';
    }else{
      errorsCopy.pib="Unesite PIB dobavljaca!";
      valid=false;
    }

    setErrors(errorsCopy);
    return valid;


  }
  return (
    <div className='container'>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2 '>
                <label className='form-label'>Naziv dobavljaca:</label>
                <input type='text' placeholder='Unesite naziv dobavljaca' name='naziv' value={naziv} className={`form-control ${errors.naziv ? 'is-invalid':''}`} onChange={handleNaziv}></input>
                {errors.naziv && <div className='invalid-feedback'>{errors.naziv}</div>}
              </div>
              <div className='form-group mb-2 '>
                <label className='form-label'>Adresa dobavljaca:</label>
                <input type='text' placeholder='Unesite adresu dobavljaca' name='adresa' value={adresa} className={`form-control ${errors.adresa ? 'is-invalid':''}`} onChange={handleAdresa}></input>
                {errors.adresa && <div className='invalid-feedback'>{errors.adresa}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label d-block'>Tip dobavljača:</label>

                <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="domaci"
                  name="tipDobavljaca"
                  value="domaci"
                  checked={tipDobavljaca === true}
                  onChange={handleTipDobavljaca}
                  className="form-check-input"
                />
                <label htmlFor="domaci" className="form-check-label">Domaći dobavljač</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="inostrani"
                  name="tipDobavljaca"
                  value="inostrani"
                  checked={tipDobavljaca === false}
                  onChange={handleTipDobavljaca}
                  className="form-check-input"
                />
                <label htmlFor="inostrani" className="form-check-label">Inostrani dobavljač</label>
              </div>
          </div>
              <div className='form-group mb-2 '>
                <label className='form-label'>PIB:</label>
                <input type='text' placeholder='Unesite PIB dobavljaca' name='pib' value={pib} className={`form-control ${errors.pib? 'is-invalid':''}`} onChange={handlePib}></input>
                {errors.pib && <div className='invalid-feedback'>{errors.pib}</div>}
              </div>
              <button type='submit' className='btn btn-outline-success' onClick={sacuvajIliIzmeniDobavljaca}>Submit</button>
              <Link className='btn btn-outline-danger mx-2' to='/dobavljaci'>Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DobavljacComponent