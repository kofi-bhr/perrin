"use client";

import React, { useState } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiShield, FiLock } from 'react-icons/fi';

export default function ResearchRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    organizationType: '',
    organizationCode: '',
    position: '',
    clearanceLevel: '',
    researchCategory: '',
    specificTopic: '',
    justification: '',
    needToKnow: '',
    supervisor: '',
    supervisorEmail: '',
    supervisorPhone: '',
    projectDuration: '',
    digitalSignature: '',
    backgroundCheckConsent: false,
    informationAccuracy: false,
    handlingAgreement: false
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Enhanced validation
    if (!formData.organizationType || !formData.organization) {
      setFormError('Organizational affiliation is required for early access to Perrin Center research.');
      return;
    }
    
    if (!formData.informationAccuracy || !formData.handlingAgreement) {
      setFormError('All required certifications must be acknowledged before submission.');
      return;
    }
    
    if (!formData.digitalSignature || formData.digitalSignature.toLowerCase() !== formData.name.toLowerCase()) {
      setFormError('Digital signature must match your full name exactly.');
      return;
    }
    
    console.log("Research access request submitted:", formData);
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      organization: '',
      organizationType: '',
      organizationCode: '',
      position: '',
      clearanceLevel: '',
      researchCategory: '',
      specificTopic: '',
      justification: '',
      needToKnow: '',
      supervisor: '',
      supervisorEmail: '',
      supervisorPhone: '',
      projectDuration: '',
      digitalSignature: '',
      backgroundCheckConsent: false,
      informationAccuracy: false,
      handlingAgreement: false
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Official Header */}
        <div className="bg-white border-l-4 border-blue-600 shadow-sm mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <FiShield className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-bold text-blue-600">PRE-PUBLICATION POLICY RESEARCH</span>
                </div>
                <h1 className="text-lg font-bold text-gray-900">FORM PI-2024-001</h1>
                <p className="text-sm text-gray-600">REQUEST FOR EARLY ACCESS TO PERRIN CENTER RESEARCH</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>Expires: 12/31/2024</p>
                <p>OMB Control No. 1024-0018</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <FiAlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-blue-800 mb-2">NOTICE</h3>
              <p className="text-sm text-blue-700 mb-2">
                This form requests early access to Perrin Center policy research prior to Federal Register posting. 
                Information provided will be used for verification purposes and must be accurate and complete.
              </p>
              <p className="text-xs text-blue-600 font-medium">
                Providing false information may result in denial of access and potential administrative action.
              </p>
            </div>
          </div>
        </div>

        
        
        {/* Confirmation Message */}
        {formSubmitted && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <FiCheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-800">Request Submitted Successfully</h3>
                <p className="text-green-700 mt-1">
                  Your early access request has been assigned tracking number <strong>PI-{Date.now().toString().slice(-6)}</strong>. 
                  The Perrin Center team will review your request and contact you within 48-72 hours. 
                  Please retain this number for your records.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">EARLY ACCESS REQUEST - PERRIN CENTER RESEARCH</h2>
            <p className="text-sm text-gray-600 mt-1">
              Complete all sections. Fields marked with <span className="text-red-600">*</span> are required. 
              Incomplete forms may be returned for additional information.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <FiAlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-red-700 text-sm font-medium">{formError}</span>
                </div>
              </div>
            )}

            {/* Section 1: Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-md font-bold text-gray-900 mb-4 bg-gray-100 px-3 py-2">
                SECTION 1: PERSONAL INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="First Last"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Official Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="firstname.lastname@agency.gov"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position/Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Clearance Level (if applicable)
                  </label>
                  <select
                    name="clearanceLevel"
                    value={formData.clearanceLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select if applicable</option>
                    <option value="public-trust">Public Trust</option>
                    <option value="secret">Secret</option>
                    <option value="top-secret">Top Secret</option>
                    <option value="sci">Top Secret/SCI</option>
                    <option value="none">No Current Clearance</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Section 2: Organizational Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-md font-bold text-gray-900 mb-4 bg-gray-100 px-3 py-2">
                SECTION 2: ORGANIZATIONAL INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Organization Type</option>
                    <option value="federal">Federal Agency</option>
                    <option value="congressional">Congressional Office</option>
                    <option value="judicial">Federal Judicial Branch</option>
                    <option value="state">State Government</option>
                    <option value="local">Local Government</option>
                    <option value="academic">Academic Institution</option>
                    <option value="research">Research Institution</option>
                    <option value="contractor">Government Contractor</option>
                    <option value="nonprofit">Non-Profit Organization</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Code (if applicable)
                  </label>
                  <input
                    type="text"
                    name="organizationCode"
                    value={formData.organizationCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="CAGE Code or Department Code"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anticipated Review Period <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="projectDuration"
                    value={formData.projectDuration}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Review Period</option>
                    <option value="7-days">7 Days</option>
                    <option value="14-days">14 Days</option>
                    <option value="30-days">30 Days</option>
                    <option value="60-days">60 Days</option>
                    <option value="90-days">90 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Supervisory Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-md font-bold text-gray-900 mb-4 bg-gray-100 px-3 py-2">
                SECTION 3: SUPERVISORY INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supervisor/Manager Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supervisor Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="supervisorEmail"
                    value={formData.supervisorEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supervisor Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="supervisorPhone"
                    value={formData.supervisorPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
            
            {/* Section 4: Research Request */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-md font-bold text-gray-900 mb-4 bg-gray-100 px-3 py-2">
                SECTION 4: RESEARCH REQUEST DETAILS
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Research Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="researchCategory"
                    value={formData.researchCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Research Category</option>
                    <option value="education-policy">Education Policy & Reform</option>
                    <option value="healthcare-policy">Healthcare Policy & Access</option>
                    <option value="technology-governance">Technology Governance & AI Ethics</option>
                    <option value="economic-policy">Economic Policy & Trade</option>
                    <option value="environmental-policy">Environmental Policy & Sustainability</option>
                    <option value="social-policy">Social Policy & Justice</option>
                    <option value="regulatory-reform">Regulatory Reform & Compliance</option>
                    <option value="multiple">Multiple Categories</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Research Topic/Keywords
                  </label>
                  <input
                    type="text"
                    name="specificTopic"
                    value={formData.specificTopic}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., AI governance, cybersecurity frameworks, trade policy"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Intended Use of Research <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="justification"
                    value={formData.justification}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe how you plan to use the Perrin Center research and how it will support your agency's policy development or decision-making processes."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Early Access Justification <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="needToKnow"
                    value={formData.needToKnow}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Explain why you need early access to this research before Federal Register posting and how it relates to your official duties or time-sensitive policy decisions."
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Certifications */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-md font-bold text-gray-900 mb-4 bg-gray-100 px-3 py-2">
                SECTION 5: REQUIRED CERTIFICATIONS
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="informationAccuracy"
                    checked={formData.informationAccuracy}
                    onChange={handleChange}
                    required
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    <span className="font-medium">Information Accuracy:</span> I certify that all information provided in this request is true, 
                    complete, and accurate to the best of my knowledge.
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="handlingAgreement"
                    checked={formData.handlingAgreement}
                    onChange={handleChange}
                    required
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    <span className="font-medium">Handling Agreement:</span> I understand that any pre-publication research materials accessed will be used 
                    solely for the stated purpose, treated as confidential until Federal Register posting, and handled in accordance with applicable policies and regulations.
                  </label>
                </div>
                
                {formData.organizationType === 'federal' && (
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="backgroundCheckConsent"
                      checked={formData.backgroundCheckConsent}
                      onChange={handleChange}
                      className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700">
                      <span className="font-medium">Background Check Consent:</span> I consent to verification of my identity and 
                      organizational affiliation as needed for this request.
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Section 6: Digital Signature */}
            <div className="pb-6">
              <h3 className="text-md font-bold text-gray-900 mb-4 bg-gray-100 px-3 py-2">
                SECTION 6: DIGITAL SIGNATURE
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <div className="flex items-center">
                  <FiLock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">
                    By typing your full name below, you are providing a digital signature for this request.
                  </span>
                </div>
              </div>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Digital Signature <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="digitalSignature"
                  value={formData.digitalSignature}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your full name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must match the name entered in Section 1
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Request
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Processing time: 2-3 business days for initial review.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 