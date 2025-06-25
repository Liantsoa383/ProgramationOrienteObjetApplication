
// 21. UtilisateurStatsResponse.java
package com.projetPOO.TR.demo.backend.dto;

public class UtilisateurStatsResponse {
    private long totalUtilisateurs;
    private long totalEtudiants;
    private long totalEnseignants;
    private long totalAdmins;
    private long utilisateursActifs;
    private long utilisateursInactifs;
    
    // Constructeurs
    public UtilisateurStatsResponse() {}
    
    // Getters et Setters
    public long getTotalUtilisateurs() { return totalUtilisateurs; }
    public void setTotalUtilisateurs(long totalUtilisateurs) { this.totalUtilisateurs = totalUtilisateurs; }
    
    public long getTotalEtudiants() { return totalEtudiants; }
    public void setTotalEtudiants(long totalEtudiants) { this.totalEtudiants = totalEtudiants; }
    
    public long getTotalEnseignants() { return totalEnseignants; }
    public void setTotalEnseignants(long totalEnseignants) { this.totalEnseignants = totalEnseignants; }
    
    public long getTotalAdmins() { return totalAdmins; }
    public void setTotalAdmins(long totalAdmins) { this.totalAdmins = totalAdmins; }
    
    public long getUtilisateursActifs() { return utilisateursActifs; }
    public void setUtilisateursActifs(long utilisateursActifs) { this.utilisateursActifs = utilisateursActifs; }
    
    public long getUtilisateursInactifs() { return utilisateursInactifs; }
    public void setUtilisateursInactifs(long utilisateursInactifs) { this.utilisateursInactifs = utilisateursInactifs; }
}
