package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.Guideline;

import com.JanithAbeywardhana.ARMS.system.service.GuidelineService;

@RestController
@RequestMapping("/guideline")
@CrossOrigin
public class GuidelineController {

	@Autowired
	private GuidelineService guidelineService;
	
	@PostMapping("/add")
	public String addGuideline(@RequestBody Guideline guideline)
	{
		guidelineService.saveGuideline(guideline);
		return "Guideline saved successfully!";
	}
	
	@GetMapping("/getAll")
	public List<Guideline> getAllGuidelines()
	{
		return guidelineService.getAllGuidelines();
	}
	
	 @PutMapping("/update/{id}")
	 public String updateGuideline(@PathVariable Long id, @RequestBody Guideline guideline)
	 {
		 Guideline existingGuideline = guidelineService.getGuidelineById(id);
		 if(existingGuideline != null) {
			 guideline.setId(id);
			 guidelineService.updateGuideline(guideline);
			 return "Guideline updated successfully!";
		 }else {
			 return "Not found with id" +id; 
		 }
	 }
	 
	 @DeleteMapping("/delete/{id}")
	 public String deleteGuideline(@PathVariable Long id)
	 {
		 Guideline existingGuideline = guidelineService.getGuidelineById(id);
		 if(existingGuideline != null) {
			 return guidelineService.deleteGuideline(id);
			 
		 }else {
			 return "Guideline not found with"+id;		 
	      }
	}
	

}
	


