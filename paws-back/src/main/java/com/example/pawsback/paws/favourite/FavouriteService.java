package com.example.pawsback.paws.favourite;

import com.example.pawsback.paws.favourite.model.Favourite;
import com.example.pawsback.paws.favourite.model.dto.PostIDFavouriteDTO;
import com.example.pawsback.paws.favourite.model.dto.FavouriteDTO;
import com.example.pawsback.paws.favourite.model.exceptions.RepeatedFavouriteException;
import com.example.pawsback.paws.post.PostRepository;
import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.user.UserService;
import com.example.pawsback.paws.user.model.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteService {

    private final FavouriteRepository favouriteRepository;
    private final UserService userService;
    private final PostRepository postRepository;

    public FavouriteService(FavouriteRepository favouriteRepository, UserService userService, PostRepository postRepository) {
        this.favouriteRepository = favouriteRepository;
        this.userService = userService;
        this.postRepository = postRepository;
    }

    public Favourite save(PostIDFavouriteDTO DTO, String token) throws RepeatedFavouriteException {
        Favourite favourite = new Favourite();
        User user = userService.getByToken(token);
        Post post = postRepository.findPostById(DTO.getPostId());
        if (favouriteRepository.findByUserIdAndPostId(user.getId(),post.getId()) != null){
            throw new RepeatedFavouriteException("User already has this post in favourites");
        }
        favourite.setUser(user);
        favourite.setPost(post);
        return favouriteRepository.save(favourite);
    }

    public FavouriteDTO toDTO(Favourite favourite,String token){
        FavouriteDTO DTO = new FavouriteDTO();
        DTO.setId(Math.toIntExact(favourite.getId()));
        DTO.setUserid(Math.toIntExact(userService.getByToken(token).getId()));
        DTO.setPostid(Math.toIntExact(favourite.getPost().getId()));
        return DTO;
    }

    public List<Favourite> getUserFavourites(String token){
        return favouriteRepository.findFavouritesByUserId(userService.getByToken(token).getId());
    }

    public void deleteFavourite(PostIDFavouriteDTO DTO,String token) throws EntityNotFoundException{
        Favourite favourite = favouriteRepository.findByUserIdAndPostId(userService.getByToken(token).getId(), (long) DTO.getPostId());
        if (favourite == null){
            throw new EntityNotFoundException("Favourite does not exist");
        }
        favouriteRepository.delete(favourite);
    }
}
