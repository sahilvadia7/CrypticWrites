package com.crypticwrites.be.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crypticwrites.be.model.Token;
import com.crypticwrites.be.service.TokenService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RegToken {

    @Autowired
    private TokenService service;

    @PostMapping("/addToken")
    public ResponseEntity<Token> addToken(@RequestBody Token token) {
        if (token != null) {
            Token savedToken = service.addToken(token);
            return new ResponseEntity<>(savedToken, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAllToken")
    public List<Token> getAllToken() {
        return service.getAllToken();
    }

    @PutMapping("/updateTokenStatus/{id}")
    public ResponseEntity<Token> updateStatus(@PathVariable Long id, @RequestBody Token updatedToken) {
        Optional<Token> existingToken = service.findById(id);
        if (existingToken.isPresent()) {
            Token token = existingToken.get();
            token.setStatus(updatedToken.getStatus());
            Token savedToken = service.updateStatus(token);
            return new ResponseEntity<>(savedToken, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteToken/{id}")
    public ResponseEntity<Void> deleteToken(@PathVariable Long id) {
        service.deleteToken(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getTokenByString/{token}")
    public ResponseEntity<Token> getTokenByString(@PathVariable String token) {
        Optional<Token> foundToken = service.findByToken(token);
        return foundToken.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                         .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
