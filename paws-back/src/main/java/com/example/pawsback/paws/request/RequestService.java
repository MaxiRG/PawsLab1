package com.example.pawsback.paws.request;

import com.example.pawsback.paws.post.PostRepository;
import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.request.model.Request;
import com.example.pawsback.paws.request.model.exceptions.PostIsAdoptedException;
import com.example.pawsback.paws.request.model.exceptions.NotAnsweredException;
import com.example.pawsback.paws.user.UserService;
import com.example.pawsback.paws.user.model.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public Request save(int post_id, String token) throws NotAnsweredException, PostIsAdoptedException {
        if(isRequestValid(post_id, userService.getByToken(token).getId())){
        Request request = new Request();
        request.setAdopter(userService.getByToken(token));
        request.setPost(postRepository.findPostById((long) post_id));
        return requestRepository.save(request);
        }
        else{
            throw new PostIsAdoptedException("The post is already labeled as adopted");
        }
    }

    private boolean isRequestValid(int post_id, Long adopter_id) throws NotAnsweredException {
        Optional<Post> optional = postRepository.findById((long) post_id);
        if(optional.isPresent()){
            if(optional.get().isAdopted()){
                return false;
            }
            List<Request> requests = requestRepository.findAllByAdopterId(adopter_id);
            for (Request request : requests) {
                if (request.getPost().getId() == post_id && !request.isAnswered()) {
                    throw new NotAnsweredException("You already have an unanswered request for post with id: " + post_id);
                }
            }
            return true;
        }
        else{
            throw new EntityNotFoundException("Could not find post with id: " + post_id);
        }

    }

    public void answerRequest(int request_id, boolean answer, String token) throws NoAuthorizationException {
        Optional<Request> optional = requestRepository.findById((long) request_id);
        if(optional.isPresent()){
            Request request = optional.get();
            Post post = postRepository.findPostById(request.getPost().getId());
            if(request.getPost().getUser().getId() == userService.getByToken(token).getId()){
                request.setAccepted(answer);
                request.setAnswered(true);
                requestRepository.save(request);
                post.setAdopted(true);
                postRepository.save(post);

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
            throw new EntityNotFoundException("Could not find request with id " + request_id);
        }
    }

    public Boolean isRequestAnswered(int request_id) {
        Optional<Request> optional = requestRepository.findById((long) request_id);
        if(optional.isPresent()){
            Request request = optional.get();
            return request.isAnswered();
        }
        else{
            throw new EntityNotFoundException("Could not find request with id " + request_id);
        }
    }

    public List<Request> getPendingReceivedRequestsForPost(long postId) throws PostIsAdoptedException {
        if(postRepository.findPostById(postId).isAdopted()){
            throw new PostIsAdoptedException("The post is already labeled as adopted");
        }
        List<Request> requests = requestRepository.findAllByPostId(postId);
        List<Request> result = new ArrayList<>();
        for(Request request:requests){
            if(!request.isAnswered()){
                result.add(request);
            }
        }
        return result;
    }

    public List<Request> getPendingReceivedRequestsForShelter(String token) throws PostIsAdoptedException {
        User user = userService.getByToken(token);
        List<Request> result = new ArrayList<>();
        List<Post> posts = postRepository.findPostByUserId(user.getId());
        for(Post post:posts){
            if(!post.isAdopted()){
            result.addAll(getPendingReceivedRequestsForPost(post.getId()));
            }
        }
        return result;
    }
}
