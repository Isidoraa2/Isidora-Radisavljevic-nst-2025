package com.example.nst_2025.service;

import com.example.nst_2025.model.StavkaNarudzbenice;
import com.example.nst_2025.model.StavkaNarudzbenicePk;

import java.util.List;

public interface StavkaNarudzbeniceService {
    StavkaNarudzbenice saveStavkaNarudzbenice(StavkaNarudzbenice stavkaNarudzbenice)throws Exception;
    List<StavkaNarudzbenice> findAllStavkaNarudzbenice()throws Exception;
    StavkaNarudzbenice findByIdStavkaNarudzbenice(StavkaNarudzbenicePk pk)throws Exception;
    StavkaNarudzbenice updateStavkaNarudzbenice(StavkaNarudzbenicePk pk,StavkaNarudzbenice stavkaNarudzbenice)throws Exception;
    void deleteStavkaNarudzbenice(StavkaNarudzbenicePk pk)throws Exception;
}
