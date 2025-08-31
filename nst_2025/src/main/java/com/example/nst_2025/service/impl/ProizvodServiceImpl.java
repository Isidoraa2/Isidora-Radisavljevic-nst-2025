package com.example.nst_2025.service.impl;

import com.example.nst_2025.dto.ProizvodDto;
import com.example.nst_2025.mapper.impl.ProizvodMapper;
import com.example.nst_2025.model.Proizvod;
import com.example.nst_2025.repository.ProizvodRepository;
import com.example.nst_2025.service.ProizvodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProizvodServiceImpl implements ProizvodService {

    private ProizvodRepository proizvodRepository;
    private ProizvodMapper proizvodMapper;

    @Autowired
    public ProizvodServiceImpl(ProizvodRepository proizvodRepository, ProizvodMapper proizvodMapper) {
        this.proizvodRepository = proizvodRepository;
        this.proizvodMapper = proizvodMapper;
    }

    @Override
    public ProizvodDto saveProizvod(Proizvod proizvod) throws Exception {
        return proizvodMapper.toDto(proizvodRepository.save(proizvod));
    }

    @Override
    public ProizvodDto findProizvodById(Integer id) throws Exception{
        Optional<Proizvod>proizvod=proizvodRepository.findById(id);
        if(!proizvod.isPresent()){
            throw new Exception("Ne postoji proizvod sa prosledjenim id-em");
        }
        return proizvodMapper.toDto(proizvod.get());
    }

    @Override
    public List<ProizvodDto> findAllProizvodi() throws Exception{
        return proizvodRepository.findAll().stream().map(proizvod ->proizvodMapper.toDto(proizvod)) .collect(Collectors.toList());
    }

   // @Transactional
    @Override
    public ProizvodDto updateProizvod(Integer id, Proizvod proizvod) throws Exception{
        Proizvod proizvod1=proizvodRepository.findById(id).orElseThrow(() -> new Exception("Ne postoji proizvod sa zadatim id-em!"));
        proizvod1.setNaziv(proizvod.getNaziv());
        proizvod1.setOpis(proizvod.getOpis());
        proizvod1.setJedinicaMere(proizvod.getJedinicaMere());
        proizvod1.setCena(proizvod.getCena());
        System.out.println("Prosledjeni id je: "+id);
        proizvodRepository.save(proizvod1);
        return proizvodMapper.toDto(proizvod1);
    }

    @Override
    public void deleteProizvod(Integer id) throws Exception{
        Optional<Proizvod>proizvod=proizvodRepository.findById(id);
        if(!proizvod.isPresent()){
            throw new Exception("Ne postoji proizvod sa zadatim id-em!");
        }
        proizvodRepository.deleteById(id);
    }

    @Override
    public List<ProizvodDto> findProizvodiByNaziv(String naziv) throws Exception {
        List<Proizvod> listaProizvoda=proizvodRepository.findByNazivContainingIgnoreCase(naziv);
        return listaProizvoda.stream().map(proizvod ->proizvodMapper.toDto(proizvod)) .collect(Collectors.toList());
    }
}
