package com.example.nst_2025.repository;

import com.example.nst_2025.model.Zaposleni;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZaposleniRepository extends JpaRepository<Zaposleni,Integer> {

    Optional<Zaposleni> findByUsernameAndPassword(String username, String password);
}
