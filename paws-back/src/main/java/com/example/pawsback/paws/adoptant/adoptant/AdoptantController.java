package com.example.pawsback.paws.adoptant.adoptant;

import com.example.pawsback.paws.adoptant.adoptant.model.Adoptant;
import com.example.pawsback.paws.adoptant.adoptant.model.dto.LogInDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class AdoptantController {
    private final AdoptantService service;



    @Autowired
    AdoptantRepository repository;

    public AdoptantController(AdoptantService service) {
        this.service = service;
    }

    @PostMapping()
    public void createAdoptant(@RequestBody Adoptant adoptant){
       service.save(adoptant);

    }

    //Has an ignored exception when email is not found.
    @PostMapping("/login")
    public String login(@RequestBody LogInDTO cred){
        return service.logInAttempt(cred);
    }

//    @GetMapping("/hardCodeAdoptants")
//    public String hardCodeAdoptants(){
//
//    }


}
