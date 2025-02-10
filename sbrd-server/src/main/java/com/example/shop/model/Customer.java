package com.example.shop.model;

import com.example.shop.users.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String address;
    private String phone;

    @OneToMany(mappedBy = "customer")
    private Set<Orders> orders;
}
