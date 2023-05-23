package com.example.pawsback.paws.user;

import com.example.pawsback.paws.user.model.User;
import com.example.pawsback.paws.user.model.dto.*;
import com.example.pawsback.paws.user.model.exceptions.EmailNotValidException;
import com.example.pawsback.paws.user.security.jwt.JwtGeneratorInterface;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping({"/api"})
public class UserController {
    private final UserService service;
    private final JwtGeneratorInterface jwtGenerator;

    @Autowired
    public UserController(UserService service, JwtGeneratorInterface jwtGenerator) {
        this.service = service;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/createUser")
    public ResponseEntity<Object> createUser(@RequestBody RegisterDTO registerDTO) {
        try {
            service.registerNewUserAccount(registerDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User created successfully");
            return ResponseEntity.ok(response);
        } catch (EmailNotValidException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifyPassword")
    public ResponseEntity<Object> modifyPassword(@RequestBody ChangePasswordDTO changePasswordDTO,@RequestHeader("Authorization") String token) {
        try{
            service.modifyPassword(token , changePasswordDTO.getNewPassword(), changePasswordDTO.getOldPassword());
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","Changed password successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to modify user password," + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifyPhoneNumber")
    public ResponseEntity<Object> modifyPhoneNumber(@RequestBody ChangePhoneDTO phoneDTO, @RequestHeader("Authorization") String token){
        try{
            service.modifyPhoneNumber(token,phoneDTO.getPhoneNumber());
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","Changed phone number successfully");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to modify phone number");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifyDescription")
    public ResponseEntity<Object> modifyDescription(@RequestBody ChangeDescriptionDTO changeDescriptionDTO, @RequestHeader("Authorization") String token) {
        try{
            service.modifyDescription(token, changeDescriptionDTO.getDescription());
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","Changed description successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to modify description");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifyEmail")
    public ResponseEntity<Object> modifyEmail(@RequestBody ChangeEmailDTO changeEmailDTO, @RequestHeader("Authorization") String token) {
        try{
            service.modifyEmail(changeEmailDTO.getEmail(), token);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","Changed email successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to modify email" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifyName")
    public ResponseEntity<Object> modifyName(@RequestBody ChangeNameDTO nameDTO, @RequestHeader("Authorization") String token) {
        try{
            service.modifyName(nameDTO.getName(), token);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","Changed name successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to modify name" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifySurname")
    public ResponseEntity<Object> modifySurname(@RequestBody ChangeSurnameDTO changeSurnameDTO, @RequestHeader("Authorization") String token) {
        try{
            service.modifySurname(changeSurnameDTO.getSurname(), token);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","Changed surname successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to modify surname" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/deleteUser/{email}")
    public ResponseEntity<Object> deleteUser(@PathVariable String email) {
        try {
            service.delete(email);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete User");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LogInDTO cred){
        try{
            User user =  service.logInAttempt(cred);
            return new ResponseEntity<>(jwtGenerator.generateToken(user), HttpStatus.OK);
        }
        catch (jakarta.persistence.EntityNotFoundException e){
            return new ResponseEntity<>("Wrong credentials", HttpStatus.OK);
        }
    }

    @GetMapping("/getInfo/{email}")
    public ResponseEntity<?> getInfo(@PathVariable String email){
        try{
            return new ResponseEntity<>(service.toInfoDTO(service.getByEmail(email)), HttpStatus.OK);
        }
        catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("Failed to get user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getInfoById/{id}")
    public ResponseEntity<?> getInfo(@PathVariable Long id) {
        try {
            InfoDTO infoDTO = service.toInfoDTO(service.getById(id));
            if (infoDTO != null) {
                return new ResponseEntity<>(infoDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Shelter not found", HttpStatus.NOT_FOUND);
            }
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to get user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/test")
    public String test(){
        return "Working";
    }

    @GetMapping("/restricted")
    public ResponseEntity<?> getRestrictedMessage() {
        return new ResponseEntity<>("This is a restricted message", HttpStatus.OK);
    }
}
