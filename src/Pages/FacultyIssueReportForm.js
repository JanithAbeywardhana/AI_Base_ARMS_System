import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Send, 
  X, 
  CheckCircle, 
  Clock, 
  User, 
  Building, 
  BookOpen, 
  FileText, 
  Flag, 
  Eye,
  EyeOff,
  ArrowLeft,
  Shield
} from 'lucide-react';

const FacultyIssueReportForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    universityName: '',
    department: '',
    subject: '',
    description: '',
    issueType: '',
    priority: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Issue types based on common faculty issues
  const issueTypes = [
    { value: 'academic_misconduct', label: 'Academic Misconduct' },
    { value: 'unfair_grading', label: 'Unfair Grading' },
    { value: 'discrimination', label: 'Discrimination' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'unprofessional_behavior', label: 'Unprofessional Behavior' },
    { value: 'course_issues', label: 'Course/Curriculum Issues' },
    { value: 'facility_problems', label: 'Facility Problems' },
    { value: 'administrative_issues', label: 'Administrative Issues' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low - Minor issue', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Moderate concern', color: 'text-yellow-600' },
    { value: 'high', label: 'High - Serious issue', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical - Urgent attention needed', color: 'text-red-600' }
  ];

  // Common Sri Lankan universities and departments
  const universities = [
    'University of Colombo',
    'University of Peradeniya',
    'University of Sri Jayewardenepura',
    'University of Kelaniya',
    'University of Moratuwa',
    'University of Ruhuna',
    'University of Jaffna',
    'Eastern University',
    'Rajarata University',
    'Sabaragamuwa University'
  ];

  const departments = [
    'Computer Science',
    'Engineering',
    'Medicine',
    'Law',
    'Business Administration',
    'Arts',
    'Science',
    'Education',
    'Agriculture',
    'Management',
    'Social Sciences',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Other'
  ];

  // Load student data on component mount
  // Replace your existing useEffect with this:
useEffect(() => {
  const loadStudentData = () => {
    try {
      // Check if coming from student dashboard
      const tempStudentData = localStorage.getItem("tempStudentData");
      const storedStudent = localStorage.getItem('student');
      
      let studentData = null;
      
      if (tempStudentData) {
        studentData = JSON.parse(tempStudentData);
        localStorage.removeItem("tempStudentData"); // Clean up
      } else if (storedStudent) {
        studentData = JSON.parse(storedStudent);
      }
      
      if (studentData) {
        console.log('FacultyForm - Using student data:', studentData);
        setStudentData(studentData);
        setFormData(prev => ({
          ...prev,
          studentId: studentData.studentId || studentData.id || '',
          universityName: studentData.university || studentData.universityName || '',
          department: studentData.department || studentData.facultyName || ''
        }));
        setIsAnonymous(false); // Logged-in users default to non-anonymous
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };
  
  loadStudentData();
}, []);
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.issueType) {
      newErrors.issueType = 'Please select an issue type';
    }

    if (!formData.priority) {
      newErrors.priority = 'Please select priority level';
    }

    if (!formData.universityName.trim()) {
      newErrors.universityName = 'University name is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setLoading(true);

  try {
    const storedStudent = localStorage.getItem('student');
    let actualStudentId = 0; 
    
    if (storedStudent && !isAnonymous) {
      try {
        const studentData = JSON.parse(storedStudent);
        actualStudentId = studentData.studentId || studentData.id || 0;
        console.log('Faculty form - using student ID:', actualStudentId);
      } catch (error) {
        console.error('Error parsing student data for faculty submission:', error);
      }
    }
    
    const submitData = {
      studentId: actualStudentId, 
      universityName: formData.universityName,
      department: formData.department,
      subject: formData.subject,
      description: formData.description,
      issueType: formData.issueType,
      priority: formData.priority,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('Submitting faculty issue data:', submitData);

    const response = await fetch('http://localhost:8080/fissue/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitData)
    });

    if (response.ok) {
      console.log('Faculty issue submitted successfully');
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setFormData({
          studentId: formData.studentId, 
          universityName: formData.universityName,
          department: formData.department,
          subject: '',
          description: '',
          issueType: '',
          priority: ''
        });
        setSubmitSuccess(false);
        if (onBack) onBack();
      }, 3000);
    } else {
      const errorText = await response.text();
      console.error('Faculty issue submission failed:', errorText);
      setErrors({ submit: errorText || 'Failed to submit report. Please try again.' });
    }
  } catch (error) {
    console.error('Error submitting faculty issue:', error);
    setErrors({ submit: 'Network error. Please check your connection and try again.' });
  } finally {
    setLoading(false);
  }
};
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Success screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your faculty issue report has been submitted. You will be notified of any updates.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <Clock className="w-4 h-4 inline mr-2" />
              Expected response time: 2-3 business days
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Report Faculty Issue</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {studentData?.name || 'Anonymous User'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">Faculty Issue Reporting</h2>
              <p className="opacity-90 mb-3">
                Report concerns about faculty conduct, academic issues, or administrative problems. 
                Your report will be handled confidentially and investigated promptly.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm">
                  <strong>Important:</strong> All reports are taken seriously. False reports may result in disciplinary action.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Anonymous Reporting Toggle */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isAnonymous ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
                <div>
                  <h3 className="font-medium text-gray-900">Anonymous Reporting</h3>
                  <p className="text-sm text-gray-600">
                    {isAnonymous ? 'Your identity will be completely hidden' : 'Your identity will be kept confidential but accessible to investigators'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isAnonymous ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isAnonymous ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* University and Department */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  University Name *
                </label>
                <select
                  value={formData.universityName}
                  onChange={(e) => handleInputChange('universityName', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.universityName ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select University</option>
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
                {errors.universityName && (
                  <p className="text-red-600 text-sm mt-1">{errors.universityName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Department/Faculty *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-600 text-sm mt-1">{errors.department}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Issue Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Brief summary of the issue"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Issue Type and Priority */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Issue Type *
                </label>
                <select
                  value={formData.issueType}
                  onChange={(e) => handleInputChange('issueType', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.issueType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Issue Type</option>
                  {issueTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.issueType && (
                  <p className="text-red-600 text-sm mt-1">{errors.issueType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flag className="w-4 h-4 inline mr-2" />
                  Priority Level *
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.priority ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Priority</option>
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <p className="text-red-600 text-sm mt-1">{errors.priority}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                placeholder="Please provide detailed information about the issue. Include dates, names (if relevant), specific incidents, and any evidence you may have..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p className="text-red-600 text-sm">{errors.description}</p>
                ) : (
                  <p className="text-gray-500 text-sm">Minimum 20 characters required</p>
                )}
                <p className="text-gray-400 text-sm">{formData.description.length} characters</p>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Emergency Contacts:</h4>
              <p className="text-blue-700">Campus Security: 119</p>
              <p className="text-blue-700">Student Counseling: 1337</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
              <p className="text-blue-700">1. Your report is reviewed within 24 hours</p>
              <p className="text-blue-700">2. Investigation begins if required</p>
              <p className="text-blue-700">3. You'll be updated on progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyIssueReportForm;