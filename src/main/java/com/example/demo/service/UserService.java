package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> listerTout() {
        return userRepository.findAll();
    }

    public User consulter(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public User creer(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("L'email existe déjà");
        }

        if (user.getRole() == null) {
            user.setRole(User.Role.AGENT);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User modifier(Long id, User updated) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        existing.setNom(updated.getNom());
        existing.setPrenom(updated.getPrenom());

        if (updated.getEmail() != null
                && !updated.getEmail().equals(existing.getEmail())
                && userRepository.existsByEmail(updated.getEmail())) {
            throw new RuntimeException("L'email existe déjà");
        }
        if (updated.getEmail() != null) {
            existing.setEmail(updated.getEmail());
        }

        if (updated.getRole() != null) {
            existing.setRole(updated.getRole());
        }

        if (updated.getPassword() != null && !updated.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(updated.getPassword()));
        }

        return userRepository.save(existing);
    }

    public void supprimer(Long id) {
        userRepository.deleteById(id);
    }
}
