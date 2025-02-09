package com.example.shop.controller;

import com.example.shop.model.Orders;
import com.example.shop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrdersController {
    private final OrderService orderService;

    @GetMapping
    public List<Orders> getOrders() {
        return orderService.getOrders();
    }

    @PostMapping("/add")
    public String addOrder(@RequestBody Orders order) {
        return orderService.addOrder(order);
    }

    @GetMapping("/user/{id}")
    public String getUserOrders(@PathVariable("id") Long id) {
        return "User Orders";
    }

}
