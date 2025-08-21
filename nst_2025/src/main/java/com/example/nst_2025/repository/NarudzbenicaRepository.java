package com.example.nst_2025.repository;

import com.example.nst_2025.model.Narudzbenica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NarudzbenicaRepository extends JpaRepository<Narudzbenica,Integer> {
    @Query(value = "SELECT MAX(id) FROM narudzbenica", nativeQuery = true)
    Optional<Integer>findMaxId();
}
