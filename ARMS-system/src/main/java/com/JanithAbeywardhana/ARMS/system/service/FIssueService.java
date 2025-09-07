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
	
	public List<FIssue> getFacultyIssuesByUniversityId(Long universityId);
	
	public FIssue getFacultyIssueById(int issueId);
	
	public void updateFacultyIssue(FIssue issue);
	
	public long countByUniversityId(Long universityId);
	
	public long countByUniversityIdAndStatus(Long universityId, String status);
	
    List<FIssue> getFacultyIssuesByUniversityName(String universityName);
    long countByUniversityName(String universityName);
    long countByUniversityNameAndStatus(String universityName, String status);
	
	

}
