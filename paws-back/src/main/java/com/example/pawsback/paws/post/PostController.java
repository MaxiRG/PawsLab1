package com.example.pawsback.paws.post;

import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.dto.PostDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/createPost")
    public ResponseEntity<?> createPost(@RequestBody Post post, @RequestHeader("authorization") String token){
        try{
            PostDTO postDTO = postService.toDto(postService.save(post, token), token);
            return new ResponseEntity<>(postDTO, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Failed to create post", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getMyPosts")
    public List<Post> getMyPosts(@RequestHeader("Authorization") String token){
        return postService.getMyPosts(token);
    }
    
}
