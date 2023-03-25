package com.example.pawsback.paws.adoptant.adoptant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
public class AdoptantController {
    @Autowired
    AdoptantRepository repository;

    @GetMapping("/bulkcreate")
    public String bulkcreate(){
        // save a single Customer
        repository.save(new Adoptant("example@customer.com", "1234"));
        return "Customers are created";
    }

    @RequestMapping("/search/{email}")
    public String search(@PathVariable long email){
        String adoptant = "";
        adoptant = repository.findById(email).toString();
        return adoptant;
    }


}
