package com.example.demo.controller;

import com.example.demo.model.Commande;
import com.example.demo.model.LigneCommande;
import com.example.demo.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Page<Commande> listerCommandes(@RequestParam(required = false) String statut, Pageable pageable) {
        if (statut != null && !statut.isBlank()) {
            return commandeService.parStatut(statut, pageable);
        }
        return commandeService.listerTout(pageable);
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

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Commande modifierCommande(@PathVariable Long id,
                                     @RequestBody Commande commande,
                                     Authentication authentication) {
        return commandeService.modifierCommande(id, commande, authentication.getAuthorities());
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
    public Page<Commande> rechercherParClient(@PathVariable Long clientId, Pageable pageable) {
        return commandeService.parClient(clientId, pageable);
    }

}
