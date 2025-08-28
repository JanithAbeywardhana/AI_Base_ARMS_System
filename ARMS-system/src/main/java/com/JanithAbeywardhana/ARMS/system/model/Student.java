package com.JanithAbeywardhana.ARMS.system.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;
    
    @Column(nullable = false)
    private String studentName;
    
    @Column(nullable = false, unique = true)
    private String studentEmail;
    private String universityName;
    private String facultyName;
    private String universityStId;
    
    @Column(nullable = true)
    private String studentPassword;
    
    @Column(name = "google_id", unique = true)
    private String googleId;
    
    @Column(name = "auth_provider")
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider = AuthProvider.LOCAL;
    
    @Column(name = "profile_picture_url")
    private String profilePictureUrl;
    
    @Column(name = "is_email_verified")
    private Boolean isEmailVerified = false;

    public Student() {
    	
    }
    
    public Student(String studentName, String studentEmail, String googleId, AuthProvider authProvider) {
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.googleId = googleId;
        this.authProvider = authProvider;
        this.isEmailVerified = true; // Google accounts are pre-verified
    }

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getStudentEmail() {
		return studentEmail;
	}

	public void setStudentEmail(String studentEmail) {
		this.studentEmail = studentEmail;
	}

	public String getUniversityName() {
		return universityName;
	}

	public void setUniversityName(String universityName) {
		this.universityName = universityName;
	}

	public String getFacultyName() {
		return facultyName;
	}

	public void setFacultyName(String facultyName) {
		this.facultyName = facultyName;
	}

	public String getUniversityStId() {
		return universityStId;
	}

	public void setUniversityStId(String universityStId) {
		this.universityStId = universityStId;
	}

	public String getStudentPassword() {
		return studentPassword;
	}

	public void setStudentPassword(String studentPassword) {
		this.studentPassword = studentPassword;
	}

	public String getGoogleId() {
		return googleId;
	}

	public void setGoogleId(String googleId) {
		this.googleId = googleId;
	}

	public AuthProvider getAuthProvider() {
		return authProvider;
	}

	public void setAuthProvider(AuthProvider authProvider) {
		this.authProvider = authProvider;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

	public Boolean getIsEmailVerified() {
		return isEmailVerified;
	}

	public void setIsEmailVerified(Boolean isEmailVerified) {
		this.isEmailVerified = isEmailVerified;
	}

    
 }


