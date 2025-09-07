package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.Student;
import com.JanithAbeywardhana.ARMS.system.model.GoogleAuthRequest;
import com.JanithAbeywardhana.ARMS.system.model.LoginRequest;
import com.JanithAbeywardhana.ARMS.system.service.GoogleOAuthService;
import com.JanithAbeywardhana.ARMS.system.service.StudentService;
import com.JanithAbeywardhana.ARMS.system.util.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {

	@Autowired
    private StudentService studentService;
    
    @Autowired
    private GoogleOAuthService googleOAuthService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    
 // Traditional login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody  LoginRequest loginRequest) {
        try {
            Student student = studentService.loginStudent(
                loginRequest.getStudentEmail(), 
                loginRequest.getStudentPassword()
            );
            
            String token = jwtUtil.generateToken(
                student.getStudentEmail(), 
                student.getStudentId(), 
                student.getStudentName()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("student", student);
            response.put("message", "Login successful");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // Google OAuth login endpoint
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@RequestBody GoogleAuthRequest googleAuthRequest) {
        try {
            String token = googleOAuthService.authenticateGoogleUser(googleAuthRequest.getIdToken());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("message", "Google authentication successful");
            response.put("authProvider", "GOOGLE");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Google authentication failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // Get user profile endpoint
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            
            if (!jwtUtil.isTokenValid(token)) {
            	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }
            
            String email = jwtUtil.getEmailFromToken(token);
            Student student = studentService.findByEmail(email);
            
            return ResponseEntity.ok(student);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
    }
    
    // Check if email exists
    @GetMapping("/check-email/{email}")
    public ResponseEntity<?> checkEmailExists(@PathVariable String email) {
        boolean exists = studentService.emailExists(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

}
