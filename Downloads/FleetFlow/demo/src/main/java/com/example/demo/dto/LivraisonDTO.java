package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LivraisonDTO {
    private Long id;
    private LocalDateTime dateLivraison;
    private String adresseDepart;
    private String adresseDestination;
    private String statut;
    private Long chauffeurId;
}
