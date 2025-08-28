package com.JanithAbeywardhana.ARMS.system.service;

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
}
