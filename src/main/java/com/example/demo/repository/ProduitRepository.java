package com.example.demo.repository;

import com.example.demo.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit , Long> {

List<Produit> findByCategorie(String categorie);
List<Produit> findByPrixLessThan(double prix);

@Query("SELECT p from Produit p where p.quantiteStock < 5")
  List<Produit> findLowStock();
}


