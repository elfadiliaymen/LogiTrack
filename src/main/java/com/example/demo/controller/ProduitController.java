package com.example.demo.controller;

import com.example.demo.model.Produit;
import com.example.demo.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public List<Produit> listerProduits() {
        return produitService.listerTout();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Produit ajouterProduit(@RequestBody Produit produit) {
        return produitService.creer(produit);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Produit consulterProduit(@PathVariable Long id) {
        return produitService.consulter(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String supprimerProduit(@PathVariable Long id) {
        produitService.supprimer(id);
        return "Produit supprimé avec succès !";
    }

    @GetMapping("/category/{category}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public List<Produit> parCategorie(@PathVariable String category) {
        return produitService.parCategorie(category);
    }

    @GetMapping("/price/{price}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public List<Produit> parPrixInferieur(@PathVariable double price) {
        return produitService.parPrixInferieur(price);
    }

    @GetMapping("/low-stock")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public List<Produit> stockFaible() {
        return produitService.stockFaible();
    }

    @GetMapping("/top-product")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Produit lePlusCommande() {
        return produitService.lePlusCommande();
    }
}
