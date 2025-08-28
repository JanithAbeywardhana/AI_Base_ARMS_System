package com.JanithAbeywardhana.ARMS.system.service;
import java.util.List;

import com.JanithAbeywardhana.ARMS.system.model.ProfileUpdateRequest;
import com.JanithAbeywardhana.ARMS.system.model.Student;

public interface StudentService {

    public Student saveStudent(Student student);
    
    public List<Student> getAllStudents();
    
    public Student updateStudent(Student student);
    
    public String deleteStudent(Long id);
    
    public Student getStudentById(Long id);
    
    public Student loginStudent(String studentEmail, String studentPassword);
    
    public Student findByEmail(String studentEmail);
    
    public boolean emailExists(String studentEmail);
    
    Student updateStudent(Long studentId, ProfileUpdateRequest request);
    
    Student authenticateStudent(String studentEmail, String password);

}
