package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.University;
import com.JanithAbeywardhana.ARMS.system.service.UniversityService;

@RestController
@RequestMapping("/universities")
@CrossOrigin
public class UniversityController {

	@Autowired
    private UniversityService universityService;
	
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest ) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        University university = universityService.loginUniversity(email, password);
        if(university != null) {
        	return ResponseEntity.ok("Login Successfull");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
	}
	
	
    @PostMapping("/add")
    public ResponseEntity<University> addUniversity(@RequestBody University university) {
        University saved = universityService.addUniversity(university);
        return ResponseEntity.ok(saved);
    }
    
    
    
    @GetMapping("/get/{id}")
    public ResponseEntity<University> getUniversityById(@PathVariable Long id) {
        University uni = universityService.getUniversityById(id);
        return ResponseEntity.ok(uni);
    }
    
    @GetMapping("/getAll")
    public ResponseEntity<List<University>> getAllUniversities() {
        return ResponseEntity.ok(universityService.getAllUniversities());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<University>> getActiveUniversities() {
        return ResponseEntity.ok(universityService.getActiveUniversities());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<University>> searchUniversities(@RequestParam String name) {
        return ResponseEntity.ok(universityService.searchUniversitiesByName(name));
    }
    
    @PutMapping("/update/{id}")
    public String updateUniversity(@PathVariable Long id, @RequestBody University university)
    {
    	University existingUniversity = universityService.getUniversityById(id);
    	if(existingUniversity != null) {
    		university.setId(id);
    		universityService.updateUniversity(university);
    		return "University Update Successfully";
    	}else {
    		return "University not found with ID" + id;
    	}
    	
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUniversity(@PathVariable Long id) {
        universityService.deleteUniversity(id);
        return ResponseEntity.ok("University deleted successfully!");
    }
    
    
    @PutMapping("/{id}/activate")
    public ResponseEntity<University> activateUniversity(@PathVariable Long id) {
        return ResponseEntity.ok(universityService.activateUniversity(id));
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<University> deactivateUniversity(@PathVariable Long id) {
        return ResponseEntity.ok(universityService.deactivateUniversity(id));
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> countUniversities() {
        return ResponseEntity.ok(universityService.countUniversities());
    }
    
    @GetMapping("/{id}/students")
    public ResponseEntity<Integer> getTotalStudents(@PathVariable Long id) {
        return ResponseEntity.ok(universityService.getTotalStudents(id));
    }
    
    @PutMapping("/{id}/logo")
    public ResponseEntity<University> updateLogo(@PathVariable Long id,
                                                 @RequestParam String logoUrl) {
        return ResponseEntity.ok(universityService.updateUniversityLogo(id, logoUrl));
    }

}
