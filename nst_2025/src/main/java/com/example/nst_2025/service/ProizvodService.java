package com.example.nst_2025.service;

import com.example.nst_2025.dto.ProizvodDto;
import com.example.nst_2025.model.Proizvod;

import java.util.List;

public interface ProizvodService {
    ProizvodDto saveProizvod(Proizvod proizvod) throws Exception;
    ProizvodDto findProizvodById(Integer id) throws Exception;
    List<ProizvodDto> findAllProizvodi() throws Exception;
    ProizvodDto updateProizvod(Integer id, Proizvod proizvod) throws Exception;
    void deleteProizvod(Integer id) throws Exception;
    List<ProizvodDto>findProizvodiByNaziv(String naziv) throws Exception;

}
