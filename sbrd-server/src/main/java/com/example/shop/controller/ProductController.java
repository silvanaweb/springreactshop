package com.example.shop.controller;

import com.example.shop.model.Product;
import com.example.shop.service.ProductService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor // it injects the final fields in the constructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.FOUND);
    }

    @PostMapping
    public String addProduct(@RequestBody Product product) {
        System.out.println("Product: " + product);
        try {
            return productService.addProduct(product);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error uploading the product";
        }
    }

    @PutMapping("/update/{id}")
    public Product updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/image/{name}")
    public ResponseEntity<byte[]> getImage(@PathVariable String name) throws IOException {
        byte[] imagedata = productService.getProductImage(name);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.ALL).body(imagedata);
    }


    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        System.out.println("Product id: " + id);
        Product product = productService.getProductById(id);
        System.out.println("Product: " + product);
        return product;
    }

}
