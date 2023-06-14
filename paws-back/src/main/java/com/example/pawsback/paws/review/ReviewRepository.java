package com.example.pawsback.paws.review;

import com.example.pawsback.paws.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    public List<Review> findReviewsBySubjectId(int subjectId);
}
