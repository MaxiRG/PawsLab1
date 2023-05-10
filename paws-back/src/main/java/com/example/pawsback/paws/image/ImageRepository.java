package com.example.pawsback.paws.image;

import com.example.pawsback.paws.image.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findImageByPostId(int postId);
}
