package com.example.demo.service;

import com.example.demo.config.JwtUtils;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

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

    public Map<String, Object> register(RegisterRequest request) {
        if (request.getEmail() != null && !request.getEmail().isBlank() && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("L'email existe déjà");
        }

        if (request.getUsername() != null && !request.getUsername().isBlank() && userRepository.findByUsername(request.getUsername()) != null) {
            throw new RuntimeException("Le nom d'utilisateur existe déjà");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(parseRole(request.getRole()));

        if (request.getNom() != null) {
            user.setNom(request.getNom());
        }
        if (request.getPrenom() != null) {
            user.setPrenom(request.getPrenom());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }

        User saved = userRepository.save(user);
        return buildResponse(saved);
    }

    public Map<String, Object> login(LoginRequest request) {
        String loginName = request.getUsername();
        if (loginName == null || loginName.isBlank()) {
            loginName = request.getUsername();
        }

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginName,
                        request.getPassword()
                )
        );

        User found = userRepository.findByUsername(loginName);
        if (found == null) {
            found = userRepository.findByEmail(loginName);
        }
        if (found == null) {
            throw new RuntimeException("Utilisateur introuvable");
        }

        return buildResponse(found);
    }

    private Map<String, Object> buildResponse(User user) {
        String token = jwtUtils.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("token", token);

        Map<String, Object> userPayload = new LinkedHashMap<>();
        userPayload.put("id", user.getId());
        userPayload.put("nom", user.getNom());
        userPayload.put("prenom", user.getPrenom());
        userPayload.put("email", user.getEmail());
        userPayload.put("role", user.getRole().name());
        response.put("user", userPayload);
        return response;
    }

    private User.Role parseRole(String role) {
        if (role == null || role.isBlank()) {
            return User.Role.AGENT;
        }
        try {
            return User.Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException ex) {
            return User.Role.AGENT;
        }
    }
}
