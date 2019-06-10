package com.telegraph.redirect.models;

import com.okta.jwt.AccessTokenVerifier;
import com.okta.jwt.Jwt;
import com.okta.jwt.JwtVerificationException;
import com.okta.jwt.JwtVerifiers;
import com.telegraph.redirect.controller.RedirectController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class JWT {

    public static final Logger logger = LoggerFactory.getLogger(RedirectController.class);

    private String AccessToken;
    private List<String> groups = new ArrayList<>();
    private static final AccessTokenVerifier jwtVerifier = JwtVerifiers.accessTokenVerifierBuilder()
            .setIssuer("https://dev-554909.oktapreview.com/oauth2/default")
            .setAudience("api://default")
            .setConnectionTimeout(Duration.ofSeconds(1))
            .setReadTimeout(Duration.ofSeconds(1))
            .build();

    public JWT( String authHeader ) {
        this.AccessToken = authHeader;
    }

    public List<String> verifyToken() throws JwtVerificationException {

        Jwt jwt = jwtVerifier.decode(AccessToken);

        groups = (List<String>) jwt.getClaims().getOrDefault("groups", new ArrayList<String>());
        groups.replaceAll(String::toUpperCase);

        jwt.getClaims().keySet().forEach( k -> {
            logger.info(">> CLAIM: " + k + " = " + jwt.getClaims().get(k));
        });

        return groups;
    }

}
