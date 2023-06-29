package com.example.pawsback.paws.review;

import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.review.model.dto.CreateReviewDTO;
import com.example.pawsback.paws.review.model.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        catch(NoAuthorizationException e){
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/getRating{subjectId}")
    public ResponseEntity<?> getReviews(@PathVariable int subjectId){
        try{
            float rating = reviewService.getRating(subjectId);
            return new ResponseEntity<>(rating, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getNumberOfReviews{subjectId}")
    public ResponseEntity<?> getNumberOfReviews(@PathVariable int subjectId){
        try{
            int numberOfReviews = reviewService.getNumberOfReviews(subjectId);
            return new ResponseEntity<>(numberOfReviews, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkUserRating/{subjectId}")
    public ResponseEntity<?> checkUserRating(@PathVariable int subjectId, @RequestHeader("Authorization") String token) {
        try {
            boolean hasRated = reviewService.hasUserRatedShelter(subjectId, token);
            return new ResponseEntity<>(hasRated, HttpStatus.OK);
        } catch (NoAuthorizationException e) {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
