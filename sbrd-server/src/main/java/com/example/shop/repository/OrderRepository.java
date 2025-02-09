package com.example.shop.repository;

import com.example.shop.model.Orders;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

//    public List<Orders> findAllByUserId(Long userId);
}
