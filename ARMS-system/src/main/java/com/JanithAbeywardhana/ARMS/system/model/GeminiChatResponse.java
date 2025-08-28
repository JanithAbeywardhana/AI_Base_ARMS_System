package com.JanithAbeywardhana.ARMS.system.model;

public class GeminiChatResponse {

	 private String response;
	    private String sessionId;
	    private boolean success;
	    private String error;
	    
	    // Constructors
	    public GeminiChatResponse() {}
	    
	    public GeminiChatResponse(String response, String sessionId, boolean success) {
	        this.response = response;
	        this.sessionId = sessionId;
	        this.success = success;
	    }
	    
	    // Getters and Setters
	    public String getResponse() { return response; }
	    public void setResponse(String response) { this.response = response; }
	    
	    public String getSessionId() { return sessionId; }
	    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
	    
	    public boolean isSuccess() { return success; }
	    public void setSuccess(boolean success) { this.success = success; }
	    
	    public String getError() { return error; }
	    public void setError(String error) { this.error = error; }
	}
