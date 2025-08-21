package com.example.nst_2025.mapper.impl;

import com.example.nst_2025.dto.ZaposleniDto;
import com.example.nst_2025.mapper.Mapper;
import com.example.nst_2025.model.Zaposleni;
import org.springframework.stereotype.Component;

@Component
public class ZaposleniMapper implements Mapper<ZaposleniDto, Zaposleni> {
    @Override
    public ZaposleniDto toDto(Zaposleni zaposleni) {
        ZaposleniDto dto=new ZaposleniDto();
        dto.setId(zaposleni.getId());
        dto.setIme(zaposleni.getIme());
        dto.setPrezime(zaposleni.getPrezime());
        return dto;
    }

    @Override
    public Zaposleni toEntity(ZaposleniDto zaposleniDto) {
        Zaposleni zaposleni=new Zaposleni();
        zaposleni.setId(zaposleniDto.getId());
        zaposleni.setIme(zaposleniDto.getIme());
        zaposleni.setPrezime(zaposleniDto.getPrezime());
        //vodi racuna da nije setovan username i password
        return zaposleni;
    }
}
