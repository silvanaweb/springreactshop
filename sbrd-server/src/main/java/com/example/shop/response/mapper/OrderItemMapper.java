package com.example.shop.response.mapper;

import com.example.shop.model.OrderItem;
import com.example.shop.response.dto.OrderItemDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderItemMapper {
    OrderItemMapper INSTANCE = Mappers.getMapper(OrderItemMapper.class);

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    OrderItemDto orderItemToOrderItemDTO(OrderItem orderItem);
}
