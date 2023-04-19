package com.example.pawsback.paws.user.model.dto;

import com.example.pawsback.paws.user.model.Roles;
import lombok.Data;

@Data
public class InfoDTO {
    private String email;
    private Roles role;
    private String name;
    private String surname;
    private int phoneNumber;
    private String description;


}
