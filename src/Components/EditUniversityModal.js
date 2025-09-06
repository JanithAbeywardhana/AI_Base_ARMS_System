// src/components/modals/EditUniversityModal.js
import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';

const EditUniversityModal = ({ 
  isOpen, 
  onClose, 
  university,
  onUpdate,
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  // Populate form with university data when modal opens
  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name || '',
        email: university.email || '',
        phoneNumber: university.phoneNumber || '',
        website: university.website || '',
        chancellorName: university.chancellorName || '',
        viceChancellorName: university.viceChancellorName || '',
        numberOfStudents: university.numberOfStudents || 0,
        numberOfFaculties: university.numberOfFaculties || 0,
        active: university.active !== undefined ? university.active : true,
        address: university.address || '',
        city: university.city || '',
        registrationNumber: university.registrationNumber || '',
        logoUrl: university.logoUrl || ''
      });
    }
  }, [university]);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...university,
      ...formData
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form to original values
    if (university) {
      setFormData({
        name: university.name || '',
        email: university.email || '',
        phoneNumber: university.phoneNumber || '',
        website: university.website || '',
        chancellorName: university.chancellorName || '',
        viceChancellorName: university.viceChancellorName || '',
        numberOfStudents: university.numberOfStudents || 0,
        numberOfFaculties: university.numberOfFaculties || 0,
        active: university.active !== undefined ? university.active : true,
        address: university.address || '',
        city: university.city || '',
        registrationNumber: university.registrationNumber || '',
        logoUrl: university.logoUrl || ''
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
        <div className="flex items-center mb-6">
          <Edit className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Edit University</h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input 
                  type="url" 
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chancellor Name</label>
                <input 
                  type="text" 
                  value={formData.chancellorName}
                  onChange={(e) => handleInputChange('chancellorName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vice Chancellor Name</label>
                <input 
                  type="text" 
                  value={formData.viceChancellorName}
                  onChange={(e) => handleInputChange('viceChancellorName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students</label>
                <input 
                  type="number" 
                  value={formData.numberOfStudents}
                  onChange={(e) => handleInputChange('numberOfStudents', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Faculties</label>
                <input 
                  type="number" 
                  value={formData.numberOfFaculties}
                  onChange={(e) => handleInputChange('numberOfFaculties', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                <input 
                  type="text" 
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                <input 
                  type="url" 
                  value={formData.logoUrl}
                  onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  value={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.value === 'true')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button 
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                'Update University'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUniversityModal;