package com.example.reactwebapp.services;

import com.example.reactwebapp.TestProductUtil;
import com.example.shop.model.Brand;
import com.example.shop.model.Product;
import com.example.shop.repository.ProductRepository;
import com.example.shop.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.when;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService serviceUnderTest;

    @BeforeEach
    public void setUp() {
        // initialize the repository and the service class
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void testThatProductIsReturnedFromRepository() {
        // Given
        Product product = TestProductUtil.createTestProductA();
        when(productRepository.findById(1L)).thenReturn(java.util.Optional.of(product));

        // When
        Product productReturned = serviceUnderTest.getProductById(1L);

        // Then
        assertThat(productReturned).isNotNull();
        assertThat(productReturned.getId()).isEqualTo(1L);
        assertThat(productReturned.getName()).isEqualTo("Product 1");
        assertThat(productReturned.getPrice()).isEqualTo(100);
        assertThat(productReturned.getImage()).isEqualTo("/image.jpg");
        assertThat(productReturned.getDescription()).isEqualTo("Product 1 description");
        assertThat(productReturned.getBrand()).isEqualTo(Brand.builder().id(1L).name("Pickle").build());
    }

    @Test
    public void testThatListProductReturnsFromRepository() {
        List<Product> products = TestProductUtil.createTestProductsB();
        when(productRepository.findAll()).thenReturn(products);

        List<Product> productsReturned = serviceUnderTest.getProducts();

        assertThat(productsReturned).isNotNull();
        assertThat(productsReturned.size()).isEqualTo(2);
        assertThat(productsReturned.get(0).getId()).isEqualTo(1L);
        assertThat(productsReturned.get(0).getName()).isEqualTo("Product 1");
        assertThat(productsReturned.get(0).getPrice()).isEqualTo(100);
        assertThat(productsReturned.get(0).getImage()).isEqualTo("/image.jpg");
        assertThat(productsReturned.get(0).getDescription()).isEqualTo("Product 1 description");
        assertThat(productsReturned.get(0).getBrand()).isEqualTo(Brand.builder().id(1L).name("Pickle").build());
        assertThat(productsReturned.get(1).getId()).isEqualTo(2L);
        assertThat(productsReturned.get(1).getName()).isEqualTo("Product 2");
        assertThat(productsReturned.get(1).getImage()).isEqualTo("/image.jpg");
        assertThat(productsReturned.get(1).getPrice()).isEqualTo(200);
        assertThat(productsReturned.get(1).getDescription()).isEqualTo("Product 2 description");
        assertThat(productsReturned.get(1).getBrand()).isEqualTo(Brand.builder().id(2L).name("Pickle").build());
    }

    @Test
    public void testThatProductIsAddedToRepository() {
        // Given
        Product product = TestProductUtil.createTestProductA();
        when(productRepository.save(product)).thenReturn(product);

        // When
        String response = serviceUnderTest.addProduct(product);

        // Then
        assertThat(response).isEqualTo("Product uploaded successfully");
        assertThat(product.getId()).isEqualTo(1L);
        assertThat(product.getName()).isEqualTo("Product 1");
        assertThat(product.getPrice()).isEqualTo(100);
        assertThat(product.getImage()).isEqualTo("/image.jpg");
        assertThat(product.getDescription()).isEqualTo("Product 1 description");
        assertThat(product.getBrand()).isEqualTo(Brand.builder().id(1L).name("Pickle").build());
    }

    @Test
    public void testThatProductIsUpdatedInRepository() {
        // Given
        Product product = TestProductUtil.createTestProductA();
        when(productRepository.save(product)).thenReturn(product);

        // When
        Product productReturned = serviceUnderTest.updateProduct(product);

        // Then
        assertThat(productReturned).isNotNull();
        assertThat(productReturned.getId()).isEqualTo(1L);
        assertThat(productReturned.getName()).isEqualTo("Product 1");
        assertThat(productReturned.getPrice()).isEqualTo(100);
        assertThat(productReturned.getImage()).isEqualTo("/image.jpg");
        assertThat(productReturned.getDescription()).isEqualTo("Product 1 description");
        assertThat(productReturned.getBrand()).isEqualTo(Brand.builder().id(1L).name("Pickle").build());
    }

}
