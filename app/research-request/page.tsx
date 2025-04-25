"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUpload, FiLock, FiCheck, FiFileText, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import Link from 'next/link';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function ResearchRequestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    researchLab: '',
    purpose: '',
    specificPapers: '',
    additionalInfo: '',
    agreeToTerms: false
  });
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      
      // For demo purposes, show success 90% of the time
      if (Math.random() > 0.1) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(true);
      }
    }, 2000);
  };
  
  // List of labs for the dropdown
  const researchLabs = [
    { id: "ai-governance", name: "AI Governance Lab" },
    { id: "inclusive-policy", name: "Inclusive Policy Lab" },
    { id: "climate-technology", name: "Climate Technology Lab" },
    { id: "deliberative-democracy", name: "Deliberative Democracy Lab" },
    { id: "special-projects", name: "Special Projects Lab" },
    { id: "foreign-affairs", name: "Foreign Affairs Lab" },
    { id: "economic-policy", name: "Economic Policy Lab" },
    { id: "legal-research", name: "Legal Research Lab" },
    { id: "policy-entrepreneurship", name: "Policy Entrepreneurship Lab" }
  ];
  
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl p-10 shadow-xl border border-gray-800/40 text-center"
          >
            <motion.div 
              variants={itemVariants} 
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30"
            >
              <FiCheck className="text-green-400 text-4xl" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-6">
              Request Submitted Successfully
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto">
              Thank you for your interest in our research. Your request has been received and assigned reference number <span className="text-blue-400 font-mono">REQ-{Math.floor(Math.random() * 90000) + 10000}</span>.
              A member of our team will review your request and contact you within 5-7 business days.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/Labs" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                <FiArrowLeft className="mr-2" /> Return to Labs
              </Link>
              
              <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-black/40 hover:bg-black/60 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10 text-center"
              >
                Return to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Header section */}
        <motion.div variants={itemVariants} className="mb-12">
          <Link href="/Labs" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group">
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to Research Labs</span>
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Research Request Portal</h1>
          <div className="h-1 w-24 bg-blue-500 mb-8 rounded-full"></div>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Submit a formal request to access research papers, data, and other materials from the Perrin Institute's labs. 
            All requests are reviewed by our research team.
          </p>
        </motion.div>
        
        {/* Info panel */}
        <motion.div 
          variants={itemVariants}
          className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-6 mb-8"
        >
          <div className="flex items-start">
            <FiInfo className="text-blue-400 text-xl mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Before You Submit</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Please note that our research materials are typically only available to verified academic researchers, policy professionals, 
                government officials, and other qualified individuals. Submissions without proper credentials or clear research purpose 
                may be denied. All approved requests are subject to confidentiality agreements.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Main form */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900/80 to-gray-900/60 rounded-xl p-8 shadow-xl border border-gray-800/40"
        >
          {submitError ? (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <FiAlertTriangle className="text-red-400 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Submission Error</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    We encountered an error while processing your request. Please try again or contact our support team directly.
                  </p>
                  <button 
                    onClick={() => setSubmitError(false)}
                    className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-white rounded-lg transition-colors duration-300 text-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              {/* Email and Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                    Organization/Affiliation <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    placeholder="University, Institution, or Company"
                  />
                </div>
              </div>
              
              {/* Lab and Purpose */}
              <div>
                <label htmlFor="researchLab" className="block text-sm font-medium text-gray-300 mb-2">
                  Research Lab <span className="text-red-400">*</span>
                </label>
                <select
                  id="researchLab"
                  name="researchLab"
                  required
                  value={formData.researchLab}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                >
                  <option value="">Select a research lab</option>
                  {researchLabs.map(lab => (
                    <option key={lab.id} value={lab.id}>{lab.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-300 mb-2">
                  Purpose of Request <span className="text-red-400">*</span>
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                >
                  <option value="">Select purpose</option>
                  <option value="academic">Academic Research</option>
                  <option value="policy">Policy Development</option>
                  <option value="government">Government Work</option>
                  <option value="commercial">Commercial Application</option>
                  <option value="journalism">Journalism</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Specific Papers */}
              <div>
                <label htmlFor="specificPapers" className="block text-sm font-medium text-gray-300 mb-2">
                  Specific Papers or Research Topics
                </label>
                <textarea
                  id="specificPapers"
                  name="specificPapers"
                  rows={3}
                  value={formData.specificPapers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                  placeholder="Please specify if you're looking for particular papers or research topics"
                ></textarea>
              </div>
              
              {/* Additional Information */}
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                  placeholder="Please provide any additional context about your request that may help us process it more efficiently"
                ></textarea>
              </div>
              
              {/* Credential upload */}
              <div>
                <span className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Credentials (optional)
                </span>
                <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-blue-500/50 group">
                  <input
                    type="file"
                    id="credentials"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <div className="text-center">
                    <FiUpload className="mx-auto h-10 w-10 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                    <p className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {uploadedFile ? (
                        <span className="text-blue-400">{uploadedFile.name}</span>
                      ) : (
                        <span>Drag and drop or click to upload</span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, DOC, DOCX, or JPG up to 10MB
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Upload institutional credentials, ID cards, or other documentation that verifies your affiliation.
                </p>
              </div>
              
              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                  I agree to the <Link href="/terms-of-use" className="text-blue-400 hover:underline">Terms and Conditions</Link> regarding the use of research materials. I understand that all materials are provided for the stated purpose only and subject to confidentiality agreements. <span className="text-red-400">*</span>
                </label>
              </div>
              
              {/* Security notice */}
              <div className="flex items-center space-x-3 border-t border-gray-800 pt-6">
                <FiLock className="text-gray-400" />
                <p className="text-xs text-gray-400">
                  Your information is encrypted and securely stored. We will never share your details with third parties.
                </p>
              </div>
              
              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiFileText className="mr-2" /> Submit Research Request
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
        
        {/* Contact alternative */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Having trouble with the form? Contact us directly at{' '}
            <a href="mailto:admin@perrininstitute.org" className="text-blue-400 hover:underline">
            admin@perrininstitute.org
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 