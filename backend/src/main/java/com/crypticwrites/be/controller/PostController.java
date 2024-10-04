package com.crypticwrites.be.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.crypticwrites.be.model.Post;
import com.crypticwrites.be.service.PostService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController{
	
	@Autowired
	private PostService service;
	
	 @PostMapping(value = "/addPost", consumes = {"multipart/form-data"})
	    public ResponseEntity<Post> addPost(@RequestPart Post post, @RequestPart MultipartFile image){
	           Post savedPost;
			try {
				savedPost = service.addPost(post,image);
	        	   return new ResponseEntity<>(savedPost,HttpStatus.CREATED);
			} catch (IOException e) {
				return new ResponseEntity<Post>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
	           
	    }
	 
	@GetMapping("post/{id}/image")
	public ResponseEntity<byte[]> getImageByPostId(@PathVariable Long id){
		Post post = service.getPostById(id);
		
		
			return new ResponseEntity<>(post.getImageData(),HttpStatus.OK);
		
	}
	
	@GetMapping("/post")
	public List<Post> getAllPost(){
		return service.getAllPost();
	}

	@GetMapping("/post/{id}")
	public ResponseEntity<Post> findPostById(@PathVariable("id") Long id) {  // Explicitly specify "id"
	    Post post = service.getPostById(id);
	    if (post != null) {
	        return new ResponseEntity<>(post, HttpStatus.OK);  // Return 200 OK with the post data
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Return 404 if the post is not found
	    }
	}


}
