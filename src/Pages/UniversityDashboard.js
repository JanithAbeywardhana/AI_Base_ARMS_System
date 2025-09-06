import React, { useState, useEffect } from 'react';
import { BarChart3, BookOpen, AlertTriangle, Mail, Settings, Users, FileText, Clock, CheckCircle, XCircle, ArrowLeft, Menu, X, Shield, Bell } from 'lucide-react';

const UniversityDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [facultyIssues, setFacultyIssues] = useState([]);
  const [raggingReports, setRaggingReports] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [currentUniversity, setCurrentUniversity] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUni = localStorage.getItem("university");
    if (storedUni) {
      try {
        const parsedUni = JSON.parse(storedUni);
        setCurrentUniversity(parsedUni);
      } catch (error) {
        console.error("Error parsing university data:", error);
        window.location.href = "/university-login";
      }
    } else {
      window.location.href = "/university-login";
    }
  }, []);

  useEffect(() => {
    if (currentUniversity) {
      fetchDashboardData();
    }
  }, [currentUniversity]);

  const fetchDashboardData = async () => {
    if (!currentUniversity) return;
    
    try {
      setLoading(true);
      const universityName = encodeURIComponent(currentUniversity.name);
      
      const [facultyRes, reportsRes, commsRes, statsRes] = await Promise.all([
        fetch(`http://localhost:8080/university-dashboard/faculty-issues/by-name/${universityName}`),
        fetch(`http://localhost:8080/university-dashboard/reports/by-name/${universityName}`),
        fetch(`http://localhost:8080/university-dashboard/communications/by-name/${universityName}`),
        fetch(`http://localhost:8080/university-dashboard/statistics/by-name/${universityName}`)
      ]);

      if (facultyRes.ok) {
        const facultyData = await facultyRes.json();
        setFacultyIssues(facultyData);
      }
      
      if (reportsRes.ok) {
        const reportsData = await reportsRes.json();
        setRaggingReports(reportsData);
      }
      
      if (commsRes.ok) {
        const commsData = await commsRes.json();
        setCommunications(commsData);
      }
      
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setDashboardStats(statsData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardStats({
        totalFacultyIssues: 0,
        pendingFacultyIssues: 0,
        totalRaggingReports: 0,
        pendingReports: 0,
        unreadCommunications: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("university");
    localStorage.removeItem("isUniversityLoggedIn");
    window.location.href = "/university-login";
  };

  const updateIssueStatus = async (issueId, status, response = '') => {
    try {
      const res = await fetch(`http://localhost:8080/university-dashboard/faculty-issues/${issueId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, response })
      });
      
      if (res.ok) {
        await fetchDashboardData();
        alert('Faculty issue updated successfully!');
        setShowResponseModal(false);
        setResponseText('');
        setSelectedItem(null);
      } else {
        alert('Failed to update issue');
      }
    } catch (error) {
      alert('Error updating issue: ' + error.message);
    }
  };

  const updateReportStatus = async (reportId, status, response = '') => {
    try {
      const res = await fetch(`http://localhost:8080/university-dashboard/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, response })
      });
      
      if (res.ok) {
        await fetchDashboardData();
        alert('Report updated successfully!');
        setShowResponseModal(false);
        setResponseText('');
        setSelectedItem(null);
      } else {
        alert('Failed to update report');
      }
    } catch (error) {
      alert('Error updating report: ' + error.message);
    }
  };

  const sendReply = async () => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/university-dashboard/communications/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalCommunicationId: selectedCommunication.id,
          message: replyMessage,
          universityEmail: currentUniversity.email,
          subject: selectedCommunication.subject
        })
      });
      
      if (res.ok) {
        setShowReplyModal(false);
        setReplyMessage('');
        setSelectedCommunication(null);
        alert('Reply sent successfully!');
      } else {
        alert('Failed to send reply');
      }
    } catch (error) {
      alert('Error sending reply: ' + error.message);
    }
  };

  const openResponseModal = (item, type) => {
    setSelectedItem({ ...item, type });
    setResponseText(item.universityResponse || '');
    setResponseStatus(item.status || 'pending');
    setShowResponseModal(true);
  };

  const submitResponse = () => {
    if (!responseText.trim()) {
      alert('Please enter a response');
      return;
    }

    if (selectedItem.type === 'faculty') {
      updateIssueStatus(selectedItem.issueId, responseStatus, responseText);
    } else if (selectedItem.type === 'report') {
      updateReportStatus(selectedItem.reportId, responseStatus, responseText);
    }
  };

  const StatCard = ({ title, value, icon, color, description }) => (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900">{value || 0}</p>
          {description && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">{description}</p>
          )}
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}>
          {React.cloneElement(icon, { className: 'w-5 h-5 sm:w-6 sm:h-6 text-white' })}
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_investigation': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'faculty-issues', label: 'Faculty Issues', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'ragging-reports', label: 'Ragging Reports', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'communications', label: 'Communications', icon: <Mail className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const renderDashboard = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <button
          onClick={fetchDashboardData}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          title="Total Faculty Issues"
          value={dashboardStats.totalFacultyIssues}
          icon={<BookOpen />}
          color="bg-blue-500"
          description="All faculty-related issues"
        />
        <StatCard
          title="Pending Faculty Issues"
          value={dashboardStats.pendingFacultyIssues}
          icon={<Clock />}
          color="bg-orange-500"
          description="Awaiting response"
        />
        <StatCard
          title="Total Ragging Reports"
          value={dashboardStats.totalRaggingReports}
          icon={<AlertTriangle />}
          color="bg-red-500"
          description="All ragging incidents"
        />
        <StatCard
          title="Pending Reports"
          value={dashboardStats.pendingReports}
          icon={<FileText />}
          color="bg-purple-500"
          description="Need investigation"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Faculty Issues</h3>
          <div className="space-y-3">
            {facultyIssues.slice(0, 3).map((issue, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{issue.subject}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{formatDate(issue.createdAt)}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)} self-start sm:self-auto`}>
                  {issue.status}
                </span>
              </div>
            ))}
            {facultyIssues.length === 0 && (
              <p className="text-gray-500 text-center py-4 text-sm">No faculty issues found</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Ragging Reports</h3>
          <div className="space-y-3">
            {raggingReports.slice(0, 3).map((report, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{report.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{formatDate(report.createdAt)}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} self-start sm:self-auto`}>
                  {report.status}
                </span>
              </div>
            ))}
            {raggingReports.length === 0 && (
              <p className="text-gray-500 text-center py-4 text-sm">No ragging reports found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacultyIssues = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Faculty Issues</h2>
        <div className="text-sm text-gray-600">
          Total Issues: {facultyIssues.length}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {facultyIssues.map((issue) => (
          <div key={issue.issueId} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900 text-sm flex-1 mr-2">{issue.subject}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)} flex-shrink-0`}>
                {issue.status}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{issue.description?.substring(0, 100)}...</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs text-gray-500">Dept: {issue.department}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{formatDate(issue.createdAt)}</span>
              <button
                onClick={() => openResponseModal(issue, 'faculty')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                Respond
              </button>
            </div>
          </div>
        ))}
        {facultyIssues.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No faculty issues found for your university
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {facultyIssues.map((issue) => (
                <tr key={issue.issueId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{issue.subject}</p>
                      <p className="text-sm text-gray-500">{issue.description?.substring(0, 100)}...</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{issue.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{formatDate(issue.createdAt)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openResponseModal(issue, 'faculty')}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {facultyIssues.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No faculty issues found for your university
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRaggingReports = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ragging Reports</h2>
        <div className="text-sm text-gray-600">
          Total Reports: {raggingReports.length}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {raggingReports.map((report) => (
          <div key={report.reportId} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900 text-sm flex-1 mr-2">{report.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} flex-shrink-0`}>
                {report.status}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{report.description?.substring(0, 100)}...</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs text-gray-500">Location: {report.location}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                {report.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${report.isAnonymous ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                {report.isAnonymous ? 'Anonymous' : 'Named'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{formatDate(report.createdAt)}</span>
              <button
                onClick={() => openResponseModal(report, 'report')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                Respond
              </button>
            </div>
          </div>
        ))}
        {raggingReports.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No ragging reports found for your university
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Anonymous</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {raggingReports.map((report) => (
                <tr key={report.reportId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <p className="text-sm text-gray-500">{report.description?.substring(0, 100)}...</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{report.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${report.isAnonymous ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                      {report.isAnonymous ? 'Anonymous' : 'Named'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{formatDate(report.createdAt)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openResponseModal(report, 'report')}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {raggingReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No ragging reports found for your university
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommunications = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Communications</h2>
        <div className="text-sm text-gray-600">
          Total Communications: {communications.length}
        </div>
      </div>

      <div className="grid gap-4">
        {communications.map((comm) => (
          <div key={comm.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{comm.subject}</h3>
              <div className="flex items-center space-x-2 self-start sm:self-auto">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(comm.priority)}`}>
                  {comm.priority}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">{formatDate(comm.sentAt)}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">{comm.message}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-500">From: {comm.sentBy}</p>
              <button
                onClick={() => {
                  setSelectedCommunication(comm);
                  setShowReplyModal(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
        {communications.length === 0 && (
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100 text-center">
            <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm sm:text-base">No communications found</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">University Settings</h2>
      
      {currentUniversity && (
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">University Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
              <p className="text-gray-900 text-sm sm:text-base break-words">{currentUniversity.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900 text-sm sm:text-base break-all">{currentUniversity.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="text-gray-900 text-sm sm:text-base">{currentUniversity.phoneNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <p className="text-gray-900 text-sm sm:text-base break-all">{currentUniversity.website}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chancellor</label>
              <p className="text-gray-900 text-sm sm:text-base">{currentUniversity.chancellorName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vice Chancellor</label>
              <p className="text-gray-900 text-sm sm:text-base">{currentUniversity.viceChancellorName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading && !currentUniversity) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUniversity) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Please log in to access the dashboard</p>
          <button
            onClick={() => window.location.href = '/university-login'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <div>
                  <h1 className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-900 truncate">{currentUniversity.name}</h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">University Dashboard</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <span className="font-bold text-gray-900">ARMS Dashboard</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <nav className="p-4">
                <div className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'faculty-issues' && renderFacultyIssues()}
          {activeTab === 'ragging-reports' && renderRaggingReports()}
          {activeTab === 'communications' && renderCommunications()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Reply to Communication</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            {selectedCommunication && (
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Original Subject:</p>
                <p className="font-medium text-sm sm:text-base">{selectedCommunication.subject}</p>
              </div>
            )}
            
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Enter your reply..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 sm:h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
              <button
                onClick={() => setShowReplyModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold">
                Update {selectedItem.type === 'faculty' ? 'Faculty Issue' : 'Ragging Report'}
              </h3>
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                {selectedItem.type === 'faculty' ? 'Issue Subject:' : 'Report Title:'}
              </p>
              <p className="font-medium text-sm sm:text-base break-words">{selectedItem.subject || selectedItem.title}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={responseStatus}
                onChange={(e) => setResponseStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="pending">Pending</option>
                <option value="under_investigation">Under Investigation</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">University Response</label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Enter your response..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 sm:h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowResponseModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={submitResponse}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityDashboard;