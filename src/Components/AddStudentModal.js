// src/components/modals/AddStudentModal.js
import React from 'react';
import { X } from 'lucide-react';

const AddStudentModal = ({ isOpen, onClose, newStudent, setNewStudent, onSubmit, isSubmitting = false }) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleCancel = () => {
    onClose();
    setNewStudent({
      studentName: '',
      studentEmail: '',
      universityName: '',
      facultyName: '',
      universityStId: '',
      studentPassword: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-3xl mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Add New Student</h3>
          <button onClick={handleCancel}><X className="w-6 h-6 text-gray-600" /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name*</label>
              <input 
                type="text" 
                value={newStudent.studentName} 
                onChange={(e) => handleInputChange('studentName', e.target.value)} 
                className="w-full px-3 py-2 border rounded-lg" 
                required 
                disabled={isSubmitting} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input 
                type="email" 
                value={newStudent.studentEmail} 
                onChange={(e) => handleInputChange('studentEmail', e.target.value)} 
                className="w-full px-3 py-2 border rounded-lg" 
                required 
                disabled={isSubmitting} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <input 
                type="text" 
                value={newStudent.universityName} 
                onChange={(e) => handleInputChange('universityName', e.target.value)} 
                className="w-full px-3 py-2 border rounded-lg" 
                disabled={isSubmitting} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
              <input 
                type="text" 
                value={newStudent.facultyName} 
                onChange={(e) => handleInputChange('facultyName', e.target.value)} 
                className="w-full px-3 py-2 border rounded-lg" 
                disabled={isSubmitting} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input 
                type="text" 
                value={newStudent.universityStId} 
                onChange={(e) => handleInputChange('universityStId', e.target.value)} 
                className="w-full px-3 py-2 border rounded-lg" 
                disabled={isSubmitting} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
              <input 
                type="password" 
                value={newStudent.studentPassword} 
                onChange={(e) => handleInputChange('studentPassword', e.target.value)} 
                className="w-full px-3 py-2 border rounded-lg" 
                required 
                disabled={isSubmitting} 
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
