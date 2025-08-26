import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/app';

export const listaDobavljaca=()=>{
    return axios.get(REST_API_BASE_URL+'/dobavljaci');
} 
export const dodajProizvod=(proizvod)=>axios.post(REST_API_BASE_URL+'/proizvodi',proizvod);
export const izmeniProizvod=(proizvodId, proizvod)=>axios.put(REST_API_BASE_URL+'/proizvodi/'+proizvodId, proizvod);
export const getProizvodi=()=>axios.get(REST_API_BASE_URL+'/proizvodi');
export const getProizvod=(proizvodId)=>axios.get(REST_API_BASE_URL+'/proizvodi/'+proizvodId);
export const getProizvodiByNaziv=(naziv)=>axios.get(REST_API_BASE_URL+'/proizvodi/pretraga/'+naziv);
export const deleteProizvod=(proizvodId)=>axios.delete(REST_API_BASE_URL+'/proizvodi/'+proizvodId);
export const dodajDobavljaca=(dobavljac)=>axios.post(REST_API_BASE_URL+'/dobavljaci',dobavljac);
export const getDobavljaca=(dobavljacId)=>axios.get(REST_API_BASE_URL+'/dobavljaci/'+dobavljacId);
export const izmeniDobavljaca=(dobavljacId,dobavljac)=>axios.put(REST_API_BASE_URL+'/dobavljaci/'+dobavljacId,dobavljac);
export const obrisiDobavljaca=(dobavljacId)=>axios.delete(REST_API_BASE_URL+'/dobavljaci/'+dobavljacId);
export const getDobavljaci=()=>axios.get(REST_API_BASE_URL+'/dobavljaci');
export const getDobavljaciByNazivOrAdresa=(kriterijum)=>axios.get(REST_API_BASE_URL+'/dobavljaci/pretraga/'+kriterijum);

export const getNarudzbenicu=(narudzbenicaId)=>axios.get(REST_API_BASE_URL+'/narudzbenice/'+narudzbenicaId);
export const deleteStavka=(brNarudzbenice,rbr)=>axios.delete(REST_API_BASE_URL+'/stavkeNarudzbenice/'+brNarudzbenice+'/'+rbr);
export const dodajStavku=(stavka)=>axios.post(REST_API_BASE_URL+'/stavkeNarudzbenice',stavka);

export const izmeniStavku=(brNarudzbenice,rbr,stavka)=>axios.put(REST_API_BASE_URL+'/stavkeNarudzbenice/'+brNarudzbenice+'/'+rbr,stavka);
export const getStavka=(brNarudzbenice,rbr)=>axios.get(REST_API_BASE_URL+'/stavkeNarudzbenice/'+brNarudzbenice+'/'+rbr);
export const getMaxIdNarudzbenice=()=>axios.get(REST_API_BASE_URL+'/narudzbenice/maxId');
export const getZaposleni=()=>axios.get(REST_API_BASE_URL+'/zaposleni');
export const sacuvajNarudzbenicu=(narudzbenica)=>axios.post(REST_API_BASE_URL+'/narudzbenice',narudzbenica);
export const obrisiNarudzbenicu=(id)=>axios.delete(REST_API_BASE_URL+'/narudzbenice/'+id);


