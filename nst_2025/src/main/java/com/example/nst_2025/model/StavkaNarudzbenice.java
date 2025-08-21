package com.example.nst_2025.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stavka_narudzbenice")
public class StavkaNarudzbenice {
    @EmbeddedId
    private StavkaNarudzbenicePk id;
    @Column(name = "popust")
    private double popust;
    @Column(name = "iznos")
    private double iznos;
    @Column(name = "rabat")
    private  double rabat;
    @Column(name = "kolicina")
    private double kolicina;

    @ManyToOne
    @JoinColumn(name = "proizvod_id")
    //@JsonBackReference
    private Proizvod proizvod;

    @ManyToOne
    @JoinColumn(name = "brNarudzbenice",insertable = false,updatable = false)
    @JsonBackReference
    private Narudzbenica narudzbenica;

    public StavkaNarudzbenicePk getId() {
        return id;
    }

    public void setId(StavkaNarudzbenicePk id) {
        this.id = id;
    }

    public double getPopust() {
        return popust;
    }

    public void setPopust(double popust) {
        this.popust = popust;
    }

    public double getIznos() {
        return iznos;
    }

    public void setIznos(double iznos) {
        this.iznos = iznos;
    }

    public double getRabat() {
        return rabat;
    }

    public void setRabat(double rabat) {
        this.rabat = rabat;
    }

    public Proizvod getProizvod() {
        return proizvod;
    }

    public void setProizvod(Proizvod proizvod) {
        this.proizvod = proizvod;
    }

    public Narudzbenica getNarudzbenica() {
        return narudzbenica;
    }

    public void setNarudzbenica(Narudzbenica narudzbenica) {
        this.narudzbenica = narudzbenica;
    }

    public double getKolicina() {
        return kolicina;
    }

    public void setKolicina(double kolicina) {
        this.kolicina = kolicina;
    }

    @Override
    public String toString() {
        return "StavkaNarudzbenice{" +
                "id=" + id +
                ", popust=" + popust +
                ", iznos=" + iznos +
                ", rabat=" + rabat +
                ", kolicina=" + kolicina +
                ", proizvod=" + proizvod +
                ", narudzbenica=" + narudzbenica +
                '}';
    }
}
