package com.telegraph.redirect.security;

import com.okta.jwt.JwtVerificationException;
import com.telegraph.redirect.exceptions.InvalidTokenException;
import com.telegraph.redirect.models.JWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticatorFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        if(token != null) {

            try {
                JWT jwt = new JWT(token.split(" ")[1]);
                List<String> roles = jwt.verifyToken();

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        null, null, roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (JwtVerificationException e) {
                SecurityContextHolder.clearContext();
                throw new InvalidTokenException(e);
            }
        }

        chain.doFilter(request, response);
    }


}
