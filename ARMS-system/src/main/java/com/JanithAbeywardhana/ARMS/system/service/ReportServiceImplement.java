package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.Report;

import com.JanithAbeywardhana.ARMS.system.repository.ReportRepo;

@Service
public class ReportServiceImplement implements ReportService {

	 @Autowired
	private ReportRepo reportRepo;

	@Override
	public List<Report> getReportsByStudentId(int studentId) {
		return reportRepo.findByStudentId(studentId);	}

	@Override
	public Report saveReport(Report report) {
		return reportRepo.save(report);
	}

	@Override
	public List<Report> getAllReports() {
		return reportRepo.findAll();
	}

	@Override
	public Report updateReport(Report report) {
		return reportRepo.save(report);
	}

	@Override
	public String deleteReport(int id) {
		reportRepo.deleteById(id);
		return "Report Deleted successfully";
	}

	@Override
	public List<Report> getLatestReports(int limit) {
		return reportRepo.findAllByOrderByReportDateDesc(PageRequest.of(0, limit));
	}

	@Override
	public Report getReportById(int id) {
		return reportRepo.findById(id).orElse(null);
	}
	
	
	 
	 

}
