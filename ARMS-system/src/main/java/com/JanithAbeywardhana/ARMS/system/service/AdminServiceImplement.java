package com.JanithAbeywardhana.ARMS.system.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.Admin;
import com.JanithAbeywardhana.ARMS.system.repository.AdminRepository;


@Service
public class AdminServiceImplement implements AdminService {
	
	
	@Autowired
    private AdminRepository adminRepo;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    		

	@Override
	public Admin registerAdmin(Admin admin) {
		String hashedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(hashedPassword);
        return adminRepo.save(admin);
        
        
	}

	@Override
	public Admin login(String username, String password) {
		Admin admin = adminRepo.findByUsername(username);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        return null;
    }



	@Override
	public boolean checkPassword(String rawPassword, String hashedPassword) {
		return passwordEncoder.matches(rawPassword, hashedPassword);
	}



	@Override
	public Admin getAdminById(Long adminId) {
		return adminRepo.findById(adminId).orElse(null);
	}



	@Override
	public void updateSettings(Admin updatedAdmin) {
		Admin existingAdmin = getAdminById(updatedAdmin.getAdminId());
	    if (existingAdmin != null) {
	        existingAdmin.setSystemName(updatedAdmin.getSystemName());
	        existingAdmin.setEmail(updatedAdmin.getEmail());
	        existingAdmin.setEmergencyHotline(updatedAdmin.getEmergencyHotline());
	        existingAdmin.setEmailNotifications(updatedAdmin.isEmailNotifications());
	        existingAdmin.setSmsAlerts(updatedAdmin.isSmsAlerts());
	        existingAdmin.setWeeklyReports(updatedAdmin.isWeeklyReports());
	        existingAdmin.setUpdatedAt(LocalDateTime.now());
	        
	        adminRepo.save(existingAdmin);
	    }
		
	}



	@Override
	public boolean changePassword(Long adminId, String currentPassword, String newPassword) {
		Admin admin = getAdminById(adminId);
	    if (admin != null && admin.getPassword().equals(currentPassword)) {
	        admin.setPassword(newPassword); // In production, hash the password
	        admin.setUpdatedAt(LocalDateTime.now());
	        adminRepo.save(admin);
	        return true;
	    }
	    return false;
	}	
	
	
	
}
