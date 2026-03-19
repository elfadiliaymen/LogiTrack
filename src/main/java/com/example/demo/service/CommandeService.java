package com.example.demo.service;

import com.example.demo.model.Commande;
import com.example.demo.model.LigneCommande;
import com.example.demo.model.Produit;
import com.example.demo.repository.CommandeRepository;
import com.example.demo.repository.LigneCommandeRepository;
import com.example.demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private LigneCommandeRepository ligneCommandeRepository;

    public List<Commande> listerTout() {
        return commandeRepository.findAll();
    }

    public Commande consulter(Long id) {
        return commandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Commande non trouvée"));
    }

    public Commande creer(Commande commande) {
        return commandeRepository.save(commande);
    }

    public Commande modifierStatut(Long id, String statut) {
        Commande commande = consulter(id);
        commande.setStatut(statut);
        return commandeRepository.save(commande);
    }

    public List<Commande> parClient(Long clientId) {
        return commandeRepository.findByClientId(clientId);
    }

    public long nombreTotal() {
        return commandeRepository.countTotalCommandes();
    }

    public LigneCommande ajouterProduitACommande(Long orderId, LigneCommande ligneCommande) {
        Commande commande = consulter(orderId);
        Produit produit = produitRepository.findById(ligneCommande.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

        ligneCommande.setCommande(commande);
        ligneCommande.setProduit(produit);

        return ligneCommandeRepository.save(ligneCommande);
    }
}
