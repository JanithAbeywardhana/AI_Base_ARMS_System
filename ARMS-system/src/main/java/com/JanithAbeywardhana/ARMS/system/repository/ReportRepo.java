package com.JanithAbeywardhana.ARMS.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JanithAbeywardhana.ARMS.system.model.Report;
import org.springframework.data.domain.Pageable;

public interface ReportRepo extends JpaRepository<Report,Integer> 
{
  List<Report> findByStudentId(int studentId);
  
  List<Report> findAllByOrderByReportDateDesc(Pageable pageable);
  
  
  long countByUniversity(String university);
  long countByUniversityAndStatus(String university, String status);
  
  
  
  List<Report> findByUniversityId(Long universityId);
  
  List<Report> findByUniversity( String university);
  
  long countByUniversityId(Long universityId);
  long countByUniversityIdAndStatus(Long universityId, String status);
  
}
