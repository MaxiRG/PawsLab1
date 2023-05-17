package com.example.pawsback.paws.comment.model;

import com.example.pawsback.paws.user.model.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;

    @Column(name = "type")
    Type type;

    @Column(name = "subject_id")
    int subjectId;

}
