package com.JanithAbeywardhana.ARMS.system.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long adminId;
    private String username;
    private String password; 
    private String email;
    
 // Add these new fields for settings
    private String systemName = "ARMS - Anti-Ragging Management System";
    private String emergencyHotline = "119";
    private boolean emailNotifications = true;
    private boolean smsAlerts = true;
    private boolean weeklyReports = false;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    

	public Admin() {
		// TODO Auto-generated constructor stub
	}

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public String getEmergencyHotline() {
		return emergencyHotline;
	}

	public void setEmergencyHotline(String emergencyHotline) {
		this.emergencyHotline = emergencyHotline;
	}

	public boolean isEmailNotifications() {
		return emailNotifications;
	}

	public void setEmailNotifications(boolean emailNotifications) {
		this.emailNotifications = emailNotifications;
	}

	public boolean isSmsAlerts() {
		return smsAlerts;
	}

	public void setSmsAlerts(boolean smsAlerts) {
		this.smsAlerts = smsAlerts;
	}

	public boolean isWeeklyReports() {
		return weeklyReports;
	}

	public void setWeeklyReports(boolean weeklyReports) {
		this.weeklyReports = weeklyReports;
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
	
	
	
	

}
