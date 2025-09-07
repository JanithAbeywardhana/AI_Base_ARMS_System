package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.AuthProvider;
import com.JanithAbeywardhana.ARMS.system.model.ProfileUpdateRequest;
import com.JanithAbeywardhana.ARMS.system.model.Student;
import com.JanithAbeywardhana.ARMS.system.repository.StudentRepo;


@Service
public class StudentServiceImplement implements StudentService{

    @Autowired
    private StudentRepo studentRepo;
    

    @Override
    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }


	@Override
	public List<Student> getAllStudents() {
		return studentRepo.findAll();
	}


	@Override
	public Student updateStudent(Student student) {
		// TODO Auto-generated method stub
		return studentRepo.save(student);
	}


	@Override
	public String deleteStudent(Long id) {
		studentRepo.deleteById(id);
		return "student delete successfully";
	}


	@Override
	public Student getStudentById(Long id) {
		return studentRepo.findById(id).orElse(null);
	}


	@Override
	public Student loginStudent(String studentEmail, String studentPassword) {
		Student student = studentRepo.findByStudentEmail(studentEmail);
		if(student != null && student.getStudentPassword().equals(studentPassword))
		{
			return student;
		}
		return null;
	}


	@Override
	public Student findByEmail(String studentEmail) {
		return studentRepo.findByStudentEmail(studentEmail);
	}


	@Override
	public boolean emailExists(String studentEmail) {
		return studentRepo.existsByStudentEmail(studentEmail);
	}
	
	
	
	
	
	
	@Override
	public Student updateStudent(Long studentId, ProfileUpdateRequest request) {
Optional<Student> optionalStudent = studentRepo.findById(studentId);
	    
	    if (!optionalStudent.isPresent()) {
	        throw new RuntimeException("Student not found");
	    }
	    
	    Student student = optionalStudent.get();
	    student.setUniversityName(request.getUniversityName());
	    student.setFacultyName(request.getFacultyName());
	    student.setUniversityStId(request.getUniversityStId());
	    
	    return studentRepo.save(student);
	}


	@Override
	public Student authenticateStudent(String studentEmail, String password) {
Student optionalStudent = studentRepo.findByStudentEmail(studentEmail);
	    
	    if (optionalStudent != null) {
	        throw new RuntimeException("Invalid email or password");
	    }
	    
	    Student student = optionalStudent;
	    
	    // Check if this is a Google account trying to use password login
	    if (student.getAuthProvider() == AuthProvider.GOOGLE) {
	        throw new RuntimeException("This account uses Google Sign-In. Please use 'Continue with Google' option.");
	    }
	    
	    // Verify password (you should use BCrypt or similar for password hashing)
	    if (!password.equals(student.getStudentPassword())) { // Replace with proper password verification
	        throw new RuntimeException("Invalid email or password");
	    }
	    
	    return student;
	}


	
	
	
}
