package com.example.shop.exception;

import java.util.Date;

public class ApiError {
    private String errorCode;
    private String message;
    private Date errorDate;
    private String description;

    public ApiError() {
    }

    public ApiError(String errorCode, String message, Date errorDate) {
        this.errorCode = errorCode;
        this.message = message;
        this.errorDate = errorDate;
        this.description = "";
    }

    public ApiError(String errorCode, String message, Date errorDate, String description) {
        this.errorCode = errorCode;
        this.message = message;
        this.errorDate = errorDate;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getErrorDate() {
        return errorDate;
    }

    public void setErrorDate(Date errorDate) {
        this.errorDate = errorDate;
    }
}
