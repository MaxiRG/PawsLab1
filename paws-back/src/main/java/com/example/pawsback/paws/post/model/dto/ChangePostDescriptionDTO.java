package com.example.pawsback.paws.post.model.dto;

import lombok.Data;

@Data
public class ChangePostDescriptionDTO {
    private final int postID;
    private final String description;
}
