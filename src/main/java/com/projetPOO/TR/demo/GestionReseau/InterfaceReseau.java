package com.projetPOO.TR.demo.GestionReseau;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "interfaces_reseau")
public class InterfaceReseau {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    private String adresseIp;
    private String adresseMac;
    private String masqueReseau;
    private String vlan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipement_id", nullable = false)
    private Equipement equipement;

    // Constructeurs
    public InterfaceReseau() {
    }

    public InterfaceReseau(String nom, String adresseIp, String adresseMac, String masqueReseau, String vlan, Equipement equipement) {
        this.nom = nom;
        this.adresseIp = adresseIp;
        this.adresseMac = adresseMac;
        this.masqueReseau = masqueReseau;
        this.vlan = vlan;
        this.equipement = equipement;
    }

    // Getters et setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresseIp() {
        return adresseIp;
    }

    public void setAdresseIp(String adresseIp) {
        this.adresseIp = adresseIp;
    }

    public String getAdresseMac() {
        return adresseMac;
    }

    public void setAdresseMac(String adresseMac) {
        this.adresseMac = adresseMac;
    }

    public String getMasqueReseau() {
        return masqueReseau;
    }

    public void setMasqueReseau(String masqueReseau) {
        this.masqueReseau = masqueReseau;
    }

    public String getVlan() {
        return vlan;
    }

    public void setVlan(String vlan) {
        this.vlan = vlan;
    }

    public Equipement getEquipement() {
        return equipement;
    }

    public void setEquipement(Equipement equipement) {
        this.equipement = equipement;
    }
}
