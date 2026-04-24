package com.example.demo.service;

import com.example.demo.Model.Chauffeur;
import com.example.demo.dto.ChauffeurDTO;
import com.example.demo.mapper.ChauffeurMapper;
import com.example.demo.repository.ChauffeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChauffeurService {

    private final ChauffeurRepository chauffeurRepository;
    private final ChauffeurMapper chauffeurMapper;

    public ChauffeurDTO addChauffeur(ChauffeurDTO chauffeurDTO) {
        Chauffeur chauffeur = chauffeurMapper.toEntity(chauffeurDTO);
        return chauffeurMapper.toDTO(chauffeurRepository.save(chauffeur));
    }

    public ChauffeurDTO updateChauffeur(Long id, ChauffeurDTO chauffeurDTO) {
        Chauffeur chauffeur = chauffeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chauffeur not found"));
        chauffeur.setNom(chauffeurDTO.getNom());
        chauffeur.setTelephone(chauffeurDTO.getTelephone());
        chauffeur.setPermisType(chauffeurDTO.getPermisType());
        chauffeur.setDisponible(chauffeurDTO.isDisponible());
        return chauffeurMapper.toDTO(chauffeurRepository.save(chauffeur));
    }

    public void deleteChauffeur(Long id) {
        chauffeurRepository.deleteById(id);
    }

    public List<ChauffeurDTO> getAllChauffeurs() {
        return chauffeurMapper.toDTOs(chauffeurRepository.findAll());
    }

    public List<ChauffeurDTO> getAvailableChauffeurs() {
        return chauffeurMapper.toDTOs(chauffeurRepository.findByDisponibleTrue());
    }
}
