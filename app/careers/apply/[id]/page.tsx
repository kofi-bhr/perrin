"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUpload, FiLock, FiCheck, FiUser, FiAlertTriangle, FiInfo, FiBriefcase, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

// Mock job data - in a real app, this would come from an API
const getJobById = (id: string) => {
  const jobs = [
    {
      id: '1',
      title: 'Marketing Specialist',
      type: 'Full-time',
      location: 'Charlottesville, VA / Remote',
      department: 'Marketing'
    },
    {
      id: '2',
      title: 'Graphic Designer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Creative'
    }
  ];
  
  return jobs.find(job => job.id === id) || null;
};

export default function CareerApplicationPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    coverletter: '',
    hearAbout: '',
    startDate: '',
    agreeToTerms: false
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  useEffect(() => {
    if (jobId) {
      setTimeout(() => {
        const jobData = getJobById(jobId);
        setJob(jobData);
        setLoading(false);
      }, 100);
    }
  }, [jobId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-r-4 border-blue-500 border-l-transparent border-b-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-blue-500 animate-pulse font-light tracking-wider">Loading application form...</p>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Job Not Found</h1>
          <p className="text-gray-400 mb-8">
            The job posting you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/careers" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 px-6 rounded-lg shadow-lg shadow-blue-600/10"
          >
            <FiArrowLeft className="mr-2" /> Return to Careers
          </Link>
        </div>
      </div>
    );
  }
  
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
              Application Submitted!
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto">
              Thank you for applying to the <span className="text-blue-400 font-medium">{job.title}</span> position at Perrin Institute. 
              Your application has been received and assigned reference number <span className="text-blue-400 font-mono">APP-{Math.floor(Math.random() * 90000) + 10000}</span>.
              Our team will review your application and contact you if your qualifications match our needs.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/careers" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                <FiArrowLeft className="mr-2" /> Return to Careers
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
          <Link href="/careers" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group">
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to Career Listings</span>
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Apply for {job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 mt-2 mb-6">
            <div className="inline-flex items-center">
              <FiBriefcase className="mr-2 text-blue-400" />
              {job.type}
            </div>
            <div className="inline-flex items-center">
              <FiMapPin className="mr-2 text-blue-400" />
              {job.location}
            </div>
            <div className="inline-flex items-center">
              <FiUser className="mr-2 text-blue-400" />
              {job.department}
            </div>
          </div>
          <div className="h-1 w-24 bg-blue-500 mb-8 rounded-full"></div>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            We're excited about your interest in joining the Perrin Institute team! 
            Please complete this application form with your qualifications and experience.
          </p>
        </motion.div>
        
        {/* Tips panel */}
        <motion.div 
          variants={itemVariants}
          className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-6 mb-8"
        >
          <div className="flex items-start">
            <FiInfo className="text-blue-400 text-xl mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Application Tips</h3>
              <ul className="text-gray-300 text-sm leading-relaxed space-y-2">
                <li>• Ensure your résumé is up-to-date and clearly highlights relevant experience</li>
                <li>• Tailor your cover letter to explain why you're interested in this specific role</li>
                <li>• Include specific examples of past work that demonstrate your capabilities</li>
                <li>• Double-check all your contact information for accuracy</li>
              </ul>
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
                    We encountered an error while processing your application. Please try again or contact our recruiting team directly.
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
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Personal Information</h3>
                
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
              </div>
              
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-300 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedIn"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>
              
              {/* Application Details */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Application Details</h3>
                
                <div className="mb-6">
                  <label htmlFor="coverletter" className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Letter <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="coverletter"
                    name="coverletter"
                    rows={6}
                    required
                    value={formData.coverletter}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    placeholder="Tell us why you're interested in this position and how your experience makes you a great fit..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-2">
                      Earliest Start Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-300 mb-2">
                      How did you hear about us? <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      required
                      value={formData.hearAbout}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    >
                      <option value="">Please select</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="indeed">Indeed</option>
                      <option value="company-website">Company Website</option>
                      <option value="referral">Employee Referral</option>
                      <option value="university">University/College</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                {/* Resume upload */}
                <div className="mb-6">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
                    Resume/CV <span className="text-red-400">*</span>
                  </label>
                  <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-8 transition-all duration-300 hover:border-blue-500/50 group">
                    <input
                      type="file"
                      id="resume"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleResumeChange}
                      required
                    />
                    <div className="text-center">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                      <p className="mt-4 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {resume ? (
                          <span className="text-blue-400">{resume.name}</span>
                        ) : (
                          <span>Drag and drop your resume or click to browse</span>
                        )}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        PDF, DOC, or DOCX up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Equal Opportunity section */}
              <div className="bg-blue-900/10 p-6 rounded-lg border border-blue-900/20">
                <h3 className="text-lg font-semibold mb-4 text-white">Equal Opportunity Employer</h3>
                <p className="text-sm text-gray-300 mb-4">
                  The Perrin Institute is an equal opportunity employer committed to diversity and inclusion in the workplace. 
                  All qualified applicants will receive consideration for employment without regard to race, color, religion, 
                  gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
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
                  I certify that all information provided in this application is true and complete to the best of my knowledge. 
                  I understand that any false information or omission may disqualify me from further consideration for employment 
                  and may result in dismissal if discovered at a later date. <span className="text-red-400">*</span>
                </label>
              </div>
              
              {/* Security notice */}
              <div className="flex items-center space-x-3 border-t border-gray-800 pt-6">
                <FiLock className="text-gray-400" />
                <p className="text-xs text-gray-400">
                  Your information is securely stored and only accessible to our HR team and hiring managers.
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
                      <FiUser className="mr-2" /> Submit Application
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
            Having trouble with the application? Contact our recruiting team at{' '}
            <a href="admin@perrininstitute.org" className="text-blue-400 hover:underline">
            admin@perrininstitute.org
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 