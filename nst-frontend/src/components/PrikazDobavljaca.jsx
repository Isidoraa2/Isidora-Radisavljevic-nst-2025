import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useParams } from 'react-router-dom'
import { getDobavljaca } from '../services/Service';

const PrikazDobavljaca = () => {
    
    
    const[naziv,setNaziv]=useState('');
    const[tipDobavljaca,setTipDobavljaca]=useState('');
    const[pib,setPib]=useState('');
    
    const {id}=useParams();

    useEffect(()=>{
        //dodaj
        if(id){
            getDobavljaca(id).then((response)=>{
              setNaziv(response.data.naziv);
              setTipDobavljaca(response.data.tipDobavljaca);
              setPib(response.data.pib);
            }).catch(error=>{
              console.log(error);
            })
          }
    },[])

   
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Prikaz dobavljaca</h2>

                <div className='card'>
                    <div className='card-header'>
                        Detalji
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Naziv dobavljaca:</b>
                                {naziv}
                            </li>
                            <li className='list-group-item'>
                                <b>Tip dobavljaca:</b>
                                {tipDobavljaca}
                            </li>
                            <li className='list-group-item'>
                                <b>PIB dobavljaca:</b>
                                {pib}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className="btn btn-primary my-2" to={'/'}>Nazad na pocetnu stranu</Link>
            </div>

        </div>
    </div>
  )
}

export default PrikazDobavljaca