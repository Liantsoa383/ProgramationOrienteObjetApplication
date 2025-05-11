package com.projetPOO.TR.demo.GestionReseau;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EquipementRepository extends JpaRepository<Equipement, Long> {

    List<Equipement> findByType(String type);

    List<Equipement> findByEmplacement(String emplacement);

    Page<Equipement> findAll(Pageable pageable);

    List<Equipement> findByActif(Boolean actif);

    @Query(value = "SELECT COUNT(e) FROM Equipement e")
    Long countTotal();

    @Query(value = "SELECT COUNT(e) FROM Equipement e WHERE e.actif=true")
    Long countActifs();

    @Query("SELECT e FROM Equipement e WHERE " +
            "LOWER(e.nom) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(e.type) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(e.adresseIP) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(e.adresseMAC) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(e.emplacement) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Equipement> search(@Param("searchTerm") String searchTerm, Pageable pageable);
}
