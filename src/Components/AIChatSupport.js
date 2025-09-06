import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Heart, Shield } from 'lucide-react';

const AIChatSupport = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi there! I'm here to provide support and guidance. Whether you're experiencing ragging, need someone to talk to, or want information about your rights, I'm here to help. Everything you share is confidential. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: sessionId
        })
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.response || "I'm here to help. Could you tell me more about what you're going through?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: "I'm sorry, I'm having technical difficulties right now. Please reach out to university counseling services or call emergency services (119) if you need immediate help.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Support Assistant</h3>
              <p className="text-xs opacity-90">Confidential & Safe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`rounded-full p-2 ${message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                  {message.type === 'user' ? 
                    <User className="w-4 h-4 text-white" /> : 
                    <Bot className="w-4 h-4 text-white" />
                  }
                </div>
                <div className={`rounded-2xl p-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white border shadow-sm'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="bg-purple-500 rounded-full p-2">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border rounded-2xl p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-white p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... I'm here to help."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '100px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-3 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setInputMessage("I'm experiencing ragging and don't know what to do")}
              className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors"
            >
              Experiencing Ragging
            </button>
            <button
              onClick={() => setInputMessage("I need emotional support")}
              className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              Need Support
            </button>
            <button
              onClick={() => setInputMessage("What are my rights as a student?")}
              className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
            >
              Know My Rights
            </button>
          </div>

          {/* Emergency Notice */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              <Heart className="w-3 h-3 inline mr-1" />
              Emergency? Call 119 • University Counseling Available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatSupport;