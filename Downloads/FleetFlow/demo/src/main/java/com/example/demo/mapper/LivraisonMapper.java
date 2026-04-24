package com.example.demo.mapper;

import com.example.demo.Model.Livraison;
import com.example.demo.dto.LivraisonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LivraisonMapper {

    @Mapping(source = "chauffeur.id", target = "chauffeurId")
    LivraisonDTO toDTO(Livraison livraison);

    @Mapping(source = "chauffeurId", target = "chauffeur.id")
    Livraison toEntity(LivraisonDTO livraisonDTO);

    List<LivraisonDTO> toDTOs(List<Livraison> livraisons);
    List<Livraison> toEntities(List<LivraisonDTO> livraisonDTOs);
}
