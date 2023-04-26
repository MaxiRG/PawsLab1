package com.example.pawsback.paws.image.model;

import com.example.pawsback.paws.post.model.Post;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] imageData;

    @OneToOne(mappedBy = "profilePicture")
    private Post post;
}
