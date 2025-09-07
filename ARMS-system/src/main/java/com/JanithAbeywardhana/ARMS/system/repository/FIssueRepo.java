package com.JanithAbeywardhana.ARMS.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JanithAbeywardhana.ARMS.system.model.FIssue;

public interface FIssueRepo extends JpaRepository<FIssue, Integer> {
	List<FIssue> findByStudentId(int studentId);
	
	List<FIssue> findByUniversityId(Long universityId);
	
	
	
    long countByUniversityName(String universityName);
    long countByUniversityNameAndStatus(String universityName, String status);
	
	
	 List<FIssue> findByUniversityName(String universityName);
	
	    long countByUniversityId(Long universityId);
	    long countByUniversityIdAndStatus(Long universityId, String status);

}
