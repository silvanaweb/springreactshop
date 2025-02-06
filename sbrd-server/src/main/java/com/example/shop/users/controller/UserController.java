package com.example.shop.users.controller;

import com.example.shop.users.model.LoginRequest;
import com.example.shop.users.model.User;
import com.example.shop.security.UserPrincipal;
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
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
public class UserController {

    private UserService userService;

    private final TokenService tokenService;

    @Autowired
    public UserController(UserService userService,  TokenService tokenService){
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") Integer id){
        return userService.getUser(id);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody() User user, @PathVariable("id") Long id){
        return userService.updateUser(user);
    }

    @PostMapping("/register")
    public ResponseEntity<User> newUser(@RequestBody() User user){
        User newUser = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Integer id){
        userService.deleteUser(id);
    }

    private void setJwtCookie(HttpServletResponse response, String jwtToken) {
        Cookie cookie = new Cookie("jwt", jwtToken);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(ChronoUnit.DAYS.ordinal());
        response.addCookie(cookie);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session,  HttpServletResponse response) {
        try{
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(),loginRequest.getPassword());
            System.out.println("silvana authenticated" + isAuthenticated);
            if (isAuthenticated){

                User user = userService.getUserByUsername(loginRequest.getUsername());

                UserPrincipal userPrincipal = new UserPrincipal(user);
                Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, userPrincipal.getAuthorities());
                String jwtToken = tokenService.generateToken(authentication, user);
                session.setAttribute("user", loginRequest.getUsername());
                Cookie cookie = new Cookie("jwt", jwtToken);
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setSecure(false);
                cookie.setDomain("localhost");
                cookie.setMaxAge(86400);
                response.addCookie(cookie);
                return ResponseEntity.ok(jwtToken);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
        }
    }
}