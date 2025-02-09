package com.example.shop.response.dto;

import java.util.List;

public class OrdersDto {
    private Long id;
    private Long customerId;
    private Long userId;
    private String username;
    private Double totalPrice;
    private List<OrderItemDto> orderItems;

    public OrdersDto() {
    }

    public OrdersDto(Long id, Long customerId, Long userId, String username, Double totalPrice, List<OrderItemDto> orderItems) {
        this.id = id;
        this.customerId = customerId;
        this.userId = userId;
        this.username = username;
        this.totalPrice = totalPrice;
        this.orderItems = orderItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
