package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import com.JanithAbeywardhana.ARMS.system.model.Feedback;

public interface FeedbackService {
	
	public Feedback saveFeedback (Feedback feedback);
	
	public List<Feedback> getAllFeedbacks();
	
	public Feedback updateFeedback(Feedback feedback);
	
	public String deleteFeedback(Long id);
	
	public Feedback getFeedbackById(Long id);
	

}
