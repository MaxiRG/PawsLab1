package com.example.pawsback.paws.adoptant;

import com.example.pawsback.paws.adoptant.model.Adoptant;
import com.example.pawsback.paws.adoptant.model.dto.LogInDTO;
import org.springframework.stereotype.Service;

import java.util.Objects;

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

    public String logInAttempt(LogInDTO cred) throws Exception {
        Adoptant adoptant = getByEmail(cred.getEmail());
        if (adoptant == null) {
            throw new Exception("User not found");
        }
        if (!adoptant.getPassword().equals(cred.getPassword())) {
            throw new Exception("Incorrect password");
        }
        return "Success";
    }

    public void delete(String email) {
        Adoptant adoptant = getByEmail(email);
        if (adoptant != null) {
            adoptantRepository.delete(adoptant);
        }
    }
}
