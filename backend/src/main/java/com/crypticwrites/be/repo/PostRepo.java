package com.crypticwrites.be.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crypticwrites.be.model.Post;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

}
