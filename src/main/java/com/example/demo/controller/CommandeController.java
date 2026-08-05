package com.example.demo.controller;

import com.example.demo.model.Commande;
import com.example.demo.model.LigneCommande;
import com.example.demo.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public List<Commande> listerCommandes() {
        return commandeService.listerTout();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Commande ajouterCommande(@RequestBody Commande commande) {
        return commandeService.creer(commande);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Commande consulterCommande(@PathVariable Long id) {
        return commandeService.consulter(id);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Commande modifierStatut(@PathVariable Long id, @RequestBody String nouveauStatut, Authentication authentication) {
        return commandeService.modifierStatut(id, nouveauStatut, authentication.getAuthorities());
    }

    @PostMapping("/{orderId}/products")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public LigneCommande ajouterProduitACommande(@PathVariable Long orderId, @RequestBody LigneCommande ligneCommande) {
        return commandeService.ajouterProduitACommande(orderId, ligneCommande);
    }

    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public List<Commande> rechercherParClient(@PathVariable Long clientId) {
        return commandeService.parClient(clientId);
    }

    @GetMapping("/count")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public long nombreTotalCommandes() {
        return commandeService.nombreTotal();
    }
}
