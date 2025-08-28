package com.JanithAbeywardhana.ARMS.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JanithAbeywardhana.ARMS.system.model.Report;

public interface ReportRepo extends JpaRepository<Report,Integer> 
{
  List<Report> findByStudentId(int studentId);
}
