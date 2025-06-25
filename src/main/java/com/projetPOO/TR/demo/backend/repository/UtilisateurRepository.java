// 7. UtilisateurRepository.java
package com.projetPOO.TR.demo.backend.repository;

import com.projetPOO.TR.demo.backend.model.Utilisateur;
import com.projetPOO.TR.demo.backend.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    
    Optional<Utilisateur> findByEmail(String email);
    Optional<Utilisateur> findByMatricule(String matricule);
    boolean existsByEmail(String email);
    boolean existsByMatricule(String matricule);
    
    @Query("SELECT u FROM Utilisateur u WHERE " +
           "(LOWER(u.nom) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.prenom) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.matricule) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "AND (:role IS NULL OR u.role = :role) " +
           "AND (:actif IS NULL OR u.actif = :actif)")
    List<Utilisateur> searchUtilisateurs(@Param("query") String query, 
                                        @Param("role") Role role, 
                                        @Param("actif") Boolean actif);
    
    long countByRole(Role role);
    long countByActif(Boolean actif);
}