package com.example.pawsback.paws.comment.model.dto;

import com.example.pawsback.paws.comment.model.Type;
import com.example.pawsback.paws.user.model.User;
import lombok.Data;

@Data
public class CommentDTO {
    private int id;
    private String text;
    private User author;
    private Type type;
    private int subjectId;
}
