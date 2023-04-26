package com.example.pawsback.paws.image;

import com.example.pawsback.paws.image.model.Image;
import com.example.pawsback.paws.image.model.dto.UploadDTO;
import com.example.pawsback.paws.post.PostRepository;
import com.example.pawsback.paws.post.model.Post;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.user.UserService;
import com.example.pawsback.paws.user.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final PostRepository postRepository;
    private final UserService userService;

    public ImageService(ImageRepository imageRepository, PostRepository postRepository, UserService userService){
        this.imageRepository = imageRepository;
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public void save(Image image){
        imageRepository.save(image);
    }


    public void upload(UploadDTO dto, String token, MultipartFile imageData) throws NoAuthorizationException, IOException {
        Post post = postRepository.findPostById(dto.getPostId());
        User user = userService.getByToken(token);
        if(post.getUser() != user){
            throw new NoAuthorizationException("You dont have authorization to do this");
        }else{
            Image image = new Image();
            image.setImageData(imageData.getBytes());
            image.setPost(post);
            save(image);
        }
    }
}
