package com.crypticwrites.be.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.crypticwrites.be.model.Post;
import com.crypticwrites.be.repo.PostRepo;

@Service
public class PostService {
	
	@Autowired
	private PostRepo repo;
	
	public Post addPost(Post post, MultipartFile image) throws IOException {
		post.setImageName(image.getOriginalFilename());
		post.setImageType(image.getContentType());
		post.setImageData(image.getBytes());
		return repo.save(post);
	}

	public List<Post> getAllPost() {
		return repo.findAll();
	}

	public Post getPostById(Long id) {
		return repo.findById(id).orElse(null);
	}

		

	
}
