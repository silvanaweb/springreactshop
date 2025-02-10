package com.example.shop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception exception, WebRequest request){
        ApiError details = new ApiError(HttpStatus.NOT_FOUND.name(), exception.getMessage(), new Date(), request.getDescription(false));
        return new ResponseEntity<>(details, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> userNotFound(UserNotFoundException exception) {
        ApiError details = new ApiError(HttpStatus.NOT_FOUND.name(), exception.getMessage(), new Date());
        return new ResponseEntity<>(details, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> userNotFound(UserAlreadyExistsException exception){
        ApiError details = new ApiError(HttpStatus.BAD_REQUEST.name(), exception.getMessage(), new Date());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

}
