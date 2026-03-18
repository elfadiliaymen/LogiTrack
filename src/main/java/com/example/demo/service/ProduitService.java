package com.example.demo.service;

import com.example.demo.model.Produit;
import com.example.demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {


    @Autowired
    private ProduitRepository produitRepository;

    public List<Produit> lire(){
        return produitRepository.findAll();
    }

    public Produit creer(Produit produit){
        return produitRepository.save(produit);
    }

   public String supprimer(Long id){
        produitRepository.deleteById(id);
        return "produit supprimee !";
   }

}
