package com.crypticwrites.be.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crypticwrites.be.model.RegisterUser;
import com.crypticwrites.be.repo.regUserRepo;

@Service
public class RegUserService {
	
	@Autowired
	private regUserRepo repo;


 
	public String regUser(RegisterUser reguser) {
		if (repo.findByEmail(reguser.getEmail()).isPresent()) {
            return "Email is already registered";
        }
		else {
			repo.save(reguser);		
			return "User registered successfully";		
		}
	
	}



	public List<RegisterUser> getAllRegUser() {
		return repo.findAll();
	}



	public RegisterUser updateRegUser(RegisterUser user) {
		return repo.save(user);
	}



	public RegisterUser getRegUser(Long id) {
		return repo.findById(id).orElse(null);

	}
	
	

}
