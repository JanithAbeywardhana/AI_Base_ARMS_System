package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import com.JanithAbeywardhana.ARMS.system.model.FIssue;

public interface FIssueService {
	
	public FIssue saveFIssue(FIssue fissue);
	
	public List<FIssue> getAllFIssues();
	
	public FIssue updateFIssue(FIssue fissue);
	
	public String deleteFIssue(int id);
	
	public FIssue getFIssueById(int id);
	
	List<FIssue> getReportsByStudentId(int studentId);

}
