package com.example.shop.users.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.NaturalId;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstname;
    private String lastname;
    private String username;
    // make the email unique. after creation could not be edited , so we add the mutable=true property
    @NaturalId(mutable=true)
    private String email;
    private String password;
    private String role = Roles.USER.name();
}
