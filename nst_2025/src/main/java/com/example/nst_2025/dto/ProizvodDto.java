package com.example.nst_2025.dto;

import java.io.Serializable;

public class ProizvodDto implements Serializable {
    private Integer id;
    private String naziv;
    private String opis;
    private String jedinicaMere;
    private double cena;

    public ProizvodDto() {
    }

    public ProizvodDto(Integer id, String naziv, String opis, String jedinicaMere, double cena) {
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.jedinicaMere = jedinicaMere;
        this.cena = cena;
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

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getJedinicaMere() {
        return jedinicaMere;
    }

    public void setJedinicaMere(String jedinicaMere) {
        this.jedinicaMere = jedinicaMere;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }
}
