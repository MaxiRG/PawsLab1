package com.example.pawsback.paws.adoptant.security.jwt;

import com.example.pawsback.paws.adoptant.model.Adoptant;

import java.util.Map;

public interface JwtGeneratorInterface {
    Map<String, String> generateToken(Adoptant user);
}
