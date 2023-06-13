package com.example.pawsback.paws.post.model;

import com.example.pawsback.paws.favourite.model.Favourite;
import com.example.pawsback.paws.image.model.Image;
import com.example.pawsback.paws.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name="post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column (name = "isAdopted")
    private boolean isAdopted;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private Image profilePicture;

//    @ManyToMany(mappedBy = "likedPosts")
//    private Set<User> favourites;
    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Favourite> favourites;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public User getUser(){
        return this.user;
    }
}
