// RoleRepository.java
package com.projetPOO.TR.demo.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projetPOO.TR.demo.backend.model.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Optional<Role> findByNom(String nom);

}
