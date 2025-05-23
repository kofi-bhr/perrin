"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUpload, FiLock, FiCheck, FiFileText, FiAlertTriangle, FiInfo, FiShield, FiArrowRight, FiCheckCircle, FiUsers, FiPieChart } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

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

// Federal agencies we've worked with
const federalAgencies = [
  { name: "Department of Defense", logo: "/agency-logos/dod.png" },
  { name: "National Security Agency", logo: "/agency-logos/nsa.png" },
  { name: "Department of Homeland Security", logo: "/agency-logos/dhs.png" },
  { name: "Department of State", logo: "/agency-logos/state.png" },
  { name: "Office of the Director of National Intelligence", logo: "/agency-logos/odni.png" }
];

export default function ResearchRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    organizationType: '',
    researchTopic: '',
    deadline: '',
    projectScope: '',
    additionalDetails: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      organization: '',
      organizationType: '',
      researchTopic: '',
      deadline: '',
      projectScope: '',
      additionalDetails: ''
    });
    
    // Scroll to the top to show confirmation message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="bg-teal-600 text-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-roboto font-bold mb-4 leading-tight">Research for Federal Agencies</h1>
              <p className="text-xl text-white/90 mb-8 font-roboto">
                Access world-class expertise and evidence-based analysis to inform policy decisions
              </p>
              <a 
                href="#request-form" 
                className="inline-flex items-center px-6 py-3 bg-white text-teal-700 rounded-sm font-medium transition-colors hover:bg-gray-100 font-roboto"
              >
                Request Research
                <FiArrowRight className="ml-2" />
              </a>
            </div>
            <div className="hidden md:block mt-10 md:mt-0 md:ml-10">
              <Image 
                src="/uva-stock-3.jpg" 
                alt="Research collaboration" 
                width={400} 
                height={300}
                className="rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Confirmation Message */}
      {formSubmitted && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-green-50 border border-green-100 rounded-sm p-6 flex items-start">
            <FiCheckCircle className="text-green-500 mt-1 mr-4 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-medium text-green-800 mb-2 font-roboto">Request Submitted Successfully</h3>
              <p className="text-green-700 font-roboto">
                Thank you for your research request. A member of our team will review your submission and contact you within 2-3 business days to discuss next steps.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-roboto font-bold text-gray-900 mt-2">
              Why Federal Agencies Partner with the Perrin Institution
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <FiFileText className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-roboto font-bold mb-3 text-gray-900">Evidence-Based Research</h3>
              <p className="text-gray-700 font-roboto">
                Our rigorous methodologies ensure that all policy recommendations are grounded in empirical evidence and thorough analysis.
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <FiUsers className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-roboto font-bold mb-3 text-gray-900">Multidisciplinary Expertise</h3>
              <p className="text-gray-700 font-roboto">
                Our diverse team of scholars brings perspectives from technology, policy, economics, and social sciences to address complex challenges.
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <FiPieChart className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-roboto font-bold mb-3 text-gray-900">Actionable Insights</h3>
              <p className="text-gray-700 font-roboto">
                We deliver concrete, implementable recommendations that help agencies achieve their policy objectives and manage technological change.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Research Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-roboto font-bold text-gray-900 mt-2 mb-6">
              Types of Research Available
            </h2>
          </div>
          <p className="text-gray-700 mb-12 max-w-3xl font-roboto">
            The Perrin Institution offers various research formats to meet the specific needs of federal agencies and other organizations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 bg-white">
              <div className="p-6">
                <h3 className="text-xl font-roboto font-bold mb-3 text-gray-900">Policy Briefs</h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  Concise analysis of specific policy issues with actionable recommendations. Typically 5-10 pages in length, these briefs provide a focused examination of key considerations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Quick turnaround (2-4 weeks)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Executive summary with key points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Targeted recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border border-gray-200 bg-white">
              <div className="p-6">
                <h3 className="text-xl font-roboto font-bold mb-3 text-gray-900">Comprehensive Reports</h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  In-depth analysis of complex issues, including detailed methodology, findings, and strategic recommendations. These reports provide exhaustive coverage of policy challenges.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Extended timeline (1-3 months)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Thorough literature review</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Detailed implementation guidance</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border border-gray-200 bg-white">
              <div className="p-6">
                <h3 className="text-xl font-roboto font-bold mb-3 text-gray-900">Workshops & Training</h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  Interactive sessions led by our experts to help agency staff develop expertise in emerging technology policy areas and implementation strategies.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Half-day to multi-day formats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Customized curriculum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">In-person or virtual delivery</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border border-gray-200 bg-white">
              <div className="p-6">
                <h3 className="text-xl font-roboto font-bold mb-3 text-gray-900">Advisory Services</h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  Ongoing consultation with our experts to provide guidance on policy development, implementation challenges, and strategic decision-making.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Regular meetings with agency teams</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Responsive to emerging issues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2 font-medium text-xs mt-1">•</span>
                    <span className="text-gray-700 font-roboto">Access to network of experts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Past Projects Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-roboto font-bold text-gray-900 mt-2 mb-6">
              Selected Federal Agency Collaborations
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 bg-white">
              <div className="h-48 relative">
                <Image 
                  src="/uva-stock-1.jpg" 
                  alt="AI Policy Research" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase font-medium text-teal-600 mb-2 font-roboto">Department of Energy</div>
                <h3 className="text-lg font-roboto font-bold mb-3 text-gray-900">
                  AI Risk Assessment Framework for Critical Infrastructure
                </h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  Developed a comprehensive framework for evaluating AI systems deployed in critical energy infrastructure, with specific guidance on risk mitigation strategies.
                </p>
                <div className="flex items-center text-sm text-gray-500 font-roboto">
                  <span className="font-medium">Project Duration:</span>
                  <span className="ml-2">6 months</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 bg-white">
              <div className="h-48 relative">
                <Image 
                  src="/uva-stock-2.webp" 
                  alt="Digital Identity Research" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase font-medium text-teal-600 mb-2 font-roboto">GSA & Department of State</div>
                <h3 className="text-lg font-roboto font-bold mb-3 text-gray-900">
                  Digital Identity Solutions for Public Services
                </h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  Conducted a cross-agency study of digital identity verification systems, with policy recommendations for privacy-preserving implementation approaches.
                </p>
                <div className="flex items-center text-sm text-gray-500 font-roboto">
                  <span className="font-medium">Project Duration:</span>
                  <span className="ml-2">4 months</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 bg-white">
              <div className="h-48 relative">
                <Image 
                  src="/uva-stock-3.jpg" 
                  alt="Cybersecurity Research" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase font-medium text-teal-600 mb-2 font-roboto">Department of Homeland Security</div>
                <h3 className="text-lg font-roboto font-bold mb-3 text-gray-900">
                  Cybersecurity Protocols for Government Data Systems
                </h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  Developed updated security protocols for federal data systems, incorporating emerging threats and technical mitigations for protecting sensitive information.
                </p>
                <div className="flex items-center text-sm text-gray-500 font-roboto">
                  <span className="font-medium">Project Duration:</span>
                  <span className="ml-2">8 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Research Request Form */}
      <section id="request-form" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-roboto font-bold text-gray-900 mt-2 mb-4 text-center">
              Request Research from the Perrin Institution
            </h2>
          </div>
          <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto font-roboto">
            Complete the form below to submit your research request. Our team will review your submission and contact you to discuss your needs in more detail.
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                  Organization *
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                />
              </div>
              
              <div>
                <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                  Organization Type *
                </label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                >
                  <option value="">Select Organization Type</option>
                  <option value="federal">Federal Agency</option>
                  <option value="state">State/Local Government</option>
                  <option value="nonprofit">Non-Profit Organization</option>
                  <option value="education">Educational Institution</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="researchTopic" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                Research Topic/Question *
              </label>
              <input
                type="text"
                id="researchTopic"
                name="researchTopic"
                value={formData.researchTopic}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                placeholder="Briefly describe your research needs"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                  Desired Completion Date
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                />
              </div>
              
              <div>
                <label htmlFor="projectScope" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                  Project Scope
                </label>
                <select
                  id="projectScope"
                  name="projectScope"
                  value={formData.projectScope}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                >
                  <option value="">Select Project Scope</option>
                  <option value="policy-brief">Policy Brief</option>
                  <option value="comprehensive-report">Comprehensive Report</option>
                  <option value="workshop">Workshop/Training</option>
                  <option value="advisory">Advisory Services</option>
                  <option value="other">Other/Not Sure</option>
                </select>
              </div>
            </div>
            
            <div className="mb-8">
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent font-roboto"
                placeholder="Please provide any additional context or specific requirements for your research request"
              ></textarea>
            </div>
            
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors font-roboto"
              >
                Submit Research Request
              </button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-roboto font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto font-roboto">
            If you have questions about our research capabilities or would like to discuss a potential collaboration before submitting a formal request, please contact us.
          </p>
          <div className="inline-flex items-center justify-center">
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-colors font-roboto"
            >
              Contact Our Research Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 