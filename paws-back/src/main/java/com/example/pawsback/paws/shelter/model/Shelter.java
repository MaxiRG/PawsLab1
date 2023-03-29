package com.example.pawsback.paws.shelter.model;


import jakarta.persistence.*;

@Entity
@Table(name = "Shelter")
public class Shelter {

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public Shelter(String email, String password){
        this.email = email;
        this.password = password;
    }

    public Shelter() {

    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
