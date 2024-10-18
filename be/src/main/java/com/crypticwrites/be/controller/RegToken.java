package com.crypticwrites.be.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.model.Token;
import com.crypticwrites.be.service.TokenService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RegToken {
	
	@Autowired
	private TokenService service;
	
	@PostMapping("addToken")
	public ResponseEntity<Token> addToken(@RequestBody Token token) {
		if(token != null) {
		service.addToken(token);
		return new ResponseEntity<>(token,HttpStatus.ACCEPTED);
		
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@GetMapping("getAllToken")
	public List<Token> getAllToken() {
		return service.getAllToken();
	}
	
	
	@PutMapping("updateTokenStatus/{id}")
	public ResponseEntity<Token> updateStatus(@PathVariable Long id, @RequestBody Token updatedToken) {
	    Optional<Token> existingApplication = service.findById(id);
	    
	    if (existingApplication.isPresent()) {
	        Token token = existingApplication.get();
	        token.setStatus(updatedToken.getStatus());
	        
	        Token savedToken = service.updateStatus(token);
	        return new ResponseEntity<>(savedToken, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	

	@GetMapping("getTokenByString/{token}")
	public ResponseEntity<Token> getTokenByString(@PathVariable String token) {
	    Optional<Token> foundToken = service.findByToken(token);
	    System.out.println(foundToken);
	    if (foundToken.isPresent()) {
	        System.out.println("retrun token");
	        return new ResponseEntity<>(foundToken.get(), HttpStatus.OK);

	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

     

}
