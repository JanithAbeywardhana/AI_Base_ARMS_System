package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import com.JanithAbeywardhana.ARMS.system.model.Communication;
import com.JanithAbeywardhana.ARMS.system.model.EmailRequest;
import com.JanithAbeywardhana.ARMS.system.model.QuickActionRequest;

public interface CommunicationService {
	
	public void sendEmail(EmailRequest request);
	
	public void sendQuickAction(String type, QuickActionRequest request);
	
	public List<Communication> getRecentCommunications(int limit);
	
List<Communication> getCommunicationsByUniversityId(Long universityId);
    
    Communication saveCommunication(Communication communication);
    
    
    List<Communication> getCommunicationsByUniversityName(String universityName);
    
 
	
	

}
