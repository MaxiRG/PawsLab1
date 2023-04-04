package com.example.pawsback.paws.user.model.dto;

import lombok.Data;

@Data
public class ChangePasswordDTO {
    private String oldPassword, newPassword;
}