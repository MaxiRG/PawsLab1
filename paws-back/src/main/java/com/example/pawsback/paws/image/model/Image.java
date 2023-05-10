package com.example.pawsback.paws.image.model;

import com.example.pawsback.paws.post.model.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Blob;

@Data
@Entity
@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] imageData;

    @JsonIgnore
    @OneToOne(mappedBy = "profilePicture")
    private Post post;
}
