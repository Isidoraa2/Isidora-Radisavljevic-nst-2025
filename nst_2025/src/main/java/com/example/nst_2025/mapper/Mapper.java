package com.example.nst_2025.mapper;

import org.springframework.stereotype.Component;

@Component
public interface Mapper<Dto,Entity>{
    Dto toDto(Entity entity);
    Entity toEntity(Dto dto);
}
