package com.JanithAbeywardhana.ARMS.system.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.JanithAbeywardhana.ARMS.system.model.University;

public interface UniversityRepo extends JpaRepository<University,Long> 

{
	
	List<University> findByActive(boolean active);
    List<University> findByNameContainingIgnoreCase(String name);
	Optional<University> findByEmail(String email);
}
