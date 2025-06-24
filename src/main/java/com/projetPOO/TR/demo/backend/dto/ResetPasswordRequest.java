
// 18. ResetPasswordRequest.java
package com.projetPOO.TR.demo.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ResetPasswordRequest {
    @NotBlank(message = "Le nouveau mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String newPassword;
    
    // Constructeurs
    public ResetPasswordRequest() {}
    
    // Getters et Setters
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
