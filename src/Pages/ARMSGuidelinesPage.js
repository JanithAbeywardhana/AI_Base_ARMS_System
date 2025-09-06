import React, { useState, useEffect } from 'react';
import { Shield, Users, FileText, BarChart, Phone, Lock, Heart, ArrowRight, Menu, X, AlertTriangle, CheckCircle, Star, Bot, Book, ChevronDown, ChevronUp, Search } from 'lucide-react';

const ARMSGuidelinesPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedGuideline, setExpandedGuideline] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  // Navigation handler
  const handleNavigation = (path) => {
    // In a real app, you would use react-router-dom's navigate here
    console.log(`Navigating to: ${path}`);
    // For demo purposes, we'll just log the navigation
    if (path === '/') {
      window.location.href = '/'; // Or however you handle navigation
    }
  };

  // Fetch guidelines from backend
  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/guideline/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch guidelines');
        }
        const data = await response.json();
        // Filter active guidelines and sort by orderIndex
        const activeGuidelines = data
          .filter(guideline => guideline.active)
          .sort((a, b) => a.orderIndex - b.orderIndex);
        setGuidelines(activeGuidelines);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching guidelines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelines();
  }, []);

  // Filter guidelines based on search and type
  const filteredGuidelines = guidelines.filter(guideline => {
    const matchesSearch = guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guideline.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || guideline.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Get unique types from guidelines
  const availableTypes = ['ALL', ...new Set(guidelines.map(g => g.type))];

  const toggleGuideline = (id) => {
    setExpandedGuideline(expandedGuideline === id ? null : id);
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
                onClick={() => handleNavigation('/')} 
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </button>
              <a href="#guidelines" className="text-blue-600 font-semibold">Guidelines</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Report Incident
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Help
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
                onClick={() => handleNavigation('/')} 
                className="block px-3 py-2 text-gray-700 w-full text-left"
              >
                Home
              </button>
              <a href="#guidelines" className="block px-3 py-2 text-blue-600 font-semibold">Guidelines</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700">Contact</a>
              <div className="px-3 py-2 space-y-2">
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg">Report Incident</button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">Get Help</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block mb-6">
            <Book className="w-4 h-4 inline mr-2" />
            User Guidelines & Instructions
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ARMS <span className="text-blue-600">User Guidelines</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive guidelines to help you effectively use the Anti-Ragging Management System. 
            Learn how to report incidents, access support services, and navigate the platform safely.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search guidelines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'ALL' ? 'All Guidelines' : `${type} Guidelines`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredGuidelines.length} of {guidelines.length} guidelines
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading guidelines...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Guidelines</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
          ) : filteredGuidelines.length === 0 ? (
            <div className="text-center py-12">
              <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Guidelines Found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedType !== 'ALL' 
                  ? 'No guidelines match your current search or filter criteria.' 
                  : 'No guidelines are currently available.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGuidelines.map((guideline, index) => (
                <div key={guideline.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => toggleGuideline(guideline.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                            {guideline.type}
                          </div>
                          <span className="text-sm text-gray-500">
                            #{index + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {guideline.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">
                          {guideline.description.substring(0, 150)}
                          {guideline.description.length > 150 ? '...' : ''}
                        </p>
                      </div>
                      <div className="ml-4">
                        {expandedGuideline === guideline.id ? (
                          <ChevronUp className="w-6 h-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedGuideline === guideline.id && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Full Guidelines:</h4>
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {guideline.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Emergency Situations</h3>
                <p className="text-red-800 mb-4">
                  If you are in immediate danger or experiencing severe ragging, please contact emergency services immediately.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">Emergency: 119</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">Mental Health: 1337</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help Using ARMS?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is here to assist you with any questions about using the ARMS platform effectively and safely.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition">
              Report Incident Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">ARMS</span>
              </div>
              <p className="text-gray-400">
                Building safer universities through technology and compassion.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Report Incident</a></li>
                <li><a href="#" className="hover:text-white transition">Get Support</a></li>
                <li><a href="#" className="hover:text-white transition">Resources</a></li>
                <li><a href="#" className="hover:text-white transition">Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Framework</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Ragging Act 1998</a></li>
                <li><a href="#" className="hover:text-white transition">UGC Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <span className="text-gray-400">119 (Emergency)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">1337 (Mental Health)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ARMS - Anti-Ragging Management System. All rights reserved.</p>
            <p className="mt-2">Developed with ❤️ for student safety in Sri Lankan universities.</p>
          </div>
        </div>
      </footer>

      {/* AI Chat Component - Mock component for demo */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-6">
          <div className="bg-white rounded-lg shadow-xl w-96 h-96 flex flex-col">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <span className="font-semibold">AI Support Chat</span>
              <button 
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-blue-700 rounded p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-gray-500">
              AI Chat Support Component
            </div>
          </div>
        </div>
      )}
      
      {/* Floating AI Support Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-4 shadow-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 z-50 animate-pulse"
          title="Get AI Support"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ARMSGuidelinesPage;