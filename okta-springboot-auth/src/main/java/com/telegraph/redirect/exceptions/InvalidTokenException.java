package com.telegraph.redirect.exceptions;

import com.okta.jwt.JwtVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidTokenException extends RuntimeException {

  public InvalidTokenException(JwtVerificationException e) {
    super(e);
  }

}
