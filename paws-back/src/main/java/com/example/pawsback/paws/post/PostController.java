package com.example.pawsback.paws.post;

import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.dto.PostDTO;
import org.springframework.beans.factory.annotation.Autowired;
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
    public PostDTO createPost(@RequestBody Post post, @RequestHeader("authorization") String token){
        return postService.toDto(postService.save(post, token), token);
    }

    @GetMapping("/getMyPosts")
    public List<Post> getMyPosts(@RequestHeader("Authorization") String token){
        return postService.getMyPosts(token);
    }
    
}
