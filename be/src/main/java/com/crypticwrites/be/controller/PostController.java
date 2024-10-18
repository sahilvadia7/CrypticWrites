package com.crypticwrites.be.controller;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.crypticwrites.be.model.LoginUser;
import com.crypticwrites.be.model.Post;
import com.crypticwrites.be.service.PostService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService service;
    
    @PostMapping(value = "/addPost", consumes = {"multipart/form-data"})
    public ResponseEntity<Post> addPost(@RequestPart Post post, @RequestPart MultipartFile image) {
        try {
            // Check if the creator is null
            if (post.getCreator() == null || post.getCreator().getEmail() == null) {
                throw new IllegalArgumentException("Creator email is missing");
            }

            // Fetch the creator (LoginUser) by email
            LoginUser creator = service.findByEmail(post.getCreator().getEmail())
                                        .orElseThrow(() -> new RuntimeException("User not found"));

            post.setCreator(creator);

            // Save the post and image
            Post savedPost = service.addPost(post, image);

            return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("post/{id}/image")
    public ResponseEntity<byte[]> getImageByPostId(@PathVariable Long id) {
        Post post = service.getPostById(id);
        return new ResponseEntity<>(post.getImageData(), HttpStatus.OK);
    }

    @GetMapping("/post")
    public List<Post> getAllPost() {
        return service.getAllPost();
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Post> findPostById(@PathVariable("id") Long id) {
        Post post = service.getPostById(id);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/creator/{email}")
    public List<Post> getPostsByEmail(@PathVariable String email) {
        List<Post> posts = service.getPostsByUserEmail(email);
        return posts.stream()
                    .map(post -> new Post(post.getId(),post.getTitle(), post.getDescription()))
                    .collect(Collectors.toList());
    }
    
    @DeleteMapping("/deletePost/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        try {
            service.deletePostById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
