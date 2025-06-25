package com.projetPOO.TR.demo.backend.config;

import com.projetPOO.TR.demo.backend.Service.UtilisateurService;
import com.projetPOO.TR.demo.backend.dto.InscriptionRequest;
import com.projetPOO.TR.demo.backend.model.Role;
import com.projetPOO.TR.demo.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // ➤ Créer les rôles s'ils n'existent pas
        createRoleIfNotExists("Admin");
        createRoleIfNotExists("Etudiant");
        createRoleIfNotExists("Enseignant");

        // ➤ Récupérer les rôles depuis la base
        Role roleAdmin = roleRepository.findByNom("Admin").orElseThrow();
        Role roleEtudiant = roleRepository.findByNom("Etudiant").orElseThrow();
        Role roleEnseignant = roleRepository.findByNom("Enseignant").orElseThrow();

        // ➤ Créer un administrateur par défaut
        if (utilisateurService.isEmailDisponible("admin@isstm.mg")) {
            InscriptionRequest adminRequest = new InscriptionRequest();
            adminRequest.setMatricule("ADMIN001");
            adminRequest.setNom("Administrateur");
            adminRequest.setPrenom("Système");
            adminRequest.setEmail("admin@isstm.mg");
            adminRequest.setMotDePasse("admin123");
            adminRequest.setTelephone("+261 34 00 000 00");
            adminRequest.setRole(roleAdmin);
            utilisateurService.creerUtilisateur(adminRequest);
            System.out.println("✅ Admin créé");
        }

        // ➤ Créer un étudiant
        if (utilisateurService.isEmailDisponible("etudiant@isstm.mg")) {
            InscriptionRequest etudiantRequest = new InscriptionRequest();
            etudiantRequest.setMatricule("ETU001");
            etudiantRequest.setNom("Rakoto");
            etudiantRequest.setPrenom("Jean");
            etudiantRequest.setEmail("etudiant@isstm.mg");
            etudiantRequest.setMotDePasse("etudiant123");
            etudiantRequest.setTelephone("+261 34 11 111 11");
            etudiantRequest.setRole(roleEtudiant);
            utilisateurService.creerUtilisateur(etudiantRequest);
            System.out.println("✅ Étudiant créé");
        }

        // ➤ Créer un enseignant
        if (utilisateurService.isEmailDisponible("enseignant@isstm.mg")) {
            InscriptionRequest enseignantRequest = new InscriptionRequest();
            enseignantRequest.setMatricule("ENS001");
            enseignantRequest.setNom("Rabe");
            enseignantRequest.setPrenom("Marie");
            enseignantRequest.setEmail("enseignant@isstm.mg");
            enseignantRequest.setMotDePasse("enseignant123");
            enseignantRequest.setTelephone("+261 34 22 222 22");
            enseignantRequest.setRole(roleEnseignant);
            utilisateurService.creerUtilisateur(enseignantRequest);
            System.out.println("✅ Enseignant créé");
        }
    }

    private void createRoleIfNotExists(String nom) {
        if (roleRepository.findByNom(nom).isEmpty()) {
            roleRepository.save(new Role(nom));
            System.out.println("➡️ Rôle ajouté : " + nom);
        }
    }
}
