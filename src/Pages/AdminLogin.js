import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with your Spring Boot endpoint
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Login successful! Redirecting...');
        // Handle successful login - redirect to admin dashboard
        setTimeout(() => {
          // Replace with your routing logic
          window.location.href = '/ARMSAdminDahboard';
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ARMS Admin Portal
          </h1>
          <p className="text-gray-600">
            Secure access to the Anti-Ragging Management System
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Status Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Access Admin Portal
                </>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-700">
                  <p className="font-medium mb-1">Security Notice</p>
                  <p>This is a secure administrative area. All activities are logged and monitored. Unauthorized access attempts will be reported.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-500">
            Need help? Contact your system administrator
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-blue-600 hover:text-blue-700 transition">
              Forgot Password?
            </a>
            <span className="text-gray-300">|</span>
            <a href="/" className="text-blue-600 hover:text-blue-700 transition">
              Back to ARMS
            </a>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700 font-medium mb-2">Emergency Access</p>
            <p className="text-xs text-red-600">
              For urgent incidents or system emergencies, call: <strong>119</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;