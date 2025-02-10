package com.example.shop.controller;

import com.example.shop.response.dto.OrdersDto;
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
    public List<OrdersDto> getOrders() {
        return orderService.getOrders();
    }

    @PostMapping("/add")
    public String addOrder(@RequestBody Orders order) {
        return orderService.addOrder(order);
    }

    @GetMapping("/user/{id}")
    public List<OrdersDto> getOrdersByUserId(@PathVariable("id") Long id) {
        return orderService.getOrdersByUserId(id);
    }

    @GetMapping("/brand/{id}")
    public List<OrdersDto> getOrdersByBrandId(@PathVariable("id") Long id) {
        return orderService.getOrdersByBrandId(id);
    }

    @GetMapping("/date/{date}")
    public List<OrdersDto> getOrdersByOrderDate(@PathVariable("date") String date) {
        return orderService.getOrdersByOrderDate(date);
    }

}
