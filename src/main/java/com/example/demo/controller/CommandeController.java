package com.example.demo.controller;

import com.example.demo.model.Commande;
import com.example.demo.model.LigneCommande;
import com.example.demo.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @GetMapping
    public List<Commande> listerCommandes() {
        return commandeService.listerTout();
    }

    @PostMapping
    public Commande ajouterCommande(@RequestBody Commande commande) {
        return commandeService.creer(commande);
    }

    @GetMapping("/{id}")
    public Commande consulterCommande(@PathVariable Long id) {
        return commandeService.consulter(id);
    }

    @PutMapping("/{id}/status")
    public Commande modifierStatut(@PathVariable Long id, @RequestBody String nouveauStatut) {
        return commandeService.modifierStatut(id, nouveauStatut);
    }

    @PostMapping("/{orderId}/products")
    public LigneCommande ajouterProduitACommande(@PathVariable Long orderId, @RequestBody LigneCommande ligneCommande) {
        return commandeService.ajouterProduitACommande(orderId, ligneCommande);
    }

    @GetMapping("/client/{clientId}")
    public List<Commande> rechercherParClient(@PathVariable Long clientId) {
        return commandeService.parClient(clientId);
    }

    @GetMapping("/count")
    public long nombreTotalCommandes() {
        return commandeService.nombreTotal();
    }
}
