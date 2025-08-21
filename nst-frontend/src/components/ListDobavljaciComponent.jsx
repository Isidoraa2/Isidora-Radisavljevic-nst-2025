import React,{useEffect, useState} from 'react'
import { listaDobavljaca,obrisiDobavljaca } from '../services/Service'
import { useNavigate} from 'react-router-dom'

const ListDobavljaciComponent = () => {
    const [dobavljaci,setDobavljaci]=useState([])
    
    const navigator=useNavigate();
    
    function getAllDobvaljaci(){
       listaDobavljaca().then((response) => {
        console.log(response.data); // proveri šta stigne sa servera
        setDobavljaci(response.data);
    }).catch(error => console.error(error));
    }
    useEffect(()=>{getAllDobvaljaci();},[])

    
    function dodajNovogDobavljaca(){
        navigator('/dodaj-dobavljaca');
    }

    function izmeniDobavljaca(id){
        navigator(`/izmeni-dobavljaca/${id}`);
        //vodi racuna o ovim naopakim znacima navoda, kada hocu da ubacim promenljivu u path
    }

    function izbrisiDobavljaca(id){
        console.log(id);
        //da vidimo da li kupi dobar id
        obrisiDobavljaca(id).then((response)=>{
            getAllDobvaljaci();
        }).catch(error=>{
            console.log(error);
        })
    }

    function pogledajDobavljaca(id){
        navigator(`/prikaz-dobavljaca/${id}`);
        //vodi racuna o ovim naopakim znacima navoda, kada hocu da ubacim promenljivu u path
    }
  return (
    <div className='container'>
        
        <h2 style={{marginTop: '10px'}}>Lista dobavljaca</h2>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Naziv dobavljaca</th>
                    <th>Adresa</th>
                    <th>Tip dobavljaca</th>
                    <th>Pib</th>
                    <th>Opcije</th>
                </tr>
            </thead> 
            <tbody>{
                dobavljaci.map((dobavljac)=>(
                    <tr key={dobavljac.id}>
                        <td>{dobavljac.id}</td>
                        <td>{dobavljac.naziv}</td>
                        <td>{dobavljac.adresa}</td>
                        <td>{dobavljac.domaciDobavljac ? 'Domaći' : 'Inostrani'}</td>
                        <td>{dobavljac.pib}</td>
                        <td><button className='btn btn-outline-info' onClick={()=>izmeniDobavljaca(dobavljac.id)}>Izmeni</button>
                            <button className='btn btn-outline-danger' onClick={()=>izbrisiDobavljaca(dobavljac.id)}
                                style={{marginLeft:'10px'}}>Obrisi</button>
                            <button className='btn btn-outline-success' onClick={()=>pogledajDobavljaca(dobavljac.id)}
                            style={{marginLeft:'10px'}}>Prikazi</button>
                        </td>
                    </tr>)
                )
                    
                
            } 
            </tbody>
        
        </table>
    </div>
  );
}

export default ListDobavljaciComponent