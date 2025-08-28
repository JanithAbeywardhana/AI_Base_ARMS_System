package com.JanithAbeywardhana.ARMS.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JanithAbeywardhana.ARMS.system.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	Admin findByUsername(String username);

}
