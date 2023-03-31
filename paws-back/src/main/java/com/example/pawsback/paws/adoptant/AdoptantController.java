package com.example.pawsback.paws.adoptant;

import com.example.pawsback.paws.adoptant.model.Adoptant;
import com.example.pawsback.paws.adoptant.model.dto.LogInDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AdoptantController {
    private final AdoptantService service;

    @Autowired
    private AdoptantRepository repository;

    public AdoptantController(AdoptantService service) {
        this.service = service;
    }

    @PostMapping("/createAdoptant")
    public ResponseEntity<Object> createAdoptant(@RequestBody Adoptant adoptant) {
        try {
            service.save(adoptant);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Adoptant created successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to create adoptant");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/deleteAdoptant")
    public ResponseEntity<Object> deleteAdoptant(@PathVariable String email) {
        try {
            service.delete(email);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Adoptant deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete adoptant");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //Has an ignored exception when email is not found.
    @PostMapping("/login")
    public String login(@RequestBody LogInDTO cred){
        return service.logInAttempt(cred);
    }

}
