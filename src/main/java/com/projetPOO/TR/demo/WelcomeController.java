package com.projetPOO.TR.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/api/welcome")
public class WelcomeController {

    @Autowired
    private WelcomeMessageRepository repository;

    // Initialiser un message par défaut après le démarrage
    @PostConstruct
    public void init() {
        repository.save(new model("Bienvenue dans ProgramationOrienteObjetApplication !"));
    }

    // Endpoint pour récupérer le message
    @GetMapping("/message")
    public List<model> getWelcomeMessage() {
        return repository.findAll();
    }
}
