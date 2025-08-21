package com.example.nst_2025.repository;

import com.example.nst_2025.model.StavkaNarudzbenice;
import com.example.nst_2025.model.StavkaNarudzbenicePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StavkaNarudzbeniceRepository extends JpaRepository<StavkaNarudzbenice, StavkaNarudzbenicePk> {
    @Query(value = "SELECT MAX(rbr) FROM stavka_narudzbenice WHERE br_narudzbenice=:brNarudzbenice", nativeQuery = true)
    Optional<Integer> findMaxRbr(@Param(value = "brNarudzbenice") Integer brNarudzbenice);


}
