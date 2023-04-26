package com.example.pawsback.paws.post.model.dto;

import lombok.Data;

@Data
public class ChangeAdoptedStatusDTO {
    private final int postID;
    private final boolean newStatus;
}
