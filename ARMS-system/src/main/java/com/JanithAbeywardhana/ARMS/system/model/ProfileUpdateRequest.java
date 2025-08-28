package com.JanithAbeywardhana.ARMS.system.model;

public class ProfileUpdateRequest {

	private Long studentId;
    private String universityName;
    private String facultyName;
    private String universityStId;
    
    // Getters and Setters
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    
    public String getUniversityName() { return universityName; }
    public void setUniversityName(String universityName) { this.universityName = universityName; }
    
    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }
    
    public String getUniversityStId() { return universityStId; }
    public void setUniversityStId(String universityStId) { this.universityStId = universityStId; }

}
