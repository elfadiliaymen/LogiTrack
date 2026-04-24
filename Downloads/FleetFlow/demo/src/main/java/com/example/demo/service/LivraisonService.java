package com.example.demo.service;

import com.example.demo.Model.Chauffeur;
import com.example.demo.Model.Livraison;
import com.example.demo.dto.LivraisonDTO;
import com.example.demo.mapper.LivraisonMapper;
import com.example.demo.repository.ChauffeurRepository;
import com.example.demo.repository.LivraisonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LivraisonService {

    private final LivraisonRepository livraisonRepository;
    private final ChauffeurRepository chauffeurRepository;
    private final LivraisonMapper livraisonMapper;

    public LivraisonDTO createLivraison(LivraisonDTO livraisonDTO) {
        Livraison livraison = livraisonMapper.toEntity(livraisonDTO);
        if (livraisonDTO.getChauffeurId() != null) {
            Chauffeur chauffeur = chauffeurRepository.findById(livraisonDTO.getChauffeurId())
                    .orElseThrow(() -> new RuntimeException("Chauffeur not found"));
            livraison.setChauffeur(chauffeur);
        }
        return livraisonMapper.toDTO(livraisonRepository.save(livraison));
    }

    public LivraisonDTO updateStatut(Long id, String statut) {
        Livraison livraison = livraisonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livraison not found"));
        livraison.setStatut(statut);
        return livraisonMapper.toDTO(livraisonRepository.save(livraison));
    }

    public LivraisonDTO assignChauffeur(Long livraisonId, Long chauffeurId) {
        Livraison livraison = livraisonRepository.findById(livraisonId)
                .orElseThrow(() -> new RuntimeException("Livraison not found"));
        Chauffeur chauffeur = chauffeurRepository.findById(chauffeurId)
                .orElseThrow(() -> new RuntimeException("Chauffeur not found"));
        
        livraison.setChauffeur(chauffeur);
        return livraisonMapper.toDTO(livraisonRepository.save(livraison));
    }

    public List<LivraisonDTO> getAllLivraisons() {
        return livraisonMapper.toDTOs(livraisonRepository.findAll());
    }

    public List<LivraisonDTO> getByStatut(String statut) {
        return livraisonMapper.toDTOs(livraisonRepository.findByStatut(statut));
    }

    public List<LivraisonDTO> getBetweenDates(LocalDateTime start, LocalDateTime end) {
        return livraisonMapper.toDTOs(livraisonRepository.findLivraisonsBetweenDates(start, end));
    }

    public List<LivraisonDTO> getByVille(String ville) {
        return livraisonMapper.toDTOs(livraisonRepository.findLivraisonsByVilleDestination(ville));
    }
}
