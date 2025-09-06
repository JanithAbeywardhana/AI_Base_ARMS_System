import React, { useState, useEffect } from 'react';
import AddUniversityModal  from '../Components/AddUniversityModal';
import EditUniversityModal  from '../Components/EditUniversityModal';
import AddStudentModal  from '../Components/AddStudentModal';
import EmailModal from '../Components/EmailModal';
import axios from "axios"
import { 
  Shield, 
  Users, 
  University, 
  AlertTriangle, 
  Mail, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter,  
  Eye, 
  Edit, 
  Trash2, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  User,
  Building,
  GraduationCap,
  Phone,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';

const ARMSAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showAddUniversityModal, setShowAddUniversityModal] = useState(false);
  const [recentReports, setRecentReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportsError, setReportsError] = useState(null);

  const [universities, setUniversities] = useState([]);
const [loadingUniversities, setLoadingUniversities] = useState(true);
const [universitiesError, setUniversitiesError] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);
const [showEditUniversityModal, setShowEditUniversityModal] = useState(false);

const [students, setStudents] = useState([]);

const [showAddStudentModal, setShowAddStudentModal] = useState(false);
const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);


    const [facultyIssues, setFacultyIssues] = useState([]);
const [loadingFacultyIssues, setLoadingFacultyIssues] = useState(true);
const [facultyIssuesError, setFacultyIssuesError] = useState(null);


const [feedbacks, setFeedbacks] = useState([]);
const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
const [feedbacksError, setFeedbacksError] = useState(null);


//Settings 

const [adminSettings, setAdminSettings] = useState({
  systemName: 'ARMS - Anti-Ragging Management System',
  email: 'admin@arms.lk',
  emergencyHotline: '119',
  emailNotifications: true,
  smsAlerts: true,
  weeklyReports: false
});
const [loadingSettings, setLoadingSettings] = useState(true);
const [showPasswordModal, setShowPasswordModal] = useState(false);

const [newStudent, setNewStudent] = useState({
  studentName: '',
  studentEmail: '',
  universityName: '',
  facultyName: '',
  universityStId: '',
  studentPassword: '',
});


const [newUniversity, setNewUniversity] = useState({
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
  website: '',
  chancellorName: '',
  viceChancellorName: '',
  numberOfStudents: 0,
  numberOfFaculties: 0,
  active: true, // Set default to true
  address: '',
  city: '',
  registrationNumber: '',
  logoUrl: ''
  // Note: createdAt and updatedAt will be handled by backend
});


const [communications, setCommunications] = useState([]);
const [emailTemplates, setEmailTemplates] = useState([]);
const [loadingCommunications, setLoadingCommunications] = useState(true);
const [showEmailModal, setShowEmailModal] = useState(false);
const [emailForm, setEmailForm] = useState({
  recipients: [],
  subject: '',
  message: '',
  priority: 'medium',
  templateId: null
});



  // Fetch recent reports from backend
  useEffect(() => {
    const fetchRecentReports = async () => {
      try {
        setLoadingReports(true);
        const response = await fetch('http://localhost:8080/report/getLatest/3');
        if (!response.ok) {
          throw new Error('Failed to fetch recent reports');
        }
        const data = await response.json();
        setRecentReports(data);
        setReportsError(null);
      } catch (error) {
        console.error('Error fetching recent reports:', error);
        setReportsError(error.message);
        // Fallback to sample data if API fails
        setRecentReports([
          {
            reportId: 1,
            title: "Verbal Harassment",
            description: "Verbal abuse during ragging session",
            location: "University of Colombo",
            dateofIncident: "2024-08-25",
            reportDate: "2024-08-25T10:30:00",
            status: "Under Investigation",
            isAnonymous: true
          },
          {
            reportId: 2,
            title: "Physical Violence",
            description: "Physical assault reported by freshman student",
            location: "University of Peradeniya",
            dateofIncident: "2024-08-24",
            reportDate: "2024-08-24T14:15:00",
            status: "Resolved",
            isAnonymous: false
          },
          {
            reportId: 3,
            title: "Psychological Harassment",
            description: "Continuous psychological pressure and humiliation",
            location: "University of Moratuwa",
            dateofIncident: "2024-08-23",
            reportDate: "2024-08-23T09:20:00",
            status: "In Progress",
            isAnonymous: true
          }
        ]);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchRecentReports();
  }, []);


    // Function to determine priority based on report data
  const getPriority = (report) => {
    if (!report) return 'Low';
    
    const title = report.title.toLowerCase();
    const description = report.description.toLowerCase();
    
    // Critical priority keywords
    if (title.includes('physical') || title.includes('violence') || title.includes('assault') ||
        description.includes('physical') || description.includes('violence') || description.includes('assault')) {
      return 'Critical';
    }
    
    // High priority keywords
    if (title.includes('harassment') || title.includes('threat') || title.includes('abuse') ||
        description.includes('harassment') || description.includes('threat') || description.includes('abuse')) {
      return 'High';
    }
    
    // Medium priority for psychological issues
    if (title.includes('psychological') || title.includes('mental') ||
        description.includes('psychological') || description.includes('mental')) {
      return 'Medium';
    }
    
    return 'Medium'; // Default priority
  };

  // Function to format date
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
      return dateString; // Return original string if parsing fails
    }
  };


  // 2. UPDATE THE FETCH UNIVERSITIES USEEFFECT
useEffect(() => {
  const fetchUniversities = async () => {
    try {
      setLoadingUniversities(true);
      const response = await fetch('http://localhost:8080/universities/getAll');
      if (!response.ok) {
        throw new Error('Failed to fetch universities');
      }
      const data = await response.json();
      setUniversities(data);
      setUniversitiesError(null);
    } catch (error) {
      console.error('Error fetching universities:', error);
      setUniversitiesError(error.message);
      // Fallback data that matches your backend structure
      setUniversities([]);
    } finally {
      setLoadingUniversities(false);
    }
  };

  fetchUniversities();
}, []);



const handleAddUniversity = async () => {
  try {
    setIsSubmitting(true);
    // Basic validation
    if (!newUniversity.name || !newUniversity.email || !newUniversity.password) {
      alert('Please fill in all required fields (Name, Email, Password)');
      return;
    }

    const response = await fetch('http://localhost:8080/universities/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUniversity),
    });

    if (!response.ok) {
      throw new Error('Failed to add university');
    }

    const addedUniversity = await response.json();
    setUniversities(prevUniversities => [...prevUniversities, addedUniversity]);
    setShowAddUniversityModal(false);
    
    // Reset form
    setNewUniversity({
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      website: '',
      chancellorName: '',
      viceChancellorName: '',
      numberOfStudents: 0,
      numberOfFaculties: 0,
      active: true,
      address: '',
      city: '',
      registrationNumber: '',
      logoUrl: ''
    });

    alert('University added successfully!');
  } catch (error) {
    console.error('Error adding university:', error);
    alert('Failed to add university. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};



const handleEditUniversity = (university) => {
  setSelectedUniversity(university);
  setShowEditUniversityModal(true);
};

const handleUpdateUniversity = async (updatedUniversity) => {
  try {
    setIsSubmitting(true);
    const response = await fetch(`http://localhost:8080/universities/update/${updatedUniversity.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUniversity),
    });

    if (!response.ok) {
      throw new Error('Failed to update university');
    }

    const updated = await response.json();
    setUniversities(prevUniversities => 
      prevUniversities.map(uni => uni.id === updated.id ? updated : uni)
    );
    setShowEditUniversityModal(false);
    setSelectedUniversity(null);
    alert('University updated successfully!');
  } catch (error) {
    console.error('Error updating university:', error);
    alert('Failed to update university. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


const handleDeleteUniversity = async (id) => {
  if (!window.confirm("Are you sure you want to delete this university?")) {
    return; // user cancelled
  }

  try {
    const response = await fetch(`http://localhost:8080/universities/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting university");
    }

    // remove deleted uni from state
    setUniversities((prev) => prev.filter((uni) => uni.id !== id));

    alert("University deleted successfully!");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete university");
  }
};




useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/student/getAll");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  fetchStudents();
}, []);



const handleDeleteStudent = async (studentId) => {
  if (!window.confirm("Are you sure you want to delete this student?")) return;

  try {
    setIsSubmitting(true);

    const response = await fetch(`http://localhost:8080/student/delete/${studentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }

    // Remove deleted student from state
    setStudents(prevStudents => prevStudents.filter(s => s.studentId !== studentId));

    alert("Student deleted successfully!");
  } catch (error) {
    console.error("Error deleting student:", error);
    alert("Failed to delete student. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};




const handleAddStudent = async () => {
  try {
    setIsSubmitting(true);

    if (!newStudent.studentName || !newStudent.studentEmail || !newStudent.studentPassword) {
      alert("Please fill in all required fields");
      return;
    }

    const response = await fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });

    if (!response.ok) throw new Error("Failed to add student");

    alert("Student added successfully!");

    // Optionally, fetch updated students list
    const updatedStudents = await fetch("http://localhost:8080/student/getAll").then(res => res.json());
    setStudents(updatedStudents);

    setShowAddStudentModal(false);
    setNewStudent({
      studentName: '',
      studentEmail: '',
      universityName: '',
      facultyName: '',
      universityStId: '',
      studentPassword: '',
    });

  } catch (error) {
    console.error("Error adding student:", error);
    alert("Failed to add student. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};




const handleExport = async () => {
  try {
    const response = await axios.get("http://localhost:8080/student/export", {
      responseType: "blob", // important for file download
    });

    // Create a link element for download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students.csv"); // file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Export failed:", error);
  }
};



  useEffect(() => {
    axios
      .get("http://localhost:8080/report/getAll")
      .then((response) => {
        setIncidents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setLoading(false);
      });
  }, []);

  // simple counts for summary cards
  const totalReports = incidents.length;
  const underInvestigation = incidents.filter((r) => r.status === "Under Investigation").length;
  const resolved = incidents.filter((r) => r.status === "Resolved").length;





  //get Faculty issues 



// Add this useEffect to fetch faculty issues
useEffect(() => {
  const fetchFacultyIssues = async () => {
    try {
      setLoadingFacultyIssues(true);
      const response = await fetch('http://localhost:8080/fissue/getAll');
      if (!response.ok) {
        throw new Error('Failed to fetch faculty issues');
      }
      const data = await response.json();
      setFacultyIssues(data);
      setFacultyIssuesError(null);
    } catch (error) {
      console.error('Error fetching faculty issues:', error);
      setFacultyIssuesError(error.message);
    } finally {
      setLoadingFacultyIssues(false);
    }
  };

  fetchFacultyIssues();
}, []);

// Helper functions
const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
    case 'critical':
      return 'bg-red-50 border-red-200 text-red-800';
    case 'medium':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    case 'low':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'resolved':
      return 'bg-green-50 border-green-200';
    case 'in progress':
    case 'under investigation':
      return 'bg-orange-50 border-orange-200';
    case 'pending':
    case 'open':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};



const getStatistics = () => {
  const total = facultyIssues.length;
  const active = facultyIssues.filter(issue => 
    issue.status && !['resolved', 'closed'].includes(issue.status.toLowerCase())
  ).length;
  const resolved = facultyIssues.filter(issue => 
    issue.status && ['resolved', 'closed'].includes(issue.status.toLowerCase())
  ).length;
  
  return { total, active, resolved };
};



//Communication

useEffect(() => {
  fetchCommunications();
  fetchEmailTemplates();
}, []);

const fetchCommunications = async () => {
  try {
    setLoadingCommunications(true);
    const response = await fetch('http://localhost:8080/communications/recent');
    if (response.ok) {
      const data = await response.json();
      setCommunications(data);
    }
  } catch (error) {
    console.error('Error fetching communications:', error);
  } finally {
    setLoadingCommunications(false);
  }
};

const fetchEmailTemplates = async () => {
  try {
    const response = await fetch('http://localhost:8080/communications/templates');
    if (response.ok) {
      const data = await response.json();
      setEmailTemplates(data);
    }
  } catch (error) {
    console.error('Error fetching email templates:', error);
  }
};



const handleSendEmail = async () => {
  try {
    const response = await fetch('http://localhost:8080/communications/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailForm)
    });
    
    if (response.ok) {
      alert('Email sent successfully!');
      setShowEmailModal(false);
      setEmailForm({
        recipients: [],
        subject: '',
        message: '',
        priority: 'medium',
        templateId: null
      });
      fetchCommunications(); // Refresh the recent communications
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    alert('Error sending email: ' + error.message);
  }
};

const handleQuickAction = async (type, message) => {
  const allUniversityEmails = universities.map(uni => uni.email);
  
  try {
    const response = await fetch(`http://localhost:8080/communications/quick-action/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        recipients: allUniversityEmails
      })
    });
    
    if (response.ok) {
      alert(`${type} alert sent successfully!`);
      fetchCommunications();
    } else {
      throw new Error(`Failed to send ${type} alert`);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
};



//Feedbacks 

useEffect(() => {
  const fetchFeedbacks = async () => {
    try {
      setLoadingFeedbacks(true);
      const response = await fetch('http://localhost:8080/feedback/getAll');
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      const data = await response.json();
      setFeedbacks(data);
      setFeedbacksError(null);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setFeedbacksError(error.message);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  fetchFeedbacks();
}, []);


const calculateFeedbackStats = (feedbacks) => {
  const total = feedbacks.length;
  const averageRating = feedbacks.length > 0 ? 
    (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1) : 
    '0.0';
  
  // Calculate new this week (assuming createdAt is available)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const newThisWeek = feedbacks.filter(feedback => {
    if (!feedback.createdAt) return false;
    const feedbackDate = new Date(feedback.createdAt);
    return feedbackDate >= oneWeekAgo;
  }).length;
  
  return { total, averageRating, newThisWeek };
};

const formatFeedbackDate = (dateTime) => {
  if (!dateTime) return 'N/A';
  try {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

const handleDeleteFeedback = async (feedbackId) => {
  if (!window.confirm('Are you sure you want to delete this feedback?')) {
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:8080/feedback/delete/${feedbackId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      setFeedbacks(prev => prev.filter(feedback => feedback.feedbackId !== feedbackId));
      alert('Feedback deleted successfully!');
    } else {
      throw new Error('Failed to delete feedback');
    }
  } catch (error) {
    alert('Error deleting feedback: ' + error.message);
  }
};


// Settings

useEffect(() => {
  const fetchAdminSettings = async () => {
    try {
      setLoadingSettings(true);
      const response = await fetch('http://localhost:8080/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setAdminSettings({
          systemName: data.systemName || 'ARMS - Anti-Ragging Management System',
          email: data.email || 'admin@arms.lk',
          emergencyHotline: data.emergencyHotline || '119',
          emailNotifications: data.emailNotifications,
          smsAlerts: data.smsAlerts,
          weeklyReports: data.weeklyReports
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoadingSettings(false);
    }
  };

  fetchAdminSettings();
}, []);



// Add these handler functions in your component

const handleSettingChange = (field, value) => {
  setAdminSettings(prev => ({
    ...prev,
    [field]: value
  }));
};

const handleSaveSettings = async () => {
  try {
    const response = await fetch('http://localhost:8080/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminId: 1, // You might want to get this from authentication
        ...adminSettings
      })
    });
    
    if (response.ok) {
      alert('Settings saved successfully!');
    } else {
      throw new Error('Failed to save settings');
    }
  } catch (error) {
    alert('Error saving settings: ' + error.message);
  }
};

const handleToggleSetting = (field) => {
  const newValue = !adminSettings[field];
  handleSettingChange(field, newValue);
  
  // Auto-save toggle settings
  setTimeout(() => handleSaveSettings(), 500);
};

const handleChangePassword = () => {
  const currentPassword = prompt('Enter current password:');
  const newPassword = prompt('Enter new password:');
  const confirmPassword = prompt('Confirm new password:');
  
  if (!currentPassword || !newPassword || !confirmPassword) {
    return;
  }
  
  if (newPassword !== confirmPassword) {
    alert('New passwords do not match!');
    return;
  }
  
  if (newPassword.length < 6) {
    alert('Password must be at least 6 characters long!');
    return;
  }
  
  changePasswordAPI(currentPassword, newPassword);
};

const changePasswordAPI = async (currentPassword, newPassword) => {
  try {
    const response = await fetch('http://localhost:8080/admin/change-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });
    
    if (response.ok) {
      alert('Password changed successfully!');
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    alert('Error changing password: ' + error.message);
  }
};



  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'universities', label: 'Universities', icon: <University className="w-5 h-5" /> },
    { id: 'students', label: 'Student Profiles', icon: <Users className="w-5 h-5" /> },
    { id: 'incidents', label: 'Incident Reports', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'faculty', label: 'Faculty Issues', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'communications', label: 'Communications', icon: <Mail className="w-5 h-5" /> },
    { id: 'feedbacks', label: 'Feedbacks', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const StatCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );









  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Universities"
          value="23"
          change="+2 this month"
          icon={<University className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Students"
          value="45,280"
          change="+1,240 this semester"
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title="Pending Incidents"
          value="12"
          change="-3 from last week"
          icon={<AlertTriangle className="w-6 h-6 text-white" />}
          color="bg-red-500"
        />
        <StatCard
          title="Resolved Cases"
          value="347"
          change="+15 this month"
          icon={<CheckCircle className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Incidents</h3>
            {loadingReports && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
          </div>
          
          {reportsError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700">Error loading reports: {reportsError}</p>
              <p className="text-xs text-red-600 mt-1">Using sample data instead</p>
            </div>
          )}

          <div className="space-y-4">
            {loadingReports ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              ))
            ) : (
              recentReports.map(report => {
                const priority = getPriority(report);
                return (
                  <div key={report.reportId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <p className="text-sm text-gray-600">{report.location}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {report.isAnonymous ? 'Anonymous Report' : 'Student Report'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {priority}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(report.dateofIncident)}</p>
                      <p className="text-xs text-blue-600 mt-1 capitalize">{report.status}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {!loadingReports && recentReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No recent incidents to display</p>
            </div>
          )}
        </div>

<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-900">University Status</h3>
    {loadingUniversities && (
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
    )}
  </div>
  
  {universitiesError && (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
      <p className="text-sm text-red-700">Error loading universities: {universitiesError}</p>
      <p className="text-xs text-red-600 mt-1">Using sample data instead</p>
    </div>
  )}

  <div className="space-y-4">
    {loadingUniversities ? (
      // Loading skeleton
      Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between animate-pulse">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-3 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      ))
    ) : (
      universities.slice(0, 3).map(uni => (
        <div key={uni.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">{uni.name}</p>
            <p className="text-sm text-gray-600">
              {uni.numberOfStudents ? uni.numberOfStudents.toLocaleString() : 'N/A'} students
            </p>
          </div>
          <div className="text-right">
            <span className={`px-2 py-1 text-xs rounded-full ${
              uni.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {uni.active ? 'Active' : 'Inactive'}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              {uni.recentIncidents || 0} incidents
            </p>
          </div>
        </div>
      ))
    )}
  </div>

  {!loadingUniversities && universities.length === 0 && (
    <div className="text-center py-8 text-gray-500">
      <University className="w-12 h-12 mx-auto mb-3 text-gray-300" />
      <p>No universities to display</p>
    </div>
  )}
</div>
      </div>
    </div>
  );


  const renderUniversities = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Universities Management</h1>
      <button 
        onClick={() => setShowAddUniversityModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add University
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search universities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">University</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statistics</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {universities.map(uni => (
              <tr key={uni.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{uni.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">
                      {uni.registrationNumber && `${uni.registrationNumber}`}
                      {uni.registrationNumber && uni.city && ' • '}
                      {uni.city && `${uni.city}`}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{uni.email || 'N/A'}</div>
                  <div className="text-sm text-gray-500">{uni.phoneNumber || 'N/A'}</div>
                  {uni.website && (
                    <div className="text-sm text-blue-600 hover:underline">
                      <a href={uni.website} target="_blank" rel="noopener noreferrer">
                        {uni.website}
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {uni.numberOfStudents ? Number(uni.numberOfStudents).toLocaleString() : '0'} students
                  </div>
                  <div className="text-sm text-gray-500">
                    {uni.numberOfFaculties ? Number(uni.numberOfFaculties).toLocaleString() : '0'} faculties
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    uni.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {uni.active ? 'Active' : 'Inactive'}
                  </span>
                  {uni.chancellorName && (
                    <div className="text-xs text-gray-500 mt-1">
                      Chancellor: {uni.chancellorName}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                       onClick={() => handleEditUniversity(uni)}
                       className="text-green-600 hover:text-green-800"
                      >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteUniversity(uni.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

{/* Modals */}
<AddUniversityModal 
  isOpen={showAddUniversityModal}
  onClose={() => setShowAddUniversityModal(false)}
  newUniversity={newUniversity}
  setNewUniversity={setNewUniversity}
  onSubmit={handleAddUniversity}
  isSubmitting={isSubmitting}
/>

<EditUniversityModal 
  isOpen={showEditUniversityModal}
  onClose={() => {
    setShowEditUniversityModal(false);
    setSelectedUniversity(null);
  }}
  university={selectedUniversity}
  onUpdate={handleUpdateUniversity}
  isSubmitting={isSubmitting}
/>

{showEmailModal && <EmailModal />}
      </div>
    </div>
  </div>

  
);

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Profiles</h1>
        <div className="flex space-x-2">
          <button
               onClick={handleExport}
               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
              Export Data
          </button>
          <button 
             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
             onClick={() => setShowAddStudentModal(true)}
            >
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Universities</option>
              {universities.map(uni => (
                <option key={uni.id}>{uni.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Academic Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incidents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
  {students.map(student => (
    <tr key={student.studentId} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{student.studentName}</div>
            <div className="text-sm text-gray-500">{student.universityStId}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{student.universityName}</div>
        <div className="text-sm text-gray-500">{student.facultyName}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{student.studentEmail}</div>
        {/* you don’t have phone in backend → can leave blank or remove */}
        <div className="text-sm text-gray-500">N/A</div>
      </td>
      <td className="px-6 py-4">
        {/* Backend doesn’t have year or status yet → placeholder */}
        <div className="text-sm text-gray-900">Year 1</div>
        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
          {student.isEmailVerified ? "Active" : "Pending"}
        </span>
      </td>
      <td className="px-6 py-4">
        {/* Backend doesn’t track incidents yet → default 0 */}
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          0 incidents
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-800">
            <Edit className="w-4 h-4" />
          </button>
          <button 
              className="text-red-600 hover:text-red-800"
              onClick={() => handleDeleteStudent(student.studentId)}
            >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table>


          <AddStudentModal
          isOpen={showAddStudentModal}
          onClose={() => setShowAddStudentModal(false)}
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          onSubmit={handleAddStudent}
          isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );

  const renderIncidents = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Incident Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Reports"
          value={totalReports}
          icon={<AlertTriangle className="w-6 h-6 text-white" />}
          color="bg-red-500"
        />
        <StatCard
          title="Under Investigation"
          value={underInvestigation}
          icon={<Clock className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />
        <StatCard
          title="Resolved"
          value={resolved}
          icon={<CheckCircle className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search incidents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Status</option>
              <option>Under Investigation</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Priority</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.reportId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{incident.title}</div>
                    <div className="text-sm text-gray-500">{incident.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{incident.university}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{incident.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {incident.dateofIncident}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        incident.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : incident.status === "Under Investigation"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {incidents.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFaculty = () => {
  const stats = getStatistics();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Faculty Issues</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Faculty Reports"
          value={stats.total.toString()}
          icon={<GraduationCap className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Cases"
          value={stats.active.toString()}
          icon={<FileText className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />
        <StatCard
          title="Resolved Issues"
          value={stats.resolved.toString()}
          icon={<CheckCircle className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Faculty Issue Reports</h3>
            {loadingFacultyIssues && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              New Report
            </button>
          </div>
        </div>

        {facultyIssuesError && (
          <div className="p-6 bg-red-50 border-b border-red-200">
            <p className="text-sm text-red-700">Error loading faculty issues: {facultyIssuesError}</p>
          </div>
        )}

        <div className="p-6">
          {loadingFacultyIssues ? (
            // Loading skeleton
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : facultyIssues.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No faculty issues reported yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {facultyIssues.map(issue => {
                const priorityColorClass = getPriorityColor(issue.priority);
                const statusColorClass = getStatusColor(issue.status);
                
                return (
                  <div key={issue.issueId} className={`${statusColorClass} rounded-lg p-4`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-semibold ${
                          issue.status?.toLowerCase() === 'resolved' ? 'text-green-800' :
                          issue.priority?.toLowerCase() === 'high' ? 'text-red-800' :
                          issue.priority?.toLowerCase() === 'medium' ? 'text-yellow-800' :
                          'text-gray-800'
                        }`}>
                          {issue.subject || issue.issueType || 'Faculty Issue'}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          issue.status?.toLowerCase() === 'resolved' ? 'text-green-700' :
                          issue.priority?.toLowerCase() === 'high' ? 'text-red-700' :
                          issue.priority?.toLowerCase() === 'medium' ? 'text-yellow-700' :
                          'text-gray-700'
                        }`}>
                          {issue.universityName} {issue.department && `- ${issue.department}`}
                        </p>
                        <p className={`text-sm mt-2 ${
                          issue.status?.toLowerCase() === 'resolved' ? 'text-green-600' :
                          issue.priority?.toLowerCase() === 'high' ? 'text-red-600' :
                          issue.priority?.toLowerCase() === 'medium' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {issue.description || 'No description provided'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          issue.priority?.toLowerCase() === 'high' ? 'bg-red-100 text-red-800' :
                          issue.priority?.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          issue.priority?.toLowerCase() === 'low' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {issue.priority || 'Unknown'} Priority
                        </span>
                        <p className={`text-xs mt-1 ${
                          issue.status?.toLowerCase() === 'resolved' ? 'text-green-600' :
                          issue.priority?.toLowerCase() === 'high' ? 'text-red-600' :
                          issue.priority?.toLowerCase() === 'medium' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {formatDate(issue.createdAt)}
                        </p>
                        {issue.status && (
                          <p className={`text-xs mt-1 font-medium ${
                            issue.status?.toLowerCase() === 'resolved' ? 'text-green-600' :
                            issue.priority?.toLowerCase() === 'high' ? 'text-red-600' :
                            issue.priority?.toLowerCase() === 'medium' ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {issue.status}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      {issue.status?.toLowerCase() === 'resolved' ? (
                        <>
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                            View Details
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            Archive
                          </button>
                        </>
                      ) : (
                        <>
                          <button className={`px-3 py-1 rounded text-sm text-white ${
                            issue.priority?.toLowerCase() === 'high' ? 'bg-red-600 hover:bg-red-700' :
                            'bg-orange-600 hover:bg-orange-700'
                          }`}>
                            {issue.status?.toLowerCase() === 'under investigation' ? 'Continue Investigation' : 'Investigate'}
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            Send Notice
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  const renderCommunications = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
      <button 
        onClick={() => setShowEmailModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Send className="w-4 h-4 mr-2" />
        Compose Email
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6 space-y-4">
          <button 
            onClick={() => {
              const message = prompt("Enter emergency alert message:");
              if (message) handleQuickAction('emergency', message);
            }}
            className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 py-3 px-4 rounded-lg text-left transition-colors"
          >
            <div className="font-medium">Send Emergency Alert</div>
            <div className="text-sm opacity-75">Broadcast urgent safety notice to all universities</div>
          </button>
          <button 
            onClick={() => {
              const message = prompt("Enter incident follow-up message:");
              if (message) handleQuickAction('incident', message);
            }}
            className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 py-3 px-4 rounded-lg text-left transition-colors"
          >
            <div className="font-medium">Incident Follow-up</div>
            <div className="text-sm opacity-75">Send investigation update to relevant parties</div>
          </button>
          <button 
            onClick={() => {
              const message = prompt("Enter policy update message:");
              if (message) handleQuickAction('policy', message);
            }}
            className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 py-3 px-4 rounded-lg text-left transition-colors"
          >
            <div className="font-medium">Policy Update Notice</div>
            <div className="text-sm opacity-75">Notify about new anti-ragging guidelines</div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Communications</h3>
            {loadingCommunications && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
          </div>
        </div>
        <div className="p-6">
          {loadingCommunications ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-4 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : communications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No recent communications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {communications.map(comm => (
                <div 
                  key={comm.id} 
                  className={`border-l-4 pl-4 ${
                    comm.priority === 'high' ? 'border-red-500' :
                    comm.priority === 'medium' ? 'border-orange-500' :
                    comm.type === 'emergency' ? 'border-red-500' :
                    comm.status === 'failed' ? 'border-red-500' :
                    'border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{comm.subject}</div>
                      <div className="text-sm text-gray-600">
                        To: {comm.recipients.includes(',') ? 
                          `${comm.recipients.split(',').length} recipients` : 
                          comm.recipients}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(comm.sentAt)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        comm.status === 'sent' ? 'bg-green-100 text-green-800' :
                        comm.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {comm.status}
                      </span>
                      {comm.priority === 'high' && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div 
            onClick={() => {
              setEmailForm(prev => ({
                ...prev,
                subject: "Incident Investigation Notice",
                message: "We are writing to inform you about an ongoing incident investigation that requires your attention and cooperation.\n\n[Please provide specific details about the incident]\n\nWe expect your full cooperation in this matter and request that you provide all necessary information within 48 hours.\n\nRegards,\nARMS Administration"
              }));
              setShowEmailModal(true);
            }}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-2">Incident Investigation Notice</h4>
            <p className="text-sm text-gray-600">Template for notifying universities about incident investigations</p>
          </div>
          <div 
            onClick={() => {
              setEmailForm(prev => ({
                ...prev,
                subject: "Anti-Ragging Policy Compliance Reminder",
                message: "This is a reminder regarding compliance with anti-ragging policies and regulations.\n\n[Specific compliance requirements]\n\nPlease ensure that all faculty members and staff are aware of these requirements and that appropriate measures are in place.\n\nFailure to comply may result in administrative action.\n\nRegards,\nARMS Administration"
              }));
              setShowEmailModal(true);
            }}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-2">Policy Compliance Reminder</h4>
            <p className="text-sm text-gray-600">Reminder about anti-ragging policy compliance requirements</p>
          </div>
          <div 
            onClick={() => {
              setEmailForm(prev => ({
                ...prev,
                subject: "Student Support Resources Available",
                message: "We are writing to inform you about the support resources available for students who may be affected by ragging incidents.\n\nAvailable Resources:\n- 24/7 Counseling Hotline: 119\n- Online Reporting Portal: arms.lk\n- Campus Counseling Centers\n- Peer Support Groups\n\nPlease ensure that all students are aware of these resources and encourage them to seek help when needed.\n\nRegards,\nARMS Administration"
              }));
              setShowEmailModal(true);
            }}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-2">Support Resources</h4>
            <p className="text-sm text-gray-600">Information about available counseling and support services</p>

            
          </div>
        </div>
      </div>
    </div>

        <EmailModal 
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                universities={universities}
                emailForm={emailForm}
                setEmailForm={setEmailForm}
                onSend={handleSendEmail}
                emailTemplates={emailTemplates}
            />

  </div>

  
);


//Feedbacks 

  const renderFeedbacks = () => {
  const stats = calculateFeedbackStats(feedbacks);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">User Feedbacks</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Feedbacks"
          value={stats.total.toString()}
          icon={<MessageSquare className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          icon={<Star className="w-6 h-6 text-white" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="New This Week"
          value={stats.newThisWeek.toString()}
          icon={<Plus className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Feedbacks</h3>
            {loadingFeedbacks && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
          </div>
          
          {feedbacksError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700">Error loading feedbacks: {feedbacksError}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search feedbacks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Star</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Types</option>
              <option>General</option>
              <option>Report Issue</option>
              <option>Suggestion</option>
              <option>Complaint</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {loadingFeedbacks ? (
            // Loading skeleton
            <div className="space-y-4 p-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                        ))}
                      </div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No feedbacks available</p>
            </div>
          ) : (
            feedbacks.map(feedback => (
              <div key={feedback.feedbackId} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Student ID: {feedback.studentId || 'Anonymous'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feedback.feedbackType || 'General Feedback'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFeedbackDate(feedback.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                  {feedback.feedbackText || 'No feedback text provided'}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Feedback ID: {feedback.feedbackId}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        // You can implement view details functionality
                        alert(`Viewing feedback ${feedback.feedbackId}`);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => {
                        // You can implement respond functionality
                        alert(`Responding to feedback ${feedback.feedbackId}`);
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Respond
                    </button>
                    <button 
                      onClick={() => handleDeleteFeedback(feedback.feedbackId)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};



//Settings 

  const renderSettings = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <button 
        onClick={handleSaveSettings}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
              <input 
                type="text" 
                value={adminSettings.systemName}
                onChange={(e) => handleSettingChange('systemName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <input 
                type="email" 
                value={adminSettings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Hotline</label>
              <input 
                type="tel" 
                value={adminSettings.emergencyHotline}
                onChange={(e) => handleSettingChange('emergencyHotline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive email alerts for new incidents</div>
              </div>
              <div 
                onClick={() => handleToggleSetting('emailNotifications')}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  adminSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  adminSettings.emailNotifications ? 'right-1' : 'left-1'
                }`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">SMS Alerts</div>
                <div className="text-sm text-gray-600">Get SMS for critical incidents</div>
              </div>
              <div 
                onClick={() => handleToggleSetting('smsAlerts')}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  adminSettings.smsAlerts ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  adminSettings.smsAlerts ? 'right-1' : 'left-1'
                }`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Weekly Reports</div>
                <div className="text-sm text-gray-600">Automated weekly summary reports</div>
              </div>
              <div 
                onClick={() => handleToggleSetting('weeklyReports')}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  adminSettings.weeklyReports ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  adminSettings.weeklyReports ? 'right-1' : 'left-1'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {universities.length > 0 ? '99.9%' : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {loadingReports ? '...' : recentReports.length > 0 ? '2.3s' : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">256-bit</div>
              <div className="text-sm text-gray-600">Encryption Level</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          <div className="p-6 space-y-3">
            <button 
              onClick={handleChangePassword}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Change Password
            </button>
            <button 
              onClick={() => alert('2FA setup coming soon!')}
              className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
              disabled
            >
              Enable 2FA (Coming Soon)
            </button>
            <button 
              onClick={() => alert('Audit log feature coming soon!')}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Audit Log
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Info</h3>
          </div>
          <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Universities:</span>
              <span className="font-medium">{universities.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Reports:</span>
              <span className="font-medium">{recentReports.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Faculty Issues:</span>
              <span className="font-medium">{facultyIssues ? facultyIssues.length : 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Feedbacks:</span>
              <span className="font-medium">{feedbacks ? feedbacks.length : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'universities': return renderUniversities();
      case 'students': return renderStudents();
      case 'incidents': return renderIncidents();
      case 'faculty': return renderFaculty();
      case 'communications': return renderCommunications();
      case 'feedbacks': return renderFeedbacks();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <span className="text-xl font-bold text-gray-900">ARMS</span>
              <div className="text-xs text-gray-500">Admin Dashboard</div>
            </div>
          </div>
        </div>

        <nav className="px-4 pb-4">
          <ul className="space-y-1">
            {sidebarItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Welcome back, Admin
              </h2>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <AlertTriangle className="w-6 h-6 text-gray-400" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="relative">
                <Mail className="w-6 h-6 text-gray-400" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">7</span>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {/* Modals */}
      {showAddUniversityModal && <AddUniversityModal />}
      {showEmailModal && <EmailModal />}
    </div>
  );
};

export default ARMSAdminDashboard;