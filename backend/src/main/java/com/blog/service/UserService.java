package com.blog.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.dto.RegisterRequest;
import com.blog.entity.Role;
import com.blog.entity.User;
import com.blog.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User getByUsername(String username) {
		
		Optional<User> user = userRepository.findByUsername(username);
		
		if (user.isEmpty()) {
			return null;
		}
		return user.get();
		
	}
	
	public void create(RegisterRequest request) {
		
		User user = new User();
		user.setFullName(request.getFullName());
		user.setUsername(request.getUsername());
		user.setProfileUrl(request.getProfileUrl());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setUserId(UUID.randomUUID());
		user.setRole(Role.USER);
		
		userRepository.save(user);
	}
	
}
