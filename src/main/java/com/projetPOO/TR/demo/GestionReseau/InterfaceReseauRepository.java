package com.projetPOO.TR.demo.GestionReseau;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface InterfaceReseauRepository extends JpaRepository<InterfaceReseau, Long> {
    List<InterfaceReseau> findByEquipementId(Long equipementId);
}