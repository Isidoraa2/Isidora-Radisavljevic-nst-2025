import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDobavljaciByNazivOrAdresa, obrisiDobavljaca } from '../services/Service';

function DobavljacSearchComponent() {
    const [kriterijum, setKriterijum]=useState('');
        const [dobavljaci, setdobavljaci]=useState([]);
        const [errorMessage, setErrorMessage]=useState('');
        const navigate = useNavigate();
    
        const {urlParametar}=useParams();
    
        useEffect(() => {
            // Ako postoji parametar urlParametar, odmah izvrši pretragu
            if (urlParametar) {
                setKriterijum(urlParametar);
                handleSearch(urlParametar);
                // setdobavljaci(getdobavljaciByNaziv(urlParametar));
                // console.log(urlParametar);
                // console.log(dobavljaci.length);
            }
        }, [urlParametar]);
    
        const handleInputChange = (e) => {
            setKriterijum(e.target.value);
            setErrorMessage(''); // Reset error message when user starts typing
        };
    
        const handleSearch = async () => {
            try {
                console.log(kriterijum);
                const response= await getDobavljaciByNazivOrAdresa(kriterijum);
              if (response.data && response.data.length > 0) {
                console.log(response.data);
                setdobavljaci(response.data);
                navigate(`/pretrazi-dobavljace/${kriterijum}`); 
              } else {
                setErrorMessage('Ne postoje dobavljaci sa ovim kriterijumom za pretragu!');
              }
            } catch (error) {
              setErrorMessage('Greska prilikom pretrage dobavljaca!');
            }
          };
    
        function izmeniDobavljaca(id){
            navigate(`/izmeni-dobavljaca/${id}`);
        }
        function izbrisiDobavljaca(id){
                console.log(id);
                //da vidimo da li kupi dobar id
                obrisiDobavljaca(id).then((response)=>{
                    setdobavljaci(getDobavljaciByNazivOrAdresa(kriterijum));
                    console.log(kriterijum);
                    console.log(dobavljaci);
                }).catch(error=>{
                    console.log(error);
                })
            }
        return( 
            <div className="container mt-4">
                <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite kriterijum za pretragu dobavljaca:"
                        value={kriterijum}
                        onChange={(e) => setKriterijum(e.target.value)}
                    />
                        <button className="btn custom-btn ms-2" onClick={handleSearch}>
                            Pretraži
                        </button>
                    {urlParametar && dobavljaci.length > 0 && (
                                <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Naziv dobavljača</th>
                                <th>Adresa</th>
                                <th>Tip dobavljača</th>
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
                                    </td>
                                </tr>)
                            )
                                
                            
                        } 
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
  



export default DobavljacSearchComponent