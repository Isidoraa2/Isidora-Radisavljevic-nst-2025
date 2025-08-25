package com.example.nst_2025.repository;

import com.example.nst_2025.model.Proizvod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProizvodRepository extends JpaRepository<Proizvod,Integer> {

    List<Proizvod> findByNazivContainingIgnoreCase(String naziv);
}
