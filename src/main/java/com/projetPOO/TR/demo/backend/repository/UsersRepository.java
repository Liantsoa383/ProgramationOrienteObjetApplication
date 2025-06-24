package com.projetPOO.TR.demo.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetPOO.TR.demo.backend.model.Utilisateur;

public interface UsersRepository extends JpaRepository<Utilisateur ,Long>{

}
