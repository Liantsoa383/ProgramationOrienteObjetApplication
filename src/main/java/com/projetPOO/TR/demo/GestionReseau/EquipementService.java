package com.projetPOO.TR.demo.GestionReseau;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EquipementService {

    @Autowired
    private EquipementRepository equipementRepository;
    @Autowired
    private InterfaceReseauRepository interfaceReseauRepository;


    public List<Equipement> getAllEquipements() {
        return equipementRepository.findAll();
    }

    public Optional<Equipement> getEquipementById(Long id) {
        return equipementRepository.findById(id);
    }

    public Equipement saveEquipement(Equipement equipement) {
        return equipementRepository.save(equipement);
    }

    public void deleteEquipement(Long id) {
        equipementRepository.deleteById(id);
    }

    public List<Equipement> getEquipementsActifs() {
        return equipementRepository.findByActif(true);
    }

    public Equipement updateEquipement(Long id, Equipement updatedEquipement) {
        Optional<Equipement> equipeOptional = equipementRepository.findById(id);
        if (!equipeOptional.isPresent()) {
            return null;
        }
        Equipement equipement = equipeOptional.get();
        equipement = updatedEquipement;
        return equipementRepository.save(equipement);
    }

    public List<Equipement> getEquipementsByType(String type) {
        return equipementRepository.findByType(type);
    }

    public List<Equipement> getEquipementsByEmplacement(String emplacement) {
        return equipementRepository.findByEmplacement(emplacement);
    }

    public List<Equipement> getEquipementsByStatut(String statut) {
        Boolean actif = statut=="ACTIF"?true : false;
        return equipementRepository.findByActif(actif);
    }

    public Page<Equipement> searchEquipements(String searchTerm, Pageable pageable) {
        return equipementRepository.search(searchTerm, pageable);
    }

    public List<InterfaceReseau> getInterfacesByEquipementId(Long equipementId){
        return interfaceReseauRepository.findByEquipementId(equipementId);
    }

    public Equipement addInterfaceToEquipement(Long equipementId,InterfaceReseau interfaceReseau){
        Optional<Equipement> equipementOptional = equipementRepository.findById(equipementId);
        if (!equipementOptional.isPresent()) {
            return null;
        }
        Equipement equipement = equipementOptional.get();
        List<InterfaceReseau> interfaceReseaux = equipement.getInterfaceReseau();
        interfaceReseaux.add(interfaceReseau);
        equipement.setInterfaceReseau(interfaceReseaux);
        return equipementRepository.save(equipement);
    }

    public Map<String, Object> getEquipementStats() {
        Map<String, Object> stats = new HashMap<>();

        Long total = equipementRepository.countTotal();
        Long actifs = equipementRepository.countActifs();

        stats.put("total", total);
        stats.put("actifs", actifs);
        stats.put("pourcentageActifs", total > 0 ? (actifs * 100.0 / total) : 0);

        // Calculer la variation par rapport à la période précédente
        // Note: Ceci est une simplification, en réalité vous auriez besoin
        // de comparer avec des données historiques stockées
        stats.put("variation", 30); // +30 nouveaux équipements
        stats.put("pourcentageVariation", 4); // +4%

        return stats;
    }
}