package com.example.nst_2025.controller;

import com.example.nst_2025.dto.ZaposleniDto;
import com.example.nst_2025.exception.ResourseNotFoundException;
import com.example.nst_2025.model.Zaposleni;
import com.example.nst_2025.service.ZaposleniService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/app/zaposleni")
public class ZaposleniController {

    private ZaposleniService zaposleniService;

    @Autowired
    public ZaposleniController(ZaposleniService zaposleniService) {
        this.zaposleniService = zaposleniService;
    }

    @PostMapping("/login")
    public ResponseEntity<ZaposleniDto>login(@RequestBody Zaposleni zaposleni) throws Exception {
        System.out.println("Zahtev za login je stigao na server!");
        return new ResponseEntity<>(zaposleniService.login(zaposleni),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ZaposleniDto>>getAllZaposleni() throws Exception {
        List<ZaposleniDto>lista=zaposleniService.findAllZaposleni();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ZaposleniDto>getByIdZaposleni(@PathVariable(name = "id") Integer id) throws Exception {
        ZaposleniDto zap=zaposleniService.findByIdZaposleni(id);
        return new ResponseEntity<>(zap,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ZaposleniDto>saveZaposlen(@RequestBody Zaposleni zaposleni) throws Exception {
        return new ResponseEntity<>(zaposleniService.saveZaposleni(zaposleni), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<ZaposleniDto>updateZaposleni(@PathVariable Integer id, @RequestBody Zaposleni zaposleni) throws Exception {
        return new ResponseEntity<>(zaposleniService.updateZaposleni(id,zaposleni),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteByIdZaposleni(@PathVariable Integer id) throws Exception {
        zaposleniService.deleteZaposleniById(id);
        return new ResponseEntity<>("Zaposleni je uspesno obrisan", HttpStatus.OK);
    }

    @ExceptionHandler(value = ResourseNotFoundException.class)
    public ResponseStatusException handleEntityNotFoundException(ResourseNotFoundException ex) {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
    }
}
