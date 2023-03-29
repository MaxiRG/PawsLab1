package com.example.pawsback.paws.shelter;

import com.example.pawsback.paws.shelter.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterRepository extends JpaRepository<Shelter,Long> {
    public Shelter findByEmail(String email);
}
