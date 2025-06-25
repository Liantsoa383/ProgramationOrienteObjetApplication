
// 23. UtilisateurService.java
package com.projetPOO.TR.demo.backend.Service;

import com.projetPOO.TR.demo.backend.dto.*;
import com.projetPOO.TR.demo.backend.model.*;
import com.projetPOO.TR.demo.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UtilisateurService {
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
private RoleRepository roleRepository;

    
   public UtilisateurResponse creerUtilisateur(InscriptionRequest request) {
    if (utilisateurRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Cet email est déjà utilisé");
    }

    if (utilisateurRepository.existsByMatricule(request.getMatricule())) {
        throw new RuntimeException("Ce matricule est déjà utilisé");
    }

    if (request.getMotDePasse() == null || request.getMotDePasse().isEmpty()) {
        throw new RuntimeException("Le mot de passe ne peut pas être vide");
    }

    Optional<Role> roleO = roleRepository.findByNom(request.getRole().getNom());
    if (!roleO.isPresent()) {
        throw new RuntimeException("Role not found");
    }
    Role role = roleO.get();
    Utilisateur utilisateur = new Utilisateur(
        request.getMatricule(),
        request.getNom(),
        request.getPrenom(),
        request.getEmail(),
        request.getMotDePasse(),
        request.getTelephone(),
        role
    );

    utilisateur = utilisateurRepository.save(utilisateur);

    Activity activity = new Activity(utilisateur, "INSCRIPTION", "Nouvel utilisateur créé");
    activityRepository.save(activity);

    return convertToResponse(utilisateur);
}
    // Connexion utilisateur
    public LoginResponse connecter(LoginRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));
        
        // Vérifier le mot de passe (en production, utiliser BCrypt)
        if (!utilisateur.getMotDePasse().equals(request.getMotDePasse())) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }
        
        // Vérifier si l'utilisateur est actif
        if (!utilisateur.getActif()) {
            throw new RuntimeException("Votre compte est désactivé");
        }
        
        // Mettre à jour la dernière connexion
        utilisateur.setDerniereConnexion(LocalDateTime.now());
        utilisateurRepository.save(utilisateur);
        
        // Enregistrer l'activité
        Activity activity = new Activity(utilisateur, "CONNEXION", "Connexion réussie");
        activityRepository.save(activity);
        
        return new LoginResponse(true, "Connexion réussie", convertToResponse(utilisateur));
    }
    
    // Récupérer tous les utilisateurs avec pagination
    public Page<UtilisateurResponse> getAllUtilisateurs(Pageable pageable) {
        return utilisateurRepository.findAll(pageable)
            .map(this::convertToResponse);
    }
    
    // Rechercher des utilisateurs
   public List<UtilisateurResponse> searchUtilisateurs(String query, String role, String status) {
    Role roleEntity = null;
    if (role != null && !role.isEmpty()) {
        roleEntity = roleRepository.findByNom(role)
                .orElseThrow(() -> new RuntimeException("Rôle inconnu : " + role));
    }

    Boolean actif = null;
    if (status != null && !status.isEmpty()) {
        actif = "ACTIF".equalsIgnoreCase(status);
    }

    return utilisateurRepository.searchUtilisateurs(query, roleEntity, actif)
        .stream()
        .map(this::convertToResponse)
        .collect(Collectors.toList());
}

    
    // Récupérer un utilisateur par ID
    public UtilisateurResponse getUtilisateurById(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return convertToResponse(utilisateur);
    }
    
    // Récupérer un utilisateur par username/email
    public UtilisateurResponse getUtilisateurByUsername(String username) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return convertToResponse(utilisateur);
    }
    
    // Mettre à jour un utilisateur
    public UtilisateurResponse updateUtilisateur(Long id, UpdateProfileRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        // Vérifier si le nouvel email n'est pas déjà utilisé par un autre utilisateur
        if (!utilisateur.getEmail().equals(request.getEmail()) && 
            utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }
        
        utilisateur.setNom(request.getNom());
        utilisateur.setPrenom(request.getPrenom());
        utilisateur.setEmail(request.getEmail());
        utilisateur.setTelephone(request.getTelephone());
        
        utilisateur = utilisateurRepository.save(utilisateur);
        
        // Enregistrer l'activité
        Activity activity = new Activity(utilisateur, "MODIFICATION_PROFIL", "Profil modifié");
        activityRepository.save(activity);
        
        return convertToResponse(utilisateur);
    }
    
    // Mettre à jour un utilisateur par username
    public UtilisateurResponse updateUtilisateurByUsername(String username, UpdateProfileRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        return updateUtilisateur(utilisateur.getId(), request);
    }
    
    // Désactiver un utilisateur
    public void desactiverUtilisateur(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        utilisateur.setActif(false);
        utilisateurRepository.save(utilisateur);
        
        // Enregistrer l'activité
        Activity activity = new Activity(utilisateur, "DESACTIVATION", "Compte désactivé");
        activityRepository.save(activity);
    }
    
    // Activer un utilisateur
    public void activerUtilisateur(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        utilisateur.setActif(true);
        utilisateurRepository.save(utilisateur);
        
        // Enregistrer l'activité
        Activity activity = new Activity(utilisateur, "ACTIVATION", "Compte activé");
        activityRepository.save(activity);
    }
    
    // Réinitialiser le mot de passe
    public void resetPassword(Long id, String newPassword) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        utilisateur.setMotDePasse(newPassword); // En production, hasher le mot de passe
        utilisateurRepository.save(utilisateur);
        
        // Enregistrer l'activité
        Activity activity = new Activity(utilisateur, "RESET_PASSWORD", "Mot de passe réinitialisé");
        activityRepository.save(activity);
    }
    
    // Changer le mot de passe
    public void changePassword(String username, String currentPassword, String newPassword) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        // Vérifier le mot de passe actuel
        if (!utilisateur.getMotDePasse().equals(currentPassword)) {
            throw new RuntimeException("Mot de passe actuel incorrect");
        }
        
        utilisateur.setMotDePasse(newPassword); // En production, hasher le mot de passe
        utilisateurRepository.save(utilisateur);
        
        // Enregistrer l'activité
        Activity activity = new Activity(utilisateur, "CHANGE_PASSWORD", "Mot de passe changé");
        activityRepository.save(activity);
    }
    
    // Supprimer un utilisateur
    public void deleteUtilisateur(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        utilisateurRepository.delete(utilisateur);
    }
    
    // Récupérer les activités d'un utilisateur
    public List<ActivityResponse> getUserActivities(String username, int limit) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        Pageable pageable = PageRequest.of(0, limit);
        return activityRepository.findByUtilisateurOrderByDateActiviteDesc(utilisateur, pageable)
            .stream()
            .map(this::convertToActivityResponse)
            .collect(Collectors.toList());
    }
    
    // Vérifier si un email est disponible
    public boolean isEmailDisponible(String email) {
        return !utilisateurRepository.existsByEmail(email);
    }
    
    // Vérifier si un matricule est disponible
    public boolean isMatriculeDisponible(String matricule) {
        return !utilisateurRepository.existsByMatricule(matricule);
    }
    
    // Récupérer les statistiques des utilisateurs
    public UtilisateurStatsResponse getUtilisateurStats() {
    UtilisateurStatsResponse stats = new UtilisateurStatsResponse();

    Role etudiant = roleRepository.findByNom("Étudiant").orElse(null);
    Role enseignant = roleRepository.findByNom("Enseignant").orElse(null);
    Role admin = roleRepository.findByNom("Admin").orElse(null);

    stats.setTotalUtilisateurs(utilisateurRepository.count());
    stats.setTotalEtudiants(etudiant != null ? utilisateurRepository.countByRole(etudiant) : 0);
    stats.setTotalEnseignants(enseignant != null ? utilisateurRepository.countByRole(enseignant) : 0);
    stats.setTotalAdmins(admin != null ? utilisateurRepository.countByRole(admin) : 0);
    stats.setUtilisateursActifs(utilisateurRepository.countByActif(true));
    stats.setUtilisateursInactifs(utilisateurRepository.countByActif(false));

    return stats;
}

    
    // Méthodes utilitaires de conversion
    private UtilisateurResponse convertToResponse(Utilisateur utilisateur) {
        UtilisateurResponse response = new UtilisateurResponse();
        response.setId(utilisateur.getId());
        response.setMatricule(utilisateur.getMatricule());
        response.setNom(utilisateur.getNom());
        response.setPrenom(utilisateur.getPrenom());
        response.setEmail(utilisateur.getEmail());
        response.setTelephone(utilisateur.getTelephone());
        response.setRole(utilisateur.getRole());
        response.setActif(utilisateur.getActif());
        response.setDateCreation(utilisateur.getDateCreation());
        response.setDerniereConnexion(utilisateur.getDerniereConnexion());
        return response;
    }
    
    private ActivityResponse convertToActivityResponse(Activity activity) {
        ActivityResponse response = new ActivityResponse();
        response.setId(activity.getId());
        response.setAction(activity.getAction());
        response.setDescription(activity.getDescription());
        response.setDateActivite(activity.getDateActivite());
        return response;
    }
}

