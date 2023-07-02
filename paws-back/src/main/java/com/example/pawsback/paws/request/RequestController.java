package com.example.pawsback.paws.request;

import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.request.model.Request;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class RequestController {
    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }


    @PostMapping("/createRequest/{post_id}")
    public ResponseEntity<?> createRequest(@PathVariable int post_id, @RequestHeader("Authorization") String token){
        try{
            Request request = requestService.save(post_id, token);
            return new ResponseEntity<>(request, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/answerRequest/{request_id}/{answer}")
    public ResponseEntity<?> answerRequest(@PathVariable int request_id, @PathVariable boolean answer, @RequestHeader("Authorization") String token){
        try{
            requestService.answerRequest(request_id, answer, token);
            return new ResponseEntity<>("Answer saved!", HttpStatus.OK);
        }
        catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (NoAuthorizationException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
