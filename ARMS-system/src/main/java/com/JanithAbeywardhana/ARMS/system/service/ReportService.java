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

}
