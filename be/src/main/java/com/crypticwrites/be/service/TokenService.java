package com.crypticwrites.be.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crypticwrites.be.model.Token;
import com.crypticwrites.be.repo.TokenRepo;


@Service
public class TokenService {
	
	@Autowired
	private TokenRepo repo;
	

	public Token addToken(Token token) {
		return repo.save(token);
	}

	public List<Token> getAllToken() {
		return repo.findAll();
	}

    public Token updateStatus(Token token) {
        return repo.save(token); 
    }

    public Optional<Token> findById(Long id) {
        return repo.findById(id); 
    }
    
    public Optional<Token> findByToken(String token) {
        return repo.findByToken(token); 
    }

	public void deleteToken(Long id) {
		repo.deleteById(id);
	}

}
