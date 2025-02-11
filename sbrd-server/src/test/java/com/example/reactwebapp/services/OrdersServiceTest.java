package com.example.reactwebapp.services;

import com.example.reactwebapp.resources.TestOrderUtil;

import com.example.shop.model.Orders;
import com.example.shop.repository.OrderRepository;

import com.example.shop.response.dto.OrdersDto;
import com.example.shop.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Timestamp;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.when;

public class OrdersServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService serviceUnderTest;

    @BeforeEach
    public void setUp() {
        // initialize the repository and the service class
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testThatOrderIsReturnedFromRepository() {
        // Given
        List<Orders> orders = TestOrderUtil.createTestOrderA();
        when(orderRepository.findAll()).thenReturn(orders);
        // When
        List<OrdersDto> ordersReturned = serviceUnderTest.getOrders();

        // Then
        assertThat(ordersReturned).isNotNull();
        assertThat(ordersReturned.get(0).getId()).isEqualTo(1L);
        assertThat(ordersReturned.get(0).getCustomerId()).isEqualTo(1L);
        assertThat(ordersReturned.get(0).getTotalPrice()).isEqualTo(100);
        assertThat(ordersReturned.get(0).getOrderDate()).isEqualTo(new Timestamp(100));
    }

    @Test
    public void testThatOrderIsReturnedByUserId() {
        // Given
        List<Orders> orders = TestOrderUtil.createTestOrderA();
        when(orderRepository.findAllByUserId(1L)).thenReturn(orders);
        // When
        List<OrdersDto> ordersReturned = serviceUnderTest.getOrdersByUserId(1L);

        // Then
        assertThat(ordersReturned).isNotNull();
        assertThat(ordersReturned.get(0).getId()).isEqualTo(1L);
        assertThat(ordersReturned.get(0).getCustomerId()).isEqualTo(1L);
        assertThat(ordersReturned.get(0).getTotalPrice()).isEqualTo(100);
        assertThat(ordersReturned.get(0).getOrderDate()).isEqualTo(new Timestamp(100));
    }
}
