package com.example.demo.service;

import com.example.demo.model.Produit;
import com.example.demo.repository.CommandeRepository;
import com.example.demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CommandeRepository commandeRepository;

    public Page<Produit> listerTout(Pageable pageable) {
        return produitRepository.findAll(pageable);
    }

    public Page<Produit> rechercher(String categorie, Double minPrix, Double maxPrix, Boolean stockFaible, Pageable pageable) {
        Specification<Produit> spec = Specification.where(null);

        if (categorie != null && !categorie.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("categorie")), "%" + categorie.toLowerCase() + "%"));
        }

        if (minPrix != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("prix"), minPrix));
        }

        if (maxPrix != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("prix"), maxPrix));
        }

        if (Boolean.TRUE.equals(stockFaible)) {
            spec = spec.and((root, query, cb) -> cb.lessThan(root.get("quantiteStock"), 10));
        }

        return produitRepository.findAll(spec, pageable);
    }

    public Produit consulter(Long id) {
        return produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
    }

    public long nombreTotal() {
        return produitRepository.count();
    }

    public Produit creer(Produit produit) {
        return produitRepository.save(produit);
    }

    public void supprimer(Long id) {
        produitRepository.deleteById(id);
    }

    public Page<Produit> parCategorie(String categorie, Pageable pageable) {
        return produitRepository.findByCategorie(categorie, pageable);
    }

    public Page<Produit> parPrixInferieur(double prix, Pageable pageable) {
        return produitRepository.findByPrixLessThan(prix, pageable);
    }

    public Page<Produit> stockFaible(Pageable pageable) {
        return produitRepository.findLowStock(pageable);
    }

    public Produit lePlusCommande() {
        return commandeRepository.findTopProduct();
    }
}
