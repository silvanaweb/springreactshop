package com.example.shop.users.controller;


import com.example.shop.exception.UserNotFoundException;
import com.example.shop.users.model.User;

import com.example.shop.users.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") Integer id){
        User user = userService.getUser(id);
        if (user == null){
            throw new UserNotFoundException("Sorry, this user could not be found");
        }
        return user;
    }

    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody() User user, @PathVariable("id") Integer id){
        if (userService.getUser(id) == null){
            throw new UserNotFoundException("Sorry, this user could not be found");
        }
        return userService.updateUser(user);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Integer id){
        userService.deleteUser(id);
    }


}