package com.example.pawsback.paws.review;

import com.example.pawsback.paws.review.model.dto.CreateReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @PostMapping("/createReview")
    public ResponseEntity<?> createReview(@RequestBody CreateReviewDTO createReviewDTO, @RequestHeader("Authorization") String token){
        try{
            ReviewDTO reviewDTO = reviewService.toDto(reviewService.save(createReviewDTO, token));
            return new ResponseEntity<>(reviewDTO, HttpStatus.OK);
        }
        catch{

        }
    }
}
