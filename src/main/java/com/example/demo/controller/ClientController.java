package com.example.demo.controller;

import com.example.demo.model.Client;
import com.example.demo.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public List<Client> listerClients() {
        return clientService.listerTout();
    }

    @PostMapping
    public Client ajouterClient(@RequestBody Client client) {
        return clientService.creer(client);
    }

    @GetMapping("/{id}")
    public Client consulterClient(@PathVariable Long id) {
        return clientService.consulter(id);
    }

    @DeleteMapping("/{id}")
    public String supprimerClient(@PathVariable Long id) {
        clientService.supprimer(id);
        return "Client supprimé avec succès !";
    }
}
