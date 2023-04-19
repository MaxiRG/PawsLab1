package com.example.pawsback.paws.user;

import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.user.model.User;
import com.example.pawsback.paws.user.model.dto.ChangePasswordDTO;
import com.example.pawsback.paws.user.model.dto.ChangePhoneNumberDTO;
import com.example.pawsback.paws.user.model.dto.LogInDTO;
import com.example.pawsback.paws.user.model.dto.RegisterDTO;
import com.example.pawsback.paws.user.model.exceptions.EmailNotValidException;
import com.example.pawsback.paws.user.security.jwt.JwtGeneratorInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
            response.put("message", "Failed to create user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifyPassword/{email}")
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

    @PutMapping("/modifyPhoneNumber/{email}")
    public ResponseEntity<Object> modifyPhoneNumber(@RequestBody ChangePhoneNumberDTO changePhoneNumberDTO,@RequestHeader("Authorization") String token){
        try{
            service.modifyPhoneNumber(token,changePhoneNumberDTO.getNewPhoneNumber(),changePhoneNumberDTO.getOldPhoneNumber());
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message","Changed phone number successfully");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to modify phone number," + e.getMessage());
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

    @GetMapping("/test")
    public String test(){
        return "Working";
    }

    @GetMapping("/restricted")
    public ResponseEntity<?> getRestrictedMessage() {
        return new ResponseEntity<>("This is a restricted message", HttpStatus.OK);
    }
}
