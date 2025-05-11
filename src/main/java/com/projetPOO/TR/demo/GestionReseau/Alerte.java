package com.projetPOO.TR.demo.GestionReseau;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
public class Alerte {

    public enum SeveriteAlerte {
        MINEURE,
        MAJEURE,
        CRITIQUE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;
    private SeveriteAlerte severite;
    private LocalDateTime dateCreation;
    private boolean resolue;

    // 🔽 Nouveaux attributs ajoutés
    private String origine;
    private String typeAlerte;
    private LocalDateTime dateResolution;
    private String commentaire;

    @ManyToOne
    private Equipement equipement;

    // Constructeur sans arguments
    public Alerte() {
    }

    // Constructeur partiel (déjà existant)
    public Alerte(String type, String message, Equipement equipement) {
        this.titre = type;
        this.description = message;
        this.equipement = equipement;
        this.dateCreation = LocalDateTime.now();
        this.resolue = false;
        this.severite = SeveriteAlerte.MINEURE;
    }

    // Constructeur complet (AllArgsConstructor)
    public Alerte(Long id, String titre, String description, SeveriteAlerte severite,
                  LocalDateTime dateCreation, boolean resolue, Equipement equipement) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.severite = severite;
        this.dateCreation = dateCreation;
        this.resolue = resolue;
        this.equipement = equipement;
    }

    // Getters & Setters existants

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SeveriteAlerte getSeverite() {
        return severite;
    }

    public void setSeverite(SeveriteAlerte severite) {
        this.severite = severite;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public boolean isResolue() {
        return resolue;
    }

    public void setResolue(boolean resolue) {
        this.resolue = resolue;
    }

    public Equipement getEquipement() {
        return equipement;
    }

    public void setEquipement(Equipement equipement) {
        this.equipement = equipement;
    }

    // 🔽 Getters & Setters des nouveaux champs

    public String getOrigine() {
        return origine;
    }

    public void setOrigine(String origine) {
        this.origine = origine;
    }

    public String getTypeAlerte() {
        return typeAlerte;
    }

    public void setTypeAlerte(String typeAlerte) {
        this.typeAlerte = typeAlerte;
    }

    public LocalDateTime getDateResolution() {
        return dateResolution;
    }

    public void setDateResolution(LocalDateTime dateResolution) {
        this.dateResolution = dateResolution;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    @Override
    public String toString() {
        return "Alerte{" +
                "id=" + id +
                ", titre='" + titre + '\'' +
                ", description='" + description + '\'' +
                ", severite=" + severite +
                ", dateCreation=" + dateCreation +
                ", resolue=" + resolue +
                ", origine='" + origine + '\'' +
                ", typeAlerte='" + typeAlerte + '\'' +
                ", dateResolution=" + dateResolution +
                ", commentaire='" + commentaire + '\'' +
                ", equipement=" + (equipement != null ? equipement.getId() : null) +
                '}';
    }
}
