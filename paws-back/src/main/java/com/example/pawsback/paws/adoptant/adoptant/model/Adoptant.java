package com.example.pawsback.paws.adoptant.adoptant.model;

import jakarta.persistence.*;

@Entity
@Table(name = "adoptant")
public class Adoptant {

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;


    public Adoptant(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Adoptant() {

    }

    public String getPassword() {
        return this.password;
    }


    public String getEmail() {
        return this.email;
    }


    public void setEmail(String email){
        this.email = email;
    }
}
