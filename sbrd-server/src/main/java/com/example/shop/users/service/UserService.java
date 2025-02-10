package com.example.shop.users.service;

import com.example.shop.users.model.User;
import com.example.shop.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Integer id){
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public  User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id){
        userRepository.deleteById(id);
    }

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);

        if(!user.getUsername().equals(username)){
            throw new UsernameNotFoundException("User does not exist in the database");
        }
        System.out.println("silvana authenticated un: " + user.getUsername());
        System.out.println("silvana authenticated password: " + password);
        System.out.println("silvana authenticated usr.pwd: " + user.getPassword());

        if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw  new BadCredentialsException("The password is incorrect");
        }

        return  true;
    }

}