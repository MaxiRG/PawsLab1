package com.example.pawsback.paws.image;

import com.example.pawsback.paws.post.PostService;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@Transactional
public class ImageController {

    private final ImageService imageService;
    private final PostService postService;

    @Autowired
    public ImageController(ImageService imageService, PostService postService){
        this.imageService = imageService;
        this.postService = postService;
    }

    @PostMapping(value = "/uploadProfilePicture/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable int id, @RequestHeader("Authorization") String token, @RequestParam("file") MultipartFile imageData){
        try{
            imageService.upload(id, token, imageData);
            return new ResponseEntity<>("Image uploaded successfully", HttpStatus.OK);
        }
        catch(NoAuthorizationException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);

        }
        catch(Exception e){
            return new ResponseEntity<>("Failed to upload image", HttpStatus.OK);
        }
    }

    @GetMapping("/getProfilePicture/{id}")
    public ResponseEntity<?> getProfilePicture(@PathVariable int id){
        try{
            byte[] imageBytes = postService.getProfilePictureByteArray(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentLength(imageBytes.length);
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        }
        catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


}
