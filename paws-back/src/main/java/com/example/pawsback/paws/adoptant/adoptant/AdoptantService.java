package com.example.pawsback.paws.adoptant.adoptant;

import com.example.pawsback.paws.adoptant.adoptant.model.Adoptant;
import com.example.pawsback.paws.adoptant.adoptant.model.dto.LogInDTO;
import org.springframework.stereotype.Service;

@Service
public class AdoptantService{

    private final AdoptantRepository adoptantRepository;

    public AdoptantService(AdoptantRepository adoptantRepository) {
        this.adoptantRepository = adoptantRepository;
    }

    public Adoptant save(Adoptant adoptant){
        return adoptantRepository.save(adoptant);
    }

    public Adoptant getByEmail(String email){
        return adoptantRepository.findByEmail(email);
    }

    public String logInAttempt(LogInDTO cred){
        Adoptant adoptant = getByEmail(cred.getEmail());
        if(adoptant.getPassword() == cred.getPassword()){
            return "Success";
        }
        else{
            return "Failed";
        }
    }
}
