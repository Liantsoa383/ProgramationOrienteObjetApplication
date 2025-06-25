package com.projetPOO.TR.demo.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.projetPOO.TR.demo.backend.Service.UtilisateurService;
import com.projetPOO.TR.demo.backend.dto.*;
import com.projetPOO.TR.demo.backend.exception.ResourceNotFoundException;
import com.projetPOO.TR.demo.backend.exception.UnauthorizedException;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
@Validated
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    /**
     * Endpoint pour créer un nouvel utilisateur (Admin seulement)
     */
    @PostMapping("/utilisateurs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> creerUtilisateur(@Valid @RequestBody InscriptionRequest request) {
        UtilisateurResponse utilisateur = utilisateurService.creerUtilisateur(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(utilisateur);
    }

    

    /**
     * Endpoint pour récupérer tous les utilisateurs avec pagination
     */
   @GetMapping("/utilisateurs")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Page<UtilisateurResponse>> getAllUtilisateurs(
        @RequestParam(defaultValue = "0") @Min(0) int page,
        @RequestParam(defaultValue = "10") @Min(1) int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "ASC") String sortDirection) {
    
    Sort.Direction direction = Sort.Direction.fromString(sortDirection);
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
    Page<UtilisateurResponse> utilisateurs = utilisateurService.getAllUtilisateurs(pageable);
    
    return ResponseEntity.ok(utilisateurs);
}

    /**
     * Endpoint pour rechercher des utilisateurs
     */
    @GetMapping("/utilisateurs/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UtilisateurResponse>> searchUtilisateurs(
            @RequestParam String query,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status) {
        
        List<UtilisateurResponse> utilisateurs = utilisateurService.searchUtilisateurs(query, role, status);
        return ResponseEntity.ok(utilisateurs);
    }

    /**
     * Endpoint pour récupérer un utilisateur par son ID
     */
    @GetMapping("/utilisateurs/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<UtilisateurResponse> getUtilisateurById(@PathVariable Long id) {
        UtilisateurResponse utilisateur = utilisateurService.getUtilisateurById(id);
        return ResponseEntity.ok(utilisateur);
    }
    
    /**
     * Endpoint pour mettre à jour un utilisateur (Admin ou le propriétaire)
     */
    @PutMapping("/utilisateurs/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<UtilisateurResponse> updateUtilisateur(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProfileRequest request) {
        
        UtilisateurResponse utilisateur = utilisateurService.updateUtilisateur(id, request);
        return ResponseEntity.ok(utilisateur);
    }

    /**
     * Endpoint pour désactiver un utilisateur (Admin seulement)
     */
    @PutMapping("/utilisateurs/{id}/desactiver")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> desactiverUtilisateur(@PathVariable Long id) {
        utilisateurService.desactiverUtilisateur(id);
        return ResponseEntity.ok(new MessageResponse("Utilisateur désactivé avec succès", true));
    }

    /**
     * Endpoint pour activer un utilisateur (Admin seulement)
     */
    @PutMapping("/utilisateurs/{id}/activer")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> activerUtilisateur(@PathVariable Long id) {
        utilisateurService.activerUtilisateur(id);
        return ResponseEntity.ok(new MessageResponse("Utilisateur activé avec succès", true));
    }

    /**
     * Endpoint pour réinitialiser le mot de passe d'un utilisateur (Admin seulement)
     */
    @PutMapping("/utilisateurs/{id}/reset-password")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> resetPassword(
            @PathVariable Long id,
            @Valid @RequestBody ResetPasswordRequest request) {
        
        utilisateurService.resetPassword(id, request.getNewPassword());
        return ResponseEntity.ok(new MessageResponse("Mot de passe réinitialisé avec succès", true));
    }

    /**
     * Endpoint pour supprimer un utilisateur (Admin seulement)
     */
    @DeleteMapping("/utilisateurs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.ok(new MessageResponse("Utilisateur supprimé avec succès", true));
    }

    // === Endpoints pour l'utilisateur connecté ===

    /**
     * Endpoint pour récupérer le profil de l'utilisateur connecté
     */
    @GetMapping("/utilisateur/profile")
    public ResponseEntity<UtilisateurResponse> getUserProfile(Authentication authentication) {
        String username = authentication.getName();
        UtilisateurResponse utilisateur = utilisateurService.getUtilisateurByUsername(username);
        return ResponseEntity.ok(utilisateur);
    }
    
    /**
     * Endpoint pour mettre à jour le profil de l'utilisateur connecté
     */
    @PutMapping("/utilisateur/profile")
    public ResponseEntity<UtilisateurResponse> updateUserProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        
        String username = authentication.getName();
        UtilisateurResponse utilisateur = utilisateurService.updateUtilisateurByUsername(username, request);
        return ResponseEntity.ok(utilisateur);
    }
    
    /**
     * Endpoint pour changer le mot de passe de l'utilisateur connecté
     */
    @PutMapping("/utilisateur/password")
    public ResponseEntity<MessageResponse> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication) {
        
        String username = authentication.getName();
        utilisateurService.changePassword(username, request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok(new MessageResponse("Mot de passe changé avec succès", true));
    }
    
    /**
     * Endpoint pour récupérer les activités récentes de l'utilisateur connecté
     */
    @GetMapping("/utilisateur/activities")
    public ResponseEntity<List<ActivityResponse>> getUserActivities(
            Authentication authentication,
            @RequestParam(defaultValue = "10") @Min(1) int limit) {
        
        String username = authentication.getName();
        List<ActivityResponse> activities = utilisateurService.getUserActivities(username, limit);
        return ResponseEntity.ok(activities);
    }

    /**
     * Endpoint pour vérifier si un email est disponible
     */
    @GetMapping("/utilisateurs/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmailDisponible(@RequestParam String email) {
        boolean disponible = utilisateurService.isEmailDisponible(email);
        return ResponseEntity.ok(Map.of("disponible", disponible));
    }

    /**
     * Endpoint pour vérifier si un matricule est disponible
     */
    @GetMapping("/utilisateurs/check-matricule")
    public ResponseEntity<Map<String, Boolean>> checkMatriculeDisponible(@RequestParam String matricule) {
        boolean disponible = utilisateurService.isMatriculeDisponible(matricule);
        return ResponseEntity.ok(Map.of("disponible", disponible));
    }

    /**
     * Endpoint pour récupérer les statistiques des utilisateurs (Admin seulement)
     */
   @GetMapping("/utilisateurs/stats")
public ResponseEntity<UtilisateurStatsResponse> getUtilisateurStats() {
    UtilisateurStatsResponse stats = utilisateurService.getUtilisateurStats();
    return ResponseEntity.ok(stats);
}

}