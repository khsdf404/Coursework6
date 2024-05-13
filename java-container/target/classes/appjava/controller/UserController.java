package appjava.controller;

import java.util.List;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.ResponseEntity;

import appjava.entity.User;
import appjava.service.UserService;
import appjava.service.JwtService;


@CrossOrigin(origins = "http://51.250.22.219:3000")
@RestController
@RequestMapping("/auth/users/")
public class UserController {

    private final JwtService jwtService;
    private final UserService userService;

    public UserController(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    


    @GetMapping
    public ResponseEntity getByToken(@RequestHeader("Authorization") String bearer) {

        String token = bearer.substring(7);

        if (jwtService.findByAccessToken(token) == null) return ResponseEntity.badRequest().body("Invalid token");
        try { jwtService.TokenVerified(token, "ROLE_USER"); }
        catch (Exception e) { return ResponseEntity.badRequest().body(e.getMessage()); }

        User existUser = userService.findByLogin(jwtService.getSubject(token));

        return ResponseEntity.ok(existUser);
    }


    @PostMapping
    public ResponseEntity update(@RequestHeader("Authorization") String bearer, @RequestBody User user) {

        String token = bearer.substring(7);

        if (jwtService.findByAccessToken(token) == null) return ResponseEntity.badRequest().body("Invalid token");
        try { jwtService.TokenVerified(token, "ROLE_USER"); }
        catch (Exception e) { return ResponseEntity.badRequest().body(e.getMessage()); }

        User existUser = userService.findByLogin(jwtService.getClaim(token, "subject"));


        System.out.println(user.getPassword());
        if (!user.getPassword().equals("")) existUser.setPassword(user.getPassword());
        if (!user.getEmail().equals("")) existUser.setEmail(user.getEmail());
        if (!user.getPhone().equals("")) existUser.setPhone(user.getPhone());

        return ResponseEntity.ok(userService.save(existUser));
    }

}
