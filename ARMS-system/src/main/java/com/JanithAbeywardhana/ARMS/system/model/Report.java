package com.JanithAbeywardhana.ARMS.system.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Report {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reportId;
	private String title;
	private String description;
	private Long universityId;
	private String university;
	private String location;
	private String dateofIncident;
	private Timestamp reportDate;
	private String status;
	private String priority;
	private Boolean isAnonymous;
	private int studentId;
	private String universityResponse;
	private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
	

	public Report() {
		
	}
	
	
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}



	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}



	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}



	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}



	public String getUniversityResponse() {
		return universityResponse;
	}



	public void setUniversityResponse(String universityResponse) {
		this.universityResponse = universityResponse;
	}



	public String getPriority() {
		return priority;
	}



	public void setPriority(String priority) {
		this.priority = priority;
	}



	public Long getUniversityid() {
		return universityId;
	}



	public void setUniversityid(Long universityid) {
		this.universityId = universityid;
	}



	public String getUniversity() {
		return university;
	}


	public void setUniversity(String university) {
		this.university = university;
	}


	public int getReportId() {
		return reportId;
	}


	public void setReportId(int reportId) {
		this.reportId = reportId;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getDateofIncident() {
		return dateofIncident;
	}


	public void setDateofIncident(String dateofIncident) {
		this.dateofIncident = dateofIncident;
	}


	public Timestamp getReportDate() {
		return reportDate;
	}


	public void setReportDate(Timestamp reportDate) {
		this.reportDate = reportDate;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Boolean getIsAnonymous() {
		return isAnonymous;
	}


	public void setIsAnonymous(Boolean isAnonymous) {
		this.isAnonymous = isAnonymous;
	}


	public int getStudentId() {
		return studentId;
	}


	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}
	
	

}
