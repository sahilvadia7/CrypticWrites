package com.crypticwrites.be.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegisterUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long regId;
	private String email;
	private String password;
	private String role;
	


}
