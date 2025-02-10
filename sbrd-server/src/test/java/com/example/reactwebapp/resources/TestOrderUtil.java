package com.example.reactwebapp.resources;

import com.example.shop.model.Customer;
import com.example.shop.model.Orders;

import java.sql.Timestamp;
import java.util.List;

public final class TestOrderUtil {

    public static List<Orders> createTestOrderA() {
        Orders order = new Orders();
        order.setId(1L);
        order.setCustomer(Customer.builder().id(1L).build());
        order.setTotalPrice(100);
        order.setOrderDate(new Timestamp(100));
        return List.of(order);
    }
}
