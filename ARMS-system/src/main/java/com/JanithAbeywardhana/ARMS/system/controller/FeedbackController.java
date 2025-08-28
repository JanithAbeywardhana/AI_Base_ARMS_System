package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.Feedback;
import com.JanithAbeywardhana.ARMS.system.service.FeedbackService;


@RestController
@RequestMapping("/feedback")
@CrossOrigin
public class FeedbackController {
	
	@Autowired
    private FeedbackService feedbackService;
	
	@PostMapping("/add")
	public String addFeedback(@RequestBody Feedback feedback)
	{
		feedbackService.saveFeedback(feedback);
		return "Feedback added successfully!";
	}
	
	@GetMapping("/getAll")
	public List<Feedback> getAllFeedbacks()
	{
		return feedbackService.getAllFeedbacks();
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteFeedback(@PathVariable Long id)
	{
		Feedback existingFeedback = feedbackService.getFeedbackById(id);
		if(existingFeedback != null) {
			return feedbackService.deleteFeedback(id);
		}else {
			return "feedback not found with id" + id;
		}
	}


}
