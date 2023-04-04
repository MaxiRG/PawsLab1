package com.example.pawsback.paws.user.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_") // "user" is a reserved word in postgres.
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "phone_Number")
    private int phoneNumber;

    @Column(name = "description")
    private String description;

    public User(String email, String password){
        this.email = email;
        this.password = password;
    }

    public User() {}
}
