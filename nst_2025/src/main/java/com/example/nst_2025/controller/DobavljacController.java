package com.example.nst_2025.controller;

import com.example.nst_2025.dto.DobavljacDto;
import com.example.nst_2025.exception.ResourseNotFoundException;
import com.example.nst_2025.service.DobavljacService;
import com.example.nst_2025.dto.DobavljacDto;
import com.example.nst_2025.exception.ResourseNotFoundException;
import com.example.nst_2025.model.Dobavljac;
import com.example.nst_2025.service.DobavljacService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/app/dobavljaci")
public class DobavljacController {

    private DobavljacService dobavljacService;

    @Autowired
    public DobavljacController(DobavljacService dobavljacService) {
        this.dobavljacService = dobavljacService;
    }

    @PostMapping
    public ResponseEntity<DobavljacDto>kreirajDobavljaca(@RequestBody Dobavljac dobavljac) throws Exception {
        DobavljacDto d=dobavljacService.saveDobavljac(dobavljac);
        return new ResponseEntity<>(d, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<DobavljacDto>getByIdDobavljac(@PathVariable(name = "id") Integer id) throws Exception {
        DobavljacDto d=dobavljacService.findDobavljacById(id);
        return new ResponseEntity<>(d, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<DobavljacDto>>getAllDobavljaci() throws Exception {
        System.out.println("Server primio zahtev za vracanje svih dobavljaca");
        List<DobavljacDto>dobavljaci=dobavljacService.findAllDobavljaci();
        return new ResponseEntity<>(dobavljaci, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<DobavljacDto>izmeniDobavljaca(@PathVariable(name = "id")Integer id, @RequestBody Dobavljac dobavljac) throws Exception {
        DobavljacDto d=dobavljacService.updateDobavljaca(id,dobavljac);
        return new ResponseEntity<>(d, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String>izbrisiDobavljacaI(@PathVariable(name = "id") Integer id) throws Exception {
        dobavljacService.deleteDobavljaca(id);
        return ResponseEntity.ok("Dobavljac je uspesno obrisan");
    }

    @GetMapping("/pretraga/{kriterijum}")
    public ResponseEntity<List<DobavljacDto>>findDobavljaciByNazivOrAdresa(@PathVariable String kriterijum) throws Exception {
        return  new ResponseEntity<>(dobavljacService.findDobavljaceByNazivOrAdresa(kriterijum),HttpStatus.OK);
    }

    @ExceptionHandler(value = ResourseNotFoundException.class)
    public ResponseStatusException handleEntityNotFoundException(ResourseNotFoundException ex) {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
    }

}
