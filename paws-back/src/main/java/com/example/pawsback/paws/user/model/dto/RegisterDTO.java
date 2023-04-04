package com.example.pawsback.paws.user.model.dto;


import com.example.pawsback.paws.user.model.Roles;
import lombok.Data;

@Data
public class RegisterDTO {
    private final String email, password;
    private final Roles role;

}
