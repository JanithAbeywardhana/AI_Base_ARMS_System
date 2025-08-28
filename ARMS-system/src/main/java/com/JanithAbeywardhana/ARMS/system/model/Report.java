package com.JanithAbeywardhana.ARMS.system.model;

import java.sql.Timestamp;

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
	private String location;
	private String dateofIncident;
	private Timestamp reportDate;
	private String status;
	private Boolean isAnonymous;
	private int studentId;
	

	public Report() {
		
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
