package com.crypticwrites.be.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

//import com.crypticwrites.be.controller.T;
import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.model.RegisterUser;
import com.crypticwrites.be.repo.loginRepo;
import com.crypticwrites.be.repo.regUserRepo;

@Service
public class loginService {

	 @Autowired
	    private loginRepo loginRepo;

	    @Autowired
	    private regUserRepo regRepo;

	    public boolean authenticate(String email, String password) {	
	        Optional<RegisterUser> optionalUser = regRepo.findByEmail(email);
	        
	        if (optionalUser.isPresent()) {
	            RegisterUser user = optionalUser.get();
	            if (password.equals(user.getPassword())) {
	                System.out.println("Authentication successful for user: " + user.getEmail());
	                return true;
	            }
	            return false; // Incorrect password
	        }

	        System.out.println("User with email " + email + " not found.");
	        return false; // User not found
	    }

		public LoginUser logedIn(LoginUser loginUser) {
			loginUser.setRole("creator");
			return loginRepo.save(loginUser);
		}

		public List<LoginUser> getAll() {
			return loginRepo.findAll();
		}

		 public Optional<LoginUser> findByEmail(String email) {
		        // Fetch user from the register table based on email
		        return loginRepo.findByEmail(email);
		    }

		public void deleteLoginRecordByEmail(String email) {
				loginRepo.deleteByEmail(email);
		}

		public void deleteUserById(Long id) {
			loginRepo.deleteUserById(id);
			
		}

		public Optional<LoginUser> findById(Long id) {
			return loginRepo.findById(id);
		}

		public LoginUser saveUser(LoginUser user) {
			return loginRepo.save(user);
		}

		

		

}
