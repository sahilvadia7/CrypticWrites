package com.crypticwrites.be.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crypticwrites.be.model.LoginUser;

public interface loginRepo extends JpaRepository<LoginUser, Long>{
    LoginUser findByEmail(String email);

}
