
// 19. MessageResponse.java
package com.projetPOO.TR.demo.backend.dto;

public class MessageResponse {
    private String message;
    private boolean success;
    
    // Constructeurs
    public MessageResponse() {}
    
    public MessageResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
    
    // Getters et Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}