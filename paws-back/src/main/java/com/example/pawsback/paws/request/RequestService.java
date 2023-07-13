package com.example.pawsback.paws.request;

import com.example.pawsback.paws.post.PostRepository;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.request.model.Request;
import com.example.pawsback.paws.request.model.exceptions.NotAnsweredException;
import com.example.pawsback.paws.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    private final UserService userService;
    private final PostRepository postRepository;
    private final RequestRepository requestRepository;

    public RequestService(UserService userService, PostRepository postRepository, RequestRepository requestRepository) {
        this.userService = userService;
        this.postRepository = postRepository;
        this.requestRepository = requestRepository;
    }

    public Request save(int post_id, String token) {
        Request request = new Request();
        request.setAdopter(userService.getByToken(token));
        request.setPost(postRepository.findPostById(post_id));
        return requestRepository.save(request);
    }

    public void answerRequest(int request_id, boolean answer, String token) throws NoAuthorizationException {
        Optional<Request> optional = requestRepository.findById((long) request_id);
        if(optional.isPresent()){
            Request request = optional.get();
            if(request.getPost().getUser().getId() == userService.getByToken(token).getId()){
                request.setAccepted(answer);
                request.setAnswered(true);
                requestRepository.save(request);
            }
            else{
                throw new NoAuthorizationException("You have no authorization to do this.");
            }

        }
        else{
            throw new EntityNotFoundException("Could not find request with id: " + request_id);
        }
    }

    public List<Request> getMyRequests(String token) {
        return requestRepository.findAllByAdopterId(userService.getByToken(token).getId());
    }

    public boolean getResponse(int request_id) throws NotAnsweredException {
        Optional<Request> optional = requestRepository.findById((long) request_id);
        if(optional.isPresent()){
            Request request = optional.get();
            if(request.isAnswered()){
                return request.isAccepted();
            }
            else{
                throw new NotAnsweredException("This request has not been answered yet.");
            }
        }
        else{
            throw new EntityNotFoundException("Could not find request with id" + request_id);
        }
    }

    public Boolean isRequestAnswered(int request_id) {
        Optional<Request> optional = requestRepository.findById((long) request_id);
        if(optional.isPresent()){
            Request request = optional.get();
            return request.isAnswered();
        }
        else{
            throw new EntityNotFoundException("Could not find request with id" + request_id);
        }
    }
}
