package com.projetPOO.TR.demo.GestionReseau;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Connexion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Equipement source;
    
    @ManyToOne
    private Equipement destination;
    
    private String type;
    
    // Constructors
    public Connexion() {
    }
    
    public Connexion(Equipement source, Equipement destination, String type) {
        this.source = source;
        this.destination = destination;
        this.type = type;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Equipement getSource() {
        return source;
    }
    
    public void setSource(Equipement source) {
        this.source = source;
    }
    
    public Equipement getDestination() {
        return destination;
    }
    
    public void setDestination(Equipement destination) {
        this.destination = destination;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    @Override
    public String toString() {
        return "Connexion{" +
                "id=" + id +
                ", source=" + (source != null ? source.getId() : null) +
                ", destination=" + (destination != null ? destination.getId() : null) +
                ", type='" + type + '\'' +
                '}';
    }
}
