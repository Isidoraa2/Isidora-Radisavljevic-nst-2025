package com.example.nst_2025.service.impl;

import com.example.nst_2025.dto.ZaposleniDto;
import com.example.nst_2025.mapper.impl.ZaposleniMapper;
import com.example.nst_2025.model.Zaposleni;
import com.example.nst_2025.repository.ZaposleniRepository;
import com.example.nst_2025.service.ZaposleniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ZaposleniServiceImpl implements ZaposleniService {

    private ZaposleniRepository zaposleniRepository;
    private ZaposleniMapper zaposleniMapper;

    @Autowired
    public ZaposleniServiceImpl(ZaposleniRepository zaposleniRepository, ZaposleniMapper zaposleniMapper) {
        this.zaposleniRepository = zaposleniRepository;
        this.zaposleniMapper = zaposleniMapper;
    }

    @Override
    public ZaposleniDto saveZaposleni(Zaposleni zaposleni) throws Exception {
        return zaposleniMapper.toDto(zaposleniRepository.save(zaposleni));
    }

    @Override
    public ZaposleniDto findByIdZaposleni(Integer id) throws Exception {
        Zaposleni zaposleni=zaposleniRepository.findById(id).orElseThrow();
        return zaposleniMapper.toDto(zaposleni);
    }

    @Override
    public List<ZaposleniDto> findAllZaposleni() throws Exception {
        return zaposleniRepository.findAll().stream().map(zaposleni->zaposleniMapper.toDto(zaposleni)) .collect(Collectors.toList());
    }

    @Override
    public ZaposleniDto updateZaposleni(Integer id, Zaposleni zaposleni) throws Exception {

        Zaposleni zap=zaposleniRepository.findById(id).orElseThrow();
        zap.setIme(zaposleni.getIme());
        zap.setPrezime(zaposleni.getPrezime());
        zap.setUsername(zaposleni.getUsername());
        zap.setPassword(zaposleni.getPassword());
        return zaposleniMapper.toDto(zaposleniRepository.save(zap));
    }

    @Override
    public void deleteZaposleniById(Integer id) throws Exception {
        Zaposleni zap=zaposleniRepository.findById(id).orElseThrow();
        zaposleniRepository.deleteById(id);
    }

    @Override
    public ZaposleniDto login(Zaposleni zaposleni) throws Exception {
        Optional<Zaposleni>z= zaposleniRepository.findByUsernameAndPassword(zaposleni.getUsername(), zaposleni.getPassword());
        if(!z.isPresent()){
            throw new Exception("Ne postoji korisnik sa tim username-om i/ili password-om!");
        }
        return zaposleniMapper.toDto(z.get());
    }
}
