package com.example.demo.service;

import com.example.demo.model.Produit;
import com.example.demo.repository.CommandeRepository;
import com.example.demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CommandeRepository commandeRepository;

    public List<Produit> listerTout() {
        return produitRepository.findAll();
    }

    public Produit consulter(Long id) {
        return produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
    }

    public Produit creer(Produit produit) {
        return produitRepository.save(produit);
    }

    public void supprimer(Long id) {
        produitRepository.deleteById(id);
    }

    public List<Produit> parCategorie(String categorie) {
        return produitRepository.findByCategorie(categorie);
    }

    public List<Produit> parPrixInferieur(double prix) {
        return produitRepository.findByPrixLessThan(prix);
    }

    public List<Produit> stockFaible() {
        return produitRepository.findLowStock();
    }

    public Produit lePlusCommande() {
        return commandeRepository.findTopProduct();
    }
}
