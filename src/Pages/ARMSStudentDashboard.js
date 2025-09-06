import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ReportProgressModal from '../Components/ReportProgressModal';
import { 
  Shield, 
  Home, 
  AlertTriangle, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  User, 
  Heart, 
  MessageCircle, 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  MapPin,
  Camera,
  Mic,
  Send,
  Menu,
  X,
  Bot
} from 'lucide-react';
import AIChatSupport from '../Components/AIChatSupport';

const ARMSStudentDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [student, setStudent] = useState(null);
  const [studentReports, setStudentReports] = useState([]);
  const [studentFacultyIssues, setStudentFacultyIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalReports: 0,
    totalFacultyIssues: 0,
    pendingReports: 0,
    resolvedReports: 0,
    totalSubmissions: 0
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [reportForm, setReportForm] = useState({
    title: '',
    category: '',
    severity: '',
    location: '',
    description: '',
    anonymous: true,
    attachments: []
  });

  const [showProgressModal, setShowProgressModal] = useState(false);
const [selectedReportForProgress, setSelectedReportForProgress] = useState(null);
const [selectedReportType, setSelectedReportType] = useState(null);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Your report #ARM2024001 has been acknowledged', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New safety guidelines have been published', time: '1 day ago' },
    { id: 3, type: 'warning', message: 'Increased incidents reported in Block A', time: '2 days ago' }
  ]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'report', label: 'Report Incident', icon: AlertTriangle },
    { id: 'my-reports', label: 'My Reports', icon: FileText },
    { id: 'analytics', label: 'Safety Analytics', icon: BarChart3 },
    { id: 'support', label: 'Get Support', icon: Heart },
    { id: 'resources', label: 'Resources', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Load student data from localStorage
  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      try {
        const studentData = JSON.parse(storedStudent);
        setStudent(studentData);
      } catch (error) {
        console.error('Error parsing student data:', error);
        // Redirect to login if data is corrupted
        navigate('/login');
      }
    } else {
      // No student data found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Fetch student's data when student is loaded
  useEffect(() => {
    if (student && student.studentId) {
      fetchStudentData();
    }
  }, [student]);

  const fetchStudentData = async () => {
    console.log('fetchStudentData called');
  console.log('Current student:', student);
  
  if (!student?.studentId) {
    console.error('No student or studentId available:', student);
    return;
  }

  try {
    setLoading(true);
    const studentId = student.studentId;
    console.log('Fetching data for studentId:', studentId);

    // Test the endpoints individually
    console.log('Fetching reports from:', `http://localhost:8080/report/student/${studentId}`);
    console.log('Fetching faculty issues from:', `http://localhost:8080/fissue/student/${studentId}`);

    const [reportsRes, facultyIssuesRes] = await Promise.all([
      fetch(`http://localhost:8080/report/student/${studentId}`),
      fetch(`http://localhost:8080/fissue/student/${studentId}`)
    ]);

    console.log('Reports response status:', reportsRes.status);
    console.log('Faculty issues response status:', facultyIssuesRes.status);

    let reportsData = [];
    let facultyData = [];

    if (reportsRes.ok) {
      reportsData = await reportsRes.json();
      console.log('Reports data received:', reportsData);
      setStudentReports(Array.isArray(reportsData) ? reportsData : []);
    } else {
      console.error('Reports fetch failed:', reportsRes.status, reportsRes.statusText);
      const errorText = await reportsRes.text();
      console.error('Reports error details:', errorText);
      setStudentReports([]);
    }

    if (facultyIssuesRes.ok) {
      facultyData = await facultyIssuesRes.json();
      console.log('Faculty issues data received:', facultyData);
      setStudentFacultyIssues(Array.isArray(facultyData) ? facultyData : []);
    } else {
      console.error('Faculty issues fetch failed:', facultyIssuesRes.status, facultyIssuesRes.statusText);
      const errorText = await facultyIssuesRes.text();
      console.error('Faculty issues error details:', errorText);
      setStudentFacultyIssues([]);
    }

    // Calculate dashboard statistics
    const totalReports = reportsData.length || 0;
    const totalFacultyIssues = facultyData.length || 0;
    const pendingReports = reportsData.filter(r => 
      r.status && r.status.toLowerCase() === 'pending'
    ).length || 0;
    const resolvedReports = reportsData.filter(r => 
      r.status && r.status.toLowerCase() === 'resolved'
    ).length || 0;
    const resolvedFacultyIssues = facultyData.filter(i => 
      i.status && i.status.toLowerCase() === 'resolved'
    ).length || 0;

    const calculatedStats = {
      totalReports,
      totalFacultyIssues,
      pendingReports,
      resolvedReports: resolvedReports + resolvedFacultyIssues,
      totalSubmissions: totalReports + totalFacultyIssues
    };

    console.log('Calculated dashboard stats:', calculatedStats);
    setDashboardStats(calculatedStats);

  } catch (error) {
    console.error('Error in fetchStudentData:', error);
  } finally {
    setLoading(false);
  }
};

  const handleReportSubmit = async (e) => {
  e.preventDefault();
  
  if (!student || !student.studentId) {
    alert('Student information not found. Please log in again.');
    return;
  }
  
  try {
    // Prepare data with actual student ID
    const reportData = {
      title: reportForm.title,
      description: reportForm.description,
      location: reportForm.location,
      university: student.university || student.universityName || '',
      dateofIncident: new Date().toISOString().split('T')[0], // Today's date
      isAnonymous: reportForm.anonymous,
      studentId: reportForm.anonymous ? 0 : student.studentId, // Key fix here!
      status: "pending",
      priority: reportForm.severity || "medium"
    };
    
    console.log('Dashboard report submission data:', reportData);
    
    const response = await fetch('http://localhost:8080/report/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData)
    });
    
    if (response.ok) {
      alert('Report submitted successfully! You will receive updates on your case.');
      
      // Reset form
      setReportForm({
        title: '',
        category: '',
        severity: '',
        location: '',
        description: '',
        anonymous: true,
        attachments: []
      });
      
      // Refresh dashboard data to show the new report
      await fetchStudentData();
      
      // Switch to my-reports tab to show the submitted report
      setActiveSection('my-reports');
    } else {
      const errorText = await response.text();
      alert('Failed to submit report: ' + errorText);
    }
  } catch (error) {
    console.error('Error submitting report:', error);
    alert('Error submitting report. Please try again.');
  }
};


// 3B. Add this new function to handle faculty issue submission from dashboard:
const handleFacultyIssueSubmit = async (facultyIssueData) => {
  if (!student || !student.studentId) {
    alert('Student information not found. Please log in again.');
    return;
  }
  
  try {
    const submitData = {
      studentId: student.studentId, // Use actual student ID
      universityName: student.university || student.universityName || '',
      department: facultyIssueData.department || '',
      subject: facultyIssueData.subject || '',
      description: facultyIssueData.description || '',
      issueType: facultyIssueData.issueType || '',
      priority: facultyIssueData.priority || 'medium',
      status: 'pending'
    };
    
    console.log('Dashboard faculty issue submission data:', submitData);
    
    const response = await fetch('http://localhost:8080/fissue/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitData)
    });
    
    if (response.ok) {
      alert('Faculty issue submitted successfully!');
      // Refresh dashboard data
      await fetchStudentData();
      // Switch to faculty issues tab
      setActiveSection('faculty-issues');
    } else {
      const errorText = await response.text();
      alert('Failed to submit faculty issue: ' + errorText);
    }
  } catch (error) {
    console.error('Error submitting faculty issue:', error);
    alert('Error submitting faculty issue. Please try again.');
  }
};


// Add this function to refresh data after form submissions
const refreshDashboardAfterSubmission = async () => {
  console.log('Refreshing dashboard after submission...');
  await fetchStudentData();
};

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'investigating': 
      case 'under investigation': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'critical': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleReport = () => {
  // Pass student data to the report form
  localStorage.setItem("tempStudentData", JSON.stringify(student));
  navigate("/report"); 
};

  const handleFIReport = () => {
  // Pass student data to the faculty issue form
  localStorage.setItem("tempStudentData", JSON.stringify(student));
  navigate("/FacultyIssueReportForm"); 
};

const handleViewDetails = (report, type) => {
  console.log('Viewing details for:', type, report);
  setSelectedReportForProgress(report);
  setSelectedReportType(type); // 'report' or 'faculty'
  setShowProgressModal(true);
};

  // Show loading screen while student data is being loaded
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student dashboard...</p>
        </div>
      </div>
    );
  }
    
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome, {student?.studentName || 'Student'}</h2>
        <p className="opacity-90 mb-4">Your safety is our priority. Report incidents confidentially and get the support you need.</p>
        
        {loading && (
          <div className="mt-2 flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm opacity-75">Loading your data...</span>
          </div>
        )}

        <div className="mt-4 flex space-x-4">
          <button 
            onClick={handleFIReport}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Incident
          </button>
          <button 
            onClick={() => setActiveSection('support')}
            className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center"
          >
            <Heart className="w-4 h-4 mr-2" />
            Get Support
          </button>
        </div>
      </div>

      {/* Safety Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">My Reports</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : dashboardStats.totalReports}
              </p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 text-xs text-blue-600">
            {loading ? 'Loading...' : `${dashboardStats.pendingReports} pending`}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Faculty Issues</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : dashboardStats.totalFacultyIssues}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-2 text-xs text-orange-600">
            {loading ? 'Loading...' : 'Issues reported'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Resolved Cases</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : dashboardStats.resolvedReports}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 text-xs text-green-600">
            Successfully resolved
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : dashboardStats.totalSubmissions}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 text-xs text-purple-600">
            All submissions
          </div>
        </div>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">My Recent Reports</h3>
            <button 
              onClick={() => setActiveSection('my-reports')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All ({loading ? '...' : studentReports.length})
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse p-3 bg-gray-50 rounded-lg">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {studentReports.length > 0 ? (
                studentReports.slice(0, 3).map((report) => (
                  <div key={report.reportId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{report.title}</p>
                      <p className="text-xs text-gray-600">
                        Report #{report.reportId} • {formatDate(report.dateofIncident)}
                      </p>
                      <p className="text-xs text-blue-600">Ragging Report</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status || 'Pending'}
                      </span>
                      <p className={`text-xs mt-1 ${getSeverityColor(report.priority)}`}>
                        {report.priority || 'medium'} priority
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No reports submitted yet</p>
                  <button 
                    onClick={handleReport}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Submit your first report
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Faculty Issues</h3>
            <button 
              onClick={() => setActiveSection('my-reports')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All ({loading ? '...' : studentFacultyIssues.length})
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse p-3 bg-gray-50 rounded-lg">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {studentFacultyIssues.length > 0 ? (
                studentFacultyIssues.slice(0, 3).map((issue) => (
                  <div key={issue.issueId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{issue.subject || issue.issueType}</p>
                      <p className="text-xs text-gray-600">
                        Issue #{issue.issueId} • {formatDate(issue.createdAt)}
                      </p>
                      <p className="text-xs text-purple-600">Faculty Issue</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status || 'Pending'}
                      </span>
                      <p className={`text-xs mt-1 ${getSeverityColor(issue.priority)}`}>
                        {issue.priority || 'medium'} priority
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No faculty issues reported</p>
                  <button 
                    onClick={handleFIReport}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Report faculty issue
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMyReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Reports</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              if (student?.studentId) {
                fetchStudentData();
              }
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900">Ragging Reports</h4>
          <p className="text-2xl font-bold text-blue-600">{studentReports.length}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900">Faculty Issues</h4>
          <p className="text-2xl font-bold text-purple-600">{studentFacultyIssues.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900">Resolved</h4>
          <p className="text-2xl font-bold text-green-600">{dashboardStats.resolvedReports}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-100">
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Ragging Reports Section */}
              {studentReports.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                    Ragging Reports ({studentReports.length})
                  </h3>
                  <div className="space-y-3">
                    {studentReports.map((report) => (
                      <div key={`report-${report.reportId}`} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{report.title}</h4>
                            <p className="text-sm text-gray-600">Report ID: {report.reportId}</p>
                            <p className="text-sm text-gray-600">Location: {report.location}</p>
                            <p className="text-sm text-gray-600">Date: {formatDate(report.dateofIncident)}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                              {report.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-3">
                          {report.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Submitted: {formatDate(report.reportDate)}</span>
                            <span className={`${getSeverityColor(report.priority)}`}>
                              {report.priority || 'medium'} priority
                            </span>
                          </div>
                          <button 
                          onClick={() => handleViewDetails(report, 'report')}
                          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Progress
                        </button>

                        {showProgressModal && (
                          <ReportProgressModal
                            isOpen={showProgressModal}
                            onClose={() => setShowProgressModal(false)}
                            report={selectedReportForProgress}
                            type={selectedReportType}
                           />
                        )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty Issues Section */}
              {studentFacultyIssues.length > 0 && (
                <div className={studentReports.length > 0 ? 'mt-8 pt-6 border-t border-gray-200' : ''}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-600" />
                    Faculty Issues ({studentFacultyIssues.length})
                  </h3>
                  <div className="space-y-3">
                    {studentFacultyIssues.map((issue) => (
                      <div key={`issue-${issue.issueId}`} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{issue.subject || issue.issueType}</h4>
                            <p className="text-sm text-gray-600">Issue ID: {issue.issueId}</p>
                            <p className="text-sm text-gray-600">Department: {issue.department || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Date: {formatDate(issue.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                              {issue.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-3">
                          {issue.description}
                        </p>
                        {issue.universityResponse && (
                          <div className="bg-blue-50 p-3 rounded mb-3">
                            <p className="text-sm font-medium text-blue-900">University Response:</p>
                            <p className="text-sm text-blue-800">{issue.universityResponse}</p>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>University: {issue.universityName}</span>
                            <span className={`${getSeverityColor(issue.priority)}`}>
                              {issue.priority || 'medium'} priority
                            </span>
                          </div>
                          <button 
                          onClick={() => handleViewDetails(issue, 'issue')}
                          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Progress
                        </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No reports message */}
              {!loading && studentReports.length === 0 && studentFacultyIssues.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h3>
                  <p className="text-gray-600 mb-4">You haven't submitted any reports. Your safety matters - don't hesitate to report incidents.</p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={handleReport}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Report Ragging
                    </button>
                    <button 
                      onClick={handleFIReport}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Report Faculty Issue
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderReportForm = () => (
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report an Incident</h2>
          <p className="text-gray-600">All reports are handled with complete confidentiality. Your safety is our priority.</p>
        </div>

        <form onSubmit={handleReportSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Incident Title</label>
              <input
                type="text"
                value={reportForm.title}
                onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the incident"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={reportForm.category}
                onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="ragging">Ragging</option>
                <option value="harassment">Harassment</option>
                <option value="discrimination">Discrimination</option>
                <option value="bullying">Bullying</option>
                <option value="safety-concern">Safety Concern</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
              <select
                value={reportForm.severity}
                onChange={(e) => setReportForm({...reportForm, severity: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select severity</option>
                <option value="low">Low - Minor incident</option>
                <option value="medium">Medium - Moderate concern</option>
                <option value="high">High - Urgent attention needed</option>
                <option value="critical">Critical - Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Where did this occur?"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
            <textarea
              value={reportForm.description}
              onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please provide as much detail as possible. What happened? Who was involved? When did it occur?"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={reportForm.anonymous}
                onChange={(e) => setReportForm({...reportForm, anonymous: e.target.checked})}
                className="mt-1"
              />
              <div>
                <label htmlFor="anonymous" className="font-medium text-blue-900">Report Anonymously</label>
                <p className="text-sm text-blue-700 mt-1">
                  Your identity will be completely protected. Only authorized personnel will have access to investigate your report.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload Evidence (Optional)</p>
              <p className="text-xs text-gray-500">Photos, documents, or audio files. Max 10MB per file.</p>
              <button
                type="button"
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Choose Files
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">24/7 Support Available</h2>
        <p className="opacity-90 mb-4">You're not alone. Our support team is here to help you through difficult times.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Crisis Hotline</h3>
            <p className="text-2xl font-bold">1337</p>
            <p className="text-sm opacity-90">Available 24/7</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Campus Counseling</h3>
            <p className="text-2xl font-bold">119</p>
            <p className="text-sm opacity-90">Emergency Support</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mental Health Resources</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Heart className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Counseling Services</p>
                <p className="text-sm text-blue-700">Free confidential counseling</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Peer Support Groups</p>
                <p className="text-sm text-green-700">Connect with other students</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition" onClick={handleReport}>
              Report Emergency
            </button>
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              Request Counseling
            </button>
            <button 
              onClick={() => setShowChat(true)}
              className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              Chat with AI Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'report': return renderReportForm();
      case 'my-reports': return renderMyReports();
      case 'support': return renderSupport();
      case 'analytics': return (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Safety Analytics</h3>
          <p className="text-gray-600">Coming soon - Campus safety trends and insights</p>
        </div>
      );
      case 'resources': return (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Resources</h3>
          <p className="text-gray-600">Educational materials and safety guidelines</p>
        </div>
      );
      case 'settings': return (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
          <p className="text-gray-600">Manage your account and privacy preferences</p>
        </div>
      );
      default: return renderDashboard();
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 h-full`}>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            {sidebarOpen && <span className="text-xl font-bold text-gray-900">ARMS</span>}
          </div>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 transition ${
                  activeSection === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          {sidebarOpen && student && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-3 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{student.studentName}</span>
              </div>
              <p className="text-xs opacity-90">{student.universityName}</p>
              <p className="text-xs opacity-75">{student.facultyName}</p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {activeSection.replace('-', ' ')}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* AI Chat Component */}
      <AIChatSupport 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
      />

      {/* Floating AI Support Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-4 shadow-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 z-50 animate-pulse"
          title="Get AI Support"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ARMSStudentDashboard;