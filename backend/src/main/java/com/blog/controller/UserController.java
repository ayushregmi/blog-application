package com.blog.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.dto.LoginRequest;
import com.blog.dto.LoginResponse;
import com.blog.dto.RegisterRequest;
import com.blog.dto.UserDto;
import com.blog.entity.User;
import com.blog.service.JwtService;
import com.blog.service.UserService;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "*")
public class UserController {
	
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;
	
	@GetMapping("/user")
	public String user() {
		return "User";
	}
	
	@PostMapping("/default")
	public String default_req() {
		return "Not OK";
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterRequest request){
		
		if (userService.getByUsername(request.getUsername()) != null) {
			System.out.println(request.getUsername());
			return new ResponseEntity<String>(String.format("User with username '%s' already exists", request.getUsername()), HttpStatus.CONFLICT);
		}
		
		userService.create(request);
		
		return new ResponseEntity<String>("User created", HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request){
		
		User user = userService.getByUsername(request.getUsername());
//		
//		if(user == null) {
//			return new ResponseEntity<String>(String.format("User with username %s does not exist", request.getUsername()), HttpStatus.NOT_FOUND);
//		}
		
		
		try {
			
		authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				request.getUsername(),
				request.getPassword()
			)
		);
		}catch(Exception e){
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		
	
		
		Map<String, Object> additionalClaims = new HashMap<String, Object>();
		additionalClaims.put("role", user.getRole().name());
		additionalClaims.put("username", user.getUsername());
		
		String jwtToken = jwtService.generateToken(additionalClaims, user);
		
		var response = new LoginResponse();
		response.setToken(jwtToken);
		response.setUser(new UserDto(user));
		response.setRole(user.getRole().name());
		
		return new ResponseEntity<LoginResponse>(response, HttpStatus.OK);
	}
	
}
