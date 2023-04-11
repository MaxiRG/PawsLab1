package com.example.pawsback.paws.post.model.exceptions;

public class NoAuthorizationException extends Exception{
    public NoAuthorizationException(String errorMessage) {
        super(errorMessage);
    }
}
