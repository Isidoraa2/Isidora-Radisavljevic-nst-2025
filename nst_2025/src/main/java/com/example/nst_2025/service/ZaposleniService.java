package com.example.nst_2025.service;

import com.example.nst_2025.dto.ZaposleniDto;
import com.example.nst_2025.model.Zaposleni;

import java.util.List;

public interface ZaposleniService {
    ZaposleniDto saveZaposleni(Zaposleni zaposleni) throws Exception;
    ZaposleniDto findByIdZaposleni(Integer id) throws Exception;
    List<ZaposleniDto>findAllZaposleni() throws Exception;
    ZaposleniDto updateZaposleni(Integer id, Zaposleni zaposleni)throws Exception;
    void deleteZaposleniById(Integer id)throws Exception;
    ZaposleniDto login(Zaposleni zaposleni) throws Exception;
}
