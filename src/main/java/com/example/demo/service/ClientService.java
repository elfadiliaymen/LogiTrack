package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.Produit;
import com.example.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> lire(){
        return clientRepository.findAll();
    }

    public Client creer(Client client){
        return clientRepository.save(client);
    }


    public String supprimer(Long id){
        clientRepository.deleteById(id);
        return "Client supprimer !";
    }
}
