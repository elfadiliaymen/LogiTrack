package com.example.demo.controller;

import com.example.demo.model.Client;
import com.example.demo.repository.ClientRepository;
import com.example.demo.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientService clientService;

    @GetMapping
    public List<Client> listerClients(){
        return clientService.lire();
    }

    @PostMapping
    public Client ajouterClient(@RequestBody Client client){
        return clientService.creer(client);
    }


    @DeleteMapping
    public String supprimerClient(@PathVariable Long id){
     return clientService.supprimer(id);
    }

    @GetMapping("/{id}")
    public Client consulterClient(@PathVariable Long id){
        return clientRepository.findById(id).orElse(null);
    }


}
