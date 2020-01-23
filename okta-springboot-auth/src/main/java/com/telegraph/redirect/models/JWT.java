package com.telegraph.redirect.models;

public class JWT {
/*
  private static final Logger logger = LoggerFactory.getLogger(RedirectController.class);
  private static final AccessTokenVerifier jwtVerifier = JwtVerifiers.accessTokenVerifierBuilder()
      .setIssuer("https://dev-554909.oktapreview.com/oauth2/default")
      .setAudience("api://default")
      .setConnectionTimeout(Duration.ofSeconds(1))
      .setReadTimeout(Duration.ofSeconds(1))
      .build();

  private String accessToken;

  public JWT(String accessToken) {
    this.accessToken = accessToken;
  }

  public List<String> verifyToken() throws JwtVerificationException {
    Jwt jwt = jwtVerifier.decode(accessToken);
    List<String> groups = (List<String>) jwt.getClaims().getOrDefault("groups", new ArrayList<String>());
    groups.replaceAll(String::toUpperCase);
    jwt.getClaims().keySet().forEach(k -> {
      logger.info(">> CLAIM: {} = {}", k, jwt.getClaims().get(k));
    });
    return groups;
  }*/
}
