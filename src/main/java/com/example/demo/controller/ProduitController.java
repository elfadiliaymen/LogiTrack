package com.example.demo.controller;

import com.example.demo.model.Commande;
import com.example.demo.model.Produit;
import com.example.demo.repository.CommandeRepository;
import com.example.demo.repository.ProduitRepository;
import com.example.demo.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private ProduitService produitService;
    @Autowired
    private CommandeRepository commandeRepository;


    @GetMapping
    public List<Produit> listerProduits(){
       return produitService.lire();
    }

    @PostMapping
    public Produit ajouterProduit(@RequestBody Produit produit){
        return produitService.creer(produit);
    }

    @DeleteMapping
    public String supprimerProduit(@PathVariable Long id){
        return produitService.supprimer(id);
    }

    @PutMapping("/{id}/status")
    public Commande modifierStatut(@PathVariable Long id , @RequestBody String nouveuauStatut ){
   Commande commande = commandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Commande non trouvée"));
   commande.setStatut(nouveuauStatut);
   return commandeRepository.save(commande);
    }

    @GetMapping("/{id}")
    public Produit consulterProduit(@PathVariable Long id){
        return produitRepository.findById(id).orElse(null);
    }


@GetMapping("/category/{category}")
    public List<Produit> parCategorie(@PathVariable String category){
        return produitRepository.findByCategorie(category);
}

    @GetMapping("/low-stock")
    public List<Produit> stockFaible(){
     return produitRepository.findLowStock();
    }



}
