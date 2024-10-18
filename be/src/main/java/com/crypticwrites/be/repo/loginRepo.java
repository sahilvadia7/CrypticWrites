package com.crypticwrites.be.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crypticwrites.be.model.LoginUser;

public interface loginRepo extends JpaRepository<LoginUser, Long>{
    Optional<LoginUser> findByEmail(String email);

	void deleteByEmail(String email);

	void deleteUserById(Long id);

}
