package com.crypticwrites.be.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.model.Post;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

	@Transactional
	List<Post> findByCreator_Email(String email);

//    Optional<LoginUser> findByEmail(String email);
}
