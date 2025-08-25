package com.example.nst_2025.service;

import com.example.nst_2025.dto.DobavljacDto;
import com.example.nst_2025.model.Dobavljac;

import java.util.List;

public interface DobavljacService {
    DobavljacDto saveDobavljac(Dobavljac dobavljac) throws Exception;
    DobavljacDto findDobavljacById(Integer id) throws Exception;
    List<DobavljacDto>findAllDobavljaci() throws Exception;
    DobavljacDto updateDobavljaca(Integer id, Dobavljac dobavljac)throws Exception;
    void deleteDobavljaca(Integer id)throws Exception;
    List<DobavljacDto>findDobavljaceByNazivOrAdresa(String kriterijum) throws Exception;
}
