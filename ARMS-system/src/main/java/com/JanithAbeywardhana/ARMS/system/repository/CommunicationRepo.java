package com.JanithAbeywardhana.ARMS.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.JanithAbeywardhana.ARMS.system.model.Communication;
import com.JanithAbeywardhana.ARMS.system.model.EmailTemplate;

public interface CommunicationRepo extends JpaRepository <Communication, Long> {
	
	List<Communication> findTop10ByOrderBySentAtDesc();
	
	List<Communication> findByUniversityId(Long universityId);
	
	// Method to find communications by university name
    @Query("SELECT c FROM Communication c JOIN University u ON c.universityId = u.id WHERE u.name = :universityName")
    List<Communication> findByUniversityName(@Param("universityName") String universityName);
    
    
    @Query("SELECT c FROM Communication c WHERE c.recipients LIKE %:universityEmail%")
    List<Communication> findByRecipientsContaining(@Param("universityEmail") String universityEmail);
    
}
