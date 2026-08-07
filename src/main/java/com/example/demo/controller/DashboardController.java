package com.example.demo.controller;

import com.example.demo.model.Commande;
import com.example.demo.model.Produit;
import com.example.demo.service.ClientService;
import com.example.demo.service.CommandeService;
import com.example.demo.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ProduitService produitService;

    @Autowired
    private CommandeService commandeService;

    @GetMapping("/clients/count")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public long nombreTotalClients() {
        return clientService.nombreTotal();
    }

    @GetMapping("/products/count")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public long nombreTotalProduits() {
        return produitService.nombreTotal();
    }

    @GetMapping("/products/low-stock")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Page<Produit> stockFaible(Pageable pageable) {
        return produitService.stockFaible(pageable);
    }

    @GetMapping("/products/top-product")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Produit lePlusCommande() {
        return produitService.lePlusCommande();
    }

    @GetMapping("/orders/count")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public long nombreTotalCommandes() {
        return commandeService.nombreTotal();
    }

    @GetMapping("/orders/count/{statut}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public long nombreCommandesParStatut(@PathVariable String statut) {
        return commandeService.nombreParStatut(statut);
    }

    @GetMapping("/orders/recent")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public List<Commande> commandesRecentes() {
        return commandeService.commandesRecentes();
    }
}
