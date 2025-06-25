// 27. ResourceNotFoundException.java
package com.projetPOO.TR.demo.backend.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}