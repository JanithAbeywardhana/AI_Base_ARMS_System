package com.JanithAbeywardhana.ARMS.system.controller;


import com.JanithAbeywardhana.ARMS.system.model.ProfileUpdateRequest;
import com.JanithAbeywardhana.ARMS.system.model.Student;
import com.JanithAbeywardhana.ARMS.system.service.StudentService;
import com.JanithAbeywardhana.ARMS.system.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;
    
    @Autowired
    private JwtUtil jwtUitl;

    @PostMapping("/add")
    public String addStudent(@RequestBody Student student)
    {
        studentService.saveStudent(student);
        return "Student Registered Successfully";
    }
    
    @GetMapping("/getAll")
    public List<Student> getAllStudents() 
    {
    return studentService.getAllStudents();

    }
    
    @GetMapping("/get/{id}")
    public Student getStudentById(@PathVariable Long id)
    {
    	return studentService.getStudentById(id);
    }
    
    @PutMapping("/update/{id}")
    public String updateStudent(@PathVariable Long id, @RequestBody Student student)
    {
    	Student existingStudent =  studentService.getStudentById(id);
    	if(existingStudent != null) {
    		student.setStudentId(id);
    		studentService.updateStudent(student);
    		return "Student Updated Successfully";
    		
        }else {
        	return "Student Not found with id" + id;
        }
    	
    }
    
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id)
    {
    	Student existingStudent = studentService.getStudentById(id);
    	if(existingStudent != null) {
    		return studentService.deleteStudent(id);
    		
    	}else {
    		return "Student Not found with id" + id;
    	}
    }
    
    
    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody Map<String, String> loginRequest )
    {
    	String studentEmail = loginRequest.get("studentEmail");
    	String studentPassword = loginRequest.get("studentPassword");
    	
    	if(studentEmail == null || studentPassword == null)
    	{
    		return ResponseEntity.badRequest().body("Email and password are required");
    	}
    	
        Student student = studentService.loginStudent(studentEmail, studentPassword);
        
        if(student != null) {
        	student.setStudentPassword(null);
        	return ResponseEntity.ok().body(Map.of("message", "Login successful","student", student));
        	
        	}else {
        		return ResponseEntity.status (HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        	}
        
        
        
    }
    
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateStudentProfile(@RequestBody ProfileUpdateRequest request, @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            
            if (!jwtUitl.isTokenValid(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
            
            Long studentId = jwtUitl.getStudentIdFromToken(token);
            Student updatedStudent = studentService.updateStudent(studentId, request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("student", updatedStudent);
            response.put("message", "Profile updated successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
        
    }
    
    @GetMapping("/export")
    public void exportStudents(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=students.csv");

        List<Student> students = studentService.getAllStudents();

        // Write CSV Header
        PrintWriter writer = response.getWriter();
        writer.println("ID,Name,Email,University,UniversityStudentID");

        // Write Data
        for (Student student : students) {
            writer.println(
                student.getStudentId()+ "," +
                student.getStudentName() + "," +
                student.getStudentEmail() + "," +
                student.getUniversityName()+ "," +
                student.getUniversityStId()  
            );
        }

        writer.flush();
        writer.close();
    }
    
}
