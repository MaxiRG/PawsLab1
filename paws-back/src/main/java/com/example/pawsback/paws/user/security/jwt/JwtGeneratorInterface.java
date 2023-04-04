package com.example.pawsback.paws.user.security.jwt;

import com.example.pawsback.paws.user.model.User;

import java.util.Map;

public interface JwtGeneratorInterface {
    Map<String, String> generateToken(User user);
}
