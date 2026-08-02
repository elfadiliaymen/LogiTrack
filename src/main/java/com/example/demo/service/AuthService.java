package com.example.demo.service;

import com.example.demo.config.JwtUtils;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtils jwtUtils;

    public String register(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("L'utilisateur existe déjà");
        }

        if (user.getRole() == null) {
            user.setRole(User.Role.USER);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);

        return jwtUtils.generateToken(
                saved.getId(),
                saved.getUsername(),
                saved.getRole().name()
        );
    }

    public String login(User user) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        User found = userRepository.findByUsername(user.getUsername());
        if (found == null) {
            throw new RuntimeException("Utilisateur introuvable");
        }

        return jwtUtils.generateToken(
                found.getId(),
                found.getUsername(),
                found.getRole().name()
        );
    }
}
