package com.example.nst_2025.mapper.impl;

import com.example.nst_2025.dto.DobavljacDto;
import com.example.nst_2025.mapper.Mapper;
import com.example.nst_2025.model.Dobavljac;
import org.springframework.stereotype.Component;

@Component
public class DobavljacMapper implements Mapper<DobavljacDto, Dobavljac> {
    @Override
    public DobavljacDto toDto(Dobavljac dobavljac) {
        DobavljacDto dto=new DobavljacDto();
        dto.setId(dobavljac.getId());
        dto.setNaziv(dobavljac.getNaziv());
        dto.setAdresa(dobavljac.getAdresa());
        dto.setPib(dobavljac.getPib());
        dto.setDomaciDobavljac(dobavljac.isDomaciDobavljac());
        return dto;
    }

    @Override
    public Dobavljac toEntity(DobavljacDto dobavljacDto) {
        Dobavljac dobavljac=new Dobavljac();
        dobavljac.setId(dobavljacDto.getId());
        dobavljac.setNaziv(dobavljacDto.getNaziv());
        dobavljac.setAdresa(dobavljacDto.getAdresa());
        dobavljac.setPib(dobavljacDto.getPib());
        dobavljac.setDomaciDobavljac(dobavljacDto.isDomaciDobavljac());
        return dobavljac;
    }
}
