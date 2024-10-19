package com.blog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Default {
	@GetMapping("/default/hello")
	public ResponseEntity<?> defaultController(){
		return new ResponseEntity<String>("Ok", HttpStatus.OK);
	}
}
