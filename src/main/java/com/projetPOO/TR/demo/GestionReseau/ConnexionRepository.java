package com.projetPOO.TR.demo.GestionReseau;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnexionRepository extends JpaRepository<Connexion, Long> {
    // You can add custom query methods here if needed
}