package com.example.shop.service;

import com.example.shop.response.dto.OrdersDto;
import com.example.shop.model.Orders;
import com.example.shop.repository.OrderRepository;
import com.example.shop.response.mapper.OrdersMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public List<OrdersDto> getOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrdersMapper.INSTANCE::orderToOrderDTO).collect(Collectors.toList());
    }

//    public List<OrdersDto> getOrdersByUserId(Long userId) {
//        return orderRepository.findAllByUserId(userId)
//                .stream()
//                .map(OrdersMapper.INSTANCE::orderToOrderDTO).collect(Collectors.toList());
//    }

    public String addOrder(Orders order) {
        orderRepository.save(order);
        return "Order uploaded successfully";
    }
}
