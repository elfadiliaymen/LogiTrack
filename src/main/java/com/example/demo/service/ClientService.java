package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Page<Client> listerTout(Pageable pageable) {
        return clientRepository.findAll(pageable);
    }

    public Page<Client> rechercherParNom(String nom, Pageable pageable) {
        return clientRepository.findByNomContainingIgnoreCase(nom, pageable);
    }

    public long nombreTotal() {
        return clientRepository.count();
    }

    public Client consulter(Long id) {
        return clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client non trouvé"));
    }

    public Client creer(Client client) {
        return clientRepository.save(client);
    }

    public void supprimer(Long id) {
        clientRepository.deleteById(id);
    }
}
