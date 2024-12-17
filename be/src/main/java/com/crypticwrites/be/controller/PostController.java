package com.crypticwrites.be.controller;

import java.io.IOException;
import java.util.Date;
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
    public ResponseEntity<?> addPost(@RequestPart Post post, @RequestPart MultipartFile image) {
        try {
            if (post.getCreator() == null || post.getCreator().getEmail() == null) {
                return new ResponseEntity<>("Creator email is required.", HttpStatus.BAD_REQUEST);
            }

            LoginUser creator = service.findByEmail(post.getCreator().getEmail())
                                       .orElseThrow(() -> new RuntimeException("User not found"));

            post.setCreator(creator);

            if (post.getPostDate() == null) {
//                post.setPostDate(new Date(System.currentTimeMillis())); // Set current date
            }

            if (post.getCategory() == null || post.getCategory().isEmpty()) {
                post.setCategory("Uncategorized");
            }

            Post savedPost = service.addPost(post, image);

            return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to process the image.", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @GetMapping("post/{id}/image")
    public ResponseEntity<byte[]> getImageByPostId(@PathVariable Long id) {
        Post post = service.getPostById(id);
        return new ResponseEntity<>(post.getImageData(), HttpStatus.OK);
    }

    @GetMapping("/post")
    public List<Post> getAllPost() {
        return service.getAllPost().stream()
                .map(post -> {
                    post.setAuthor(post.getCreator() != null ? post.getCreator().getEmail() : "Unknown Author");
                    if (post.getCategory() == null || post.getCategory().isEmpty()) {
                        post.setCategory("Uncategorized");
                    }
                    return post;
                })
                .collect(Collectors.toList());
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
        return service.getPostsByUserEmail(email).stream()
                .map(post -> {
                    post.setAuthor(post.getCreator() != null ? post.getCreator().getEmail() : "Unknown Author");
                    if (post.getCategory() == null || post.getCategory().isEmpty()) {
                        post.setCategory("Uncategorized");
                    }
                    return post;
                })
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
