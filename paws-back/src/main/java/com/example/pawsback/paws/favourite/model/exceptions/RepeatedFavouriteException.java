package com.example.pawsback.paws.favourite.model.exceptions;

public class RepeatedFavouriteException extends Exception{
    public RepeatedFavouriteException(String errorMessage){
        super(errorMessage);
    }
}
