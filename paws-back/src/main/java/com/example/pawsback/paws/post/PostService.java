package com.example.pawsback.paws.post;


import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.dto.PostDTO;
import com.example.pawsback.paws.user.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserService userService;

    public PostService(PostRepository postRepository,  UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public Post save(Post post, String rawToken) {
        final String token = rawToken.substring(7);
        post.setUser(userService.getByToken(token));
        userService.getByToken(token).getPosts().add(post);
        return postRepository.save(post);
    }

    public PostDTO toDto(Post post, String rawToken) {
        final String token = rawToken.substring(7);
        PostDTO postDTO = new PostDTO();
        postDTO.setDescription(post.getDescription());
        postDTO.setPetName(post.getPetName());
        postDTO.setAge(post.getAge());
        postDTO.setSex(post.getSex());
        postDTO.setRace(postDTO.getRace());
        postDTO.setUser(userService.getByToken(token));
        return postDTO;
    }

    public List<Post> getMyPosts(String rawToken) {
        final String token = rawToken.substring(7);
        return postRepository.findPostByUserId(userService.getByToken(token).getId());
    }
}
