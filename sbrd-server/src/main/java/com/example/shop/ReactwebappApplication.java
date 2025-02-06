package com.example.shop;

import com.example.shop.model.Brand;
import com.example.shop.repository.BrandRepository;
import com.example.shop.security.RsaKeyProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import java.util.Arrays;
import java.util.List;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class ReactwebappApplication implements CommandLineRunner {

	@Autowired
	BrandRepository brandRepository;

	public static void main(String[] args) {
		// add Brands to DB
		SpringApplication.run(ReactwebappApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception
	{
		List<Brand> brands = Arrays.asList(
				new Brand(null, "Nike"),
				new Brand(null, "Adidas"),
				new Brand(null, "Puma"),
				new Brand(null, "Reebok"),
				new Brand(null, "Fila")
		);
		var response = brandRepository.findAll();
		if (response.size() == 0){
			brandRepository.saveAll(brands);
		}
	}

}
