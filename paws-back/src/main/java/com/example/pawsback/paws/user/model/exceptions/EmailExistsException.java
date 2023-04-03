package com.example.pawsback.paws.user.model.exceptions;

public class EmailExistsException extends Exception{
    public EmailExistsException(String errorMessage) {
        super(errorMessage);
    }
}
