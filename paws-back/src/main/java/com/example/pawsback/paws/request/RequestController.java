package com.example.pawsback.paws.request;

import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.request.model.Request;
import com.example.pawsback.paws.request.model.exceptions.PostIsAdoptedException;
import com.example.pawsback.paws.request.model.exceptions.NotAnsweredException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Transactional
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
        catch(NotAnsweredException | PostIsAdoptedException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
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

    @GetMapping("/getMyRequests")
    public ResponseEntity<?> getMyRequests(@RequestHeader("Authorization") String token){
        try{
            return new ResponseEntity<>(requestService.getMyRequests(token), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getReceivedRequestsForShelter")
    public ResponseEntity<?> getReceivedRequestsForShelter(@RequestHeader("Authorization") String token){
        try{
            return new ResponseEntity<>(requestService.getPendingReceivedRequestsForShelter(token), HttpStatus.OK);
        }
        catch(PostIsAdoptedException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getReceivedRequestsForPost/{post_id}")
    public ResponseEntity<?> getReceivedRequestsForPost(@PathVariable Long post_id){
        try{
            return new ResponseEntity<>(requestService.getPendingReceivedRequestsForPost(post_id), HttpStatus.OK);
        }
        catch(PostIsAdoptedException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/isRequestAnswered/{request_id}")
    public ResponseEntity<?> isRequestAnswered(@PathVariable int request_id){
        try{
            return new ResponseEntity<>(requestService.isRequestAnswered(request_id), HttpStatus.OK);
        }
        catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Throws exception if the response is not answered, so it is recommended to check with isRequestAnswered method first.
    @GetMapping("/getResponseToRequest/{request_id}")
    public ResponseEntity<?> getResponseToRequest(@PathVariable int request_id) {
        try{
            return new ResponseEntity<>(requestService.getResponse(request_id), HttpStatus.OK);
        } catch (NotAnsweredException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
