package appjava.service;

import java.util.List;

import appjava.entity.Jwt;
import appjava.repository.JwtRepository;

import appjava.exceptions.FakeTokenException;
import appjava.exceptions.TokenExpiredException;
import appjava.exceptions.NoRightsException;


import java.util.Date;
import java.time.temporal.ChronoUnit;
import java.time.Instant;

import java.util.HashMap;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;


public class JwtService {

    private final JwtBuilder jwtBuilder;
    private final JwtRepository repository;

    private static final Jwt EMPTY = new Jwt();

    public JwtService (JwtBuilder jwtBuilder, JwtRepository repository) {
        this.jwtBuilder = jwtBuilder;
        this.repository = repository;
    }

    public String test() {
        return this.jwtBuilder.test();
    }



    public Iterable<Jwt> findAll() {
        return repository.findAll();
    }


    
    public Jwt findByAccessToken(String token) {
        return repository.findByAccessToken(token);
    }



    public Jwt save(Jwt jwt) {
        return repository.save(jwt);
    }



    public String createTokens(String subject, String role, Long uid) {
        Jwt jwt = this.jwtBuilder.createJWT(subject, role, uid);
        repository.save(jwt);

        return jwt.getAccessToken();
    }

    public void deleteJwt(String ownerLogin) {
        Jwt jwt = repository.findByOwnerLogin(ownerLogin);
        if (jwt != null)
            repository.delete(jwt);
    }

    public Boolean TokenExpired(String token) {
        return this.jwtBuilder.TokenExpired(token);
    }

    public Boolean TokenVerified(String token, String role) throws FakeTokenException, TokenExpiredException, NoRightsException {
        return this.jwtBuilder.TokenVerified(token, role);
    }

    public String getClaim(String token, String subject) {
        return this.jwtBuilder.getClaim(token, subject);
    }
     public String getSubject(String token) {
        return this.getClaim(token, "subject");
    }
    private Map<String, String> getPayload(String encodedPayload) {

        byte[] decodedBytes = Base64.getDecoder().decode(encodedPayload);
        String decoded = new String(decodedBytes, StandardCharsets.UTF_8);

        Type type = new TypeToken<Map<String, String>>(){}.getType();
        Gson gson = new Gson();

        return gson.fromJson(decoded, type);
    }
    public String getRole(String token) {
        return this.getClaim(token, "role");
    }

}
