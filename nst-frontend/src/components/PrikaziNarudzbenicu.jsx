import React, {useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import { deleteStavka, getNarudzbenicu, obrisiNarudzbenicu } from '../services/Service';

const PrikaziNarudzbenicu = () => {
    const [narudzbenica,setNarudzbenica]=useState(null)
    const [error,setError]=useState(null);

    //ovo ce da pokupi id iz url-a
    const navigator=useNavigate();
    const {id}=useParams();
    console.log(id);

    //const history=useHistory();
    useEffect(() => {
        const fetchNarudzbenica = async () => {
          try {
            const response = await getNarudzbenicu(id);
            setNarudzbenica(response.data);
          } catch (error) {
            setError('Narudžbenica nije pronađena.');
          }
        };
    //umesto direktno u useEffectu da ide ,[id]
    //samo jednom ucitava, ne stalno...
        fetchNarudzbenica();
      }, [id]);
    
      if (error) {
        return <div>{error}</div>;
      }
    
      if (!narudzbenica) {
        return <div>Učitavanje...</div>;
      }
//sastav
      const{id:brojNarudzbenice, datum, zaposleni, dobavljac,ukupnaVrednost, stavke}=narudzbenica;
      console.log(id);
      const izmeniStavku = (stavkaId) => {
        navigator(`/izmeni-stavku/${stavkaId.brNarudzbenice}/${stavkaId.rbr}`);
      };

      const izbrisiStavku = async (stavkaId) => {
        try {
          // Slanje zahteva za brisanje stavke
          const { data } = await deleteStavka(id, stavkaId.rbr);
          setNarudzbenica(data);
          console.log(narudzbenica);
          console.log('Stavka obrisana:', stavkaId);
        } catch (error) {
          console.error('Greška prilikom brisanja stavke:', error);
        }
      };
    
      const pogledajStavku = (stavkaId) => {
        // Logika za prikaz detalja stavke (npr. otvaranje modala za prikaz detalja)
        console.log('Prikaz stavke:', stavkaId);
        // Ovdje možeš dodati logiku za otvaranje modala za prikaz detalja stavke
      };

      const handleDodajStavku = () => {
        navigator(`/dodaj-stavku/${id}`);
      };
      const handleObrisiNarudzbenicu=()=>{
        obrisiNarudzbenicu(id);
        console.log("obrisana");
        navigator('/');
      }
  return (

    <div className='container'>
        <h2 style={{marginTop: '10px'}}>Detalji narudzbenice</h2>
        <div className="mb-3"><strong>Broj narudžbenice:</strong> {brojNarudzbenice}</div>
        <div className="mb-3"><strong>Datum:</strong> {datum} </div>
        <div className="mb-3"><strong>Zaposleni:</strong> {zaposleni.ime} {zaposleni.prezime} </div>
        <div className="mb-3"><strong>Dobavljač:</strong> {dobavljac.naziv} </div>
        <div className="mb-3"><strong>Ukupna vrednost:</strong> {ukupnaVrednost} </div>

        <h3 style={{marginTop: '10px'}}>Lista stavki narudzbenice</h3>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>RBR</th>
                    <th>Naziv Proizvoda</th>
                    <th>Jedinica Mere</th>
                    <th>Jedinicna Cena</th>
                    <th>Kolicina</th>
                    <th>Popust</th>
                    <th>Rabat</th>
                    <th>Iznos</th>
                    <th className='text-center'>Opcije</th>
                </tr>
            </thead> 
            <tbody>{
                stavke.map((stavka,index)=>(
                    <tr key={index}>
                       
                            <td>{index+1}</td>
                            <td>{stavka.proizvod.naziv}</td>
                            <td>{stavka.proizvod.jedinicaMere}</td>
                            <td>{stavka.proizvod.cena}</td>
                            <td>{stavka.kolicina}</td>
                            <td>{stavka.popust}</td>
                            <td>{stavka.rabat}</td>
                            <td>{stavka.iznos}</td>
                            <td className='text-center'><button className='btn btn-outline-info' onClick={()=>izmeniStavku(stavka.id)}>Izmeni</button>
                                <button className='btn btn-outline-danger' onClick={()=>izbrisiStavku(stavka.id)}
                                    style={{marginLeft:'10px'}}>Obrisi</button>
                            </td>
                       
                        
                    </tr>)
                )
            } 
            </tbody>
        </table>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-success" onClick={handleDodajStavku}>Dodaj stavku</button>
          <button className="btn btn-danger" onClick={handleObrisiNarudzbenicu}>Obrisi narudzbenicu</button>
        </div>

    </div>
  )
}

export default PrikaziNarudzbenicu