
// ==================== CONTROLLER ====================

// 25. AuthController.java (Nouveau contrôleur pour l'authentification)
package com.projetPOO.TR.demo.backend.controller;

import com.projetPOO.TR.demo.backend.Service.UtilisateurService;
import com.projetPOO.TR.demo.backend.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
@Validated
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    /**
     * Endpoint pour l'inscription
     */
    @PostMapping("/inscription")
    public ResponseEntity<?> inscription(@Valid @RequestBody InscriptionRequest request) {
        System.out.println(request.toString());
        try {
            UtilisateurResponse utilisateur = utilisateurService.creerUtilisateur(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MessageResponse("Inscription réussie", true));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Endpoint pour la connexion
     */
    @PostMapping("/connexion")
    public ResponseEntity<?> connexion(@Valid @RequestBody LoginRequest request) {
        System.out.println(request.getEmail() + " "+request.getMotDePasse());
        try {
            LoginResponse response = utilisateurService.connecter(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, e.getMessage(), null));
        }
    }

    /**
     * Endpoint pour vérifier si un email est disponible
     */
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailDisponible(@RequestParam String email) {
        boolean disponible = utilisateurService.isEmailDisponible(email);
        return ResponseEntity.ok(new MessageResponse(
            disponible ? "Email disponible" : "Email déjà utilisé", 
            disponible
        ));
    }

    @GetMapping("/api/welcome/message")
public ResponseEntity<String> getWelcomeMessage() {
    return ResponseEntity.ok("Bienvenue dans l'application !");
}

    /**
     * Endpoint pour vérifier si un matricule est disponible
     */
    @GetMapping("/check-matricule")
    public ResponseEntity<?> checkMatriculeDisponible(@RequestParam String matricule) {
        boolean disponible = utilisateurService.isMatriculeDisponible(matricule);
        return ResponseEntity.ok(new MessageResponse(
            disponible ? "Matricule disponible" : "Matricule déjà utilisé", 
            disponible
        ));
    }
}
