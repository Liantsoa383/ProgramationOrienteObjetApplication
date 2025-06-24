// 4. Enseignant.java
package com.projetPOO.TR.demo.backend.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "enseignants")
public class Enseignant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;
    
    private String specialite;
    
    private String grade;
    
    @Column(name = "date_embauche")
    private LocalDate dateEmbauche;
    
    // Constructeurs
    public Enseignant() {}
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    
    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }
    
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    
    public LocalDate getDateEmbauche() { return dateEmbauche; }
    public void setDateEmbauche(LocalDate dateEmbauche) { this.dateEmbauche = dateEmbauche; }
}
