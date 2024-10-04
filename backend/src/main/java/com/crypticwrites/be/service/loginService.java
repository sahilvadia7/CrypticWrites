package com.crypticwrites.be.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.repo.loginRepo;

@Service
public class loginService {

	@Autowired
	private loginRepo repo;		
	
	public boolean authenticate(String email, String password) {	
        LoginUser user = repo.findByEmail(email);
		if(user != null) {
			if(password.equals(user.getPassword())) {
				return true;
			}
			return false;
		}
		System.out.print(user.getEmail());
		return false;
	}



}
