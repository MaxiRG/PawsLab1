package com.example.pawsback.paws.review.model.dto;

import com.example.pawsback.paws.user.model.User;
import lombok.Data;

@Data
public class ReviewDTO {
    private int value;
    private User author;
    private int subjectId;
}
