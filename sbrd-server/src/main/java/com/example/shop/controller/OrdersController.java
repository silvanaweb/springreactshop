package com.example.shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @GetMapping
    public String getOrders() {
        return "Orders";
    }

    @GetMapping("/user/{id}")
    public String getUserOrders(@PathVariable("id") Long id) {
        return "User Orders";
    }

}
