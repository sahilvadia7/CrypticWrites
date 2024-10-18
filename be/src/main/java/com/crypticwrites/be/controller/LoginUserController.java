package com.crypticwrites.be.controller;


import java.util.List;
import java.util.Optional;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.service.loginService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginUserController {
	
	@Autowired
	private loginService service;

	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginUser loginUser) {
	    // Authenticate the user by checking credentials in the register table
	    boolean isAuthenticated = service.authenticate(loginUser.getEmail(), loginUser.getPassword());

	    if (isAuthenticated) {
	        // Check if the user already has an active session in the login table
	        Optional<LoginUser> existingLoginOptional = service.findByEmail(loginUser.getEmail());

	        if (existingLoginOptional.isPresent()) {
	            // User already logged in, return existing login data
	            return new ResponseEntity<>(existingLoginOptional.get(), HttpStatus.OK);
	        } else {
	            // User is authenticated but not logged in, create a new login entry
	            LoginUser newLogin = service.logedIn(loginUser); // Save new login info to the login table
//	            System.out.println(newLogin.getRole());
	            return new ResponseEntity<>(newLogin, HttpStatus.OK);
	        }
	    } else {
	        // Invalid credentials
	        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
	    }
	}

	 @GetMapping("getAll")
	 public ResponseEntity<List<LoginUser>> getAll(){
		 return new ResponseEntity<>(service.getAll(),HttpStatus.OK);
	 }
	 
	 

	    @DeleteMapping("/logout/{email}")
	    public ResponseEntity<?> logoutUser(@PathVariable String email) {
	        try {
	            service.deleteLoginRecordByEmail(email);  // Service method to delete record
	            return new ResponseEntity<>("Logout successful", HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>("Error during logout", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

	    @DeleteMapping("/deleteUser/{id}")
	    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
	        try {
	            service.deleteUserById(id);
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
	    @PutMapping("/updateUser/{id}")
	    public ResponseEntity<LoginUser> updateUser(@PathVariable Long id, @RequestBody LoginUser updatedUser) {
	        Optional<LoginUser> existingUser = service.findById(id);
	        if (existingUser.isPresent()) {
	            LoginUser user = existingUser.get();
	            user.setId(id);
	            user.setEmail(updatedUser.getEmail());
	            user.setRole(updatedUser.getRole());
	            // Other updates
	            
	            LoginUser savedUser = service.saveUser(user);
	            return new ResponseEntity<>(savedUser, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }


}
