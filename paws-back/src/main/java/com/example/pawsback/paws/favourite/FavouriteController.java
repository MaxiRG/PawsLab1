package com.example.pawsback.paws.favourite;

import com.example.pawsback.paws.favourite.model.dto.PostIDFavouriteDTO;
import com.example.pawsback.paws.favourite.model.dto.FavouriteDTO;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Transactional
@RestController
public class FavouriteController {

    private final FavouriteService favouriteService;

    @Autowired
    public FavouriteController(FavouriteService service) {
        this.favouriteService= service;
    }

    @PostMapping(value = "/addFavourite")
    public ResponseEntity<?> addFavourite(@RequestBody PostIDFavouriteDTO DTO, @RequestHeader("Authorization") String token){
        try{
            FavouriteDTO favouriteDTO =  favouriteService.toDTO(favouriteService.save(DTO, token), token);
            return new ResponseEntity<>(favouriteDTO, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Failed to add to favourites, " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getUserFavourites")
    public ResponseEntity<?> getUserFavourites(@RequestHeader("Authorization")String token){
        try{
            return new ResponseEntity<>(favouriteService.getUserFavourites(token),HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/deleteUserFavourite" )
    public ResponseEntity<?> deleteUserFavourite(@RequestBody PostIDFavouriteDTO DTO,@RequestHeader("Authorization") String token){
        try{
            favouriteService.deleteFavourite(DTO,token);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Post is no longer in favourite section");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete Post from favourite section");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
