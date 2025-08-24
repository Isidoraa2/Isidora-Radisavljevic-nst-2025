import React, { useEffect, useState } from 'react'
import { dodajProizvod, getProizvod, izmeniProizvod } from '../services/Service'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProizvodComponent = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [jedinicaMere, setJedinicaMere] = useState('');
  const [cena, setCena] = useState('');

  const { id } = useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    naziv: '',
    jedinicaMere: '',
    cena: ''
  });

  useEffect(() => {
    if (id) {
      getProizvod(id)
        .then(response => {
          setNaziv(response.data.naziv);
          setOpis(response.data.opis);
          setJedinicaMere(response.data.jedinicaMere);
          setCena(response.data.cena);
        })
        .catch(console.log);
    }
  }, [id]);

  const handleNaziv = e => setNaziv(e.target.value);
  const handleOpis = e => setOpis(e.target.value);
  const handleJedinicaMere = e => setJedinicaMere(e.target.value);
  const handleCena = e => setCena(e.target.value);

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { naziv: '', jedinicaMere: '', cena: '' };

    if (!naziv.trim()) {
      errorsCopy.naziv = 'Unesite naziv proizvoda!';
      valid = false;
    }
    if (!jedinicaMere.trim()) {
      errorsCopy.jedinicaMere = 'Unesite jedinicu mere!';
      valid = false;
    }
    if (cena <= 0) {
      errorsCopy.cena = 'Unesite cenu proizvoda!';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const sacuvajIliIzmeniProizvod = e => {
    e.preventDefault();
    if (!validateForm()) return;

    const proizvod = { naziv, opis, jedinicaMere, cena:Number(cena) };

    if (id) {
      izmeniProizvod(id, proizvod)
        .then(() => navigator('/proizvodi'))
        .catch(console.log);
    } else {
      dodajProizvod(proizvod)
        .then(() => navigator('/proizvodi'))
        .catch(console.log);
    }
  };

  const pageTitle = () => <h2 className="text-center">{id ? 'Izmeni proizvod' : 'Dodaj proizvod'}</h2>;
  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={sacuvajIliIzmeniProizvod}>
              <div className="form-group mb-2">
                <label className="form-label">Naziv proizvoda:</label>
                <input
                  type="text"
                  placeholder="Unesite naziv proizvoda"
                  value={naziv}
                  className={`form-control ${errors.naziv ? 'is-invalid' : ''}`}
                  onChange={handleNaziv}
                />
                {errors.naziv && <div className="invalid-feedback">{errors.naziv}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Opis:</label>
                <input
                  type="text"
                  placeholder="Unesite opis"
                  value={opis}
                  className="form-control"
                  onChange={handleOpis}
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Jedinica mere:</label>
                <input
                  type="text"
                  placeholder="Unesite jedinicu mere"
                  value={jedinicaMere}
                  className={`form-control ${errors.jedinicaMere ? 'is-invalid' : ''}`}
                  onChange={handleJedinicaMere}
                />
                {errors.jedinicaMere && <div className="invalid-feedback">{errors.jedinicaMere}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Cena proizvoda:</label>
                <input
                  type="number"
                  placeholder="Unesite cenu"
                  value={cena}
                  className={`form-control ${errors.cena ? 'is-invalid' : ''}`}
                  onChange={handleCena}
                />
                {errors.cena && <div className="invalid-feedback">{errors.cena}</div>}
              </div>

              <button type="submit" className="btn btn-outline-success me-2">
                {id ? 'Izmeni' : 'Dodaj'}
              </button>
              <Link className="btn btn-outline-danger" to="/proizvodi">
                Otkaži
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProizvodComponent