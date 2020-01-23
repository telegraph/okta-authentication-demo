package com.telegraph.redirect.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedirectController {

  @GetMapping("/api/hello")
  public ResponseEntity<String> getHello() {
    return new ResponseEntity<>("Hello", HttpStatus.OK);
  }

  @GetMapping("/auth/admin/hello")
  public ResponseEntity<String> getHelloAdmin() {
    return new ResponseEntity<>("Hello Admin", HttpStatus.OK);
  }

  @GetMapping("/auth/dev/hello")
  public ResponseEntity<String> getHelloDeveloper() {
    return new ResponseEntity<>("Hello Developer", HttpStatus.OK);
  }

  @GetMapping("/auth/security/hello")
  public ResponseEntity<String> getSecurityHello() {
    return new ResponseEntity<>("Hello Developer or Admin", HttpStatus.OK);
  }

  @GetMapping("/auth/any/hello")
  public ResponseEntity<String> getAnyHello() {
    return new ResponseEntity<>("Hello person authenticated", HttpStatus.OK);
  }
}
