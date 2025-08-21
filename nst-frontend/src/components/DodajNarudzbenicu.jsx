import React, { useEffect, useState } from 'react'
import { getDobavljaci, getMaxIdNarudzbenice, getProizvodi, getZaposleni, sacuvajNarudzbenicu } from '../services/Service';
import { useNavigate } from 'react-router-dom';
import './RelativeFoother.css';

const DodajNarudzbenicu = () => {
    const[datum,setDatum]=useState('');
    const[brNarudzbenice,setBrNarudzbenice]=useState(0);
    const[zaposleni,setZaposleni]=useState([]);
    const[dobavljaci,setDobavljaci]=useState([]);
    const[proizvodi,setProizvodi]=useState([]);
    const [selectedZaposleni, setSelectedZaposleni] = useState(null);
    const [selectedDobavljac, setSelectedDobavljac] = useState(null);
    const [selectedProizvod, setSelectedProizvod] = useState(null);
    const[ukupnaVrednost,setUkupnaVrednost]=useState(0);
    const [kolicina, setKolicina] = useState(0);
    const [popust, setPopust] = useState(0);
    const [rabat, setRabat] = useState(0);
    const[iznos,setIznos]=useState(0);
    const [stavke, setStavke] = useState([]);
    const[stavka,setStavka]=useState(null);
    const [error, setError] = useState('');
    let idNar=0;
    const navigator=useNavigate();
    useEffect(() => {
        // Zameni URL sa tvojim REST API URL-om za proizvode
        setDatum(new Date().toISOString().split('T')[0]);
        getMaxIdNarudzbenice()
            .then(response => {
                console.log(idNar);
                idNar=response.data;
                idNar++;
                console.log(idNar);
                setBrNarudzbenice(idNar);
               // console.log(brNarudzbenice);
            })
            .catch(error => {
                console.error('Greška prilikom ucitavanja proizvoda:', error);
            });
        getZaposleni().then(response => {
            setZaposleni(response.data);
           // console.log(brNarudzbenice);
        })
        .catch(error => {
            console.error('Greška prilikom ucitavanja proizvoda:', error);
        });
        getDobavljaci().then(response => {
            setDobavljaci(response.data);
           // console.log(brNarudzbenice);
        })
        .catch(error => {
            console.error('Greška prilikom ucitavanja proizvoda:', error);
        });
        getProizvodi().then(response => {
            setProizvodi(response.data);
           // console.log(brNarudzbenice);
        })
        .catch(error => {
            console.error('Greška prilikom ucitavanja proizvoda:', error);
        });
      }, []);

       useEffect(() => {
        const total = stavke.reduce((sum, s) => sum + (s.proizvod.cena * s.kolicina), 0);
        setUkupnaVrednost(total);
    }, [stavke]);

     const handleDodajStavku=()=>{
        console.log("Pokusavam da dodam stavku");
        if(kolicina<=0){
            setError("Kolicina mora biti veca od 0");
        }else{
            const proizvod = proizvodi.find(p => p.id === parseInt(selectedProizvod));
            
            const novaStavka = {
                id: {
                    brNarudzbenice: 0,
                    rbr: stavke.length + 1 // Koristimo dužinu niza kao rbr
                },
                proizvod,
                kolicina: parseFloat(kolicina),
                rabat: parseFloat(rabat),
                popust: parseFloat(popust),
                iznos: proizvod.cena*kolicina*(1-popust-rabat)
            };

            setStavke([...stavke, novaStavka]);
            setSelectedProizvod('');
            setKolicina(0);
            setPopust(0);
            setRabat(0);
            setError('');
        }
     }
     const handleObrisiStavku = (index) => {
        const trenutnaStavka=stavke.filter((_, i) => i === index);
        const noveStavke = stavke.filter((_, i) => i !== index);

        setStavke(noveStavke);
        setUkupnaVrednost(ukupnaVrednost-trenutnaStavka.cena+trenutnaStavka.kolicina);
    };
    const handleSacuvajNarudzbenicu =()=>{
        const zap = zaposleni.find(z=> z.id === parseInt(selectedZaposleni));
        const dob = dobavljaci.find(d=> d.id === parseInt(selectedDobavljac));
        const novaNarudzbenica = {
            brojNarudzbenice: 0,
            datum:datum,
            zaposleni:zap,
            dobavljac:dob,
            stavke:stavke
        };
        sacuvajNarudzbenicu(novaNarudzbenica);
        console.log(novaNarudzbenica);
        navigator('/');

    }
  return (
  <div className="d-flex justify-content-center mt-4">
    <div className="w-100" style={{ maxWidth: "900px" }}>
      
      {/* Glavna forma - pola širine */}
      <div className="card p-4 mb-4 shadow-sm rounded">
        <h4>Dodaj Narudžbenicu</h4>
        <p className='text-center text-danger'>{error}</p>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="datum">Datum:</label>
            <input
              type="date"
              id="datum"
              className="form-control"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="zaposleni">Zaposleni:</label>
            <select
              id="zaposleni"
              className="form-control"
              value={selectedZaposleni}
              onChange={e => setSelectedZaposleni(e.target.value)}
            >
              <option value="">Izaberite zaposlenog</option>
              {zaposleni.map(z => (
                <option key={z.id} value={z.id}>{z.ime} {z.prezime}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="dobavljac">Dobavljač:</label>
            <select
              id="dobavljac"
              className="form-control"
              value={selectedDobavljac}
              onChange={e => setSelectedDobavljac(e.target.value)}
            >
              <option value="">Izaberite dobavljača</option>
              {dobavljaci.map(d => (
                <option key={d.id} value={d.id}>{d.naziv}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="ukupnaVrednost">Ukupna vrednost:</label>
            <input
              type="number"
              id="ukupnaVrednost"
              className="form-control"
              value={ukupnaVrednost}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Dodaj Stavku - puna širina, polja jedno ispod drugog */}
      <div className="card p-3 mb-4 shadow-sm rounded">
        <h4>Dodaj Stavku</h4>
        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label htmlFor="proizvod">Proizvod:</label>
          <select
            id="proizvod"
            className="form-control"
            value={selectedProizvod}
            onChange={e => setSelectedProizvod(e.target.value)}
          >
            <option value="">Izaberite proizvod</option>
            {proizvodi.map(p => (
              <option key={p.id} value={p.id}>{p.naziv}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="kolicina">Količina:</label>
          <input
            type="number"
            id="kolicina"
            className="form-control"
            value={kolicina}
            onChange={e => setKolicina(parseFloat(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="popust">Popust:</label>
          <input
            type="number"
            id="popust"
            className="form-control"
            value={popust}
            onChange={e => setPopust(parseFloat(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rabat">Rabat:</label>
          <input
            type="number"
            id="rabat"
            className="form-control"
            value={rabat}
            onChange={e => setRabat(parseFloat(e.target.value))}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleDodajStavku}>
          Dodaj stavku
        </button>
      </div>

      {/* Dodate Stavke i tabela - ostaje isto */}
      <h4 className="mt-2">Dodate Stavke</h4>
      <table className="table">
        <thead>
          <tr>
            <th>RBR</th>
            <th>Naziv Proizvoda</th>
            <th>Jedinica Mere</th>
            <th>Cena</th>
            <th>Kolicina</th>
            <th>Popust</th>
            <th>Rabat</th>
            <th>Iznos</th>
            <th className='text-center'>Opcije</th>
          </tr>
        </thead>
        <tbody>
          {stavke.map((stavka, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{stavka.proizvod.naziv}</td>
              <td>{stavka.proizvod.jedinicaMere}</td>
              <td>{stavka.proizvod.cena}</td>
              <td>{stavka.kolicina}</td>
              <td>{stavka.popust}</td>
              <td>{stavka.rabat}</td>
              <td>{stavka.iznos}</td>
              <td className='text-center'>
                <button className='btn btn-outline-danger'
                        style={{marginLeft:'10px'}} 
                        onClick={() => handleObrisiStavku(index)}>Obrisi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary btn-lg w-100"
          style={{ marginTop: '10px', marginBottom: '50px', fontSize: '16px' }}
          onClick={handleSacuvajNarudzbenicu}
        >
          Sacuvaj narudzbenicu
        </button>
      </div>
    </div>
  </div>
)
}

export default DodajNarudzbenicu