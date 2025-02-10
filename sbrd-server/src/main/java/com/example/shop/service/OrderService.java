package com.example.shop.service;

import com.example.shop.response.dto.OrdersDto;
import com.example.shop.model.Orders;
import com.example.shop.repository.OrderRepository;
import com.example.shop.response.mapper.OrdersMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public String validateDate(String strDate) {
        try {
            new SimpleDateFormat("yyyyDDmm").parse(strDate);
            return strDate;
        } catch (ParseException e) {
            return null;
        }
    }

    public List<OrdersDto> getOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrdersMapper.INSTANCE::orderToOrderDTO).collect(Collectors.toList());
    }

    public List<OrdersDto> getOrdersByUserId(Long userId) {
        return orderRepository.findAllByUserId(userId)
                .stream()
                .map(OrdersMapper.INSTANCE::orderToOrderDTO).collect(Collectors.toList());
    }

    public List<OrdersDto> getOrdersByBrandId(Long brandId) {
        return orderRepository.findAllByBrandId(brandId)
                .stream()
                .map(OrdersMapper.INSTANCE::orderToOrderDTO).collect(Collectors.toList());
    }

    public List<OrdersDto> getOrdersByOrderDate(String orderDate) {
        String validDate = validateDate(orderDate);
        System.out.println("Timestamp" + validDate);
        if (validDate == null) {
            return null;
        }
        return orderRepository.findAllByOrderDate(validDate)
                .stream()
                .map(OrdersMapper.INSTANCE::orderToOrderDTO).collect(Collectors.toList());
    }

    public String addOrder(Orders order) {
        orderRepository.save(order);
        return "Order uploaded successfully";
    }

}
