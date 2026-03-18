package com.example.demo.repository;

import com.example.demo.model.LigneCommande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LigneCommandeRepository extends JpaRepository<LigneCommande , Long> {
}
