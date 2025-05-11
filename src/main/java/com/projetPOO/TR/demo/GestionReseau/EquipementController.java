package com.projetPOO.TR.demo.GestionReseau;

import com.projetPOO.TR.demo.GestionReseau.Equipement;
import com.projetPOO.TR.demo.GestionReseau.EquipementService;
import com.projetPOO.TR.demo.GestionReseau.InterfaceReseau;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.Entity;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipements")
public class EquipementController {

    @Autowired
    private EquipementService equipementService;

    @GetMapping
    public ResponseEntity<?> getAllEquipements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(equipementService.getAllEquipements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipement> getEquipementById(@PathVariable Long id) {
        Optional<Equipement> equipement = equipementService.getEquipementById(id);
        return equipement.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Equipement> createEquipement(@RequestBody Equipement equipement) {
        Equipement savedEquipement = equipementService.saveEquipement(equipement);
        return new ResponseEntity<>(savedEquipement, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEquipement(@PathVariable Long id, @RequestBody Equipement updatedEquipement) {
        Equipement updated = equipementService.updateEquipement(id, updatedEquipement);
        return updated != null ? new ResponseEntity<>(updated, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEquipement(@PathVariable Long id) {
        equipementService.deleteEquipement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<?> getEquipementsByType(@PathVariable String type) {
        return new ResponseEntity<>(equipementService.getEquipementsByType(type), HttpStatus.OK);
    }

    @GetMapping("/emplacement/{emplacement}")
    public ResponseEntity<?> getEquipementsByEmplacement(@PathVariable String emplacement) {
        return new ResponseEntity<>(equipementService.getEquipementsByEmplacement(emplacement), HttpStatus.OK);
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<?> getEquipementsByStatut(@PathVariable String statut) {
        return new ResponseEntity<>(equipementService.getEquipementsByStatut(statut), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Equipement>> searchEquipements(
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(equipementService.searchEquipements(searchTerm, pageable), HttpStatus.OK);
    }

    @GetMapping("/{equipementId}/interfaces")
    public ResponseEntity<List<InterfaceReseau>> getInterfacesByEquipementId(@PathVariable Long equipementId) {
        List<InterfaceReseau> interfaces = equipementService.getInterfacesByEquipementId(equipementId);
        return new ResponseEntity<>(interfaces, HttpStatus.OK);
    }

    @PostMapping("/{equipementId}/interfaces")
    public ResponseEntity<?> addInterfaceToEquipement(@PathVariable Long equipementId, @RequestBody InterfaceReseau interfaceReseau) {
        Equipement updatedEquipement = equipementService.addInterfaceToEquipement(equipementId, interfaceReseau);
        return updatedEquipement != null ? new ResponseEntity<>(updatedEquipement, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

