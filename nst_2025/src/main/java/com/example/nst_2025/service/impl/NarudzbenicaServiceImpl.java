package com.example.nst_2025.service.impl;

import com.example.nst_2025.exception.ResourseNotFoundException;
import com.example.nst_2025.model.Narudzbenica;
import com.example.nst_2025.model.Proizvod;
import com.example.nst_2025.model.StavkaNarudzbenice;
import com.example.nst_2025.model.StavkaNarudzbenicePk;
import com.example.nst_2025.repository.NarudzbenicaRepository;
import com.example.nst_2025.repository.ProizvodRepository;
import com.example.nst_2025.repository.StavkaNarudzbeniceRepository;
import com.example.nst_2025.service.NarudzbenicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NarudzbenicaServiceImpl implements NarudzbenicaService {

    private NarudzbenicaRepository narudzbenicaRepository;
    private StavkaNarudzbeniceRepository stavkaNarudzbeniceRepository;
    private ProizvodRepository proizvodRepository;

    @Autowired
    public NarudzbenicaServiceImpl(NarudzbenicaRepository narudzbenicaRepository, StavkaNarudzbeniceRepository stavkaNarudzbeniceRepository, ProizvodRepository proizvodRepository) {
        this.narudzbenicaRepository = narudzbenicaRepository;
        this.stavkaNarudzbeniceRepository = stavkaNarudzbeniceRepository;
        this.proizvodRepository = proizvodRepository;
    }

    @Override
    public Narudzbenica saveNarudzbenica(Narudzbenica narudzbenica) {
        //dobila sam narudzbenicu koja ce imati id 0, sto je znak da treba da kreiram novu narudzbenicu
        //e sada napravicu upit da bih videla koji je najveci id narudzbenic
        Integer maxId=findMaxId();
        System.out.println("Najveci ID: "+maxId);
        maxId++;

        narudzbenica.setId(maxId);
        //narudzbenica.setDatum(LocalDate.now());
        //stavkama naruzbenice treba da dodelim id-eve

        List<StavkaNarudzbenice>listaStavki=narudzbenica.getStavke();
        int brojStavki=listaStavki.size();
        int brojac=0;
        List<StavkaNarudzbenice>novaLista=new ArrayList<>();

        //svakoj stavki treba da odredim i iznos
        for(int i=0;i<brojStavki;i++){
            brojac++;
            StavkaNarudzbenice sn=new StavkaNarudzbenice();
            sn=listaStavki.get(i);
            StavkaNarudzbenicePk pk=new StavkaNarudzbenicePk();
            pk.setBrNarudzbenice(maxId);
            pk.setRbr(brojac);
            sn.setId(pk);
            Integer proizvodId=sn.getProizvod().getId();
            double kolicina=sn.getKolicina();
            double popust=sn.getPopust();
            double rabat=sn.getRabat();
            Optional<Proizvod> p=proizvodRepository.findById(proizvodId);
            System.out.println(p.get().getCena());
            double iznos=p.get().getCena()*kolicina*(1-popust-rabat);
            sn.setIznos(iznos);
            novaLista.add(sn);
        }
        narudzbenica.setStavke(novaLista);
        narudzbenica.setUkupnaVrednost(izracunajUkupnuVrednostNarudzbenice(narudzbenica));
        return narudzbenicaRepository.save(narudzbenica);
    }

    @Override
    public Narudzbenica findNarudzbenicaById(Integer id) {
        return narudzbenicaRepository.findById(id).orElseThrow(()->new ResourseNotFoundException("Ne postoji narudzbenica sa brojem: "+id));
    }

    @Override
    public List<Narudzbenica> findAllNarudzbenice() {
        return narudzbenicaRepository.findAll();
    }

    @Override
    public Integer findMaxId() {
        Optional<Integer> maxId=narudzbenicaRepository.findMaxId();
        return maxId.orElse(0); //ako nema narudzbenica u bazi vraca 0
    }

    @Override
    public Narudzbenica updateNarudzbenica(Integer id, Narudzbenica narudzbenica) throws Exception {
        Narudzbenica n=narudzbenicaRepository.findById(id).orElseThrow();
        n.setDatum(narudzbenica.getDatum());
        //azuriranje ukupneVrednosti narudzbenice
        n.setUkupnaVrednost(izracunajUkupnuVrednostNarudzbenice(narudzbenica));
        n.setDatum(narudzbenica.getDatum());
        n.setZaposleni(narudzbenica.getZaposleni());
        n.setDobavljac(narudzbenica.getDobavljac());
        return n;
    }

    @Override
    public void deleteNarudzbenicu(Integer id) {
        Narudzbenica narudzbenica=narudzbenicaRepository.findById(id).orElseThrow(()->new ResourseNotFoundException(("Ne postoji narudzbenica sa id: "+id)));
        narudzbenicaRepository.deleteById(id);
    }

    @Override
    public List<Narudzbenica> searchNarudzbenice(String kriterijum) throws Exception {
        List<Integer>listaID=narudzbenicaRepository.findNarudzbeniceSearch(kriterijum);
        List<Narudzbenica>listaNarudzbenica=new ArrayList<>();
        for(Integer id:listaID){
            Optional<Narudzbenica> n=narudzbenicaRepository.findById(id);
            listaNarudzbenica.add(n.get());
        }
        return listaNarudzbenica;
    }


    //pomocna metoda
    public double izracunajUkupnuVrednostNarudzbenice(Narudzbenica narudzbenica){
        double sum=0;
        List<StavkaNarudzbenice>listaStavki=new ArrayList<>();
        listaStavki=narudzbenica.getStavke();
        if(listaStavki.isEmpty()){
            return 0;
        }
        for(StavkaNarudzbenice stavka:listaStavki){
            sum=sum+stavka.getIznos();
        }
        return sum;
    }
}
