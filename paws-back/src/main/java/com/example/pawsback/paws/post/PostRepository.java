package com.example.pawsback.paws.post;

import com.example.pawsback.paws.post.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostByUserId(Long id);
    Post findPostByPetName(String petName);
    Post findPostById(int postId);
}
