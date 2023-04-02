package com.example.pawsback.paws.shelter;

import com.example.pawsback.paws.adoptant.model.dto.LogInDTO;
import com.example.pawsback.paws.shelter.model.Shelter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

public class ShelterController {
    private final ShelterService service;

    @Autowired
    ShelterRepository repository;

    public ShelterController(ShelterService service) {
        this.service = service;
    }

    @PostMapping("/createShelter")
    public ResponseEntity<Map<String, Object>> createShelter(@RequestBody Shelter shelter){
        try {
            service.save(shelter);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Shelter created successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to create shelter");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping
    public ResponseEntity<Map<String, Object>> deleteShelter(@RequestBody String email){
        try {
            service.delete(email);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Shelter deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete shelter");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //Has an ignored exception when email is not found.
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LogInDTO cred){
        try {
            service.logInAttempt(cred);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to login");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
