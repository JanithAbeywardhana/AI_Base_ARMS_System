import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  MessageSquare,
  Calendar,
  MapPin,
  User,
  Building,
  Shield
} from 'lucide-react';

const ReportProgressModal = ({ isOpen, onClose, report, type }) => {
  if (!isOpen || !report) return null;

  // Define progress steps based on status
  const getProgressSteps = (currentStatus, type) => {
    const baseSteps = [
      {
        id: 'submitted',
        label: 'Report Submitted',
        description: 'Your report has been received',
        icon: <FileText className="w-5 h-5" />,
        status: 'completed'
      },
      {
        id: 'acknowledged',
        label: 'Acknowledged',
        description: 'University has acknowledged your report',
        icon: <CheckCircle className="w-5 h-5" />,
        status: currentStatus === 'pending' ? 'pending' : 'completed'
      },
      {
        id: 'investigating',
        label: 'Under Investigation',
        description: 'University is investigating the matter',
        icon: <Search className="w-5 h-5" />,
        status: currentStatus === 'pending' ? 'pending' : 
                currentStatus === 'under_investigation' || currentStatus === 'investigating' ? 'active' : 'completed'
      },
      {
        id: 'response',
        label: 'University Response',
        description: 'University has provided their response',
        icon: <MessageSquare className="w-5 h-5" />,
        status: report.universityResponse ? 'completed' : 
                currentStatus === 'resolved' || currentStatus === 'closed' ? 'completed' : 'pending'
      },
      {
        id: 'resolved',
        label: currentStatus === 'rejected' ? 'Case Closed' : 'Resolved',
        description: currentStatus === 'rejected' ? 'Case has been closed' : 'Matter has been resolved',
        icon: currentStatus === 'rejected' ? <XCircle className="w-5 h-5" /> : <Shield className="w-5 h-5" />,
        status: currentStatus === 'resolved' || currentStatus === 'closed' || currentStatus === 'rejected' ? 'completed' : 'pending'
      }
    ];

    return baseSteps;
  };

  const steps = getProgressSteps(report.status, type);

  const getStepColor = (stepStatus) => {
    switch (stepStatus) {
      case 'completed': return 'bg-green-500 text-white';
      case 'active': return 'bg-blue-500 text-white animate-pulse';
      case 'pending': return 'bg-gray-300 text-gray-600';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  const getConnectorColor = (stepStatus, nextStepStatus) => {
    if (stepStatus === 'completed') return 'bg-green-500';
    if (stepStatus === 'active') return 'bg-blue-500';
    return 'bg-gray-300';
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusMessage = () => {
    switch (report.status?.toLowerCase()) {
      case 'pending':
        return {
          message: 'Your report is waiting to be reviewed by the university.',
          color: 'text-yellow-700 bg-yellow-50 border-yellow-200'
        };
      case 'under_investigation':
      case 'investigating':
        return {
          message: 'The university is actively investigating your report.',
          color: 'text-blue-700 bg-blue-50 border-blue-200'
        };
      case 'resolved':
        return {
          message: 'Your report has been resolved. Check the university response below.',
          color: 'text-green-700 bg-green-50 border-green-200'
        };
      case 'closed':
        return {
          message: 'This case has been closed.',
          color: 'text-gray-700 bg-gray-50 border-gray-200'
        };
      case 'rejected':
        return {
          message: 'This report was reviewed but could not be substantiated.',
          color: 'text-red-700 bg-red-50 border-red-200'
        };
      default:
        return {
          message: 'Status update pending.',
          color: 'text-gray-700 bg-gray-50 border-gray-200'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {type === 'faculty' ? 'Faculty Issue Details' : 'Report Progress'}
              </h2>
              <p className="text-gray-600">
                {type === 'faculty' ? `Issue #${report.issueId}` : `Report #${report.reportId}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Alert */}
          <div className={`border rounded-lg p-4 ${statusInfo.color}`}>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5" />
              <p className="font-medium">{statusInfo.message}</p>
            </div>
          </div>

          {/* Report Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {type === 'faculty' ? 'Issue Information' : 'Report Information'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Title/Subject</label>
                  <p className="text-gray-900 font-medium">{report.title || report.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {type === 'faculty' ? 'Department' : 'Location'}
                  </label>
                  <p className="text-gray-900 flex items-center">
                    {type === 'faculty' ? (
                      <>
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        {report.department}
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        {report.location}
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(report.priority)}`}>
                    {report.priority || 'Medium'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Submitted Date</label>
                  <p className="text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    {formatDateTime(report.reportDate || report.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {type === 'faculty' ? 'Issue Type' : 'Incident Date'}
                  </label>
                  <p className="text-gray-900">
                    {type === 'faculty' ? 
                      report.issueType || 'General' : 
                      formatDateTime(report.dateofIncident)
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Current Status</label>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                    {report.status || 'Pending'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Description</label>
              <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-900">{report.description}</p>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Investigation Progress</h3>
            
            <div className="relative">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start mb-8 last:mb-0">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div 
                      className={`absolute left-6 top-12 w-0.5 h-16 ${getConnectorColor(step.status, steps[index + 1]?.status)}`}
                    />
                  )}
                  
                  {/* Step Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getStepColor(step.status)} shadow-md`}>
                    {step.icon}
                  </div>
                  
                  {/* Step Content */}
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-lg font-semibold ${
                        step.status === 'completed' ? 'text-gray-900' : 
                        step.status === 'active' ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </h4>
                      {step.status === 'active' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          In Progress
                        </span>
                      )}
                      {step.status === 'completed' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${
                      step.status === 'completed' ? 'text-gray-600' : 
                      step.status === 'active' ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    
                    {/* Show timestamp for completed steps */}
                    {step.status === 'completed' && (step.id === 'submitted' || step.id === 'response') && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.id === 'submitted' ? 
                          formatDateTime(report.reportDate || report.createdAt) :
                          formatDateTime(report.respondedAt || report.updatedAt)
                        }
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* University Response Section */}
          {report.universityResponse && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                University Response
              </h3>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-gray-900">{report.universityResponse}</p>
                {report.respondedAt && (
                  <p className="text-sm text-gray-500 mt-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Responded on: {formatDateTime(report.respondedAt)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          {report.status !== 'resolved' && report.status !== 'closed' && report.status !== 'rejected' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">What Happens Next?</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                {report.status === 'pending' && (
                  <>
                    <p>• The university will review your report within 48-72 hours</p>
                    <p>• You will be notified when the investigation begins</p>
                    <p>• All communication will be handled confidentially</p>
                  </>
                )}
                {(report.status === 'under_investigation' || report.status === 'investigating') && (
                  <>
                    <p>• The university is actively investigating your case</p>
                    <p>• You may be contacted for additional information</p>
                    <p>• Investigation typically takes 5-10 business days</p>
                    <p>• You will receive updates on the progress</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Emergency Hotline: <strong>119</strong></span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Crisis Support: <strong>1337</strong></span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-2 text-purple-500" />
                  <span>Counseling Services Available 24/7</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  <span>Your identity is protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            {report.status !== 'resolved' && report.status !== 'closed' && (
              <button
                onClick={() => {
                  // You can implement additional actions here
                  alert('If you need urgent assistance, please call the emergency hotline: 119');
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Need Urgent Help
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': 
      case 'under_investigation': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  //function formatDateTime(dateString) {
    //if (!dateString) return 'Not available';
    //try {
      //return new Date(dateString).toLocaleString('en-US', {
        //year: 'numeric',
        //month: 'short',
        //day: 'numeric',
        //hour: '2-digit',
        //minute: '2-digit'
      //});
    //} catch {
      //return 'Invalid date';
    //}
  //}
};

export default ReportProgressModal;