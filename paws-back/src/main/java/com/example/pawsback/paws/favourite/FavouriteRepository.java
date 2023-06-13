package com.example.pawsback.paws.favourite;

import com.example.pawsback.paws.favourite.model.Favourite;
import com.example.pawsback.paws.post.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite,Long> {
    Favourite findFavouriteById(Long id);
    @Query("SELECT u FROM Favourite u WHERE u.user.id = :userId AND u.post.id = :postId")
    Favourite findByUserIdAndPostId(@Param("userId") Long userId,@Param("postId") Long postId);
    @Query("SELECT u FROM Favourite u WHERE u.user.id = :userId AND u.post.isAdopted = FALSE ")
    List<Favourite> findFavouritesByUserId(@Param("userId") Long userId);
}
