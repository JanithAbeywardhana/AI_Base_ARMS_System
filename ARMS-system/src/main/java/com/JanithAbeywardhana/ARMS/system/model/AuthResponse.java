package com.JanithAbeywardhana.ARMS.system.model;

public class AuthResponse {

	private String token;
    private Student student;
    private String message;
    
    public AuthResponse(String token, Student student, String message) {
        this.token = token;
        this.student = student;
        this.message = message;
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
    
    
    

}
