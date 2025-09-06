import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, FileText, BarChart, Phone, Lock, Heart, ArrowRight, Menu, X, AlertTriangle, CheckCircle, Star, Bot } from 'lucide-react';
import AIChatSupport from '../Components/AIChatSupport'

const ARMSLandingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();
  const stats = [
    { number: "72%", label: "Medical students experience ragging", color: "text-red-500" },
    { number: "50%", label: "Technology students face harassment", color: "text-orange-500" },
    { number: "51%", label: "Students report verbal harassment", color: "text-yellow-500" },
    { number: "0%", label: "Is our target - Zero tolerance", color: "text-green-500" }
  ];

  const features = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Confidential Reporting",
      description: "Anonymous incident reporting with end-to-end encryption to protect victim identity"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Advanced data visualization to identify patterns and prevent future incidents"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Support System",
      description: "Immediate connection to counselors and support services for affected students"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Case Management",
      description: "Streamlined tracking and resolution of reported incidents with full documentation"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Samantha Perera",
      role: "University Psychology Counselor",
      content: "ARMS provides the safe space students need to report incidents without fear of retaliation.",
      rating: 5
    },
    {
      name: "Prof. Nuwan Silva",
      role: "Faculty Administrator",
      content: "The analytics dashboard helps us identify problem areas and take proactive measures.",
      rating: 5
    },
    {
      name: "Anonymous Student",
      role: "Ragging Survivor",
      content: "I finally found the courage to report through ARMS. The support I received was life-changing.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#statistics" className="text-gray-700 hover:text-blue-600 transition">Impact</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
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
              <a href="#features" className="block px-3 py-2 text-gray-700">Features</a>
              <a href="#statistics" className="block px-3 py-2 text-gray-700">Impact</a>
              <a href="#about" className="block px-3 py-2 text-gray-700">About</a>
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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full inline-block mb-6">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Zero Tolerance for Ragging
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Breaking the Silence,<br />
                <span className="text-blue-600">Protecting Students</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                ARMS is a comprehensive technology-driven platform designed to prevent, report, and respond to ragging incidents in Sri Lankan universities. Together, we can create a safer academic environment for all students.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                onClick={() => navigate('/report')}
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition flex items-center justify-center" >
                  Report Anonymously
                  <Shield className="w-5 h-5 ml-2" />
                </button>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center" >
                 
                  Get Support Now
                  <Heart className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Current Crisis</h3>
                  <p className="text-gray-600">Real data from Sri Lankan universities</p>
                </div>
                
                <div className="text-center">
                  <div className={`text-6xl font-bold ${stats[currentStat].color} mb-2`}>
                    {stats[currentStat].number}
                  </div>
                  <p className="text-gray-700 text-lg">{stats[currentStat].label}</p>
                </div>

                <div className="flex justify-center mt-6 space-x-2">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition ${
                        index === currentStat ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Protection System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ARMS combines cutting-edge technology with compassionate support to create a robust defense against ragging in universities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Urgent Need for Action
            </h2>
            <p className="text-xl text-gray-600">
              These statistics from recent studies highlight why ARMS is critical for student safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-red-600 mb-2">72%</div>
              <p className="text-gray-700">Medical students experience ragging</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">51%</div>
              <p className="text-gray-700">Students face verbal harassment</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-yellow-600 mb-2">34%</div>
              <p className="text-gray-700">Experience psychological violence</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">24%</div>
              <p className="text-gray-700">Suffer physical abuse</p>
            </div>
          </div>

          <div className="mt-12 bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Together, We Can Change These Numbers</h3>
            <p className="text-lg mb-6">
              With ARMS, we're building a future where every student can pursue education safely and confidently.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Join the Movement
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Voices of Change
            </h2>
            <p className="text-xl text-gray-600">
              Hear from those who are making a difference with ARMS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About ARMS
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The Anti-Ragging Management System (ARMS) is developed in response to the persistent issue of ragging in Sri Lankan universities. Despite the Prohibition of Ragging Act (No. 20 of 1998) and various institutional measures, ragging continues to harm students across campuses.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                ARMS bridges the gap between legal frameworks and practical implementation by providing a technology-driven solution that ensures confidential reporting, real-time monitoring, comprehensive data analytics, and immediate support services.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Compliant with Sri Lankan anti-ragging legislation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">End-to-end encrypted reporting system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">24/7 support and counseling services</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="/api/placeholder/500/400" 
                alt="Students in a safe university environment" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're a student, administrator, or supporter, ARMS provides the tools and support to create a ragging-free educational environment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
              Access ARMS Portal
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Request Demo
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
                <li><a href="" className="hover:text-white transition" onClick={() => navigate('/ARMSGuidelinesPage')}>Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Framework</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/RaggingAct1998Page" className="hover:text-white transition">Ragging Act 1998</a></li>
                <li><a href="#" className="hover:text-white transition">UGC Guidelines</a></li>
                <li><a href="/PrivacyPolicyPage" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/TermsOfServicePage" className="hover:text-white transition">Terms of Service</a></li>
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

            {/* AI Chat Component */}
      <AIChatSupport 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
      />
      
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

export default ARMSLandingPage;