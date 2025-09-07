package com.JanithAbeywardhana.ARMS.system.model;

import java.util.List;

public class QuickActionRequest {
	
	private String message;
    private List<String> recipients;

	public QuickActionRequest() {
		// TODO Auto-generated constructor stub
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<String> getRecipients() {
		return recipients;
	}

	public void setRecipients(List<String> recipients) {
		this.recipients = recipients;
	}
	
	

}
