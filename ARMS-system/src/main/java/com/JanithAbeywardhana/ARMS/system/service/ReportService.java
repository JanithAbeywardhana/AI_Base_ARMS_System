package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import com.JanithAbeywardhana.ARMS.system.model.Report;

public interface ReportService {
	
	public Report saveReport(Report report);
	
	public List<Report> getAllReports();
	
	public Report updateReport(Report report);
	
	public String deleteReport(int id);
	
	public Report getReportById(int id);
	
	List<Report> getReportsByStudentId(int studentId);
	
	public List<Report> getLatestReports(int limit);
	
	public List<Report> getReportsByUniversityId(Long universityId);
	
	public List<Report> getReportsByUniversityName(String university);
	
	public long countByUniversityId(Long universityId);
	
	public long countByUniversityIdAndStatus(Long universityId, String status);
	
   
    long countByUniversityName(String universityName);
    long countByUniversityNameAndStatus(String universityName, String status);
	
	
	

}
