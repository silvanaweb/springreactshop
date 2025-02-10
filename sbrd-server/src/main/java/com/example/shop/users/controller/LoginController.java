package com.example.shop.users.controller;

import com.example.shop.exception.UserAlreadyExistsException;
import com.example.shop.security.UserPrincipal;
import com.example.shop.users.model.LoginRequest;
import com.example.shop.users.model.User;
import com.example.shop.users.service.TokenService;
import com.example.shop.users.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.temporal.ChronoUnit;

@RestController
public class LoginController {

    private UserService userService;
    private final TokenService tokenService;

    @Autowired
    public LoginController(UserService userService,  TokenService tokenService){
        this.userService = userService;
        this.tokenService = tokenService;
    }

    private boolean userAlreadyExists(String email) {
        return userService.getUserByEmail(email).isPresent();
    }

    @PostMapping("/register")
    public ResponseEntity<User> newUser(@RequestBody() User user){
        if (userAlreadyExists(user.getEmail())){
            throw new UserAlreadyExistsException("User " + user.getEmail() + " already exists");
        }
        User newUser = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session, HttpServletResponse response) {
        try{
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(),loginRequest.getPassword());
            System.out.println("silvana authenticated" + isAuthenticated);
            if (isAuthenticated){

                User user = userService.getUserByUsername(loginRequest.getUsername());

                UserPrincipal userPrincipal = new UserPrincipal(user);
                Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, userPrincipal.getAuthorities());
                String jwtToken = tokenService.generateToken(authentication, user);
                System.out.println("autoritise" + userPrincipal.getAuthorities());
                session.setAttribute("user", loginRequest.getUsername());

                return ResponseEntity.ok(jwtToken);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
        }
    }
}
