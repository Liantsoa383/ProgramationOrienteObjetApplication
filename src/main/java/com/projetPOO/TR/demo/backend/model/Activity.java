
// 6. Activity.java
package com.projetPOO.TR.demo.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;
    
    @Column(nullable = false)
    private String action;
    
    private String description;
    
    @Column(name = "date_activite")
    private LocalDateTime dateActivite = LocalDateTime.now();
    
    // Constructeurs
    public Activity() {}
    
    public Activity(Utilisateur utilisateur, String action, String description) {
        this.utilisateur = utilisateur;
        this.action = action;
        this.description = description;
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getDateActivite() { return dateActivite; }
    public void setDateActivite(LocalDateTime dateActivite) { this.dateActivite = dateActivite; }
}
