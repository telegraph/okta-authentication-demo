package com.telegraph.redirect.security;

import com.okta.jwt.AccessTokenVerifier;
import com.okta.jwt.Jwt;
import com.okta.jwt.JwtVerificationException;
import com.okta.jwt.JwtVerifiers;
import com.telegraph.redirect.exceptions.InvalidTokenException;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticatorFilter extends OncePerRequestFilter {
  private static final Logger log = LoggerFactory.getLogger(JwtAuthenticatorFilter.class);

  private AccessTokenVerifier jwtVerifier;

  public JwtAuthenticatorFilter(String oktaIssuer, String oktaAudience) {
    jwtVerifier = JwtVerifiers.accessTokenVerifierBuilder()
      .setIssuer(oktaIssuer)
      .setAudience(oktaAudience)
      .setConnectionTimeout(Duration.ofSeconds(1))
      .setReadTimeout(Duration.ofSeconds(1))
      .build();
  }

  private List<String> verifyToken(String accessToken) throws JwtVerificationException {
    Jwt jwt = jwtVerifier.decode(accessToken);
    @SuppressWarnings("unchecked")
    List<String> groups = (List<String>) jwt.getClaims().getOrDefault("groups", new ArrayList<String>());
    groups.replaceAll(String::toUpperCase);
    if (log.isDebugEnabled())
      for (String k: jwt.getClaims().keySet())
        log.debug(">> CLAIM: {} = {}", k, jwt.getClaims().get(k));
    return groups;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String token = request.getHeader("Authorization");
    if (token != null) try {
      List<String> roles = verifyToken(token.split(" ")[1]);
      UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(null, null,
          roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
      SecurityContextHolder.getContext().setAuthentication(auth);
    } catch (JwtVerificationException e) {
      SecurityContextHolder.clearContext();
      throw new InvalidTokenException(e);
    }
    chain.doFilter(request, response);
  }
}
