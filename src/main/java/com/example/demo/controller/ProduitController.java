package com.example.demo.controller;

import com.example.demo.model.Produit;
import com.example.demo.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    public List<Produit> listerProduits() {
        return produitService.listerTout();
    }

    @PostMapping
    public Produit ajouterProduit(@RequestBody Produit produit) {
        return produitService.creer(produit);
    }

    @GetMapping("/{id}")
    public Produit consulterProduit(@PathVariable Long id) {
        return produitService.consulter(id);
    }

    @DeleteMapping("/{id}")
    public String supprimerProduit(@PathVariable Long id) {
        produitService.supprimer(id);
        return "Produit supprimé avec succès !";
    }

    @GetMapping("/category/{category}")
    public List<Produit> parCategorie(@PathVariable String category) {
        return produitService.parCategorie(category);
    }

    @GetMapping("/price/{price}")
    public List<Produit> parPrixInferieur(@PathVariable double price) {
        return produitService.parPrixInferieur(price);
    }

    @GetMapping("/low-stock")
    public List<Produit> stockFaible() {
        return produitService.stockFaible();
    }

    @GetMapping("/top-product")
    public Produit lePlusCommande() {
        return produitService.lePlusCommande();
    }
}
