package com.example.shop.repository;

import com.example.shop.model.Orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    @Query("SELECT o FROM Orders o WHERE o.customer.user.id = ?1")
    List<Orders> findAllByUserId(Long userId);

    @Query("SELECT o FROM Orders o JOIN o.orderItems oi WHERE oi.product.brand.id = ?1")
    List<Orders> findAllByBrandId(Long brandId);

    @Query("SELECT o FROM Orders o WHERE DATE_FORMAT(o.orderDate, '%Y-%m-%d') = :date")
    List<Orders> findAllByOrderDate(@Param("date") String orderDate);
}
