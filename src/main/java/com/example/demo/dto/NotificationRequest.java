package com.example.demo.dto;

import com.example.demo.model.NotificationType;

public class NotificationRequest {

    private String message;
    private NotificationType type;
    private Long orderId;

    public NotificationRequest() {
    }

    public NotificationRequest(String message, NotificationType type, Long orderId) {
        this.message = message;
        this.type = type;
        this.orderId = orderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}
