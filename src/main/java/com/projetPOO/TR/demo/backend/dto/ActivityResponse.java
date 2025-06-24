
// 20. ActivityResponse.java
package com.projetPOO.TR.demo.backend.dto;

import java.time.LocalDateTime;

public class ActivityResponse {
    private Long id;
    private String action;
    private String description;
    private LocalDateTime dateActivite;
    
    // Constructeurs
    public ActivityResponse() {}
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getDateActivite() { return dateActivite; }
    public void setDateActivite(LocalDateTime dateActivite) { this.dateActivite = dateActivite; }
}
