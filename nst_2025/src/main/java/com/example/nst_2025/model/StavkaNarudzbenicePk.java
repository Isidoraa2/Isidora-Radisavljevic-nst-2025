package com.example.nst_2025.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class StavkaNarudzbenicePk implements Serializable {

    private static final long serialVersionUID = 1L;
    private Integer brNarudzbenice;
    private Integer rbr;

    public Integer getBrNarudzbenice() {
        return brNarudzbenice;
    }

    public void setBrNarudzbenice(Integer brNarudzbenice) {
        this.brNarudzbenice = brNarudzbenice;
    }

    public Integer getRbr() {
        return rbr;
    }

    public void setRbr(Integer rbr) {
        this.rbr = rbr;
    }
}
