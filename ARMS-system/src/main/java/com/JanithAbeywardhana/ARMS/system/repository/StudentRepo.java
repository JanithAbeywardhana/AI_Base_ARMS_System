package com.JanithAbeywardhana.ARMS.system.repository;

import com.JanithAbeywardhana.ARMS.system.model.Student;
import com.JanithAbeywardhana.ARMS.system.model.AuthProvider;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student,Long>
{
	Student findByStudentEmail(String studentEmail);
	
    // New methods for Google Auth
    Optional<Student> findByGoogleId(String googleId);
    
    Optional<Student> findByStudentEmailAndAuthProvider(String studentEmail, AuthProvider authProvider);
    
    boolean existsByStudentEmail(String studentEmail);
    
    boolean existsByGoogleId(String googleId);
}
