package com.example.pawsback.paws.user;

import com.example.pawsback.paws.user.model.User;
import com.example.pawsback.paws.user.model.dto.LogInDTO;
import com.example.pawsback.paws.user.model.dto.RegisterDTO;
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

    @GetMapping("/test")
    public String test(){
        return "Working";
    }

    @GetMapping("/restricted")
    public ResponseEntity<?> getRestrictedMessage() {
        return new ResponseEntity<>("This is a restricted message", HttpStatus.OK);
    }
}
