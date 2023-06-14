package com.example.pawsback.paws.review;

import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.review.model.Review;
import com.example.pawsback.paws.review.model.dto.CreateReviewDTO;
import com.example.pawsback.paws.review.model.dto.ReviewDTO;
import com.example.pawsback.paws.user.UserService;
import com.example.pawsback.paws.user.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserService userService;

    public ReviewService(ReviewRepository reviewRepository, UserService userService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
    }

    public ReviewDTO toDto(Review review){
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setAuthor(review.getAuthor());
        reviewDTO.setValue(review.getValue());
        reviewDTO.setSubjectId(reviewDTO.getSubjectId());
        return reviewDTO;
    }

    public Review save(CreateReviewDTO createReviewDTO, String token) throws NoAuthorizationException {
        User author = userService.getByToken(token);
        if(reviewRepository.findReviewBySubjectIdAndAuthorId(author.getId(), createReviewDTO.getSubjectId()) == null){
            throw new NoAuthorizationException("Already reviewed this shelter");
        }
        Review review = new Review();
        review.setAuthor(author);
        review.setValue(createReviewDTO.getValue());
        review.setSubjectId(createReviewDTO.getSubjectId());
        return reviewRepository.save(review);

    }

    public float getRating(int subjectId) {
        float total = 0;
        List<Review> reviews = reviewRepository.findReviewsBySubjectId(subjectId);
        float size = reviews.size();
        for (Review review : reviews) {
            total = total + review.getValue();
        }
        return total/size;
    }

    public int getNumberOfReviews(int subjectId){
        List<Review> reviews = reviewRepository.findReviewsBySubjectId(subjectId);
        return reviews.size();
    }
}
