package com.example.pawsback.paws.post;


import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.dto.PostDTO;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.user.UserService;
import com.example.pawsback.paws.user.model.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserService userService;

    public PostService(PostRepository postRepository,  UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public Post save(Post post, String token) {
        post.setUser(userService.getByToken(token));
        return postRepository.save(post);
    }

    public PostDTO toDto(Post post, String token) {
        PostDTO postDTO = new PostDTO();
        postDTO.setDescription(post.getDescription());
        postDTO.setPetName(post.getPetName());
        postDTO.setAge(post.getAge());
        postDTO.setSex(post.getSex());
        postDTO.setRace(postDTO.getRace());
        postDTO.setUser(userService.getByToken(token));
        return postDTO;
    }

    public List<Post> getMyPosts(String token) {
        return postRepository.findPostByUserId(userService.getByToken(token).getId());
    }

    public void delete(String petName, String token) throws NoAuthorizationException {
        Post post = postRepository.findPostByPetName(petName);
        User user = userService.getByToken(token);
        if(post != null && user != null){
            if(post.getUser().getId() == user.getId()){
                postRepository.delete(post);
            }
            else{
                throw new NoAuthorizationException("You dont have permission to do this");
            }
        }else{
            throw new EntityNotFoundException("User or post could not be found");
        }
    }

    public Post getPost(String petName) {
        Post post = postRepository.findPostByPetName(petName);
        Optional<Post> optional = Optional.ofNullable(post);
        if(optional.isPresent()){
            return post;
        }
        else{
            throw new EntityNotFoundException("Could not find the post with name " + petName);
        }
    }

    public List<Post> getAll(){
        return postRepository.findAll();
    }
}
