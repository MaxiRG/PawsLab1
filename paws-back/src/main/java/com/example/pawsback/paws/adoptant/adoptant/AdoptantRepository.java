package com.example.pawsback.paws.adoptant.adoptant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptantRepository extends JpaRepository<Adoptant, Long> {
//    List<Adoptant> findByFirstName(String FirstName);
//    List<Adoptant> findAll();
}
