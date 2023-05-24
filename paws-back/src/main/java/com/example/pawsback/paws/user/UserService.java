package com.example.pawsback.paws.user;

import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import com.example.pawsback.paws.user.model.User;
import com.example.pawsback.paws.user.model.dto.InfoDTO;
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
            User user = new User();
            user.setEmail(registerDTO.getEmail());
            user.setPassword(encoder.encode(registerDTO.getPassword()));
            user.setRole(registerDTO.getRole());
            user.setPosts(new ArrayList<>());
            return userRepository.save(user);
        }
        else{
            throw new EmailNotValidException(
                    "Email:" + registerDTO.getEmail() + " already exists or is invalid");
        }
    }

    private boolean emailValid(String email) {
        Optional<User> optional = Optional.ofNullable(userRepository.findByEmail(email));
        boolean isPresent = optional.isPresent();
        boolean isValid = Pattern.compile("^(.+)@(\\S+)$").matcher(email).matches(); //^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]+)$
        return (!isPresent && isValid);
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

    public User getById(long id){
        User user = userRepository.findById(id);
        Optional<User> optional = Optional.ofNullable(user);
        if(optional.isPresent()){
            return user;
        }
        else{
            throw new EntityNotFoundException("No user found with id " + id);
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

    public void modifyEmail(String newEmail,String token) throws EmailNotValidException {
        User user = this.getByToken(token);
        if (!emailValid(newEmail)) {
            throw new EmailNotValidException("Email:" + newEmail + " already exists or is invalid");
        }else{
            user.setEmail(newEmail);
            userRepository.save(user);
        }
    }

    public void modifyPassword(String token, String newPassword, String oldPassword) throws NoAuthorizationException {
        User user = this.getByToken(token);
        if (oldPassword.equals(newPassword)){
            throw new NoAuthorizationException("Same as old password");
        }
        if(encoder.matches(oldPassword,user.getPassword())){
            user.setPassword(encoder.encode(newPassword));
            userRepository.save(user);
        } else throw new NoAuthorizationException("Incorrect password");
    }

    public void modifyName(String name,String token){
        User user = this.getByToken(token);
        user.setName(name);
        userRepository.save(user);
    }

    public void modifySurname(String surname, String token){
        User user = this.getByToken(token);
        user.setSurname(surname);
        userRepository.save(user);
    }

    public void modifyPhoneNumber(String token, int newPhone){
        User user = this.getByToken(token);
        user.setPhoneNumber(newPhone);
        userRepository.save(user);
    }

    public void modifyDescription(String token, String description){
        User user = this.getByToken(token);
        user.setDescription(description);
        userRepository.save(user);
    }

    public String getEmail(String rawToken){
        String token = rawToken.substring(7);
        return jwtGenerator.parseToken(token).getSubject();
    }

    public String getRole(String rawToken){
        String token = rawToken.substring(7);
        return jwtGenerator.parseToken(token).get("role", String.class);
    }

    public InfoDTO toInfoDTO(User user){
        InfoDTO infoDTO = new InfoDTO();
        infoDTO.setId((int) user.getId());
        infoDTO.setEmail(user.getEmail());
        infoDTO.setRole(user.getRole());
        infoDTO.setPhoneNumber(user.getPhoneNumber());
        infoDTO.setSurname(user.getSurname());
        infoDTO.setName(user.getName());
        infoDTO.setDescription(user.getDescription());
        return infoDTO;
    }

}
