package com.example.pawsback.paws.request.model.exceptions;

public class NotAnsweredException extends Exception{
    public NotAnsweredException(String errorMessage){
        super(errorMessage);
    }
}
