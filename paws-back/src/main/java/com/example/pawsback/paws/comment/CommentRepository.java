package com.example.pawsback.paws.comment;

import com.example.pawsback.paws.comment.model.Comment;
import com.example.pawsback.paws.comment.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByTypeAndSubjectId(Type type, int subjectId);
}
