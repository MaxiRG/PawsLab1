package com.example.pawsback.paws.post;

import com.example.pawsback.paws.post.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostByUserId(Long id);
    Post findPostByPetName(String petName);
    Post findPostById(int postId);
    @Query("SELECT u FROM Post u WHERE u.isAdopted = false")
    List<Post> findAllNonAdoptedPosts();
    @Query("SELECT p FROM Post p WHERE p.isAdopted = false " + "AND (:minAge IS NULL OR p.age >= :minAge) " + "AND (:maxAge IS NULL OR p.age <= :maxAge) " + "AND (:sex IS NULL OR p.sex = :sex) " + "AND (:race IS NULL OR p.race = :race)")
    List<Post> filteredPostSearch(@Param("minAge") Integer minAge, @Param("maxAge") Integer maxAge, @Param("sex") Boolean sex, @Param("race") String race);
}
