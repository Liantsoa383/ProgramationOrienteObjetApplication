
// 13. InscriptionRequest.java
package com.projetPOO.TR.demo.backend.dto;

import com.projetPOO.TR.demo.backend.model.Role;
import javax.validation.constraints.*;

public class InscriptionRequest {
    @NotBlank(message = "Le matricule est obligatoire")
    private String matricule;
    
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;
    
    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;
    
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;
    
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String motDePasse;
    
    @NotBlank(message = "Le téléphone est obligatoire")
    private String telephone;
    
    @NotNull(message = "Le rôle est obligatoire")
    private Role role;
    
    // Constructeurs
    public InscriptionRequest() {}
    
    // Getters et Setters
    public String getMatricule() { return matricule; }
    public void setMatricule(String matricule) { this.matricule = matricule; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
    
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    @Override
public String toString() {
    return "InscriptionRequest{" +
            "matricule='" + matricule + '\'' +
            ", nom='" + nom + '\'' +
            ", prenom='" + prenom + '\'' +
            ", email='" + email + '\'' +
            ", motDePasse='" + motDePasse + '\'' + // Note: Ne pas afficher le mot de passe en production
            ", telephone='" + telephone + '\'' +
            ", role=" + role +
            '}';
}
}
