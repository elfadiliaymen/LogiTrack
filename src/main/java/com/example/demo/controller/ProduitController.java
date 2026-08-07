package com.example.demo.controller;

import com.example.demo.model.Produit;
import com.example.demo.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Page<Produit> listerProduits(@RequestParam(required = false) String categorie,
                                        @RequestParam(required = false) Double minPrix,
                                        @RequestParam(required = false) Double maxPrix,
                                        @RequestParam(required = false) Boolean stockFaible,
                                        Pageable pageable) {
        return produitService.rechercher(categorie, minPrix, maxPrix, stockFaible, pageable);
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
    public Page<Produit> parCategorie(@PathVariable String category, Pageable pageable) {
        return produitService.parCategorie(category, pageable);
    }

    @GetMapping("/price/{price}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Page<Produit> parPrixInferieur(@PathVariable double price, Pageable pageable) {
        return produitService.parPrixInferieur(price, pageable);
    }

}
