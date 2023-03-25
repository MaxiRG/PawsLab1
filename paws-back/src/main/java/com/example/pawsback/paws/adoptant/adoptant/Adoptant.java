package com.example.pawsback.paws.adoptant.adoptant;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "adoptant")
public class Adoptant {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

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

    // getters and setters
}
