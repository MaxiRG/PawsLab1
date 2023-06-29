package com.example.pawsback.paws.review;

import com.example.pawsback.paws.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    public List<Review> findReviewsBySubjectId(int subjectId);
    @Query("SELECT u FROM Review u WHERE u.subjectId = :subjectId AND u.author.id = :authorId")
    public Review findReviewBySubjectIdAndAuthorId(@Param("subjectId") Long subjectId,@Param("authorId")Long authorId);
    boolean existsBySubjectIdAndAuthorId(int subjectId, Long authorId);

}
