// Add this script tag to your public/index.html:
// <script src="https://accounts.google.com/gsi/client" async defer></script>

import React, { useState, useEffect } from "react";
import { User, Mail, University, GraduationCap, Hash, Lock, AlertCircle, CheckCircle } from "lucide-react";

// Google SVG Icon component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function SignupTF() {
    const [formData, setFormData] = useState({
        studentName: '',
        studentEmail: '',
        universityName: '',
        facultyName: '',
        universityStId: '',
        studentPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [googleReady, setGoogleReady] = useState(false);

    useEffect(() => {
        // Load Google Identity Services
        const initializeGoogle = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: '125500902331-j3qeee0proe6n1amamb7qaqaasikteec.apps.googleusercontent.com',
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: false,
                });
                setGoogleReady(true);
                console.log('Google Identity Services initialized');
            } else {
                // Wait for script to load
                setTimeout(initializeGoogle, 100);
            }
        };

        initializeGoogle();
    }, []);

    useEffect(() => {
        // Check password match
        if (formData.confirmPassword) {
            setPasswordMatch(formData.studentPassword === formData.confirmPassword);
        }
    }, [formData.studentPassword, formData.confirmPassword]);

    const handleGoogleResponse = async (response) => {
        setGoogleLoading(true);
        setError('');

        try {
            console.log('Google credential received');
            
            // Decode the JWT to get user info
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            const email = payload.email;
            
            console.log('Checking if email exists:', email);

            // Check if email already exists
            const checkResponse = await fetch(`http://localhost:8080/auth/check-email/${encodeURIComponent(email)}`);
            if (!checkResponse.ok) {
                throw new Error('Failed to check email existence');
            }
            
            const checkData = await checkResponse.json();
            
            if (checkData.exists) {
                setError("An account with this email already exists. Please sign in instead.");
                return;
            }

            console.log('Email does not exist, proceeding with Google auth...');

            // Send credential to backend
            const backendResponse = await fetch("http://localhost:8080/auth/google", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ idToken: response.credential })
            });

            const data = await backendResponse.json();
            console.log('Backend response:', data);

            if (backendResponse.ok) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("authProvider", "GOOGLE");
                setSuccess("Google registration successful! Redirecting...");
                
                setTimeout(() => {
                    window.location.href = '/complete-profile';
                }, 1500);
            } else {
                setError(data.message || "Google registration failed");
            }
        } catch (err) {
            console.error("Google Sign-Up Error:", err);
            setError(`Google sign-up failed: ${err.message}`);
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.studentName.trim()) return 'Student name is required';
        if (!formData.studentEmail.trim()) return 'Email is required';
        if (!formData.studentEmail.includes('@')) return 'Please enter a valid email';
        if (!formData.universityName.trim()) return 'University name is required';
        if (!formData.facultyName.trim()) return 'Faculty name is required';
        if (!formData.universityStId.trim()) return 'University student ID is required';
        if (!formData.studentPassword) return 'Password is required';
        if (formData.studentPassword.length < 6) return 'Password must be at least 6 characters';
        if (!passwordMatch) return 'Passwords do not match';
        return null;
    };

    const handleTraditionalSignup = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch("http://localhost:8080/student/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentName: formData.studentName,
                    studentEmail: formData.studentEmail,
                    universityName: formData.universityName,
                    facultyName: formData.facultyName,
                    universityStId: formData.universityStId,
                    studentPassword: formData.studentPassword
                })
            });

            if (response.ok) {
                setSuccess("Registration successful! Please sign in with your credentials.");
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        if (!googleReady) {
            setError("Google authentication is not ready. Please try again in a moment.");
            return;
        }

        setGoogleLoading(true);
        setError('');

        try {
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    // Fallback to popup if prompt doesn't show
                    window.google.accounts.id.renderButton(
                        document.getElementById('google-signin-button'),
                        { 
                            theme: 'outline', 
                            size: 'large',
                            width: '100%',
                            text: 'signup_with'
                        }
                    );
}
                    setGoogleLoading(false);
                }
            );
        } catch (err) {
            console.error("Google Sign-Up Error:", err);
            setError("Google sign-up failed. Please try again or use email signup.");
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Join ARMS</h1>
                    <p className="text-gray-600">Create your account to get started</p>
                </div>

                {/* Google Sign-Up Button */}
                <div className="mb-6">
                    <button
                        onClick={handleGoogleSignup}
                        disabled={googleLoading || loading || !googleReady}
                        className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {googleLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                        ) : (
                            <GoogleIcon />
                        )}
                        <span className="text-gray-700 font-medium">
                            {googleLoading ? 'Creating account...' : 
                             !googleReady ? 'Loading Google...' : 
                             'Sign up with Google'}
                        </span>
                    </button>
                    
                    {/* Hidden div for Google button fallback */}
                    <div id="google-signin-button" className="mt-2" style={{display: 'none'}}></div>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-700 text-sm">{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-700 text-sm">{error}</span>
                    </div>
                )}

                {/* Traditional Signup Form */}
                <form onSubmit={handleTraditionalSignup} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.studentName}
                                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                                    disabled={loading || googleLoading}
                                    placeholder="Enter your full name"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={formData.studentEmail}
                                    onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                                    disabled={loading || googleLoading}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
                            <div className="relative">
                                <University className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.universityName}
                                    onChange={(e) => handleInputChange('universityName', e.target.value)}
                                    disabled={loading || googleLoading}
                                    placeholder="Enter your university"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.facultyName}
                                    onChange={(e) => handleInputChange('facultyName', e.target.value)}
                                    disabled={loading || googleLoading}
                                    placeholder="Enter your faculty"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">University Student ID</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.universityStId}
                                    onChange={(e) => handleInputChange('universityStId', e.target.value)}
                                    disabled={loading || googleLoading}
                                    placeholder="Enter your student ID"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    value={formData.studentPassword}
                                    onChange={(e) => handleInputChange('studentPassword', e.target.value)}
                                    disabled={loading || googleLoading}
                                    placeholder="Create a password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    disabled={loading || googleLoading}
                                    placeholder="Confirm your password"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 ${
                                        !passwordMatch && formData.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {!passwordMatch && formData.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || googleLoading || !passwordMatch}
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <button
                            onClick={() => window.location.href = '/signin'}
                            className="text-purple-600 hover:text-purple-500 font-medium"
                        >
                            Sign in here
                        </button>
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to ARMS Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )

}