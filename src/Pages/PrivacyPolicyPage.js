import React, { useState } from 'react';
import { Shield, ArrowLeft, Lock, Eye, Database, Users, FileText, AlertTriangle, Menu, X, CheckCircle, Clock, UserCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dataTypes = [
    {
      title: "Personal Information",
      description: "Name, student ID, email, contact details (only when not reporting anonymously)",
      icon: <UserCheck className="w-6 h-6" />,
      retention: "Until case resolution + 7 years"
    },
    {
      title: "Incident Reports",
      description: "Details of ragging incidents, dates, locations, involved parties",
      icon: <FileText className="w-6 h-6" />,
      retention: "Permanently archived for research"
    },
    {
      title: "System Logs",
      description: "Login times, IP addresses, system usage patterns",
      icon: <Database className="w-6 h-6" />,
      retention: "90 days"
    },
    {
      title: "Communication Records",
      description: "Messages with support staff, counseling session notes",
      icon: <Users className="w-6 h-6" />,
      retention: "5 years from last contact"
    }
  ];

  const securityMeasures = [
    {
      title: "End-to-End Encryption",
      description: "All data is encrypted both in transit and at rest using AES-256 encryption standards"
    },
    {
      title: "Anonymous Reporting",
      description: "Option to report incidents completely anonymously without any identifying information"
    },
    {
      title: "Access Controls",
      description: "Strict role-based access controls ensuring only authorized personnel can view sensitive data"
    },
    {
      title: "Audit Trails",
      description: "Complete logging of all data access and modifications for accountability"
    },
    {
      title: "Secure Infrastructure",
      description: "Hosted on secure servers with regular security updates and monitoring"
    },
    {
      title: "Data Minimization",
      description: "We only collect and store data that is absolutely necessary for our services"
    }
  ];

  const userRights = [
    "Right to access your personal data",
    "Right to correct inaccurate information",
    "Right to request deletion of data (subject to legal requirements)",
    "Right to data portability",
    "Right to withdraw consent",
    "Right to file complaints with authorities"
  ];

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleReportIncident = () => {
    window.location.href = '/report';
  };

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
              <button 
                onClick={handleBackToHome} 
                className="text-gray-700 hover:text-blue-600 transition flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
              <a href="#data-collection" className="text-gray-700 hover:text-blue-600 transition">Data Collection</a>
              <a href="#security" className="text-gray-700 hover:text-blue-600 transition">Security</a>
              <a href="#rights" className="text-gray-700 hover:text-blue-600 transition">Your Rights</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <button 
                onClick={handleReportIncident}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Report Incident
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
              <button 
                onClick={handleBackToHome} 
                className="block px-3 py-2 text-gray-700 w-full text-left"
              >
                ← Back to Home
              </button>
              <a href="#data-collection" className="block px-3 py-2 text-gray-700">Data Collection</a>
              <a href="#security" className="block px-3 py-2 text-gray-700">Security</a>
              <a href="#rights" className="block px-3 py-2 text-gray-700">Your Rights</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block mb-6">
              <Lock className="w-4 h-4 inline mr-2" />
              Privacy & Data Protection
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6 inline-block mb-8">
              <p className="text-xl font-semibold text-gray-800">Anti-Ragging Management System (ARMS)</p>
              <p className="text-gray-600">Effective Date: January 1, 2024</p>
            </div>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your privacy and confidentiality are fundamental to ARMS. This policy explains how we collect, use, protect, and handle your information when you use our anti-ragging reporting and support system.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Commitment to Privacy
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                ARMS is designed with privacy-by-design principles to protect students reporting ragging incidents. We understand the sensitive nature of the information shared and have implemented the highest standards of data protection.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Privacy Principles:</h4>
                <ul className="text-blue-800 space-y-2">
                  <li>• Confidentiality is paramount in all operations</li>
                  <li>• Anonymous reporting options protect identity</li>
                  <li>• Data minimization - we only collect what's necessary</li>
                  <li>• Transparent communication about data usage</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy-First Design</h3>
                  <p className="text-gray-700 mb-6">
                    Every feature of ARMS is built with your privacy and safety in mind, ensuring complete confidentiality when reporting incidents.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">256-bit Encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Collection Section */}
      <section id="data-collection" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Information We Collect
            </h2>
            <p className="text-xl text-gray-600">
              We collect only the information necessary to provide our services and protect students
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {dataTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {type.retention}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-3">Anonymous Reporting Option</h3>
                <p className="text-yellow-800 mb-4">
                  ARMS provides a completely anonymous reporting option where no personal identifying information is collected. 
                  When using anonymous reporting, we only collect the incident details necessary to address the situation.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-700 font-medium">
                    Anonymous reports help us identify patterns and take preventive measures while protecting your identity completely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Data Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-xl text-gray-600">
              Your data is used solely to provide support, investigate incidents, and improve campus safety
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Incident Investigation</h3>
              <p className="text-gray-600">
                Process and investigate reported ragging incidents to ensure appropriate action is taken
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Support Services</h3>
              <p className="text-gray-600">
                Connect victims with counseling, legal aid, and other support services as needed
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pattern Analysis</h3>
              <p className="text-gray-600">
                Analyze trends and patterns to develop better prevention strategies and policies
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Legal Compliance</h3>
              <p className="text-gray-600">
                Maintain records as required by the Ragging Act 1998 and other applicable laws
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">System Improvement</h3>
              <p className="text-gray-600">
                Improve our platform's functionality and user experience based on usage patterns
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety Monitoring</h3>
              <p className="text-gray-600">
                Monitor campus safety levels and provide reports to relevant authorities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures Section */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Protect Your Data
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading security measures to safeguard your sensitive information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {securityMeasures.map((measure, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{measure.title}</h3>
                <p className="text-gray-600">{measure.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Security Certification</h3>
            <p className="text-lg mb-6 opacity-90">
              ARMS complies with international data protection standards and undergoes regular security audits to ensure the highest level of protection for your sensitive information.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <span className="font-semibold">ISO 27001</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <span className="font-semibold">GDPR Compliant</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <span className="font-semibold">SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Rights Section */}
      <section id="rights" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Privacy Rights
            </h2>
            <p className="text-xl text-gray-600">
              You have complete control over your personal information
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Rights Include:</h3>
              <div className="space-y-4">
                {userRights.map((right, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{right}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-2">How to Exercise Your Rights:</h4>
                <p className="text-blue-800 mb-4">
                  Contact our Data Protection Officer at privacy@arms.lk or through our secure contact form to exercise any of your privacy rights.
                </p>
                <p className="text-blue-700 text-sm">
                  Response time: We will respond to all requests within 30 days as required by law.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Our Privacy Team</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Data Protection Officer</h4>
                  <p className="text-gray-600">privacy@arms.lk</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Privacy Hotline</h4>
                  <p className="text-gray-600">+94 11 123 4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mailing Address</h4>
                  <p className="text-gray-600">
                    ARMS Privacy Office<br />
                    University Grants Commission<br />
                    No. 20, Ward Place<br />
                    Colombo 07, Sri Lanka
                  </p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-6">
                Submit Privacy Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Policy Updates
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
            We will notify you of any material changes through email or prominent notices on our platform.
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600">
              <strong>Last Updated:</strong> January 1, 2024<br />
              <strong>Next Review:</strong> January 1, 2025
            </p>
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
                Protecting student privacy while building safer universities through technology.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleBackToHome} className="hover:text-white transition">Home</button></li>
                <li><button onClick={handleReportIncident} className="hover:text-white transition">Report Incident</button></li>
                <li><a href="#data-collection" className="hover:text-white transition">Data Collection</a></li>
                <li><a href="#security" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Privacy</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#rights" className="hover:text-white transition">Your Rights</a></li>
                <li><a href="#" className="hover:text-white transition">Data Requests</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Help</a></li>
                <li><a href="#" className="hover:text-white transition">Contact DPO</a></li>
                <li><a href="#" className="hover:text-white transition">Report Privacy Issue</a></li>
                <li><a href="#" className="hover:text-white transition">Emergency: 119</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ARMS - Anti-Ragging Management System. All rights reserved.</p>
            <p className="mt-2">Committed to protecting student privacy and confidentiality.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;