package com.example.reactwebapp;

import com.example.shop.model.Brand;
import com.example.shop.model.Product;

import java.util.List;

public final class TestProductUtil {
    public static Product createTestProductA() {
        return Product.builder()
                .id(1L)
                .name("Product 1")
                .description("Product 1 description")
                .brand(Brand.builder().id(1L).name("Pickle").build())
                .image("/image.jpg")
                .price(100)
                .build();
    }

    public static List<Product> createTestProductsB() {
        Product p1 = Product.builder()
                .id(1L)
                .name("Product 1")
                .description("Product 1 description")
                .brand(Brand.builder().id(1L).name("Pickle").build())
                .image("/image.jpg")
                .price(100)
                .build();
        Product p2 = Product.builder()
                .id(2L)
                .name("Product 2")
                .description("Product 2 description")
                .brand(Brand.builder().id(2L).name("Pickle").build())
                .image("/image.jpg")
                .price(200)
                .build();
        return List.of(p1, p2);
    }
}
