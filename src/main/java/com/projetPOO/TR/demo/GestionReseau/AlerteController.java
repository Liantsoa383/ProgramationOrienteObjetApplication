package com.projetPOO.TR.demo.GestionReseau;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/alertes")
public class AlerteController {
    
    @Autowired
    private AlerteService alerteService;
    
    @GetMapping
    public ResponseEntity<List<Alerte>> getAllAlertes() {
        List<Alerte> alertes = alerteService.getAllAlertes();
        return new ResponseEntity<>(alertes, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Alerte> getAlerteById(@PathVariable Long id) {
        return alerteService.getAlerteById(id)
                .map(alerte -> new ResponseEntity<>(alerte, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping
    public ResponseEntity<Alerte> createAlerte(@RequestBody Alerte alerte) {
        Alerte newAlerte = alerteService.createAlerte(alerte);
        return new ResponseEntity<>(newAlerte, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Alerte> updateAlerte(@PathVariable Long id, @RequestBody Alerte alerte) {
        return alerteService.updateAlerte(id, alerte)
                .map(updatedAlerte -> new ResponseEntity<>(updatedAlerte, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlerte(@PathVariable Long id) {
        if (alerteService.deleteAlerte(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}