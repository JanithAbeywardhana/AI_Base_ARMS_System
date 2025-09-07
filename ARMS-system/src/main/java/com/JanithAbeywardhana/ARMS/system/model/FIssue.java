package com.JanithAbeywardhana.ARMS.system.model;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class FIssue {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int issueId;
	private int studentId;
	private Long universityId;
	private String universityName;
	private String department;
	private String subject;
	private String description;
	private String universityResponse;
	private Timestamp respondedAt;
	
	
	public String getUniversityResponse() {
		return universityResponse;
	}


	public void setUniversityResponse(String universityResponse) {
		this.universityResponse = universityResponse;
	}


	public Timestamp getRespondedAt() {
		return respondedAt;
	}


	public void setRespondedAt(Timestamp respondedAt) {
		this.respondedAt = respondedAt;
	}


	public Long getUniversityid() {
		return universityId;
	}


	public void setUniversityid(Long universityid) {
		this.universityId = universityid;
	}

	private String issueType;
    private String priority;
    private String status;
    private Timestamp createdAt;
    
	public FIssue() {
		// TODO Auto-generated constructor stub
	}


	public String getUniversityName() {
		return universityName;
	}

	public void setUniversityName(String universityName) {
		this.universityName = universityName;
	}


	public int getIssueId() {
		return issueId;
	}

	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}

	public int getStudentId() {
		return studentId;
	}

	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIssueType() {
		return issueType;
	}

	public void setIssueType(String issueType) {
		this.issueType = issueType;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	
	

}
