import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProizvod, getProizvodiByNaziv } from '../services/Service';
import '../App.css';

function ProizvodSearchComponent() {
    const [naziv, setNaziv]=useState('');
    const [proizvodi, setProizvodi]=useState([]);
    const [errorMessage, setErrorMessage]=useState('');
    const [vidiSe, setVidiSe]=useState(false);
    const navigate = useNavigate();

    const {kriterijum}=useParams();

    useEffect(() => {
        // Ako postoji parametar kriterijum, odmah izvrši pretragu
        if (kriterijum) {
            setNaziv(kriterijum);
            handleSearch(kriterijum);
            // setProizvodi(getProizvodiByNaziv(kriterijum));
            // console.log(kriterijum);
            // console.log(proizvodi.length);
        }
    }, [kriterijum]);

    const handleInputChange = (e) => {
        setNaziv(e.target.value);
        setErrorMessage(''); // Reset error message when user starts typing
    };

    const handleSearch = async () => {
        try {
            console.log(naziv);
            const response= await getProizvodiByNaziv(naziv);
          if (response.data && response.data.length > 0) {
            console.log(response.data);
            setProizvodi(response.data);
            navigate(`/pretrazi-proizvode/${naziv}`); 
          } else {
            setErrorMessage('Ne postoje proizvodi sa ovim kriterijumom pretrage!');
          }
        } catch (error) {
          setErrorMessage('Greska prilikom pretrage proizvoda!');
        }
      };

    function izmeniProizvod(id){
        navigate(`/izmeni-proizvod/${id}`);
    }
        
    function izbrisiProizvod(id){
        console.log(id);
                //da vidimo da li kupi dobar id
        deleteProizvod(id).then((response)=>{
         setProizvodi(getProizvodiByNaziv(naziv));
        console.log(proizvodi);
        console.log("Smisli nesto kasnije");
    }).catch(error=>{
            console.log(error);
        })
    }

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Unesite naziv proizvoda:"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
          />
            <button className="btn custom-btn ms-2" onClick={handleSearch}>
                Pretraži
            </button>
          {kriterijum && proizvodi.length > 0 && (
                        <table className="table table-striped table-bordered mt-3">
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
                            <tbody>
                                {proizvodi.map((proizvod) => (
                                    <tr key={proizvod.id}>
                                        <td>{proizvod.id}</td>
                                        <td>{proizvod.naziv}</td>
                                        <td>{proizvod.opis}</td>
                                        <td>{proizvod.jedinicaMere}</td>
                                        <td>{proizvod.cena}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => izmeniProizvod(proizvod.id)}
                                            >
                                                Izmeni
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => izbrisiProizvod(proizvod.id)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Obrisi
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
        </div>
        {errorMessage && <div className="alert alert-danger" style={{marginTop:"10px"}}>{errorMessage}</div>}
      </div>
      
    </div>
  </div>
  )
}

export default ProizvodSearchComponent