package com.example.demo.controller;

import com.example.demo.model.Client;
import com.example.demo.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Page<Client> listerClients(@RequestParam(required = false) String nom, Pageable pageable) {
        if (nom != null && !nom.isBlank()) {
            return clientService.rechercherParNom(nom, pageable);
        }
        return clientService.listerTout(pageable);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Client ajouterClient(@RequestBody Client client) {
        return clientService.creer(client);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'AGENT')")
    public Client consulterClient(@PathVariable Long id) {
        return clientService.consulter(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String supprimerClient(@PathVariable Long id) {
        clientService.supprimer(id);
        return "Client supprimé avec succès !";
    }
}
