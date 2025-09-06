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

	@Override
	public List<FIssue> getFacultyIssuesByUniversityId(Long universityId) {
		return fissueRepo.findByUniversityId(universityId);
	}

	@Override
	public FIssue getFacultyIssueById(int issueId) {
		return fissueRepo.findById(issueId).orElse(null);
	}

	@Override
	public void updateFacultyIssue(FIssue issue) {
		fissueRepo.save(issue);
		
	}

	@Override
	public long countByUniversityId(Long universityId) {
		return fissueRepo.countByUniversityId(universityId);
	}

	@Override
	public long countByUniversityIdAndStatus(Long universityId, String status) {
		return fissueRepo.countByUniversityIdAndStatus(universityId, status);
	}

	@Override
	public List<FIssue> getFacultyIssuesByUniversityName(String universityName) {
		return fissueRepo.findByUniversityName(universityName);
	}

	@Override
	public long countByUniversityName(String universityName) {
		return fissueRepo.countByUniversityName(universityName);
	}

	@Override
	public long countByUniversityNameAndStatus(String universityName, String status) {
		return fissueRepo.countByUniversityNameAndStatus(universityName, status);
	}
	
	
	
	
	
	
	
	
	

}
