package com.projetPOO.TR.demo.GestionReseau;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AlerteService {
    
    @Autowired
    private AlerteRepository alerteRepository;
        
    public List<Alerte> getAllAlertes() {
        return alerteRepository.findAll();
    }
    
    public Optional<Alerte> getAlerteById(Long id) {
        return alerteRepository.findById(id);
    }
    
    public Alerte createAlerte(Alerte alerte) {
        return alerteRepository.save(alerte);
    }
    
    public Optional<Alerte> updateAlerte(Long id, Alerte alerteDetails) {
        return alerteRepository.findById(id)
                .map(alerte -> {
                    alerte.setTitre(alerteDetails.getTitre());
                    alerte.setDescription(alerteDetails.getDescription());
                    alerte.setSeverite(alerteDetails.getSeverite());
                    alerte.setDateCreation(alerteDetails.getDateCreation());
                    alerte.setResolue(alerteDetails.isResolue());
                    alerte.setDateResolution(alerteDetails.getDateResolution());
                    alerte.setOrigine(alerteDetails.getOrigine());
                    alerte.setTypeAlerte(alerteDetails.getTypeAlerte());
                    alerte.setCommentaire(alerteDetails.getCommentaire());
                    alerte.setEquipement(alerteDetails.getEquipement());
                    return alerteRepository.save(alerte);
                });
    }
    
    
    public boolean deleteAlerte(Long id) {
        return alerteRepository.findById(id)
                .map(alerte -> {
                    alerteRepository.delete(alerte);
                    return true;
                })
                .orElse(false);
    }
}