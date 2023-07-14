package com.example.pawsback.paws.request.model.exceptions;

public class PostIsAdoptedException extends Exception{
    public PostIsAdoptedException(String errorMessage){
        super(errorMessage);
    }
}
