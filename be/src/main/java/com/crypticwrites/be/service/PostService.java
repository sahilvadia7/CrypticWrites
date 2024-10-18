package com.crypticwrites.be.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.model.Post;
import com.crypticwrites.be.repo.PostRepo;
import com.crypticwrites.be.repo.loginRepo;

@Service
public class PostService {
	
	@Autowired
	private PostRepo repo;
	
	@Autowired
	private loginRepo logRepo;
	
	
	@Transactional
	public Post addPost(Post post, MultipartFile image) throws IOException {
		post.setImageName(image.getOriginalFilename());
		post.setImageType(image.getContentType());
		post.setImageData(image.getBytes());
		return repo.save(post);
	}

	@Transactional
	public List<Post> getAllPost() {
		return repo.findAll();
	}

	public Post getPostById(Long id) {
		return repo.findById(id).orElse(null);
	}

	@Transactional
	 public List<Post> getPostsByUserEmail(String email) {
	        return repo.findByCreator_Email(email);
	    }

	 public Optional<LoginUser> findByEmail(String email) {
	        return logRepo.findByEmail(email);
	    }
	 
	 public void deletePostById(Long id) {
		    repo.deleteById(id);
		}


	
}
