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

import com.JanithAbeywardhana.ARMS.system.model.FIssue;
import com.JanithAbeywardhana.ARMS.system.service.FIssueService;

@RestController
@RequestMapping("/fissue")
@CrossOrigin
public class FIssueController {

	@Autowired
	private FIssueService fissueService;
	
	@PostMapping("/add")
	public String addFIssue(@RequestBody FIssue fissue)
	{
		fissueService.saveFIssue(fissue);
		return "Faculty issue report added successfully!";
	}
	
	@GetMapping("/getAll")
	public List<FIssue> getAllFIssues()
	{
		return fissueService.getAllFIssues();
	}
	
	@GetMapping("/get/{id}")
	public FIssue getFIssueById(@PathVariable int id)
	{
		return fissueService.getFIssueById(id);
	}
	
	@PutMapping("/update/{id}")
	public String updateFIssue(@PathVariable int id, @RequestBody FIssue fissue )
	{
		FIssue existingFreport = fissueService.getFIssueById(id);
		if(existingFreport != null) {
			fissue.setIssueId(id);
			fissueService.updateFIssue(fissue);
			return "Faculty Issue Report updated successfully!";
		}else {
			return "Faculty Issue report not found with id" + id;
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteFIssue(@PathVariable int id)
	{
		FIssue existingFreport = fissueService.getFIssueById(id);
		if(existingFreport != null) {
			return fissueService.deleteFIssue(id);
		}else {
			return "Faculty Issue Report not found with id" + id; 
		}
	}
	
	
	@GetMapping("/student/{studentId}")
    public List<FIssue> getReportsByStudent(@PathVariable int studentId) {
        return fissueService.getReportsByStudentId(studentId);
    }
	
}
