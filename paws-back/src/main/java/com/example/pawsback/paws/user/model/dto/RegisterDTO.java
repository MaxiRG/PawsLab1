package com.example.pawsback.paws.user.model.dto;


import lombok.Data;

@Data
public class RegisterDTO {
    private final String email, password, role;

}
