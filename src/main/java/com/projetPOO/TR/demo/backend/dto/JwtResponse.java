// 22. JwtResponse.java
package com.projetPOO.TR.demo.backend.dto;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private UtilisateurResponse utilisateur;
    
    // Constructeurs
    public JwtResponse() {}
    
    public JwtResponse(String token, UtilisateurResponse utilisateur) {
        this.token = token;
        this.utilisateur = utilisateur;
    }
    
    // Getters et Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public UtilisateurResponse getUtilisateur() { return utilisateur; }
    public void setUtilisateur(UtilisateurResponse utilisateur) { this.utilisateur = utilisateur; }
}
