package com.example.shop.response.mapper;

import com.example.shop.model.Orders;
import com.example.shop.response.dto.OrdersDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = OrderItemMapper.class)
public interface OrdersMapper {
    OrdersMapper INSTANCE = Mappers.getMapper(OrdersMapper.class);

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.user.username", target = "username")
    @Mapping(source = "customer.user.id", target = "userId")
    OrdersDto orderToOrderDTO(Orders order);
}
