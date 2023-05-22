package com.example.pawsback.paws.post.model.dto;

import lombok.Data;

@Data
public class ChangePostAgeDTO {
    private final int postID;
    private final int age;
}
