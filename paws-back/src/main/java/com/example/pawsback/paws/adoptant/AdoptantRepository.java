package com.example.pawsback.paws.adoptant;
import com.example.pawsback.paws.adoptant.model.Adoptant;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface AdoptantRepository extends JpaRepository<Adoptant, Long> {
    public Adoptant findByEmail(String email);
    public void delete(Adoptant adoptant);
}
