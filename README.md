[![Codacy Badge](https://api.codacy.com/project/badge/Grade/90910a13585643cbab34930f1cae5b48)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=telegraph/mcsparent&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/90910a13585643cbab34930f1cae5b48)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=telegraph/mcsparent&utm_campaign=Badge_Coverage) [Codacy Documentation](https://support.codacy.com/hc/en-us/articles/212799365-Badges)

[![Generic badge](https://img.shields.io/badge/<SUBJECT>-<STATUS>-<COLOR>.svg)](https://shields.io/)

# okta-authentication-demo

This Okta template is designed to be reused whenever a service in our portfolio needs to have Okta verification for users. This readme will describe its architecture and functionality.

## Ownership

* [Platform Team](https://github.com/orgs/telegraph/teams/platform-engineers)
* [Contributors](https://github.com/telegraph/okta-authentication-demo/graphs/contributors)

## Purpose/Scope

So that Okta can be deployed across our services.


## Diagram

<img src="/blob/master/img/infra_diagram.png" alt="architecture diagram">

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
* Java 8
* An Okta account
```

## Tests/Unit tests

* To follow...

## Installing and Deployment

### Okta Configuration
Before starting we need to configure our Okta Authorisation Server, so we will be able to manage the users allowed to use our app and their roles. From the okta console, in the section **API -> Authorisation server** we can manage our authorization servers. Within each authorization server, you can define your own OAuth 2.0 scopes, claims, and access policies. We are going to have a look at scopes and claims later.

<img src="/blob/master/img/img_api_okta_console.png">

The section Application (from the main menu on the top) shows all the applications that are using our Authorisation server. Clicking on the application needed we can access to its information. In General we can find the client Id (and in some cases client Secret) that we are going to need in our application. 

<img src="/blob/master/img/img_application_okta_console.png">

These two areas of Okta console are important to get all the credentials needed to configure the authentication in our front-end application.

```
export const clientConfig = {
 baseUrl: 'https://dev-554909.oktapreview.com',
 host: 'http://localhost',
 clientPort: 4200,
 clientId: '0oajcs9cb5CQvytKU0h7',
 //clientSecret: ''
}

export const oktaConfig = {
  issuer: clientConfig.baseUrl + '/oauth2/default',
  clientId: '0oajcs9cb5CQvytKU0h7',
  redirectUri: clientConfig.host + ":" + clientConfig.clientPort + '/implicit/callback',
  scope: 'openid profile email'
}
```

#### Scope and Claims
Scopes and Claims could be seen as a relationship between key (Scope) and values (Claims). From the FE we are going to provide the field scope to access some information of the user (in particular, for this demo, we need to access the groups of the user). 

The Okta console allows us to customize the scope and claims used in our authorization servers and we can use this feature to access what we need.

In the section API -> Authorisation server -> (click on the auth server) -> Claims we can add new claims and attach them to some specified scopes. For this demo, we have made the claim group and we have attached it to any scope. So, no matter what scope the client is going to ask, the groups' information would be automatically included in the Access Token.

<img src="/blob/master/img/img_scope_and_claims.png">

### BE - Secured Endpoints
The Resource Server of this demo is an API built with Spring (Java 8).

The requirements for this API were to provide 3 kinds of endpoints:

* Public
* Accessible only by developers
* Accessible only by admin

To configure the authorization to our endpoints we are using Spring boot Security and Spring boot Security JWT (as you can see in the pom.xml)

```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-jwt</artifactId>
</dependency>
```
### How the authentication works - back-end side

### Verifier configuration
**WebSecurityConfig.java**

The configuration of the verifier is in the file WebSecurityConfig.java
okta.verifier.issuer and okta.verifier.audience are in `okta-springboot-auth/src/main/resources/application.properties`
```
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${okta.verifier.issuer}")
  private String oktaIssuer;

  @Value("${okta.verifier.audience}")
  private String oktaAudience;
```
This is how application.properties looks (provided by Okta, as you see in the pictures of the Okta console above):
```
okta.verifier.issuer=https://dev-554909.oktapreview.com/oauth2/default
okta.verifier.audience=api://default
```
Authority is granted to the required endpoints. With this configuration we are assigning the authorities to the endpoints to allow the access:
* /api -> permitAll() makes this endpoint public
* /api/* -> permitAll() makes this endpoint public
* /auth/dev/hello -> only the user that hasAuthority() developer can access
* /auth/admin/hello  -> only the user that hasAuthority() admin can access
* /auth/security/* -> if the user has at least one of these three roles (Dev, Developer or Admin) they can access this.

```java
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .addFilterAfter(new JwtAuthenticatorFilter(oktaIssuer, oktaAudience), UsernamePasswordAuthenticationFilter.class)
        .authorizeRequests()
        .antMatchers("/api").permitAll()
        .antMatchers("/api/*").permitAll()
        .antMatchers("/auth/*").authenticated()
        .antMatchers("/auth/dev/hello").hasAuthority("DEVELOPER")
        .antMatchers("/auth/admin/hello").hasAuthority("ADMIN")
        .antMatchers("/auth/any/*").authenticated()
        .antMatchers("/auth/security/*").hasAnyAuthority("DEV", "DEVELOPER", "ADMIN")
        .anyRequest().authenticated();
  }
```
**JwtAuthenticatorFilter.java**

Here what happens:

* The token is extracted from the Authorization Header of the request
* The token is verified calling the method jwt.verifiedToken() where we get the roles of the user back in return if the token is valid.
* These roles are assigned to the SecurityContextHolder and used to verify the authority

```java
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String token = request.getHeader("Authorization");
    if (token != null) try {
      List<String> roles = verifyToken(token.split(" ")[1]); // token extracted and getting the user's roles (if any)
      UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(null, null,
          roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
      SecurityContextHolder.getContext().setAuthentication(auth); // assigning client's authority
    } catch (JwtVerificationException e) {
      SecurityContextHolder.clearContext();
      throw new InvalidTokenException(e); // Token not valid
    }
    chain.doFilter(request, response);
  }
```
* The Jwt verifier then checks and decode the token
* If the token is valid it will get decrypted and the result would be a JSON with all the claims required by the FE (see jwt-decrypted)
* We have been using “groups” to manage the authority. So this is the information that the filter will use to allow access to the endpoints.

```java
  private List<String> verifyToken(String accessToken) throws JwtVerificationException {
    Jwt jwt = jwtVerifier.decode(accessToken); // using jwtVwrifier provided by Okta
    @SuppressWarnings("unchecked")
    List<String> groups = (List<String>) jwt.getClaims().getOrDefault("groups", new ArrayList<String>());
    groups.replaceAll(String::toUpperCase);
    if (log.isDebugEnabled())
      for (String k: jwt.getClaims().keySet())
        log.debug(">> CLAIM: {} = {}", k, jwt.getClaims().get(k));
    return groups;
  }
 ```
 
## Built With

Listing all of the main Tech Stack used for the project:

* [Java 8](https://openjdk.java.net/projects/jdk8/) - The Programming Language
* [Spring Boot](https://spring.io/projects/spring-boot) - Used framework

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the [owners](#ownership) of this repository before making a change.

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

Please note we have a [code of conduct](https://github.com/telegraph/platform-team-guidelines/blob/master/CODE-OF-CONDUCT.md), please follow it in all your interactions with the project.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 


## License

This template is for use within The Telegraph project only.

## Confluence

There is a Confluence page on this setup [for more information](https://confluence.aws.telegraph.co.uk/display/PLAT/Okta+Authentication)

## Further references
* https://developer.okta.com/authentication-guide/auth-overview/#client-credentials-flow
* https://developer.okta.com/reference/postman_collections/
* https://developer.okta.com/blog/2018/10/16/token-auth-for-java
* https://developer.okta.com/authentication-guide/implementing-authentication/client-creds
* https://developer.okta.com/authentication-guide/tokens/validating-access-tokens
* https://www.devglan.com/spring-security/jwt-role-based-authorization
* https://medium.com/omarelgabrys-blog/microservices-with-spring-boot-authentication-with-jwt-part-3-fafc9d7187e8
