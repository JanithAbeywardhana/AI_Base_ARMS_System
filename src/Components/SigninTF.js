import React, { useState } from "react";
import { Shield, Eye, EyeOff, Mail, Lock, AlertTriangle, CheckCircle } from "lucide-react";

export default function SigninTF() {
  const [studentEmail, setStudentEmail] = React.useState('');
  const [studentPassword, setStudentPassword] = React.useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch("http://localhost:8080/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentEmail, studentPassword })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful!", data);
        
        localStorage.setItem("student", JSON.stringify(data.student));
        setIsSuccess(true);
        
        setTimeout(() => {
          window.location.href = "/ARMSStudentDashboard";
        }, 2000);
      } else {
        const errData = await response.json();
        setError(errData.message || "Login failed Try Again!");
      }
    } catch (err) {
      console.error("Error Logging in:", err);
      setError("Something went wrong please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Shield className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">ARMS</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Student Login
          </h2>
          <p className="text-gray-600">
            Access your secure student dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Success Message */}
            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-green-800 font-medium">Login successful!</p>
                  <p className="text-green-600 text-sm">Redirecting to dashboard...</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your student email"
                  required
                  disabled={isLoading || isSuccess}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading || isSuccess}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading || isSuccess}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || isSuccess || !studentEmail || !studentPassword}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Success!
                </>
              ) : (
                'SIGN IN'
              )}
            </button>

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition">
                Forgot your password?
              </a>
              <div className="text-sm text-gray-600">
                Need help? Contact{' '}
                <a href="#contact" className="text-blue-600 hover:text-blue-700 transition">
                  support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Secure Login</p>
              <p className="text-sm text-gray-600">
                Your login credentials are encrypted and protected. ARMS is committed to maintaining your privacy and security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}