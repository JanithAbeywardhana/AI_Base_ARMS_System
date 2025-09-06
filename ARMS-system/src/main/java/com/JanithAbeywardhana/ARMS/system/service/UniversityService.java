package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;
import java.util.Map;

import com.JanithAbeywardhana.ARMS.system.model.University;

public interface UniversityService {
	
	University loginUniversity(String email, String password);
	
	University addUniversity(University university);
    University getUniversityById(Long id);
    List<University> getAllUniversities();
    List<University> getActiveUniversities();
    List<University> searchUniversitiesByName(String name);    
    public University updateUniversity(University university);
    void deleteUniversity(Long id);
    University activateUniversity(Long id);
    University deactivateUniversity(Long id);
    long countUniversities();
    int getTotalStudents(Long universityId);
    University updateUniversityLogo(Long id, String logoUrl);
    
    public University login(String email, String password);
    
    public Map<String, Object> getDashboardStatistics(Long universityId);
    
    Map<String, Object> getDashboardStatisticsByName(String universityName);
    }


