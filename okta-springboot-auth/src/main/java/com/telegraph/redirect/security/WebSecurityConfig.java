package com.telegraph.redirect.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

            http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                        .addFilterAfter(new JwtAuthenticatorFilter(), UsernamePasswordAuthenticationFilter.class)
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

}
