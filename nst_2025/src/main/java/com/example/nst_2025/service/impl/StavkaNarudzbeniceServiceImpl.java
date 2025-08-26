package com.example.nst_2025.service.impl;

import com.example.nst_2025.dto.ProizvodDto;
import com.example.nst_2025.exception.ResourseNotFoundException;
import com.example.nst_2025.model.Narudzbenica;
import com.example.nst_2025.model.StavkaNarudzbenice;
import com.example.nst_2025.model.StavkaNarudzbenicePk;
import com.example.nst_2025.repository.NarudzbenicaRepository;
import com.example.nst_2025.repository.StavkaNarudzbeniceRepository;
import com.example.nst_2025.service.ProizvodService;
import com.example.nst_2025.service.StavkaNarudzbeniceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class StavkaNarudzbeniceServiceImpl implements StavkaNarudzbeniceService {

    private StavkaNarudzbeniceRepository stavkaNarudzbeniceRepository;
    private NarudzbenicaRepository narudzbenicaService;
    private ProizvodService proizvodService;

    @Autowired
    public StavkaNarudzbeniceServiceImpl(StavkaNarudzbeniceRepository stavkaNarudzbeniceRepository, NarudzbenicaRepository narudzbenicaService, ProizvodService proizvodService) {
        this.stavkaNarudzbeniceRepository = stavkaNarudzbeniceRepository;
        this.narudzbenicaService = narudzbenicaService;
        this.proizvodService = proizvodService;
    }

    //podrazumevano je da su ove metode Override

    public StavkaNarudzbenice saveStavkaNarudzbenice(StavkaNarudzbenice stavka) throws Exception {
        System.out.println("hej");
        //posto se dodaje nova stavka treba da odredim koji rbr ce imati
        //vratimo maksimalni rbr neke stavke narudzbenice za datu narudzbenicu
        Integer brNarudzbenice=stavka.getId().getBrNarudzbenice();
        Integer maxRbr=findMaxRbr(brNarudzbenice);
        System.out.println(maxRbr);
        //da bih napravila novu stavku sa jedinstvenim identifikatorom
        maxRbr++;
        StavkaNarudzbenicePk pk=new StavkaNarudzbenicePk();
        pk.setBrNarudzbenice(brNarudzbenice);
        pk.setRbr(maxRbr);
        stavka.setId(pk);
        double popust=stavka.getPopust();
        double rabat=stavka.getRabat();
        double kolicina=stavka.getKolicina();
        Integer proizvodId=stavka.getProizvod().getId();
        ProizvodDto proizvod=proizvodService.findProizvodById(proizvodId);

        double iznos=proizvod.getCena()*kolicina*(1-popust-rabat);
        stavka.setIznos(iznos);
        System.out.println("Iznos stavke: "+iznos);
        StavkaNarudzbenice sn=stavkaNarudzbeniceRepository.save(stavka);
        System.out.println(sn.getKolicina());
        return sn;
    }

    public StavkaNarudzbenice findByIdStavkaNarudzbenice(StavkaNarudzbenicePk pk){
        StavkaNarudzbenice sn=stavkaNarudzbeniceRepository.findById(pk).orElseThrow(()->new ResourseNotFoundException("Nije pronadjena stavka sa zadatim id-em"));
        return sn;
    }

    public List<StavkaNarudzbenice>findAllStavkaNarudzbenice(){
        List<StavkaNarudzbenice>lista=stavkaNarudzbeniceRepository.findAll();
        return lista;
    }

    public Narudzbenica deleteStavkaNarudzbenice(StavkaNarudzbenicePk pk){
        Optional<Narudzbenica> n=narudzbenicaService.findById(pk.getBrNarudzbenice());
        if(!n.isPresent()){
            new Exception("Nema narudzbenice sa tim id-em");
        }
        StavkaNarudzbenice sn=stavkaNarudzbeniceRepository.findById(pk).orElseThrow(()->new ResourseNotFoundException("Ne postoji stavka narudzbenice sa datim id-em"));
        Narudzbenica narudzbenica=n.get();
        //narudzbenica.setStavke(narudzbenica.getStavke().remove(sn));
        narudzbenica.setUkupnaVrednost(narudzbenica.getUkupnaVrednost()-sn.getIznos());
        stavkaNarudzbeniceRepository.deleteById(pk);
        return narudzbenica;
    }

    public StavkaNarudzbenice updateStavkaNarudzbenice(StavkaNarudzbenicePk pk, StavkaNarudzbenice sn) throws Exception {
        StavkaNarudzbenice stavka=stavkaNarudzbeniceRepository.findById(pk).orElseThrow(()->new ResourseNotFoundException("Ne postoji stavka sa zadatim id-em"));
        stavka.setId(pk);
        stavka.setKolicina(sn.getKolicina());
        stavka.setPopust(sn.getPopust());
        stavka.setRabat(sn.getRabat());
        ProizvodDto p=new ProizvodDto();
        if(sn.getProizvod()!=null){
            stavka.setProizvod(sn.getProizvod());
        }
        Integer proizvodId=stavka.getProizvod().getId();
        p=proizvodService.findProizvodById(proizvodId);
        System.out.println(p.getCena());
        double iznos=p.getCena()*stavka.getKolicina()*(1-stavka.getPopust()-stavka.getRabat());
        stavka.setIznos(iznos);
        //save kreira novi objekat ako on vec ne postoji u bazi ili vrsi update postojeceg objekta u bazi
        return stavkaNarudzbeniceRepository.save(stavka);
    }
    //mogu da napravim posebnu metodu za racunanje iznosa...
    public Integer findMaxRbr(Integer brNarudzbenice){
        //ako ne nadje nijednu stavku te naruzbenice onda vrati 0
        return stavkaNarudzbeniceRepository.findMaxRbr(brNarudzbenice).orElse(0);
    }
}
