package com.crypticwrites.be.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.service.loginService;

@RestController
@RequestMapping("/api/user")
public class LoginUserController {
	
	@Autowired
	private loginService service;

	
	 @PostMapping("/login")
	    public ResponseEntity<?> loginUser(@RequestBody LoginUser loginUser) {
		    boolean isAuthenticated = service.authenticate(loginUser.getEmail(),loginUser.getPassword());

	        if (isAuthenticated) {
	            return new ResponseEntity<>("Login successful", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
	        }
	    }
	
}
