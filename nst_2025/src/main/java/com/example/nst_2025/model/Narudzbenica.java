package com.example.nst_2025.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "narudzbenica")
public class Narudzbenica {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate datum;
    @Column(name = "ukupna_vrednost")
    private double ukupnaVrednost;

    @ManyToOne
    @JoinColumn(name = "zaposleni_id")
   // @JsonBackReference
    private Zaposleni zaposleni;

    @ManyToOne()
    @JoinColumn(name = "dobavljac_id")
  // @JsonBackReference
    private Dobavljac dobavljac;

    @OneToMany(mappedBy = "narudzbenica",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    //@JsonIgnore
    private List<StavkaNarudzbenice>stavke=new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDatum() {
        return datum;
    }

    public void setDatum(LocalDate datum) {
        this.datum = datum;
    }

    public double getUkupnaVrednost() {
        return ukupnaVrednost;
    }

    public void setUkupnaVrednost(double ukupnaVrednost) {
        this.ukupnaVrednost = ukupnaVrednost;
    }

    public Zaposleni getZaposleni() {
        return zaposleni;
    }

    public void setZaposleni(Zaposleni zaposleni) {
        this.zaposleni = zaposleni;
    }

    public Dobavljac getDobavljac() {
        return dobavljac;
    }

    public void setDobavljac(Dobavljac dobavljac) {
        this.dobavljac = dobavljac;
    }

    public List<StavkaNarudzbenice> getStavke() {
        return stavke;
    }

    public void setStavke(List<StavkaNarudzbenice> stavke) {
        this.stavke = stavke;
    }
}
