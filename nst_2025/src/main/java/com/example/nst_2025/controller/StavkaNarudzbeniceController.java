package com.example.nst_2025.controller;

import com.example.nst_2025.model.Narudzbenica;
import com.example.nst_2025.model.StavkaNarudzbenice;
import com.example.nst_2025.model.StavkaNarudzbenicePk;
import com.example.nst_2025.service.NarudzbenicaService;
import com.example.nst_2025.service.StavkaNarudzbeniceService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/app/stavkeNarudzbenice")
public class StavkaNarudzbeniceController {

    private StavkaNarudzbeniceService stavkaNarudzbeniceService;
    private NarudzbenicaService narudzbenicaService;

    @Autowired
    public StavkaNarudzbeniceController(StavkaNarudzbeniceService stavkaNarudzbeniceService, NarudzbenicaService narudzbenicaService) {
        this.stavkaNarudzbeniceService = stavkaNarudzbeniceService;
        this.narudzbenicaService = narudzbenicaService;
    }

    @GetMapping
    public ResponseEntity<List<StavkaNarudzbenice>>findAllStavke() throws Exception {
        List<StavkaNarudzbenice>lista= (List<StavkaNarudzbenice>) stavkaNarudzbeniceService.findAllStavkaNarudzbenice();
        return new ResponseEntity<>(lista,HttpStatus.OK);
    }

    @GetMapping("/{brNarudzbenice}/{rbr}")
    public ResponseEntity<StavkaNarudzbenice>findById(@PathVariable(name = "brNarudzbenice")Integer brNarudzbenice,@PathVariable(name = "rbr")Integer rbr) throws Exception {
        System.out.println("trazim stavku");
        StavkaNarudzbenicePk pk=new StavkaNarudzbenicePk();
        pk.setBrNarudzbenice(brNarudzbenice);
        pk.setRbr(rbr);
        StavkaNarudzbenice sn=stavkaNarudzbeniceService.findByIdStavkaNarudzbenice(pk);
        System.out.println("nasao sam stavku");
        return new ResponseEntity<>(sn,HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    public ResponseEntity<StavkaNarudzbenice>saveStavku(@RequestBody StavkaNarudzbenice sn) throws Exception {

        StavkaNarudzbenice stavkaNarudzbenice=stavkaNarudzbeniceService.saveStavkaNarudzbenice(sn);
        Narudzbenica narudzbenica = narudzbenicaService.findNarudzbenicaById(
                sn.getId().getBrNarudzbenice());
        narudzbenica.getStavke().add(stavkaNarudzbenice);
        double novaUkupnaVrednost = narudzbenica.getStavke().stream()
                .mapToDouble(stavka -> stavka.getIznos()).sum();
        narudzbenica.setUkupnaVrednost(novaUkupnaVrednost);
        return new ResponseEntity<>(stavkaNarudzbenice, HttpStatus.CREATED);
    }

    @Transactional
    @DeleteMapping("/{brNarudzbenice}/{rbr}")
    public ResponseEntity<Narudzbenica>deleteStavku(@PathVariable(name = "brNarudzbenice")Integer brNarudzbenice,@PathVariable(name = "rbr")Integer rbr) throws Exception {
       StavkaNarudzbenicePk pk=new StavkaNarudzbenicePk();
       pk.setBrNarudzbenice(brNarudzbenice);
       pk.setRbr(rbr);

        Narudzbenica narudzbenica=stavkaNarudzbeniceService.deleteStavkaNarudzbenice(pk);
        System.out.println(narudzbenica.toString());
        return new ResponseEntity<>(narudzbenica,HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/{brNarudzbenice}/{rbr}")
    public ResponseEntity<StavkaNarudzbenice>updateStavku(@PathVariable(name = "brNarudzbenice")Integer brNarudzbenice,@PathVariable(name = "rbr")Integer rbr,@RequestBody StavkaNarudzbenice sn) throws Exception {
        StavkaNarudzbenicePk pk=new StavkaNarudzbenicePk();
        pk.setBrNarudzbenice(brNarudzbenice);
        pk.setRbr(rbr);
        StavkaNarudzbenice stavkaNarudzbenice=stavkaNarudzbeniceService.updateStavkaNarudzbenice(pk,sn);
        Narudzbenica narudzbenica=narudzbenicaService.findNarudzbenicaById(stavkaNarudzbenice.getId().getBrNarudzbenice());
        System.out.println("Broj stavki narudzbenice: "+narudzbenica.getStavke().size());
        narudzbenicaService.updateNarudzbenica(stavkaNarudzbenice.getId().getBrNarudzbenice(), narudzbenica);
        return ResponseEntity.ok(stavkaNarudzbenice);
    }


}
