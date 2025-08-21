package com.example.nst_2025.service.impl;

import com.example.nst_2025.dto.DobavljacDto;
import com.example.nst_2025.mapper.impl.DobavljacMapper;
import com.example.nst_2025.model.Dobavljac;
import com.example.nst_2025.repository.DobavljacRepository;
import com.example.nst_2025.service.DobavljacService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DobavljacServiceImpl implements DobavljacService {

    private DobavljacRepository dobavljacRepository;
    private DobavljacMapper dobavljacMapper;

    @Autowired
    public DobavljacServiceImpl(DobavljacRepository dobavljacRepository, DobavljacMapper dobavljacMapper) {
        this.dobavljacRepository = dobavljacRepository;
        this.dobavljacMapper = dobavljacMapper;
    }

    @Override
    public DobavljacDto saveDobavljac(Dobavljac dobavljac) throws Exception{
        return dobavljacMapper.toDto(dobavljacRepository.save(dobavljac));
    }

    @Override
    public DobavljacDto findDobavljacById(Integer id) throws Exception {
        Optional<Dobavljac>dobavljac=dobavljacRepository.findById(id);
        if(!dobavljac.isPresent()){
            throw new Exception("Ne postoji dobavljac sa zadatim id-em!");
        }
        return dobavljacMapper.toDto(dobavljac.get());
    }

    @Override
    public List<DobavljacDto> findAllDobavljaci() throws Exception {
        return dobavljacRepository.findAll().stream().map(dobavljac ->dobavljacMapper.toDto(dobavljac)) .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public DobavljacDto updateDobavljaca(Integer id, Dobavljac dobavljac) throws Exception{
        Dobavljac dobavljac1=dobavljacRepository.findById(id).orElseThrow(()->new Exception("Ne postoji dobavljac sa ovim id-em"));
        //dobavljac1.setId(id);
        dobavljac1.setNaziv(dobavljac.getNaziv());
        dobavljac1.setAdresa(dobavljac.getAdresa());
        dobavljac1.setPib(dobavljac.getPib());
        dobavljac1.setDomaciDobavljac(dobavljac.isDomaciDobavljac());
        return dobavljacMapper.toDto(dobavljac1);
    }

    @Override
    public void deleteDobavljaca(Integer id)throws Exception{
        Optional<Dobavljac>dobavljac=dobavljacRepository.findById(id);
        if(!dobavljac.isPresent()){
            throw new Exception("Ne postoji dobavljac sa zadatim id-em!");
        }
        System.out.println("Stigao sam ovde");
        dobavljacRepository.deleteById(id);
    }
}
