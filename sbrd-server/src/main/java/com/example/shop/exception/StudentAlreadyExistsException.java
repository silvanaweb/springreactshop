package com.example.shop.exception;

public class StudentAlreadyExistsException extends RuntimeException {
    public StudentAlreadyExistsException(String s) {
        super(s);
    }
}
