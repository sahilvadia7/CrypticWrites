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
	public ResponseEntity<RegisterUser> regUser(@RequestBody RegisterUser reguser) {
		
		RegisterUser user = service.regUser(reguser);
		
		if(user != null) {
		return new ResponseEntity<>(user,HttpStatus.CREATED);
		}
		else {
			 return new ResponseEntity<>(HttpStatus.NOT_FOUND);	
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
