// 15. LoginResponse.java
package com.projetPOO.TR.demo.backend.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private UtilisateurResponse utilisateur;
    private String token; // Pour une future implémentation JWT
    
    // Constructeurs
    public LoginResponse() {}
    
    public LoginResponse(boolean success, String message, UtilisateurResponse utilisateur) {
        this.success = success;
        this.message = message;
        this.utilisateur = utilisateur;
    }
    
    // Getters et Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public UtilisateurResponse getUtilisateur() { return utilisateur; }
    public void setUtilisateur(UtilisateurResponse utilisateur) { this.utilisateur = utilisateur; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}