package com.example.nst_2025.controller;

import com.example.nst_2025.dto.ProizvodDto;
import com.example.nst_2025.exception.ResourseNotFoundException;
import com.example.nst_2025.model.Proizvod;
import com.example.nst_2025.service.ProizvodService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/app/proizvodi")
public class ProizvodController {

    private ProizvodService proizvodService;

    @Autowired
    public ProizvodController(ProizvodService proizvodService) {
        this.proizvodService = proizvodService;
    }

    @GetMapping("{id}")
    public ResponseEntity<ProizvodDto>getProizvodById(@PathVariable(name = "id")Integer id) throws Exception {
        return new ResponseEntity<>(proizvodService.findProizvodById(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProizvodDto>>getAllProizvodi() throws Exception{
        List<ProizvodDto>lista=proizvodService.findAllProizvodi();
        return new ResponseEntity<>(proizvodService.findAllProizvodi(),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProizvodDto>saveProizvod(@RequestBody Proizvod proizvod) throws Exception{
        return new ResponseEntity<>(proizvodService.saveProizvod(proizvod), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProizvodDto>updateProizvod(@PathVariable Integer id, @RequestBody Proizvod proizvod) throws Exception{
        return new ResponseEntity<>(proizvodService.updateProizvod(id,proizvod), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteProizvod(@PathVariable Integer id) throws Exception{
        proizvodService.deleteProizvod(id);
        return ResponseEntity.ok("Proizvod je uspesno obrisan");
    }

    @GetMapping("/pretraga/{naziv}")
    public ResponseEntity<List<ProizvodDto>> findProizvodByNaziv(@PathVariable String naziv) throws Exception {
        return new ResponseEntity(proizvodService.findProizvodiByNaziv(naziv), HttpStatus.OK);
    }

    @ExceptionHandler(value = ResourseNotFoundException.class)
    public ResponseStatusException handleEntityNotFoundException(ResourseNotFoundException ex) {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
    }

}
