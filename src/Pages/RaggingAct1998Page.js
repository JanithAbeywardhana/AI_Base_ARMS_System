import React, { useState } from 'react';
import { Shield, ArrowLeft, Scale, AlertTriangle, FileText, Users, Gavel, BookOpen, Menu, X, ExternalLink } from 'lucide-react';

const RaggingAct1998Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    {
      title: "Definition of Ragging",
      content: "Any conduct by any student or students whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student, or indulging in rowdy or undisciplined activities by any student or students which causes or is likely to cause annoyance, hardship or psychological harm or to raise fear or apprehension thereof in any fresher or any other student or asking any student to do any act which such student will not in the ordinary course do and which has the effect of causing or generating a sense of shame, or torment or embarrassment so as to adversely affect the physique or psyche of such fresher or any other student.",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      title: "Prohibition",
      content: "No person shall engage in ragging within or outside any educational institution and any person who contravenes the provisions of this section shall be guilty of an offence under this Act.",
      icon: <Scale className="w-6 h-6" />
    },
    {
      title: "Penalties",
      content: "Any person who is convicted of an offence of ragging shall be liable to imprisonment of either description for a term which may extend to two years or to a fine not exceeding ten thousand rupees or to both such imprisonment and fine.",
      icon: <Gavel className="w-6 h-6" />
    },
    {
      title: "Institutional Responsibility",
      content: "The head of every educational institution shall take adequate steps to prevent ragging and shall be responsible for the maintenance of discipline in such institution.",
      icon: <Users className="w-6 h-6" />
    }
  ];

  const keyProvisions = [
    "Ragging is completely prohibited in all forms",
    "Both physical and psychological harassment are covered",
    "Applies to all educational institutions in Sri Lanka",
    "Institutional heads are legally responsible",
    "Severe penalties including imprisonment",
    "Protection for victims and witnesses"
  ];

  const handleBackToHome = () => {
    // This will be connected to your routing system
    window.location.href = '/';
  };

  const handleReportIncident = () => {
    // This will be connected to your reporting page
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
              <a href="#overview" className="text-gray-700 hover:text-blue-600 transition">Overview</a>
              <a href="#provisions" className="text-gray-700 hover:text-blue-600 transition">Key Provisions</a>
              <a href="#implementation" className="text-gray-700 hover:text-blue-600 transition">Implementation</a>
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
              <a href="#overview" className="block px-3 py-2 text-gray-700">Overview</a>
              <a href="#provisions" className="block px-3 py-2 text-gray-700">Key Provisions</a>
              <a href="#implementation" className="block px-3 py-2 text-gray-700">Implementation</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block mb-6">
              <Scale className="w-4 h-4 inline mr-2" />
              Legal Framework
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Prohibition of Ragging and<br />
              <span className="text-blue-600">Other Forms of Violence</span><br />
              <span className="text-gray-700 text-2xl md:text-3xl">in Educational Institutions Act</span>
            </h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6 inline-block mb-8">
              <p className="text-xl font-semibold text-gray-800">Act No. 20 of 1998</p>
              <p className="text-gray-600">Enacted by the Parliament of Sri Lanka</p>
            </div>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              This comprehensive legislation establishes the legal foundation for eliminating ragging in educational institutions across Sri Lanka, providing clear definitions, strict penalties, and institutional responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Legislative Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Prohibition of Ragging Act 1998 was enacted in response to growing concerns about ragging incidents in Sri Lankan educational institutions, establishing a comprehensive legal framework for prevention and punishment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Background & Purpose</h3>
              <p className="text-lg text-gray-700 mb-6">
                The Act was introduced following numerous incidents of ragging that resulted in physical and psychological harm to students. It aims to create a safe educational environment free from all forms of harassment and violence.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Key Objectives:</h4>
                <ul className="text-blue-800 space-y-2">
                  <li>• Completely prohibit ragging in all educational institutions</li>
                  <li>• Establish clear legal consequences for offenders</li>
                  <li>• Mandate institutional responsibility for prevention</li>
                  <li>• Protect students from physical and psychological harm</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="bg-gray-50 rounded-xl p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Act Details</h4>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Act Number:</span>
                    <span className="text-gray-900">No. 20 of 1998</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Date of Assent:</span>
                    <span className="text-gray-900">October 13, 1998</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Gazetted:</span>
                    <span className="text-gray-900">October 16, 1998</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Provisions Section */}
      <section id="provisions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Provisions of the Act
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the core elements of Sri Lanka's anti-ragging legislation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Key Provisions at a Glance
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyProvisions.map((provision, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{provision}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section id="implementation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Implementation & Enforcement
            </h2>
            <p className="text-xl text-gray-600">
              How the Act is enforced and implemented across educational institutions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reporting Mechanism</h3>
              <p className="text-gray-600">
                Clear procedures for reporting ragging incidents with protection for victims and witnesses
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Institutional Committees</h3>
              <p className="text-gray-600">
                Mandatory anti-ragging committees in every educational institution for monitoring and prevention
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Legal Proceedings</h3>
              <p className="text-gray-600">
                Swift legal action against offenders with support from law enforcement agencies
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">How ARMS Supports the Act</h3>
                <p className="text-lg mb-6 opacity-90">
                  The Anti-Ragging Management System (ARMS) is designed to facilitate the effective implementation of the Ragging Act 1998 by providing digital tools for reporting, monitoring, and responding to incidents.
                </p>
                <ul className="space-y-2 opacity-90">
                  <li>• Confidential online reporting system</li>
                  <li>• Real-time incident tracking and management</li>
                  <li>• Data analytics for prevention strategies</li>
                  <li>• Integration with institutional committees</li>
                </ul>
              </div>
              <div className="text-center">
                <button 
                  onClick={handleBackToHome}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-flex items-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Learn About ARMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-gray-600">
              Access official documents and related legal information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Act Text</h3>
              <p className="text-gray-600 mb-4">Access the complete text of Act No. 20 of 1998</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                View Document <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">UGC Guidelines</h3>
              <p className="text-gray-600 mb-4">University Grants Commission implementation guidelines</p>
              <button className="text-green-600 hover:text-green-800 font-medium inline-flex items-center">
                View Guidelines <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Precedents</h3>
              <p className="text-gray-600 mb-4">Court cases and legal interpretations of the Act</p>
              <button className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center">
                View Cases <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </div>
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
                Supporting the implementation of Sri Lanka's anti-ragging legislation through technology.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleBackToHome} className="hover:text-white transition">Home</button></li>
                <li><button onClick={handleReportIncident} className="hover:text-white transition">Report Incident</button></li>
                <li><a href="#overview" className="hover:text-white transition">Act Overview</a></li>
                <li><a href="#provisions" className="hover:text-white transition">Key Provisions</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Full Act Text</a></li>
                <li><a href="#" className="hover:text-white transition">UGC Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Legal Precedents</a></li>
                <li><a href="#" className="hover:text-white transition">Related Legislation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Emergency: 119</a></li>
                <li><a href="#" className="hover:text-white transition">Mental Health: 1337</a></li>
                <li><a href="#" className="hover:text-white transition">Legal Aid</a></li>
                <li><a href="#" className="hover:text-white transition">Counseling Services</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ARMS - Anti-Ragging Management System. All rights reserved.</p>
            <p className="mt-2">Supporting the implementation of Act No. 20 of 1998.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RaggingAct1998Page;