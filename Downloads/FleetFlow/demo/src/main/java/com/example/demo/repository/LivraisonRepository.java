package com.example.demo.repository;

import com.example.demo.Model.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LivraisonRepository extends JpaRepository<Livraison, Long> {

    List<Livraison> findByStatut(String statut);

    // List<Livraison> findByClientId(Long clientId); // Commented out until Client is implemented

    @Query("SELECT l FROM Livraison l WHERE l.dateLivraison BETWEEN :startDate AND :endDate")
    List<Livraison> findLivraisonsBetweenDates(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT l FROM Livraison l WHERE l.adresseDestination LIKE %:ville%")
    List<Livraison> findLivraisonsByVilleDestination(@Param("ville") String ville);
}
