package com.JanithAbeywardhana.ARMS.system.model;

import java.util.List;

public class EmailRequest {

	private List<String> recipients;
    private String subject;
    private String message;
    private String priority;
    private Long templateId;
    
    
	public EmailRequest() {
		// TODO Auto-generated constructor stub
	}


	public List<String> getRecipients() {
		return recipients;
	}


	public void setRecipients(List<String> recipients) {
		this.recipients = recipients;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getPriority() {
		return priority;
	}


	public void setPriority(String priority) {
		this.priority = priority;
	}


	public Long getTemplateId() {
		return templateId;
	}


	public void setTemplateId(Long templateId) {
		this.templateId = templateId;
	}
	
	

}
