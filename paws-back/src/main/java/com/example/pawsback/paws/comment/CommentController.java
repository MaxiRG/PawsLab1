package com.example.pawsback.paws.comment;

import com.example.pawsback.paws.comment.model.dto.CommentDTO;
import com.example.pawsback.paws.comment.model.dto.CreateCommentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }


    @PostMapping("/createComment")
    public ResponseEntity<?> createComment(@RequestBody CreateCommentDTO createCommentDTO, @RequestHeader("Authorization") String token){
        try{
            CommentDTO commentDTO = commentService.toDto(commentService.save(createCommentDTO, token), token);
            return new ResponseEntity<>(commentDTO, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
