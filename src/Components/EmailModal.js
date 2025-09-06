
import React from 'react';
import { Send } from 'lucide-react';


const EmailModal = ({ isOpen, onClose, universities, emailForm, setEmailForm, onSend, emailTemplates }) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setEmailForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRecipientChange = (selectedEmails) => {
    handleInputChange('recipients', selectedEmails);
  };

  const handleTemplateSelect = (template) => {
    setEmailForm(prev => ({
      ...prev,
      subject: template.subject,
      message: template.body,
      templateId: template.id
    }));
  };

  const handleSelectAll = () => {
    const allEmails = universities.map(uni => uni.email);
    handleRecipientChange(allEmails);
  };

  const handleClearAll = () => {
    handleRecipientChange([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Compose Email</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Email Form */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                <div className="flex space-x-2 mb-2">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    Clear All
                  </button>
                  <span className="text-xs text-gray-500">
                    {emailForm.recipients.length} selected
                  </span>
                </div>
                <div className="space-y-1">
                  {universities.map(uni => (
                    <label key={uni.id} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={emailForm.recipients.includes(uni.email)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleRecipientChange([...emailForm.recipients, uni.email]);
                          } else {
                            handleRecipientChange(emailForm.recipients.filter(email => email !== uni.email));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="truncate">{uni.name} ({uni.email})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select 
                value={emailForm.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input 
                type="text" 
                value={emailForm.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Email subject"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows="8" 
                value={emailForm.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
                required
              />
            </div>
          </div>

          {/* Right Column - Templates */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Quick Templates</h4>
            <div className="space-y-2">
              {emailTemplates.map(template => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleTemplateSelect(template)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900">{template.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{template.category}</div>
                </button>
              ))}
              
              {/* Default templates if no backend templates */}
              <button
                type="button"
                onClick={() => handleTemplateSelect({
                  subject: "URGENT: Emergency Safety Alert",
                  body: "This is an urgent safety alert regarding anti-ragging measures. Please take immediate action to ensure student safety.\n\nRegards,\nARMS Administration"
                })}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <div className="font-medium text-sm text-red-800">Emergency Alert</div>
                <div className="text-xs text-red-600 mt-1">Urgent safety notice</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleTemplateSelect({
                  subject: "Incident Investigation Update",
                  body: "We are writing to provide an update on the recent incident investigation.\n\n[Please provide specific details]\n\nWe expect your cooperation in this matter.\n\nRegards,\nARMS Administration"
                })}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <div className="font-medium text-sm text-orange-800">Investigation Update</div>
                <div className="text-xs text-orange-600 mt-1">Incident follow-up</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleTemplateSelect({
                  subject: "Anti-Ragging Policy Update",
                  body: "We are writing to inform you about updates to the anti-ragging policies and guidelines.\n\n[Policy details]\n\nPlease ensure compliance across all faculties.\n\nRegards,\nARMS Administration"
                })}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium text-sm text-blue-800">Policy Update</div>
                <div className="text-xs text-blue-600 mt-1">Guidelines notice</div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={onSend}
            disabled={emailForm.recipients.length === 0 || !emailForm.subject || !emailForm.message}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;