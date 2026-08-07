package com.example.demo.repository;

import com.example.demo.model.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ProduitRepository extends JpaRepository<Produit , Long>, JpaSpecificationExecutor<Produit> {

    Page<Produit> findByCategorie(String categorie, Pageable pageable);

    Page<Produit> findByPrixLessThan(double prix, Pageable pageable);

    @Query(value = "SELECT p from Produit p where p.quantiteStock < 5",
            countQuery = "SELECT COUNT(p) from Produit p where p.quantiteStock < 5")
    Page<Produit> findLowStock(Pageable pageable);
}


