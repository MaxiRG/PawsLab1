package com.example.pawsback.paws.user;

import com.example.pawsback.paws.user.model.User;
import com.example.pawsback.paws.user.model.dto.LogInDTO;
import com.example.pawsback.paws.user.model.dto.RegisterDTO;
import com.example.pawsback.paws.user.model.exceptions.EmailExistsException;
import com.example.pawsback.paws.user.security.jwt.BCryptPasswordEncoder;
import jakarta.persistence.EntityNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public User registerNewUserAccount(RegisterDTO registerDTO) throws EmailExistsException {
        if (emailExist(registerDTO.getEmail())) {
            throw new EmailExistsException(
                    "There is an account with that email adress:" + registerDTO.getEmail());
        }
        User user = new User();
        user.setPassword(bCryptPasswordEncoder.encode(registerDTO.getPassword()));
        user.setEmail(registerDTO.getEmail());
        user.setRole(registerDTO.getRole());
        return userRepository.save(user);
    }

    private boolean emailExist(String email) {
        try{
            userRepository.findByEmail(email);
            return true;
        }
        catch (EntityNotFoundException e){
            return false;
        }
    }

    public User getByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User logInAttempt(LogInDTO cred) throws EntityNotFoundException {
        User user = getByEmail(cred.getEmail());
        if(Objects.equals(user.getPassword(), bCryptPasswordEncoder.encode(cred.getPassword()))){
            return user;
        }
        else{
            throw new jakarta.persistence.EntityNotFoundException();
            }
    }


    public void delete(String email) {
        User user = getByEmail(email);
        if (user != null) {
            userRepository.delete(user);
        } else {
            throw new EntityNotFoundException("User not found for email: " + email);
        }
    }

}
