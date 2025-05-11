package com.projetPOO.TR.demo.GestionReseau;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "equipements")
public class Equipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nom;
    private String type;
    private String adresseIP;
    private String adresseMAC;
    private String emplacement;
    private boolean actif;
    private LocalDateTime derniereSynchronisation;  
    
    
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "equipement")
    private List<InterfaceReseau> interfaceReseau = new ArrayList<InterfaceReseau>();


    public List<InterfaceReseau> getInterfaceReseau(){
        return this.interfaceReseau;
    }

    public void setInterfaceReseau(List<InterfaceReseau> interfaceReseau){
        this.interfaceReseau = interfaceReseau;
    }
    // Getters et Setters
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
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getAdresseIP() {
        return adresseIP;
    }
    
    public void setAdresseIP(String adresseIP) {
        this.adresseIP = adresseIP;
    }
    
    public String getAdresseMAC() {
        return adresseMAC;
    }
    
    public void setAdresseMAC(String adresseMAC) {
        this.adresseMAC = adresseMAC;
    }
    
    public String getEmplacement() {
        return emplacement;
    }
    
    public void setEmplacement(String emplacement) {
        this.emplacement = emplacement;
    }
    
    public boolean isActif() {
        return actif;
    }
    
    public void setActif(boolean actif) {
        this.actif = actif;
    }
    
    public LocalDateTime getDerniereSynchronisation() {
        return derniereSynchronisation;
    }
    
    public void setDerniereSynchronisation(LocalDateTime derniereSynchronisation) {
        this.derniereSynchronisation = derniereSynchronisation;
    }
    
   /*public Groupe getGroupe() {
        return groupe;
    }
    
    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }*/
}
