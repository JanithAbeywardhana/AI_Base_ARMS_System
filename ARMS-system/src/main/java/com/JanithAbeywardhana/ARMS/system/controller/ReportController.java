package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.Report;
import com.JanithAbeywardhana.ARMS.system.service.ReportService;

@RestController
@RequestMapping("/report")
@CrossOrigin
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	@PostMapping("/add")
	public String addReport(@RequestBody Report report) {
		reportService.saveReport(report);
		return "Report submitted Successfully!";
	}
	
	@GetMapping("/getAll")
	public List<Report> getAllReports()
	{
	return reportService.getAllReports();	
	}
	
	@GetMapping("/get/{id}")
	public Report getReportById(@PathVariable int id)
	{
		return reportService.getReportById(id);
	}
	
	@PutMapping("/update/{id}")
	public String updatReport(@PathVariable int id, @RequestBody Report report)
	{
		Report existingReport = reportService.getReportById(id);
		if(existingReport != null) {
			report.setReportId(id);
			reportService.updateReport(report);
			return "Report Update Successfully";
		}else {
			return "Report not found with ID" + id;
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteReport(@PathVariable int id)
	{
		Report existingReport = reportService.getReportById(id);
		if(existingReport != null) {
			return reportService.deleteReport(id);
		}else {
			return "Report not found with id" + id;
		}
	}
	
	@GetMapping("/student/{studentId}")
	public List<Report> getReportsByStudentId(@PathVariable int studentId){
		return reportService.getReportsByStudentId(studentId);
	}
	
	
	@GetMapping("/getLatest/{limit}")
	public List<Report> getLatestReports(@PathVariable int limit) {
	    return reportService.getLatestReports(limit);
	}
	
	

}
