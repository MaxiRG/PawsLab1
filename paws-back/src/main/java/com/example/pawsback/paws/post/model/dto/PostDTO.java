package com.example.pawsback.paws.post.model.dto;

import lombok.Data;

@Data
public class PostDTO {
    private String petName, race, description;
    private Boolean sex;
    private Integer age;
}
