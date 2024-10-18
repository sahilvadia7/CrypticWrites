package com.crypticwrites.be.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crypticwrites.be.model.RegisterUser;
import com.crypticwrites.be.service.RegUserService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class RegUserController {
	
	
	@Autowired
	private RegUserService service;
	
	@PostMapping("/regUser")
	public ResponseEntity<String> regUser(@RequestBody RegisterUser reguser) {

	    // Check if the role is null or empty and set a default role
//	    if (reguser.getRole() == null || reguser.getRole().isEmpty()) {
//	        reguser.setRole("creator"); // Setting default role to "creator"
//	    }
//	    
	    String result = service.regUser(reguser);

	    if (result != null) {
	        if (result.equals("Email is already registered")) {
	            return ResponseEntity.badRequest().body(result); // Return bad request if email is taken
	        } else {
	            return new ResponseEntity<>(result, HttpStatus.CREATED); // Return success if registration is successful
	        }
	    } else {
	        return new ResponseEntity<>("Registration failed, user not found", HttpStatus.NOT_FOUND); // Return meaningful message if user is not found
	    }
	}

	
	
	@GetMapping("/getAllRegUser")
	public List<RegisterUser> getAllRegUser(){
		return service.getAllRegUser();
	}
	
	
	
//	not working yet
	@GetMapping("/getRegUer/{id}")
	public RegisterUser getRegUser(@PathVariable Long id) {
		return service.getRegUser(id);
	}

	
//	Find solution		
//	@PutMapping("/editRegUser/{id}")
//	public ResponseEntity<RegisterUser> updateRegUser(@RequestBody RegisterUser user){
//			service.updateRegUser(user);
//			return service.getRegUser();
//	}
	
}
