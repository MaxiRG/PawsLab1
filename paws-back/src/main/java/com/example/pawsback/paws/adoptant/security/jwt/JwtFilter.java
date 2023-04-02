package com.example.pawsback.paws.adoptant.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;
import java.io.IOException;
import static com.example.pawsback.paws.adoptant.security.jwt.JwtGeneratorImpl.KEY;


public class JwtFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException, IOException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        final String authHeader = request.getHeader("authorization");
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
        } else {
            if(authHeader == null || !authHeader.startsWith("Bearer ")){
                throw new ServletException("An exception occurred");
            }
        }
        final String token = authHeader.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token).getBody();
        request.setAttribute("claims", claims);
        request.setAttribute("blog", servletRequest.getParameter("id"));
        filterChain.doFilter(request, response);
    }
}
