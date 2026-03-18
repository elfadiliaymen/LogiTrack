package com.example.demo.controller;

import com.example.demo.model.Produit;
import com.example.demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @GetMapping
    public List<Produit> listerProduits(){
        return produitRepository.findAll();
    }

    @PostMapping
    public Produit ajouterProduit(@RequestBody Produit produit){
        return produitRepository.save(produit);
    }

}
