
// 9. EnseignantRepository.java
package com.projetPOO.TR.demo.backend.repository;

import com.projetPOO.TR.demo.backend.model.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
    Optional<Enseignant> findByUtilisateurId(Long utilisateurId);
}
