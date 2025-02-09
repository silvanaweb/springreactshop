package com.example.shop.service;

import com.example.shop.model.Orders;
import com.example.shop.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public List<Orders> getOrders() {
        return orderRepository.findAll();
    }

    public String addOrder(Orders order) {
        orderRepository.save(order);
        return "Order uploaded successfully";
    }
}
