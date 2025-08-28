package com.JanithAbeywardhana.ARMS.system.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Feedback {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long feedbackId;
	
	private Long studentId;
	
	@Column(length = 2000)
	private String feedbackText;
	
	private String feedbackType;
	
	private int rating;
	
	private LocalDateTime createdAt;
	

	public Feedback() {
		// TODO Auto-generated constructor stub
	}


	public Long getFeedbackId() {
		return feedbackId;
	}


	public void setFeedbackId(Long feedbackId) {
		this.feedbackId = feedbackId;
	}


	public Long getStudentId() {
		return studentId;
	}


	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}


	public String getFeedbackText() {
		return feedbackText;
	}


	public void setFeedbackText(String feedbackText) {
		this.feedbackText = feedbackText;
	}


	public String getFeedbackType() {
		return feedbackType;
	}


	public void setFeedbackType(String feedbackType) {
		this.feedbackType = feedbackType;
	}


	public int getRating() {
		return rating;
	}


	public void setRating(int rating) {
		this.rating = rating;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
	

}
