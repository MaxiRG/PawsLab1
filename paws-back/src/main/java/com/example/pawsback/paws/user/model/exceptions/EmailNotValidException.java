package com.example.pawsback.paws.user.model.exceptions;

public class EmailNotValidException extends Exception{
    public EmailNotValidException(String errorMessage) {
        super(errorMessage);
    }
}
