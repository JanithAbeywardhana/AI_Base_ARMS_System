package com.JanithAbeywardhana.ARMS.system.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.Communication;
import com.JanithAbeywardhana.ARMS.system.model.EmailRequest;

import com.JanithAbeywardhana.ARMS.system.model.QuickActionRequest;
import com.JanithAbeywardhana.ARMS.system.model.University;
import com.JanithAbeywardhana.ARMS.system.repository.CommunicationRepo;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class CommunicationServiceImplement implements CommunicationService {
	
	@Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private CommunicationRepo communicationRepo;
    
    @Autowired
    private UniversityService universityService;

	@Override
	public void sendEmail(EmailRequest request) {
		try {
          
            for (String recipient : request.getRecipients()) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(recipient);
                message.setSubject(request.getSubject());
                message.setText(request.getMessage());
                message.setFrom("admin@arms.lk");
                mailSender.send(message);
            }
            
            
            Communication comm = new Communication();
            comm.setType("email");
            comm.setSubject(request.getSubject());
            comm.setMessage(request.getMessage());
            comm.setRecipients(String.join(",", request.getRecipients()));
            comm.setStatus("sent");
            comm.setPriority(request.getPriority());
            comm.setSentAt(LocalDateTime.now());
            comm.setSentBy("admin@arms.lk");
            
            communicationRepo.save(comm);
            
        } catch (Exception e) {
            // Save failed communication
            Communication comm = new Communication();
            comm.setType("email");
            comm.setSubject(request.getSubject());
            comm.setMessage(request.getMessage());
            comm.setRecipients(String.join(",", request.getRecipients()));
            comm.setStatus("failed");
            comm.setSentAt(LocalDateTime.now());
            communicationRepo.save(comm);
            
            throw new RuntimeException("Email sending failed: " + e.getMessage());
        }
		
	}

	@Override
	public void sendQuickAction(String type, QuickActionRequest request) {
		String subject = "";
        String template = "";
        
        switch (type) {
            case "emergency":
                subject = "URGENT: Emergency Safety Alert";
                template = "Emergency Alert: " + request.getMessage();
                break;
            case "incident":
                subject = "Incident Investigation Update";
                template = "Investigation Update: " + request.getMessage();
                break;
            case "policy":
                subject = "Anti-Ragging Policy Update";
                template = "Policy Update: " + request.getMessage();
                break;
        }
        
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setRecipients(request.getRecipients());
        emailRequest.setSubject(subject);
        emailRequest.setMessage(template);
        emailRequest.setPriority("high");
        
        sendEmail(emailRequest);
    }

	@Override
	public List<Communication> getRecentCommunications(int limit) {
		return communicationRepo.findTop10ByOrderBySentAtDesc();
	}

	@Override
	public List<Communication> getCommunicationsByUniversityId(Long universityId) {
		return communicationRepo.findByUniversityId(universityId);
	}

	@Override
	public Communication saveCommunication(Communication communication) {
		if (communication.getSentAt() == null) {
            communication.setSentAt(LocalDateTime.now());
        }
        return communicationRepo.save(communication);
	}

	@Override
	public List<Communication> getCommunicationsByUniversityName(String universityName) {
		try {
            // Find university by name first
            List<University> universities = universityService.searchUniversitiesByName(universityName);
            if (!universities.isEmpty()) {
                University university = universities.get(0); // Get first match
                String universityEmail = university.getEmail();
                return communicationRepo.findByRecipientsContaining(universityEmail);
            }
        } catch (Exception e) {
            System.err.println("Error fetching communications by university name: " + e.getMessage());
        }
        return new ArrayList<>();
    }
	}


	
	
		


	


