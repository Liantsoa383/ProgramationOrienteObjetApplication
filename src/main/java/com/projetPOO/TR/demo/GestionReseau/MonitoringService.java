package com.projetPOO.TR.demo.GestionReseau;

import com.projetPOO.TR.demo.GestionReseau.AlerteService;
import com.projetPOO.TR.demo.GestionReseau.Alerte;
import com.projetPOO.TR.demo.GestionReseau.Equipement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.net.InetAddress;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class MonitoringService {

    private final EquipementService equipementService;
    private final AlerteService alerteService;
    
    @Autowired
    public MonitoringService(
            EquipementService equipementService,
            AlerteService alerteService) {
        this.equipementService = equipementService;
        this.alerteService = alerteService;
    }
    
    @Scheduled(fixedRate = 300000) // Exécute toutes les 5 minutes
    public void verifierDisponibiliteEquipements() {
        List<Equipement> equipements = equipementService.getAllEquipements();
        
        for (Equipement equipement : equipements) {
            boolean estAccessible = pingEquipement(equipement.getAdresseIP());
            
            // Si l'état a changé
            if (equipement.isActif() != estAccessible) {
                equipement.setActif(estAccessible);
                equipementService.saveEquipement(equipement);
                
                // Créer une alerte si l'équipement devient inaccessible
                if (!estAccessible) {
                    Alerte alerte = new Alerte();
                    alerte.setTitre("Équipement inaccessible");
                    alerte.setDescription("L'équipement " + equipement.getNom() + 
                                         " (" + equipement.getAdresseIP() + ") est devenu inaccessible.");
                    alerte.setSeverite(Alerte.SeveriteAlerte.MAJEURE);
                    alerte.setDateCreation(LocalDateTime.now());
                    alerte.setResolue(false);
                    alerte.setEquipement(equipement);
                    
                    alerteService.createAlerte(alerte);
                }
            }
            
            equipement.setDerniereSynchronisation(LocalDateTime.now());
            equipementService.saveEquipement(equipement);
        }
    }
    
    private boolean pingEquipement(String adresseIP) {
        try {
            InetAddress address = InetAddress.getByName(adresseIP);
            return address.isReachable(5000); // Timeout de 5 secondes
        } catch (IOException e) {
            return false;
        }
    }
    
    // Autres méthodes de monitoring (charge CPU, mémoire, etc.)
}

