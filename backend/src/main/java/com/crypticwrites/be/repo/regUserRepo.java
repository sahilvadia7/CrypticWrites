package com.crypticwrites.be.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crypticwrites.be.model.RegisterUser;

@Repository
public interface regUserRepo extends JpaRepository<RegisterUser, Long>{

}
