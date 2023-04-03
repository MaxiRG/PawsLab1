package com.example.pawsback.paws.user.security.jwt;

import com.example.pawsback.paws.user.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class JwtGeneratorImpl implements JwtGeneratorInterface {
        @Value("${app.jwttoken.message}")
        private String message;

        static public final SecretKey KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        @Override
        public Map<String, String> generateToken(User user) {
                String jwtToken="";
                jwtToken = Jwts.builder().setSubject(user.getEmail()).setIssuedAt(new Date()).signWith(KEY).compact();
                Map<String, String> jwtTokenGen = new HashMap<>();
                jwtTokenGen.put("token", jwtToken);
                jwtTokenGen.put("message", message);
                return jwtTokenGen;
        }
}
