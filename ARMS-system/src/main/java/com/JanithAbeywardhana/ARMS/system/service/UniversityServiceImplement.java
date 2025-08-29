package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.University;
import com.JanithAbeywardhana.ARMS.system.repository.UniversityRepo;

@Service
public class UniversityServiceImplement implements UniversityService {
	
	@Autowired
	private UniversityRepo universityRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public University loginUniversity(String email, String password) {
		Optional<University> optionalUni = universityRepo.findByEmail(email);
	    if(optionalUni.isPresent()) {
	        University uni = optionalUni.get();
	        if(passwordEncoder.matches(password, uni.getPassword())) {
	            return uni;
	        }
	    }
	    return null;
		
	}

	@Override
	public University addUniversity(University university) {
		String hashedPassword = passwordEncoder.encode(university.getPassword());
		university.setPassword(hashedPassword);
		return universityRepo.save(university);
	}

	@Override
	public University getUniversityById(Long id) {
		return universityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + id));
	}

	@Override
	public List<University> getAllUniversities() {
		return universityRepo.findAll();
	}

	@Override
	public List<University> getActiveUniversities() {
		return universityRepo.findByActive(true);
	}

	@Override
	public List<University> searchUniversitiesByName(String name) {
		return universityRepo.findByNameContainingIgnoreCase(name);
	}



	@Override
	public University updateUniversity(University university) {
		return universityRepo.save(university);
		}

	@Override
	public void deleteUniversity(Long id) {
		universityRepo.deleteById(id);
	}

	@Override
	public University activateUniversity(Long id) {
		University uni = getUniversityById(id);
        uni.setActive(true);
        return universityRepo.save(uni);
	}

	@Override
	public University deactivateUniversity(Long id) {
		University uni = getUniversityById(id);
        uni.setActive(false);
        return universityRepo.save(uni);
	}

	@Override
	public long countUniversities() {
		 return universityRepo.count();
	}

	@Override
	public int getTotalStudents(Long universityId) {
		University uni = getUniversityById(universityId);
        return uni.getNumberOfStudents();
	}

	@Override
	public University updateUniversityLogo(Long id, String logoUrl) {
		University uni = getUniversityById(id);
        uni.setLogoUrl(logoUrl);
        return universityRepo.save(uni);
    }
}

	


