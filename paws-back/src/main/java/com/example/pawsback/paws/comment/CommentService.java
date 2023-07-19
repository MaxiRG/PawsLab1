package com.example.pawsback.paws.comment;

import com.example.pawsback.paws.comment.model.Comment;
import com.example.pawsback.paws.comment.model.Type;
import com.example.pawsback.paws.comment.model.dto.CommentDTO;
import com.example.pawsback.paws.comment.model.dto.CreateCommentDTO;
import com.example.pawsback.paws.favourite.model.Favourite;
import com.example.pawsback.paws.mail.MailSenderService;
import com.example.pawsback.paws.mail.model.MailType;
import com.example.pawsback.paws.post.PostRepository;
import com.example.pawsback.paws.post.PostService;
import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.user.UserService;
import com.example.pawsback.paws.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final UserService userService;
    private final CommentRepository commentRepository;
    private final MailSenderService mailSenderService;
    private final PostRepository postRepository;

    @Autowired
    public CommentService(UserService userService, CommentRepository commentRepository, MailSenderService mailSenderService, PostService postService, PostRepository postRepository) {
        this.userService = userService;
        this.commentRepository = commentRepository;
        this.mailSenderService = mailSenderService;
        this.postRepository = postRepository;
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

    public Comment save(CreateCommentDTO createCommentDTO, String token) throws NoAuthorizationException {
        Comment comment = new Comment();
        comment.setText(createCommentDTO.getText());
        comment.setType(createCommentDTO.getType());
        comment.setSubjectId(createCommentDTO.getSubjectId());
        comment.setAuthor(userService.getByToken(token));
        sendMailsForComments(comment);
        return commentRepository.save(comment);
    }

    public void sendMailsForComments(Comment comment) throws NoAuthorizationException {
        if(comment.getType() == Type.POST){
            Post post = postRepository.findPostById((long) comment.getSubjectId());
            String email = post.getUser().getEmail();
            mailSenderService.sendMail(MailType.CREATECOMMENT, email);
            List<Favourite> favourites = post.getFavourites();
            for(Favourite favourite:favourites){
                User user = favourite.getUser();
                String favouriteEmail = user.getEmail();
                mailSenderService.sendMail(MailType.FAVOURITERECIEVECOMMENT, favouriteEmail);
            }
        }else if(comment.getType() == Type.COMMENT){
            String email = userService.getById(comment.getSubjectId()).getEmail();
            mailSenderService.sendMail(MailType.CREATEANSWER, email);
        }else if(comment.getType() == Type.SHELTER){
            String email = userService.getById(comment.getSubjectId()).getEmail();
            mailSenderService.sendMail(MailType.CREATEPROFILECOMMENT, email);
        }

    }

    public List<Comment> getCommentsOfSubject(Type type, int subjectId){
        return commentRepository.findCommentByTypeAndSubjectId(type, subjectId);
    }
}
