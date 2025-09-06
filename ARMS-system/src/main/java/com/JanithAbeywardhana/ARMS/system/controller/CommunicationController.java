package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.Communication;
import com.JanithAbeywardhana.ARMS.system.model.EmailRequest;
import com.JanithAbeywardhana.ARMS.system.model.QuickActionRequest;
import com.JanithAbeywardhana.ARMS.system.service.CommunicationService;

@RestController
@RequestMapping("/communications")
@CrossOrigin
public class CommunicationController {

	@Autowired
    private CommunicationService communicationService;
    
    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest request) {
        try {
            communicationService.sendEmail(request);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send email: " + e.getMessage());
        }
    }
    
    @GetMapping("/recent")
    public List<Communication> getRecentCommunications() {
        return communicationService.getRecentCommunications(10);
    }
    

    
    @PostMapping("/quick-action/{type}")
    public ResponseEntity<String> sendQuickAction(@PathVariable String type, @RequestBody QuickActionRequest request) {
        try {
            communicationService.sendQuickAction(type, request);
            return ResponseEntity.ok("Quick action executed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed: " + e.getMessage());
        }
    }
    
    
    

}
