package com.example.nst_2025.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourseNotFoundException extends RuntimeException {
    public ResourseNotFoundException(String poruka){
        super(poruka);
    }
}
