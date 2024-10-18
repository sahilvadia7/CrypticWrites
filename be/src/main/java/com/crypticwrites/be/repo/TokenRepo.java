package com.crypticwrites.be.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crypticwrites.be.model.Token;


@Repository
public interface TokenRepo extends JpaRepository<Token, Long>{
    Optional<Token> findByToken(String token); // Adjust "token" to match the actual field name in your Token entity
}
