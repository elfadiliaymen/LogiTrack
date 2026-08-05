package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> listerUtilisateurs() {
        return userService.listerTout();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User consulterUtilisateur(@PathVariable Long id) {
        return userService.consulter(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public User ajouterUtilisateur(@RequestBody User user) {
        return userService.creer(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User modifierUtilisateur(@PathVariable Long id, @RequestBody User user) {
        return userService.modifier(id, user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String supprimerUtilisateur(@PathVariable Long id) {
        userService.supprimer(id);
        return "Utilisateur supprimé avec succès !";
    }
}
