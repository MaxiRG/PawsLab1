package com.example.pawsback.paws.comment.model.dto;

import com.example.pawsback.paws.comment.model.Type;
import lombok.Data;

@Data
public class CreateCommentDTO {
    private String text;
    private Type type;
    private int subjectId;
}
