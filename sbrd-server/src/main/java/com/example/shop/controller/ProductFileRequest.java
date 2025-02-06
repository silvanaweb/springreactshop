package com.example.shop.controller;

import com.example.shop.model.Product;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@NoArgsConstructor
@Setter
@Getter
public class ProductFileRequest {

    private Product product;
    private MultipartFile file;

    public ProductFileRequest(Product product, MultipartFile file) {
        this.product = product;
        this.file = file;
    }

}
