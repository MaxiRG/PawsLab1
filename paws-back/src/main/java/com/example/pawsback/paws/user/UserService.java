package com.example.pawsback.paws.user;

import com.example.pawsback.paws.user.model.User;
import com.example.pawsback.paws.user.model.dto.LogInDTO;
import com.example.pawsback.paws.user.model.dto.RegisterDTO;
import com.example.pawsback.paws.user.model.exceptions.EmailNotValidException;
import com.example.pawsback.paws.user.security.jwt.JwtGeneratorImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtGeneratorImpl jwtGenerator;

    public UserService(UserRepository userRepository, JwtGeneratorImpl jwtGenerator) {
        this.userRepository = userRepository;
        this.jwtGenerator = jwtGenerator;
    }

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User registerNewUserAccount(RegisterDTO registerDTO) throws EmailNotValidException {
        if (emailValid(registerDTO.getEmail())) {
            throw new EmailNotValidException(
                    "Email:" + registerDTO.getEmail() + "already exists or is invalid");
        }
        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(encoder.encode(registerDTO.getPassword()));
        user.setRole(registerDTO.getRole());
        user.setPosts(new ArrayList<>());
        return userRepository.save(user);
    }

    private boolean emailValid(String email) {
        return userRepository.findByEmail(email) != null && Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\\\.[A-Za-z0-9-]+)*(\\\\.[A-Za-z]{2,})$").matcher(email).matches();
    }

    public User getByEmail(String email){
        User user = userRepository.findByEmail(email);
        Optional<User> optional = Optional.ofNullable(user);
        if(optional.isPresent()){
            return user;
        }
        else{
            throw new EntityNotFoundException("No user found with email " + email);
        }
    }

    public User getByToken(String token){
        return userRepository.findByEmail(getEmail(token));
    }

    public User logInAttempt(LogInDTO cred) throws EntityNotFoundException {
        User user = getByEmail(cred.getEmail());
        if(encoder.matches(cred.getPassword(), user.getPassword())){
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

    public String getEmail(String rawToken){
        String token = rawToken.substring(7);
        return jwtGenerator.parseToken(token).getSubject();
    }

    public String getRole(String rawToken){
        String token = rawToken.substring(7);
        return jwtGenerator.parseToken(token).get("role", String.class);
    }

}
