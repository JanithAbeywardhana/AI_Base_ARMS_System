import React, { useState, useEffect } from 'react';
import { Shield, Lock, AlertTriangle, Send, ArrowLeft, CheckCircle, Phone, Menu, X, Eye, EyeOff, Calendar, MapPin, FileText, User } from 'lucide-react';

const ReportForm = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStudentId, setShowStudentId] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    dateofIncident: '',
    isAnonymous: true,
    studentId: '',
    university:''
  });

  const [errors, setErrors] = useState({});



  useEffect(() => {
  // Check if student is logged in and get their data
  const storedStudent = localStorage.getItem("student");
  if (storedStudent) {
    try {
      const studentData = JSON.parse(storedStudent);
      console.log('Logged in student data:', studentData);
      
      // Pre-fill form with student data and set as non-anonymous
      setFormData(prev => ({
        ...prev,
        studentId: studentData.studentId || studentData.id || '',
        university: studentData.university || studentData.universityName || '',
        isAnonymous: false // Logged-in users should default to non-anonymous
      }));
      
      // Don't show student ID field since it's automatically filled
      setShowStudentId(false);
    } catch (error) {
      console.error('Error parsing student data:', error);
    }
  }
}, []);

// Add this useEffect right after your existing useState declarations:
useEffect(() => {
  // Check if coming from student dashboard
  const tempStudentData = localStorage.getItem("tempStudentData");
  const storedStudent = localStorage.getItem("student");
  
  let studentData = null;
  
  if (tempStudentData) {
    studentData = JSON.parse(tempStudentData);
    localStorage.removeItem("tempStudentData"); // Clean up
  } else if (storedStudent) {
    studentData = JSON.parse(storedStudent);
  }
  
  if (studentData) {
    console.log('ReportForm - Using student data:', studentData);
    setFormData(prev => ({
      ...prev,
      studentId: studentData.studentId || studentData.id || '',
      university: studentData.university || studentData.universityName || '',
      isAnonymous: false // Logged-in users default to non-anonymous
    }));
  }
}, []);



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Incident title is required';
    }

    if (!formData.university.trim()) {
       newErrors.university = 'University is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Incident description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.dateofIncident) {
      newErrors.dateofIncident = 'Date of incident is required';
    }
    
    // Validate student ID only if not anonymous
    if (!formData.isAnonymous && (!formData.studentId || String(formData.studentId).trim() === '')) {
      newErrors.studentId = 'Student ID is required for non-anonymous reports';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    // Get student data from localStorage
    const storedStudent = localStorage.getItem("student");
    let actualStudentId = 0; // Default for anonymous
    
    if (storedStudent && !formData.isAnonymous) {
      try {
        const studentData = JSON.parse(storedStudent);
        actualStudentId = studentData.studentId || studentData.id || 0;
        console.log('Using student ID from localStorage:', actualStudentId);
      } catch (error) {
        console.error('Error parsing student data for submission:', error);
      }
    }
    
    // If not anonymous but no studentId from localStorage, use form input
    if (!formData.isAnonymous && actualStudentId === 0) {
      actualStudentId = parseInt(formData.studentId) || 0;
    }
    
    // Prepare data for submission
    const reportData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      dateofIncident: formData.dateofIncident,
      university: formData.university,
      isAnonymous: formData.isAnonymous,
      studentId: actualStudentId, // This is the key fix!
      status: "pending",
      priority: "medium", // You might want to add priority to your form
      reportDate: new Date().toISOString()
    };
    
    console.log('Submitting report data:', reportData);
    
    // Make API call to your Spring Boot backend
    const response = await fetch('http://localhost:8080/report/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData)
    });
    
    if (response.ok) {
      console.log('Report submitted successfully');
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        dateofIncident: '',
        isAnonymous: true,
        studentId: '',
        university: ''
      });
    } else {
      const errorText = await response.text();
      console.error('Report submission failed:', errorText);
      throw new Error('Failed to submit report: ' + errorText);
    }
  } catch (error) {
    console.error('Error submitting report:', error);
    alert('Failed to submit report. Please try again later.');
  } finally {
    setIsSubmitting(false);
  }
};

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">ARMS</span>
              </div>
              
              <div className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 transition">Home</a>
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
              </div>

              <div className="hidden md:flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Get Help
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Report Submitted Successfully
              </h2>
              <p className="mt-2 text-gray-600">
                Your report has been securely submitted to the authorities. 
                {formData.isAnonymous ? ' Your identity remains completely anonymous.' : ''}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <p className="text-sm text-gray-600">Your report is reviewed by trained professionals</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <p className="text-sm text-gray-600">Appropriate authorities are notified if necessary</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <p className="text-sm text-gray-600">Actions are taken to address the situation</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Another Report
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Home
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-semibold mb-2">Need Immediate Help?</h4>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center text-red-700">
                  <Phone className="w-4 h-4 mr-1" />
                  Emergency: 119
                </div>
                <div className="flex items-center text-red-700">
                  <Phone className="w-4 h-4 mr-1" />
                  Mental Health: 1337
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ARMS</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Help
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-700">Home</a>
              <a href="#features" className="block px-3 py-2 text-gray-700">Features</a>
              <a href="#about" className="block px-3 py-2 text-gray-700">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Form Section */}
      <div className="bg-gradient-to-br from-red-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full inline-block mb-6">
              <Lock className="w-4 h-4 inline mr-2" />
              Confidential & Secure Reporting
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Report a Ragging Incident
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your safety and privacy are our top priorities. This form is encrypted and secure. 
              You can choose to remain completely anonymous.
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Your Security is Guaranteed</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• All reports are encrypted and stored securely</li>
                  <li>• Anonymous reports cannot be traced back to you</li>
                  <li>• Only authorized personnel can access report details</li>
                  <li>• Your privacy is protected by law under the Ragging Act</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Report Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              
              {/* Anonymous Toggle */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Report Type</h3>
                    <p className="text-sm text-gray-600 mt-1">Choose whether to submit anonymously or with your identity</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${!formData.isAnonymous ? 'text-gray-500' : 'text-blue-600 font-semibold'}`}>
                      Anonymous
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }));
                        if (formData.isAnonymous) setShowStudentId(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        formData.isAnonymous ? 'bg-blue-600' : 'bg-gray-400'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isAnonymous ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-sm ${formData.isAnonymous ? 'text-gray-500' : 'text-blue-600 font-semibold'}`}>
                      With Identity
                    </span>
                  </div>
                </div>
                
                {!formData.isAnonymous && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Student ID
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.studentId ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your student ID"
                    />
                    {errors.studentId && (
                      <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Incident Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Incident Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Brief title describing the incident"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Incident Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Please provide detailed information about what happened. Include who was involved, what occurred, and any other relevant details."
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">
                    {formData.description.length} characters (minimum 10 required)
                  </p>
                </div>
              </div>

              {/* University Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                   University *
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.university ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your university name"
               />
                {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university}</p>
                )}
            </div>

              {/* Location and Date Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Where did this incident occur?"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                {/* Date of Incident */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Date of Incident *
                  </label>
                  <input
                    type="date"
                    name="dateofIncident"
                    value={formData.dateofIncident}
                    onChange={handleInputChange}
                    max={getCurrentDate()}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.dateofIncident ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateofIncident && (
                    <p className="mt-1 text-sm text-red-600">{errors.dateofIncident}</p>
                  )}
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-800 mb-1">Important Notice:</p>
                    <p className="text-yellow-700">
                      Submitting false information is a serious offense. Please ensure all details are accurate. 
                      If you're in immediate danger, contact emergency services at 119.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition flex items-center justify-center ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit {formData.isAnonymous ? 'Anonymous ' : ''}Report
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Additional Support?
          </h2>
          <p className="text-gray-600 mb-8">
            Remember, you're not alone. Professional help and support services are available 24/7.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Emergency Services</h3>
              <p className="text-2xl font-bold text-red-600">119</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Mental Health Helpline</h3>
              <p className="text-2xl font-bold text-blue-600">1337</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">ARMS Support</h3>
              <button className="text-green-600 font-semibold hover:text-green-700 transition">
                Get Help Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">ARMS</span>
              </div>
              <p className="text-gray-400">
                Building safer universities through technology and compassion.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">Get Support</a></li>
                <li><a href="#" className="hover:text-white transition">Resources</a></li>
                <li><a href="#" className="hover:text-white transition">Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Framework</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Ragging Act 1998</a></li>
                <li><a href="#" className="hover:text-white transition">UGC Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <span className="text-gray-400">119 (Emergency)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">1337 (Mental Health)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ARMS - Anti-Ragging Management System. All rights reserved.</p>
            <p className="mt-2">Developed with ❤️ for student safety in Sri Lankan universities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReportForm;