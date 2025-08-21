package com.example.nst_2025.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dobavljac")
public class Dobavljac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String naziv;
    private String adresa;
    private String pib;
    @Column(name = "domaci_dobavljac")
    private boolean domaciDobavljac;

   @OneToMany(mappedBy = "dobavljac",cascade = CascadeType.ALL,orphanRemoval = true)
   @JsonManagedReference
   @JsonIgnore
   private List<Narudzbenica>narudzbenice=new ArrayList<>();

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

    public boolean isDomaciDobavljac() {
        return domaciDobavljac;
    }

    public void setDomaciDobavljac(boolean domaciDobavljac) {
        this.domaciDobavljac = domaciDobavljac;
    }

    public List<Narudzbenica> getNarudzbenice() {
        return narudzbenice;
    }

    public void setNarudzbenice(List<Narudzbenica> narudzbenice) {
        this.narudzbenice = narudzbenice;
    }

    public String getPib() {
        return pib;
    }

    public void setPib(String pib) {
        this.pib = pib;
    }
}
