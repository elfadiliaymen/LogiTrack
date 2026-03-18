package com.example.demo.repository;

import com.example.demo.model.Commande;
import com.example.demo.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande , Long> {

    List<Commande> findByClientId(Long clientId);

    @Query("SELECT COUNT(c) from Commande c")
    long countTotalCommandes();

    @Query("SELECT l.produit FROM LigneCommande l group by l.produit ORDER BY SUM(l.quantite) DESC LIMIT 1")
    Produit findTopProduct();
}
