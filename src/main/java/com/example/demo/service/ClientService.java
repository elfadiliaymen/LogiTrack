package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> listerTout() {
        return clientRepository.findAll();
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
