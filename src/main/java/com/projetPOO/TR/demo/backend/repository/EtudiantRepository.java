// 8. EtudiantRepository.java
package com.projetPOO.TR.demo.backend.repository;

import com.projetPOO.TR.demo.backend.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    Optional<Etudiant> findByUtilisateurId(Long utilisateurId);
}
