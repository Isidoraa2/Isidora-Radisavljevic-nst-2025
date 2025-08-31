package com.example.nst_2025.dto;

import java.io.Serializable;

public class DobavljacDto implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private String naziv;
    private String adresa;
    private String pib;
    private boolean domaciDobavljac;

    public DobavljacDto() {
    }

    public DobavljacDto(Integer id, String naziv, String adresa, String pib, boolean domaciDobavljac) {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.pib = pib;
        this.domaciDobavljac = domaciDobavljac;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getPib() {
        return pib;
    }

    public void setPib(String pib) {
        this.pib = pib;
    }

    public boolean isDomaciDobavljac() {
        return domaciDobavljac;
    }

    public void setDomaciDobavljac(boolean domaciDobavljac) {
        this.domaciDobavljac = domaciDobavljac;
    }
}
