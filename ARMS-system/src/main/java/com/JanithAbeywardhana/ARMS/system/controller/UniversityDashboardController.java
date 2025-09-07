package com.JanithAbeywardhana.ARMS.system.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.Communication;
import com.JanithAbeywardhana.ARMS.system.model.FIssue;
import com.JanithAbeywardhana.ARMS.system.model.Report;
import com.JanithAbeywardhana.ARMS.system.model.University;
import com.JanithAbeywardhana.ARMS.system.service.CommunicationService;
import com.JanithAbeywardhana.ARMS.system.service.FIssueService;
import com.JanithAbeywardhana.ARMS.system.service.ReportService;
import com.JanithAbeywardhana.ARMS.system.service.UniversityService;

@RestController
@RequestMapping("/university-dashboard")
@CrossOrigin
public class UniversityDashboardController {

	@Autowired
    private FIssueService fissueService;
    
    @Autowired
    private ReportService reportService;
    
    @Autowired
    private CommunicationService communicationService;
    
    @Autowired
    private UniversityService universityService;
    
    
    @GetMapping("/faculty-issues/{universityId}")
    public List<FIssue> getFacultyIssuesByUniversity(@PathVariable Long universityId) {
        return fissueService.getFacultyIssuesByUniversityId(universityId);
    }
    
 // Get faculty issues by university name
    @GetMapping("/faculty-issues/by-name/{universityName}")
    public List<FIssue> getFacultyIssuesByUniversityName(@PathVariable String universityName) {
        return fissueService.getFacultyIssuesByUniversityName(universityName);
    }
    
 // Get ragging reports for specific university
    @GetMapping("/reports/{universityId}")
    public List<Report> getReportsByUniversity(@PathVariable Long universityId) {
        return reportService.getReportsByUniversityId(universityId);
    }
    
 // Get ragging reports by university name
    @GetMapping("/reports/by-name/{universityName}")
    public List<Report> getReportsByUniversityName(@PathVariable String universityName) {
        return reportService.getReportsByUniversityName(universityName);
    }
    
    
 // FIXED: Get communications by university ID
    @GetMapping("/communications/{universityId}")
    public ResponseEntity<List<Communication>> getCommunicationsByUniversity(@PathVariable Long universityId) {
        try {
            List<Communication> communications = communicationService.getCommunicationsByUniversityId(universityId);
            return ResponseEntity.ok(communications);
        } catch (Exception e) {
            System.err.println("Error fetching communications: " + e.getMessage());
            return ResponseEntity.ok(new ArrayList<>()); // Return empty list instead of error
        }
    }
    
    
 // FIXED: Get communications by university name
    @GetMapping("/communications/by-name/{universityName}")
    public ResponseEntity<List<Communication>> getCommunicationsByUniversityName(@PathVariable String universityName) {
        try {
            List<Communication> communications = communicationService.getCommunicationsByUniversityName(universityName);
            return ResponseEntity.ok(communications);
        } catch (Exception e) {
            System.err.println("Error fetching communications by name: " + e.getMessage());
            return ResponseEntity.ok(new ArrayList<>()); // Return empty list instead of error
        }
    }
    
 // Update faculty issue status and add university response
    @PutMapping("/faculty-issues/{issueId}")
    public ResponseEntity<String> updateFacultyIssue(
        @PathVariable int issueId, 
        @RequestBody Map<String, String> updateData) {
        
        try {
            String status = updateData.get("status");
            String response = updateData.get("response");
            
            FIssue issue = fissueService.getFIssueById(issueId);
            if (issue != null) {
                issue.setStatus(status);
                issue.setUniversityResponse(response);
                issue.setRespondedAt(new Timestamp(System.currentTimeMillis()));
                fissueService.updateFIssue(issue);
                return ResponseEntity.ok("Faculty issue updated successfully");
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update issue: " + e.getMessage());
        }
    }
    
    // Update ragging report status and add university response
    @PutMapping("/reports/{reportId}")
    public ResponseEntity<String> updateReport(
        @PathVariable int reportId, 
        @RequestBody Map<String, String> updateData) {
        
        try {
            String status = updateData.get("status");
            String response = updateData.get("response");
            
            Report report = reportService.getReportById(reportId);
            if (report != null) {
                report.setStatus(status);
                report.setUniversityResponse(response);
                report.setUpdatedAt(LocalDateTime.now());
                reportService.updateReport(report);
                return ResponseEntity.ok("Report updated successfully");
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update report: " + e.getMessage());
        }
    }
    
    // ENHANCED: Send reply to admin communication
    @PostMapping("/communications/reply")
    public ResponseEntity<String> replyToCommunication(@RequestBody Map<String, String> replyData) {
        try {
            String originalCommId = replyData.get("originalCommunicationId");
            String replyMessage = replyData.get("message");
            String universityEmail = replyData.get("universityEmail");
            String subject = replyData.get("subject");
            
            // Create a new communication as reply
            Communication reply = new Communication();
            reply.setType("email_reply");
            reply.setSubject("Re: " + subject);
            reply.setMessage(replyMessage);
            reply.setRecipients("admin@arms.lk"); // Send to admin
            reply.setStatus("sent");
            reply.setPriority("medium");
            reply.setSentAt(LocalDateTime.now());
            reply.setSentBy(universityEmail);
            
            // Set university ID for tracking
            if (originalCommId != null) {
                try {
                    Communication originalComm = communicationService.getRecentCommunications(100)
                        .stream()
                        .filter(c -> c.getId().toString().equals(originalCommId))
                        .findFirst()
                        .orElse(null);
                    if (originalComm != null) {
                        reply.setUniversityId(originalComm.getUniversityId());
                    }
                } catch (Exception e) {
                    System.err.println("Could not link reply to original communication: " + e.getMessage());
                }
            }
            
            communicationService.saveCommunication(reply);
            return ResponseEntity.ok("Reply sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send reply: " + e.getMessage());
        }
    }
    
    // Get dashboard statistics by university ID
    @GetMapping("/statistics/{universityId}")
    public ResponseEntity<Map<String, Object>> getDashboardStats(@PathVariable Long universityId) {
        try {
            Map<String, Object> stats = universityService.getDashboardStatistics(universityId);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    // Get dashboard statistics by university name
    @GetMapping("/statistics/by-name/{universityName}")
    public ResponseEntity<Map<String, Object>> getDashboardStatsByName(@PathVariable String universityName) {
        try {
            Map<String, Object> stats = universityService.getDashboardStatisticsByName(universityName);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    // University login
    @PostMapping("/login")
    public ResponseEntity<?> universityLogin(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        University university = universityService.loginUniversity(email, password);
        if (university != null) {
            // Return university data without password
            university.setPassword(null);
            return ResponseEntity.ok(university);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    
    // Get university profile by ID
    @GetMapping("/profile/{universityId}")
    public ResponseEntity<University> getUniversityProfile(@PathVariable Long universityId) {
        try {
            University university = universityService.getUniversityById(universityId);
            if (university != null) {
                university.setPassword(null); // Don't return password
                return ResponseEntity.ok(university);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    
}
