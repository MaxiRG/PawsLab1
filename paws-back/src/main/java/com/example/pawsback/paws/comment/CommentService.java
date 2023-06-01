package com.example.pawsback.paws.comment;

import com.example.pawsback.paws.comment.model.Comment;
import com.example.pawsback.paws.comment.model.Type;
import com.example.pawsback.paws.comment.model.dto.CommentDTO;
import com.example.pawsback.paws.comment.model.dto.CreateCommentDTO;
import com.example.pawsback.paws.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final UserService userService;
    private final CommentRepository commentRepository;

    public CommentService(UserService userService, CommentRepository commentRepository) {
        this.userService = userService;
        this.commentRepository = commentRepository;
    }


    public CommentDTO toDto(Comment comment, String token){
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(Math.toIntExact(comment.getId()));
        commentDTO.setAuthor(comment.getAuthor());
        commentDTO.setText(comment.getText());
        commentDTO.setType(comment.getType());
        commentDTO.setSubjectId(comment.getSubjectId());
        return commentDTO;
    }

    public Comment save(CreateCommentDTO createCommentDTO, String token) {
        Comment comment = new Comment();
        comment.setText(createCommentDTO.getText());
        comment.setType(createCommentDTO.getType());
        comment.setSubjectId(createCommentDTO.getSubjectId());
        comment.setAuthor(userService.getByToken(token));
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsOfSubject(Type type, int subjectId){
        return commentRepository.findCommentByTypeAndSubjectId(type, subjectId);
    }
}
