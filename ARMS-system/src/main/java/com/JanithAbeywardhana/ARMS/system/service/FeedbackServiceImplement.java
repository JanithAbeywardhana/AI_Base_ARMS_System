package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.Feedback;
import com.JanithAbeywardhana.ARMS.system.repository.FeedbackRepo;

@Service
public class FeedbackServiceImplement implements FeedbackService {
	
	@Autowired
	private FeedbackRepo feedbackRepo;
	

	@Override
	public Feedback saveFeedback(Feedback feedback) {
		return feedbackRepo.save(feedback);
	}

	@Override
	public List<Feedback> getAllFeedbacks() {
		return feedbackRepo.findAll();
	}

	@Override
	public Feedback updateFeedback(Feedback feedback) {
		return feedbackRepo.save(feedback);
	}

	@Override
	public String deleteFeedback(Long id) {
		feedbackRepo.deleteById(id);
		return "Student delete successfully!";
	}

	@Override
	public Feedback getFeedbackById(Long id) {
		
		return feedbackRepo.findById(id).orElse(null);
	}

}
