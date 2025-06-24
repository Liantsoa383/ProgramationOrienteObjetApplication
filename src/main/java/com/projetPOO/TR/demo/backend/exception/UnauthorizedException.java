
// 28. UnauthorizedException.java
package com.projetPOO.TR.demo.backend.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}