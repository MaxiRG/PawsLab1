package com.example.pawsback.paws.post.model.dto;

import com.example.pawsback.paws.user.model.User;
import lombok.Data;

@Data
public class PostDTO {
    private Integer id;
    private String petName, race, description;
    private Boolean sex;
    private Integer age;
    private User user;
}
