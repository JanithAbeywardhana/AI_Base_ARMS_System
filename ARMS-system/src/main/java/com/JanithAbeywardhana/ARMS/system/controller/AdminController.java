package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.Admin;
import com.JanithAbeywardhana.ARMS.system.service.AdminService;


@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

	@Autowired
    private AdminService adminService;
	
	
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Admin admin = adminService.login(username, password);
        if(admin != null) {
            return ResponseEntity.ok("Login Successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
	
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Admin admin) {
	    Admin savedAdmin = adminService.registerAdmin(admin);
	    return ResponseEntity.ok(savedAdmin);
	}
	
	
	@GetMapping("/settings")
	public ResponseEntity<Admin> getAdminSettings() {
	    // Assuming you have a way to get current admin (e.g., from session)
	    // For now, get the first admin or use a specific admin ID
	    Admin admin = adminService.getAdminById(1L); // You'll need this method
	    if (admin != null) {
	        return ResponseEntity.ok(admin);
	    }
	    return ResponseEntity.notFound().build();
	}

	@PutMapping("/settings")
	public ResponseEntity<String> updateSettings(@RequestBody Admin updatedAdmin) {
	    try {
	        adminService.updateSettings(updatedAdmin);
	        return ResponseEntity.ok("Settings updated successfully");
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Failed to update settings: " + e.getMessage());
	    }
	}

	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody Map<String, String> passwordData) {
	    try {
	        String currentPassword = passwordData.get("currentPassword");
	        String newPassword = passwordData.get("newPassword");
	        
	        boolean success = adminService.changePassword(1L, currentPassword, newPassword);
	        
	        if (success) {
	            return ResponseEntity.ok("Password changed successfully");
	        } else {
	            return ResponseEntity.badRequest().body("Current password is incorrect");
	        }
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Failed to change password: " + e.getMessage());
	    }
	}

}
