package com.example.nst_2025.mapper.impl;

import com.example.nst_2025.dto.ProizvodDto;
import com.example.nst_2025.mapper.Mapper;
import com.example.nst_2025.model.Proizvod;
import org.springframework.stereotype.Component;

@Component
public class ProizvodMapper implements Mapper<ProizvodDto, Proizvod> {

    @Override
    public ProizvodDto toDto(Proizvod proizvod) {
        ProizvodDto dto=new ProizvodDto();
        dto.setId(proizvod.getId());
        dto.setNaziv(proizvod.getNaziv());
        dto.setOpis(proizvod.getOpis());
        dto.setJedinicaMere(proizvod.getJedinicaMere());
        dto.setCena(proizvod.getCena());
        return dto;
    }

    @Override
    public Proizvod toEntity(ProizvodDto proizvodDto) {
        Proizvod proizvod=new Proizvod();
        proizvod.setId(proizvodDto.getId());
        proizvod.setNaziv(proizvodDto.getNaziv());
        proizvod.setOpis(proizvodDto.getOpis());
        proizvod.setJedinicaMere(proizvodDto.getJedinicaMere());
        proizvod.setCena(proizvodDto.getCena());
        return proizvod;
    }
}
