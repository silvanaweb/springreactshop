package com.example.shop.repository;

import com.example.shop.model.Orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

//    public List<Orders> findAllByUserId(Long userId);

    @Query("SELECT o FROM Orders o WHERE o.customer.user.id = ?1")
    List<Orders> findAllByUserId(Long userId);

}
