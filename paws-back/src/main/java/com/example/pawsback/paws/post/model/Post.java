package com.example.pawsback.paws.post.model;

import com.example.pawsback.paws.user.model.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Post {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "pet_name")
    private String petName;

    @Column(name = "sex")
    private Boolean sex;

    @Column(name = "age")
    private Integer age;

    @Column(name = "race")
    private String race;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name="user_email")
    private User user;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
}
