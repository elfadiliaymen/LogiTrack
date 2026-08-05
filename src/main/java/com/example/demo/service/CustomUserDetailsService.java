package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User userEntity = userRepository.findByEmail(usernameOrEmail);
        if (userEntity == null) {
            userEntity = userRepository.findByUsername(usernameOrEmail);
        }
        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found");
        }
        String roleWithPrefix = "ROLE_" + userEntity.getRole().name();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(roleWithPrefix);
        return new org.springframework.security.core.userdetails.User(
                userEntity.getEmail(),
                userEntity.getPassword(),
                Collections.singletonList(authority)
        );
    }
}
