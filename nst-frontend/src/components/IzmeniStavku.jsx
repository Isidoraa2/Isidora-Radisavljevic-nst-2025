import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProizvodi, getStavka, izmeniStavku } from '../services/Service';

const IzmeniStavku = () => {
    const{brNarudzbenice,rbr}=useParams();
    const[stavka,setStavka]=useState(null);
    const [proizvodi,setProizvodi]=useState([]);
    const[selectedProizvod,setSelectedProizvod]=useState(null);
    const[opis,setOpis]=useState('');
    const[cena,setCena]=useState('');
    const[jedinicaMere,setJedinicaMere]=useState('');
    const[kolicina,setKolicina]=useState(0);
    const[popust,setPopust]=useState(0);
    const[rabat,setRabat]=useState(0);
    const[error,setError]=useState('');

    const navigator=useNavigate();

    useEffect(() => {
      // Zameni URL sa tvojim REST API URL-om za proizvode
       console.log(brNarudzbenice, rbr);
      getStavka(brNarudzbenice,rbr)
          .then(response => {
            console.log("podaci stavka");
            console.log(response.data);
            let ucitanaStavka = response.data;
              setStavka(ucitanaStavka);
              console.log(response);
              
              setSelectedProizvod(ucitanaStavka.proizvod);
              setPopust(ucitanaStavka.popust);
              setRabat(ucitanaStavka.rabat);
              setKolicina(ucitanaStavka.kolicina);
              setJedinicaMere(ucitanaStavka.proizvod.jedinicaMere);
              setCena(ucitanaStavka.proizvod.cena);
              setOpis(ucitanaStavka.proizvod.opis);
          })
          .catch(error => {
              console.error('Greška prilikom ucitavanja stavke:', error);
          });
      getProizvodi()
      .then(response => {
        setProizvodi(response.data);
      })
      .catch(error => {
        console.error('Greška prilikom učitavanja proizvoda:', error);
      });
      
    }, []);
    const handleProizvodChange = (e) => {
        const selectedId = e.target.value;
        const selected = proizvodi.find(proizvod => proizvod.id === parseInt(selectedId));
        setSelectedProizvod(selected);
        if (selected) {
          setOpis(selected.opis);
          setJedinicaMere(selected.jedinicaMere);
          setCena(selected.cena);
        } else {
          setOpis('');
          setJedinicaMere('');
          setCena('');
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = [];
        let imaGresaka = false;
        setError('');
        console.log("pokusavam da izmenim stavku");
        console.log(selectedProizvod);
        if (!selectedProizvod) {
          setError('Molimo vas da izaberete proizvod.');
          errors.push('Molimo vas da izaberete proizvod.');
          imaGresaka = true;
          console.log(error);
          console.log("bio sam ovde a i ovde");
        }
    
        if (kolicina <= 0) {
          setError('Količina mora biti veća od 0.');
          errors.push('Količina mora biti veća od 0.');
          imaGresaka = true;
          console.log("bio sam ovde");
          console.log(error);
        }
    
        const stavka = {
          id:{
            brNarudzbenice:brNarudzbenice,
            rbr:rbr
          },
          proizvod: selectedProizvod,
          kolicina: parseFloat(kolicina),
          rabat: parseFloat(rabat),
          popust: parseFloat(popust)
        };
    
        console.log(errors);
        console.log(stavka);
    
        if(!imaGresaka) {
          try {
            await izmeniStavku(brNarudzbenice,rbr,stavka); // Pretpostavimo da imate funkciju za dodavanje stavke u bazu
            console.log('Stavka uspešno dodata:', stavka);
            navigator(`/prikazi-narudzbenicu/${brNarudzbenice}`);
            // Možete preusmeriti korisnika na drugu stranicu ili resetovati formu ovde
          } catch (error) {
            console.error('Greška prilikom dodavanja stavke:', error);
            setError('Došlo je do greške prilikom dodavanja stavke. Molimo pokušajte ponovo.');
          }
        }else {
          setError(errors.join(', '));
        }
    
       
      };
  return (
    <div className="container mt-2 d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center">Izmeni Stavku</h3>
        {error && <p className='text-center text-danger'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-1">
            <label htmlFor="proizvod">Proizvod:</label>
            <select
              id="proizvod"
              className="form-control"
              value={selectedProizvod ? selectedProizvod.id : ''}
              onChange={handleProizvodChange}
            >
              <option value="">Izaberite proizvod</option>
              {proizvodi.map((proizvod) => (
                <option key={proizvod.id} value={proizvod.id}>
                  {proizvod.naziv}
                </option>
              ))}
            </select>
          </div>
          {selectedProizvod && (
            <>
              <div className="form-group mb-1">
                <label htmlFor="opis">Opis:</label>
                <input
                  type="text"
                  id="opis"
                  className="form-control"
                  value={opis}
                  readOnly
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="jedinicaMere">Jedinica Mere:</label>
                <input
                  type="text"
                  id="jedinicaMere"
                  className="form-control"
                  value={jedinicaMere}
                  readOnly
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="cena">Cena:</label>
                <input
                  type="text"
                  id="cena"
                  className="form-control"
                  value={cena}
                  readOnly
                />
              </div>
            </>
          )}
          <div className="form-group mb-1">
            <label htmlFor="kolicina">Količina:</label>
            <input
              type="number"
              id="kolicina"
              className="form-control"
              value={kolicina}
              onChange={(e) => setKolicina(e.target.value)}
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="rabat">Rabat:</label>
            <input
              type="number"
              id="rabat"
              className="form-control"
              value={rabat}
              onChange={(e) => setRabat(e.target.value)}
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="popust">Popust:</label>
            <input
              type="number"
              id="popust"
              className="form-control"
              value={popust}
              onChange={(e) => setPopust(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Izmeni Stavku</button>
            <Link className='btn btn-danger' to={`/prikazi-narudzbenicu/${brNarudzbenice}`}>Odustani</Link>
          </div>
        </form>
      </div>
      </div>
  )
}

export default IzmeniStavku