package com.example.pawsback.paws.user;

import com.example.pawsback.paws.user.model.User;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
    public User findById(long id);
    public void delete(@NotNull User user);

    @Query("SELECT u FROM User u WHERE u.role = 'SHELTER' ")
    List<User> getShelters();
}
