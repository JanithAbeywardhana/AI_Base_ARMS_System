package com.JanithAbeywardhana.ARMS.system.service;

import com.JanithAbeywardhana.ARMS.system.model.Admin;

public interface AdminService {
	
	public Admin registerAdmin(Admin admin);
	
	public boolean checkPassword(String rawPassword, String hashedPassword);
	
	public Admin login(String username, String password);

}
