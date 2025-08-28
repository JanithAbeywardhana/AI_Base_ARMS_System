package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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

}
