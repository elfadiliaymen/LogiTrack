package com.example.demo.controller;

import com.example.demo.model.Client;
import com.example.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping
    public List<Client> listerClients(){
        return clientRepository.findAll();
    }

    @PostMapping
    public Client ajouterClient(@RequestBody Client client){
        return clientRepository.save(client);
    }


}
