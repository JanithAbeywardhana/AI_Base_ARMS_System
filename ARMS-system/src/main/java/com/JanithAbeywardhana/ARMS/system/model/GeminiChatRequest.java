package com.JanithAbeywardhana.ARMS.system.model;

public class GeminiChatRequest {

	private String message;
    private String sessionId; // Optional for session tracking
    
    // Constructors
    public GeminiChatRequest() {}
    
    public GeminiChatRequest(String message, String sessionId) {
        this.message = message;
        this.sessionId = sessionId;
    }
    
    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
}
