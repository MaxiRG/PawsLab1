package com.example.pawsback.paws.user.model.dto;

import lombok.Data;

@Data
public class ChangePhoneNumberDTO {
    int oldPhoneNumber;
    int newPhoneNumber;
}
