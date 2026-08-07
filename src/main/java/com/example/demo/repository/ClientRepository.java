package com.example.demo.repository;

import com.example.demo.model.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Page<Client> findByNomContainingIgnoreCase(String nom, Pageable pageable);
}
