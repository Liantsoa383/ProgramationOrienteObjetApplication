
// 11. ActivityRepository.java
package com.projetPOO.TR.demo.backend.repository;

import com.projetPOO.TR.demo.backend.model.Activity;
import com.projetPOO.TR.demo.backend.model.Utilisateur;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUtilisateurOrderByDateActiviteDesc(Utilisateur utilisateur, Pageable pageable);
}