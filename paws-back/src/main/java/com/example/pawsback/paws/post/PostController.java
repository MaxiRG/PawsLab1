package com.example.pawsback.paws.post;

import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.dto.ChangeAdoptedStatusDTO;
import com.example.pawsback.paws.post.model.dto.PostDTO;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Transactional
@RestController
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }


    @PostMapping(value = "/createPost", consumes = {"application/json"})
    public ResponseEntity<?> createPost(@RequestBody Post post, @RequestHeader("Authorization") String token){
        try{
            PostDTO postDTO = postService.toDto(postService.save(post, token), token);
            return new ResponseEntity<>(postDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create post", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value ="/modifyAdoptedStatus", consumes = {"application/json"})
    public ResponseEntity<Object> modifyAdoptedStatus(@RequestBody ChangeAdoptedStatusDTO changeStatusDTO, @RequestHeader("Authorization") String token){
        try{
            postService.modifyAdoptedStatus(changeStatusDTO.isNewStatus(), changeStatusDTO.getPostID(), token);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","changed status successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to change status, " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/getMyPosts")
    public ResponseEntity<?> getMyPosts(@RequestHeader("Authorization") String token) {
        try {
            return new ResponseEntity<>(postService.getMyPosts(token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to get posts", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/deletePost/{postId}", consumes = {"application/json"})
    public ResponseEntity<?> deletePost(@PathVariable int postId, @RequestHeader("Authorization") String token) {
        try {
            postService.delete(postId, token);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Post deleted successfully");
            return ResponseEntity.ok(response);
        } catch (NoAuthorizationException | EntityNotFoundException e) {
            return ResponseEntity.ok("{\"error\":\"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete Post");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @GetMapping("/getPost/{petName}")
    public ResponseEntity<?> getPost(@PathVariable String petName) {
        try {
            return new ResponseEntity<>(postService.getPost(petName),HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            return new ResponseEntity<>(postService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve posts", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
    

