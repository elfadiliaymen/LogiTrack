package com.example.demo.service;

import com.example.demo.client.NotificationClient;
import com.example.demo.dto.NotificationRequest;
import com.example.demo.model.Client;
import com.example.demo.model.Commande;
import com.example.demo.model.LigneCommande;
import com.example.demo.model.NotificationType;
import com.example.demo.model.Produit;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.CommandeRepository;
import com.example.demo.repository.LigneCommandeRepository;
import com.example.demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CommandeService {

    private static final Set<String> AGENT_ALLOWED_STATUS = Set.of(
            "NOUVELLE", "EN_PREPARATION", "EXPEDIEE", "LIVREE"
    );

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private LigneCommandeRepository ligneCommandeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private NotificationClient notificationClient;

    public Page<Commande> listerTout(Pageable pageable) {
        return commandeRepository.findAll(pageable);
    }

    public Commande consulter(Long id) {
        return commandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Commande non trouvée"));
    }

    public Commande creer(Commande commande) {
        Commande saved = commandeRepository.save(commande);
        notifier(saved, NotificationType.ORDER_CREATED, "Commande #" + saved.getId() + " créée");
        return saved;
    }

    private void notifier(Commande commande, NotificationType type, String message) {
        try {
            NotificationRequest request = new NotificationRequest(message, type, commande.getId());
            notificationClient.createNotification(request);
        } catch (Exception e) {
            // Si le service de notification est indisponible, on logue mais on ne fait pas échouer l'opération
            System.err.println("Erreur notification (" + type + ") pour commande #" + commande.getId() + ": " + e.getMessage());
        }
    }

    public Commande modifierStatut(Long id, String statut, java.util.Collection<? extends GrantedAuthority> authorities) {
        boolean isAgent = authorities.stream()
                .anyMatch(a -> "ROLE_AGENT".equals(a.getAuthority()));

        if (isAgent && !AGENT_ALLOWED_STATUS.contains(statut)) {
            throw new RuntimeException("Statut non autorisé pour un agent : " + statut);
        }

        Commande commande = consulter(id);
        commande.setStatut(statut);
        Commande saved = commandeRepository.save(commande);

        if ("EXPEDIEE".equals(statut)) {
            notifier(saved, NotificationType.ORDER_SHIPPED, "Commande #" + saved.getId() + " expédiée");
        } else if ("LIVREE".equals(statut)) {
            notifier(saved, NotificationType.ORDER_DELIVERED, "Commande #" + saved.getId() + " livrée");
        }

        return saved;
    }

    public Commande modifierCommande(Long id, Commande updates, java.util.Collection<? extends GrantedAuthority> authorities) {
        boolean isAgent = authorities.stream()
                .anyMatch(a -> "ROLE_AGENT".equals(a.getAuthority()));

        if (isAgent && !AGENT_ALLOWED_STATUS.contains(updates.getStatut())) {
            throw new RuntimeException("Statut non autorisé pour un agent : " + updates.getStatut());
        }

        Commande commande = consulter(id);
        commande.setStatut(updates.getStatut());

        Client client = updates.getClient();
        if (client != null && client.getId() != null) {
            commande.setClient(clientRepository.getReferenceById(client.getId()));
        }

        return commandeRepository.save(commande);
    }

    public Page<Commande> parClient(Long clientId, Pageable pageable) {
        return commandeRepository.findByClientId(clientId, pageable);
    }

    public Page<Commande> parStatut(String statut, Pageable pageable) {
        return commandeRepository.findByStatut(statut, pageable);
    }

    public long nombreTotal() {
        return commandeRepository.countTotalCommandes();
    }

    public long nombreParStatut(String statut) {
        return commandeRepository.countByStatut(statut);
    }

    public java.util.List<Commande> commandesRecentes() {
        return commandeRepository.findTop10ByOrderByDateCommandeDesc();
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
