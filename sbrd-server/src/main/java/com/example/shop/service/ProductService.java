package com.example.shop.service;


import com.example.shop.model.Product;
import com.example.shop.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService {

    private static final Object FOLDER_PATH = "/Users/silvana.donato/workspace/playground/javaprojects/reactwebapp/sbrd-server/src/main/resources/static/images";
    private final ProductRepository productRepository;

    public String addProduct(Product product) {
        productRepository.save(product);
        return "Product uploaded successfully";
    }
    
    public List<Product> getProducts() {
        return productRepository.findAll();
    }


    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

}
