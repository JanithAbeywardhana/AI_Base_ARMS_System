package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.FIssue;
import com.JanithAbeywardhana.ARMS.system.repository.FIssueRepo;

@Service
public class FIssueServiceImplement implements FIssueService {

	@Autowired
	private FIssueRepo fissueRepo;

	@Override
	public FIssue saveFIssue(FIssue fissue) {
		return fissueRepo.save(fissue);
	}

	@Override
	public List<FIssue> getReportsByStudentId(int studentId) {
		return fissueRepo.findByStudentId(studentId);
	}

	@Override
	public List<FIssue> getAllFIssues() {
		return fissueRepo.findAll();
	}

	@Override
	public FIssue updateFIssue(FIssue fissue) {
		return fissueRepo.save(fissue);
	}

	@Override
	public String deleteFIssue(int id) {
		fissueRepo.deleteById(id);
		return "Faculty Report delete successfully!";
	}

	@Override
	public FIssue getFIssueById(int id) {
		return fissueRepo.findById(id).orElse(null);
	}
	
	
	
	
	
	
	

}
