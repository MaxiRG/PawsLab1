package com.example.pawsback.paws.image;

import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService){
        this.imageService = imageService;
    }

    @PostMapping("/uploadProfilePicture/{id}")
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


}
