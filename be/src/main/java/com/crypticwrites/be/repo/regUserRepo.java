package com.crypticwrites.be.repo;

import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crypticwrites.be.model.RegisterUser;

@Repository
public interface regUserRepo extends JpaRepository<RegisterUser, Long>{

	Optional<RegisterUser> findByEmail(String email);
}
