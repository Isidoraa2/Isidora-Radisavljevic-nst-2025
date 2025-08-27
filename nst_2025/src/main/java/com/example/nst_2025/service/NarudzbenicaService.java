package com.example.nst_2025.service;

import com.example.nst_2025.model.Narudzbenica;

import java.util.List;

public interface NarudzbenicaService {
    Narudzbenica saveNarudzbenica(Narudzbenica narudzbenica)throws Exception;
    Narudzbenica findNarudzbenicaById(Integer id) throws Exception;
    List<Narudzbenica>findAllNarudzbenice() throws Exception;
    Integer findMaxId() throws Exception;
    Narudzbenica updateNarudzbenica(Integer id, Narudzbenica narudzbenica)throws Exception;
    void deleteNarudzbenicu(Integer id)throws Exception;
    List<Narudzbenica>searchNarudzbenice(String kriterijum) throws  Exception;
}
