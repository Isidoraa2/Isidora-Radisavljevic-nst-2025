package com.example.nst_2025.controller;

import com.example.nst_2025.model.Narudzbenica;
import com.example.nst_2025.service.impl.NarudzbenicaServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/app/narudzbenice")
public class NarudzbenicaController {
    private NarudzbenicaServiceImpl narudzbenicaService;

    @Autowired
    public NarudzbenicaController(NarudzbenicaServiceImpl narudzbenicaService) {
        this.narudzbenicaService = narudzbenicaService;
    }

    @PostMapping
    public ResponseEntity<Narudzbenica>kreirajNarudzbenicu(@RequestBody Narudzbenica narudzbenica) throws Exception {
        Narudzbenica n= narudzbenicaService.saveNarudzbenica(narudzbenica);
        return new ResponseEntity<>(n, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Narudzbenica>getByIdNarudzbenica(@PathVariable(name = "id")Integer id) throws Exception {
        Narudzbenica n=narudzbenicaService.findNarudzbenicaById(id);
        return new ResponseEntity(n, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Narudzbenica>>getAllNarudzbenice() throws Exception {
        List<Narudzbenica>lista=narudzbenicaService.findAllNarudzbenice();
        return new ResponseEntity<>(lista,HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Narudzbenica>updateNarudzbenica(@PathVariable Integer id, @RequestBody Narudzbenica narudzbenica) throws Exception {
        return new ResponseEntity<>(narudzbenicaService.updateNarudzbenica(id, narudzbenica),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteNarudzbenica(@PathVariable(name = "id")Integer id) throws Exception {
        narudzbenicaService.deleteNarudzbenicu(id);
        return ResponseEntity.ok("Narudzbenica je uspesno obrisana");
    }

    @GetMapping("/maxId")
    public ResponseEntity<Integer>findMaxId() throws Exception {
       Integer maxId= narudzbenicaService.findMaxId();
       return ResponseEntity.ok(maxId);
    }

}
