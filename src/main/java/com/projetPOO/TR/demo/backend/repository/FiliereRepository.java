

// 10. FiliereRepository.java
package com.projetPOO.TR.demo.backend.repository;

import com.projetPOO.TR.demo.backend.model.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    
}