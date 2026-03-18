package com.example.demo.controller;


import com.example.demo.model.Commande;
import com.example.demo.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

    @GetMapping
    public List<Commande> listerCommande(){
     return commandeRepository.findAll();
    }

    @PostMapping
    public Commande ajouterCommande(@RequestBody Commande commande){
        return commandeRepository.save(commande);
    }


}
