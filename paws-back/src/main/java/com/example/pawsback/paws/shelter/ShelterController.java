package com.example.pawsback.paws.shelter;

import com.example.pawsback.paws.adoptant.AdoptantRepository;
import com.example.pawsback.paws.adoptant.model.dto.LogInDTO;
import com.example.pawsback.paws.shelter.model.Shelter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class ShelterController {
    private final ShelterService service;

    @Autowired
    ShelterRepository repository;

    public ShelterController(ShelterService service) {
        this.service = service;
    }

    @PostMapping("/createShelter")
    public void createShelter(@RequestBody Shelter shelter){
        service.save(shelter);
    }

    //Has an ignored exception when email is not found.
    @PostMapping("/login")
    public String login(@RequestBody LogInDTO cred){
        return service.logInAttempt(cred);
    }

}
