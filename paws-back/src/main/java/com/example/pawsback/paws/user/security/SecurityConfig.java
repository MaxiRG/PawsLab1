package com.example.pawsback.paws.user.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

// Not necesary for now.
//    @Bean
//    public SecurityConfigurer<DefaultSecurityFilterChain, HttpSecurity> securityConfigurer() {
//        return new SecurityConfigurer<DefaultSecurityFilterChain, HttpSecurity>() {
//            @Override
//            public void init(HttpSecurity builder) throws Exception {
//
//            }
//
//            @Override
//            public void configure(HttpSecurity http) throws Exception {
//                http.httpBasic().disable();
//
//                http.cors().and().csrf().disable().authorizeRequests()
//                        .anyRequest().authenticated()
//                        .and().formLogin().disable() // <-- this will disable the login route
//                        .addFilter(JWTAuthorizationFilter(http.authenticationManager()))
//                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//            }
//        };
//    }
    
    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}