package com.projetPOO.TR.demo.GestionReseau;

import com.projetPOO.TR.demo.GestionReseau.ConnexionRepository;
import com.projetPOO.TR.demo.GestionReseau.EquipementService;
import com.projetPOO.TR.demo.GestionReseau.EquipementRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TopologieService {

    private final EquipementService equipementService;
    private final ConnexionRepository connexionRepository;

    @Autowired
    public TopologieService(
            EquipementService equipementService,
            ConnexionRepository connexionRepository) {
        this.equipementService = equipementService;
        this.connexionRepository = connexionRepository;
    }

    public Map<String, Object> getTopologieReseau() {
        // Récupération des équipements et connexions
        List<Equipement> equipements = equipementService.getAllEquipements();
        List<Connexion> connexions = connexionRepository.findAll();

        // Création des structures pour la topologie
        Map<String, Object> topologie = new HashMap<>();
        List<Map<String, Object>> noeuds = new ArrayList<>();
        List<Map<String, Object>> liens = new ArrayList<>();

        // Création des nœuds
        for (Equipement equipement : equipements) {
            Map<String, Object> noeud = new HashMap<>();
            noeud.put("id", equipement.getId());
            noeud.put("label", equipement.getNom());
            noeud.put("type", equipement.getType());
           // noeud.put("actif", equipement.isActif());

            noeuds.add(noeud);
        }

        // Création des liens
        for (Connexion connexion : connexions) {
            Map<String, Object> lien = new HashMap<>();
            lien.put("source", connexion.getSource().getId());
            lien.put("target", connexion.getDestination().getId());
            lien.put("type", connexion.getType());

            liens.add(lien);
        }

        topologie.put("noeuds", noeuds);
        topologie.put("liens", liens);

        return topologie;
    }

    public void ajouterConnexion(Long sourceId, Long destinationId, String type) {
        Optional<Equipement> sourceOpt = equipementService.getEquipementById(sourceId);
        Optional<Equipement> destOpt = equipementService.getEquipementById(destinationId);

        if (sourceOpt.isPresent() && destOpt.isPresent()) {
            Connexion connexion = new Connexion();
            connexion.setSource(sourceOpt.get());
            connexion.setDestination(destOpt.get());
            connexion.setType(type);

            connexionRepository.save(connexion);
        }
    }

    public boolean supprimerConnexion(Long connexionId) {
        if (connexionRepository.existsById(connexionId)) {
            connexionRepository.deleteById(connexionId);
            return true;
        }
        return false;
    }

    public List<Map<String, Object>> getCheminLePlusCourt(Long sourceId, Long destinationId) {
        // Implémentation de l'algorithme de Dijkstra pour trouver le chemin le plus court
        Map<Long, Integer> distances = new HashMap<>();
        Map<Long, Long> precedent = new HashMap<>();
        Set<Long> nonVisites = new HashSet<>();
        
        // Initialisation
        List<Equipement> equipements = equipementService.getAllEquipements();
        for (Equipement equipement : equipements) {
            distances.put(equipement.getId(), Integer.MAX_VALUE);
            nonVisites.add(equipement.getId());
        }
        distances.put(sourceId, 0);
        
        // Algorithme principal
        while (!nonVisites.isEmpty()) {
            Long courant = getNoeudPlusProche(distances, nonVisites);
            if (courant == null || courant.equals(destinationId)) {
                break;
            }
            
            nonVisites.remove(courant);
            
            // Trouver les voisins
            List<Connexion> connexions = connexionRepository.findAll();
            for (Connexion connexion : connexions) {
                if (connexion.getSource().getId().equals(courant)) {
                    Long voisin = connexion.getDestination().getId();
                    // Assumer que chaque connexion a un poids de 1
                    int distance = distances.get(courant) + 1;
                    
                    if (distance < distances.get(voisin)) {
                        distances.put(voisin, distance);
                        precedent.put(voisin, courant);
                    }
                }
            }
        }
        
        // Construire le chemin
        List<Map<String, Object>> chemin = new ArrayList<>();
        Long courant = destinationId;
        
        if (!precedent.containsKey(destinationId)) {
            return chemin; // Pas de chemin trouvé
        }
        
        while (courant != null) {
            Map<String, Object> etape = new HashMap<>();
            Optional<Equipement> equipement = equipementService.getEquipementById(courant);
            if (equipement.isPresent()) {
                etape.put("id", equipement.get().getId());
                etape.put("nom", equipement.get().getNom());
                etape.put("type", equipement.get().getType());
                chemin.add(0, etape); // Ajouter au début pour avoir le chemin dans l'ordre
            }
            
            courant = precedent.get(courant);
            if (courant != null && courant.equals(sourceId)) {
                Optional<Equipement> source = equipementService.getEquipementById(sourceId);
                if (source.isPresent()) {
                    Map<String, Object> etapeSource = new HashMap<>();
                    etapeSource.put("id", source.get().getId());
                    etapeSource.put("nom", source.get().getNom());
                    etapeSource.put("type", source.get().getType());
                    chemin.add(0, etapeSource);
                }
                break;
            }
        }
        
        return chemin;
    }
    
    private Long getNoeudPlusProche(Map<Long, Integer> distances, Set<Long> nonVisites) {
        Long plusProche = null;
        int minDistance = Integer.MAX_VALUE;
        
        for (Long id : nonVisites) {
            int distance = distances.get(id);
            if (distance < minDistance) {
                minDistance = distance;
                plusProche = id;
            }
        }
        
        return plusProche;
    }

    public List<Equipement> detecterGoulotEtranglement() {
        List<Equipement> goulots = new ArrayList<>();
        List<Connexion> connexions = connexionRepository.findAll();
        
        // Compter le nombre de connexions pour chaque équipement
        Map<Long, Integer> compteurConnexions = new HashMap<>();
        
        for (Connexion connexion : connexions) {
            Long sourceId = connexion.getSource().getId();
            Long destId = connexion.getDestination().getId();
            
            compteurConnexions.put(sourceId, compteurConnexions.getOrDefault(sourceId, 0) + 1);
            compteurConnexions.put(destId, compteurConnexions.getOrDefault(destId, 0) + 1);
        }
        
        // Trouver les équipements avec beaucoup de connexions
        int seuil = 3; // À ajuster selon les critères du réseau
        for (Map.Entry<Long, Integer> entry : compteurConnexions.entrySet()) {
            if (entry.getValue() >= seuil) {
                equipementService.getEquipementById(entry.getKey())
                    .ifPresent(goulots::add);
            }
        }
        
        return goulots;
    }

    public Map<String, Object> analyserRedondance() {
        Map<String, Object> resultat = new HashMap<>();
        List<List<Long>> cheminsRedondants = new ArrayList<>();
        
        // Implémenter un algorithme pour détecter les chemins multiples entre paires d'équipements
        // Ceci est une implémentation simplifiée
        
        List<Equipement> equipements = equipementService.getAllEquipements();
        for (int i = 0; i < equipements.size(); i++) {
            for (int j = i + 1; j < equipements.size(); j++) {
                Long sourceId = equipements.get(i).getId();
                Long destId = equipements.get(j).getId();
                
                // Trouver tous les chemins possibles entre source et destination
                List<List<Long>> cheminsPossibles = trouverCheminsPossibles(sourceId, destId);
                
                if (cheminsPossibles.size() > 1) {
                    cheminsRedondants.addAll(cheminsPossibles);
                }
            }
        }
        
        resultat.put("cheminsRedondants", cheminsRedondants);
        resultat.put("nombreRedondances", cheminsRedondants.size());
        
        return resultat;
    }
    
    private List<List<Long>> trouverCheminsPossibles(Long sourceId, Long destId) {
        // Ceci est une implémentation simplifiée qui pourrait être remplacée
        // par un algorithme complet de recherche de tous les chemins (DFS ou BFS)
        List<List<Long>> chemins = new ArrayList<>();
        
        // Exemple simpliste: ajouter un chemin direct s'il existe
        boolean cheminDirect = false;
        List<Connexion> connexions = connexionRepository.findAll();
        for (Connexion connexion : connexions) {
            if (connexion.getSource().getId().equals(sourceId) && 
                connexion.getDestination().getId().equals(destId)) {
                cheminDirect = true;
                List<Long> chemin = Arrays.asList(sourceId, destId);
                chemins.add(chemin);
                break;
            }
        }
        
        // Si nous avons un chemin direct, simulons également un second chemin pour démontrer la redondance
        if (cheminDirect) {
            // Tenter de trouver un équipement intermédiaire pour construire un second chemin
            for (Connexion connexion : connexions) {
                if (connexion.getSource().getId().equals(sourceId) && 
                    !connexion.getDestination().getId().equals(destId)) {
                    
                    Long intermediaire = connexion.getDestination().getId();
                    
                    for (Connexion connexion2 : connexions) {
                        if (connexion2.getSource().getId().equals(intermediaire) && 
                            connexion2.getDestination().getId().equals(destId)) {
                            
                            List<Long> chemin = Arrays.asList(sourceId, intermediaire, destId);
                            chemins.add(chemin);
                            break;
                        }
                    }
                    
                    if (chemins.size() > 1) break;
                }
            }
        }
        
        return chemins;
    }
}