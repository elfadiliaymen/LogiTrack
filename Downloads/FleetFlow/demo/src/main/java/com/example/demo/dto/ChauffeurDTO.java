package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChauffeurDTO {
    private Long id;
    private String nom;
    private String telephone;
    private String permisType;
    private boolean disponible;
}
