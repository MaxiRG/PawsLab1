package com.example.pawsback.paws.request.model;

import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.user.model.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "request")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "adopter_id")
    private User adopter;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "accepted")
    private boolean accepted;

    @Column(name = "answered")
    private boolean answered;
}
