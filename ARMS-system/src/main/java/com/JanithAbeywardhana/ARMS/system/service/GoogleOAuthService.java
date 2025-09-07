package com.JanithAbeywardhana.ARMS.system.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.AuthProvider;
import com.JanithAbeywardhana.ARMS.system.model.Student;
import com.JanithAbeywardhana.ARMS.system.repository.StudentRepo;
import com.JanithAbeywardhana.ARMS.system.util.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;


@Service
public class GoogleOAuthService {

	 @Autowired
	    private StudentRepo studentRepo;
	    
	    @Autowired
	    private JwtUtil jwtUtil;
	    
	    @Value("${spring.security.oauth2.client.registration.google.client-id}")
	    private String googleClientId;
	    
	    public String authenticateGoogleUser(String idToken) throws Exception {
	        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
	                new NetHttpTransport(), 
	                GsonFactory.getDefaultInstance())
	                .setAudience(Collections.singletonList(googleClientId))
	                .build();
	        
	        GoogleIdToken googleIdToken = verifier.verify(idToken);
	        if (googleIdToken == null) {
	            throw new IllegalArgumentException("Invalid Google ID token");
	        }
	        GoogleIdToken.Payload payload = googleIdToken.getPayload();
	        String email = payload.getEmail();
	        String name = (String) payload.get("name");
	        String googleId = payload.getSubject();
	        String pictureUrl = (String) payload.get("picture");
	        
	        // Check if user already exists
	        Student existingStudent = studentRepo.findByStudentEmail(email);
	        Student student;
	        
	        if (existingStudent != null) {
	            student = existingStudent;
	            // Update Google info if it's a local account being upgraded
	            if (student.getAuthProvider() == AuthProvider.LOCAL) {
	                student.setAuthProvider(AuthProvider.GOOGLE);
	                student.setGoogleId(googleId);
	                student.setIsEmailVerified(true);
	                student.setProfilePictureUrl(pictureUrl);
	                studentRepo.save(student);
	            }
	        } else {
	            // Create new Google user
	            student = new Student(name, email, googleId, AuthProvider.GOOGLE);
	            student.setProfilePictureUrl(pictureUrl);
	            student.setIsEmailVerified(true);
	            student = studentRepo.save(student);
	        }
	        
	        // Generate JWT token
	        return jwtUtil.generateToken(student.getStudentEmail(), 
	                                   student.getStudentId(), 
	                                   student.getStudentName());
	    }
	    
	    public Student getOrCreateGoogleUser(String email, String name, String googleId, String pictureUrl) {
	        Optional<Student> existingStudent = studentRepo.findByGoogleId(googleId);
	        
	        if (existingStudent.isPresent()) {
	            return existingStudent.get();
	        }
	        
	        // Check if user exists with same email but different auth provider
	      Student emailUser = studentRepo.findByStudentEmail(email);
	        if (emailUser != null) {
	            Student student = emailUser;
	            student.setAuthProvider(AuthProvider.GOOGLE);
	            student.setGoogleId(googleId);
	            student.setProfilePictureUrl(pictureUrl);
	            student.setIsEmailVerified(true);
	            return studentRepo.save(student);
	        }
	        
	        // Create new user
	        Student newStudent = new Student(name, email, googleId, AuthProvider.GOOGLE);
	        newStudent.setProfilePictureUrl(pictureUrl);
	        return studentRepo.save(newStudent);
	    }
	    
}