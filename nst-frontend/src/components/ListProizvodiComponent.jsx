import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteProizvod, getProizvodi, izmeniProizvod } from '../services/Service';

function ListProizvodiComponent() {
    const [proizvodi,setProizvodi]=useState([])
        
        const navigator=useNavigate();
        
        function getAllProizvodi(){
            getProizvodi().then((response) => {
            console.log(response.data); // proveri šta stigne sa servera
            setProizvodi(response.data);
        }).catch(error => console.error(error));
        }
        useEffect(()=>{getAllProizvodi();},[])
    
        
        function dodajNovProizvod(){
            navigator('/dodaj-proizvod');
        }
    
        function izmeniProizvod(id){
            navigator(`/izmeni-proizvod/${id}`);
        }
    
        function izbrisiProizvod(id){
            console.log(id);
            //da vidimo da li kupi dobar id
            deleteProizvod(id).then((response)=>{
                getAllProizvodi();
            }).catch(error=>{
                console.log(error);
            })
        }
    
  return (
    <div className='container'>
        
        <h2 style={{marginTop: '10px'}}>Lista proizvoda</h2>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Naziv proizvoda</th>
                    <th>Opis</th>
                    <th>Jedinica mere</th>
                    <th>Cena</th>
                    <th>Opcije</th>
                </tr>
            </thead> 
            <tbody>{
                proizvodi.map((proizvod)=>(
                    <tr key={proizvod.id}>
                        <td>{proizvod.id}</td>
                        <td>{proizvod.naziv}</td>
                        <td>{proizvod.opis}</td>
                        <td>{proizvod.jedinicaMere}</td>
                        <td>{proizvod.cena}</td>
                        <td><button className='btn btn-outline-info' onClick={()=>izmeniProizvod(proizvod.id)}>Izmeni</button>
                            <button className='btn btn-outline-danger' onClick={()=>izbrisiProizvod(proizvod.id)}
                                style={{marginLeft:'10px'}}>Obrisi</button>
                        </td>
                    </tr>)
                )
                    
                
            } 
            </tbody>
        
        </table>
    </div>
  )
}

export default ListProizvodiComponent