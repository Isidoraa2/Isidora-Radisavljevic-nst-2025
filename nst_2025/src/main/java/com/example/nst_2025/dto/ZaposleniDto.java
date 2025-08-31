package com.example.nst_2025.dto;

import java.io.Serializable;

public class ZaposleniDto implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private String ime;
    private String prezime;

    public ZaposleniDto() {
    }

    public ZaposleniDto(Integer id, String ime, String prezime) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }
}
