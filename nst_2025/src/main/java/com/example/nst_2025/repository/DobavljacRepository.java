package com.example.nst_2025.repository;

import com.example.nst_2025.model.Dobavljac;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DobavljacRepository extends JpaRepository<Dobavljac,Integer> {
    List<Dobavljac>findByNazivContainingIgnoreCaseOrAdresaContainingIgnoreCase(String naziv, String adresa);
}
