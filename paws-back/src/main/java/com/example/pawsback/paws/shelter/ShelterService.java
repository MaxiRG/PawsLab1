package com.example.pawsback.paws.shelter;

import com.example.pawsback.paws.adoptant.model.Adoptant;
import com.example.pawsback.paws.adoptant.model.dto.LogInDTO;
import com.example.pawsback.paws.shelter.model.Shelter;

import java.util.Objects;

public class ShelterService {

    private final ShelterRepository shelterRepository;

    public ShelterService(ShelterRepository shelterRepository) {
        this.shelterRepository = shelterRepository;
    }

    public Shelter save(Shelter shelter){
        return shelterRepository.save(shelter);
    }

    public Shelter getByEmail(String email){
        return shelterRepository.findByEmail(email);
    }

    public String logInAttempt(LogInDTO cred){
        Shelter shelter = getByEmail(cred.getEmail());
        if(Objects.equals(shelter.getPassword(), cred.getPassword())){
            return "Success";
        }
        else{
            return "Failed";
        }
    }
}
