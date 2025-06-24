package com.projetPOO.TR.demo.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Changé de "/api/**" à "/**" pour couvrir toutes les routes
                .allowedOriginPatterns("http://localhost:3000") // Utilisez allowedOriginPatterns
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Cache preflight pendant 1 heure
    }
}