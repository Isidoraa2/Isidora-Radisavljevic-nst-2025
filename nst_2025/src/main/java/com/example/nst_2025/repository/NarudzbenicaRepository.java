package com.example.nst_2025.repository;

import com.example.nst_2025.model.Narudzbenica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NarudzbenicaRepository extends JpaRepository<Narudzbenica,Integer> {
    @Query(value = "SELECT MAX(id) FROM narudzbenica", nativeQuery = true)
    Optional<Integer>findMaxId();

    @Query(value = "SELECT n.id as narudzbenica_id " +
            "FROM narudzbenica n " +
            "JOIN zaposleni z ON n.zaposleni_id = z.id " +
            "JOIN dobavljac d ON n.dobavljac_id = d.id " +
            "WHERE z.ime LIKE CONCAT('%', :param, '%') " +
            "OR z.prezime LIKE CONCAT('%', :param, '%') " +
            "OR d.naziv LIKE CONCAT('%', :param, '%')",
            nativeQuery = true)
    List<Integer> findNarudzbeniceSearch(@Param("param") String param);
}
