package com.example.pawsback.paws.post;

import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.dto.FilteredListDataDTO;
import com.example.pawsback.paws.post.model.dto.PostDTO;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.user.UserService;
import com.example.pawsback.paws.user.model.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
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

    public void modifyAdoptedStatus(boolean status, int postId, String token) throws NoAuthorizationException {
        Post post = postRepository.findPostById((long) postId);
        if (post == null){
            throw new EntityNotFoundException("Post does not exist");
        }
        User user = userService.getByToken(token);
        if (post.getUser().getId() == user.getId()){
            post.setAdopted(status);
            postRepository.save(post);
        }else throw new NoAuthorizationException("Invalid id");
    }

    public void modifyAge(int postId, int newAge, String token) throws NoAuthorizationException {
        Post post = postRepository.findPostById((long) postId);
        if (post == null){
            throw new EntityNotFoundException("Post does not exist");
        }
        User user = userService.getByToken(token);
        if (post.getUser().getId() == user.getId()){
            post.setAge(newAge);
            postRepository.save(post);
        }else throw new NoAuthorizationException("Invalid id");
    }

    public void modifyPostDescription(int postId, String description, String token) throws NoAuthorizationException {
        Post post = postRepository.findPostById((long) postId);
        if (post==null){
            throw new EntityNotFoundException("Post does not exist");
        }
        User user = userService.getByToken(token);
        if(post.getUser().getId() == user.getId()){
            post.setDescription(description);
            postRepository.save(post);
        }else throw new NoAuthorizationException("Invalid Id");
    }

    public PostDTO toDto(Post post, String token) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(Math.toIntExact(post.getId()));
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

    public void delete(int postId, String token) throws NoAuthorizationException {
        Post post = postRepository.findPostById((long) postId);
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

    public List<Post> getAllNotAdopted(){
        return postRepository.findAllNonAdoptedPosts();
    }

    public List<Post> getFilteredPosts(FilteredListDataDTO data){
        Integer minAge = null;
        Integer maxAge = null;
        Boolean sex = null;
        String race = null;

        if(data.getAgeType().toString().equals("PUPPY")){
            maxAge = 2;
        }else if(data.getAgeType().toString().equals("ADULT")){
            minAge = 3;
        }

        if(data.getSex().toString().equals("MALE")){
            sex = true;
        }else if(data.getSex().toString().equals("FEMALE")){
            sex = false;
        }

        if(!data.getRace().toString().equals("UNDEFINED")){
            race = data.getRace().toString();
        }

        return getFilteredPostsQuery(minAge,maxAge,sex,race);
    }

    private List<Post> getFilteredPostsQuery(@RequestParam(value = "minAge", required = false) Integer minAge, @RequestParam(value = "maxAge", required = false) Integer maxAge, @RequestParam(value = "sex", required = false) Boolean sex, @RequestParam(value = "race",required = false) String race){
        return postRepository.filteredPostSearch(minAge,maxAge,sex,race);
    }
  
    public byte[] getProfilePictureByteArray(int id) {
        Post post = postRepository.findPostById((long) id);
        Optional<Post> optional = Optional.ofNullable(post);
        if(optional.isPresent()){
            return optional.get().getProfilePicture().getImageData();
        }
        else{
            throw new EntityNotFoundException("Could not find post with id " + id);
        }

    }
}
