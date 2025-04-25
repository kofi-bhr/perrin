'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiMail, FiCheck, FiChevronDown, FiInfo, FiMessageSquare, FiArrowRight } from 'react-icons/fi'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Available time slots data
const AVAILABLE_DAYS = [
  { id: 'monday', label: 'Monday', date: 'Feb 12', slots: 5 },
  { id: 'tuesday', label: 'Tuesday', date: 'Feb 13', slots: 3 },
  { id: 'wednesday', label: 'Wednesday', date: 'Feb 14', slots: 2 },
  { id: 'thursday', label: 'Thursday', date: 'Feb 15', slots: 4 },
  { id: 'friday', label: 'Friday', date: 'Feb 16', slots: 6 }
];

const TIME_SLOTS = [
  { id: 'morning-1', time: '9:00 AM', available: true },
  { id: 'morning-2', time: '10:00 AM', available: true },
  { id: 'morning-3', time: '11:00 AM', available: false },
  { id: 'afternoon-1', time: '1:00 PM', available: true },
  { id: 'afternoon-2', time: '2:00 PM', available: true },
  { id: 'afternoon-3', time: '3:00 PM', available: false },
  { id: 'afternoon-4', time: '4:00 PM', available: true },
  { id: 'evening-1', time: '5:00 PM', available: true }
];

// Focus areas for consultation
const FOCUS_AREAS = [
  { id: 'scholarships', label: 'Scholarships & Financial Aid' },
  { id: 'internships', label: 'Internships & Research Opportunities' },
  { id: 'applications', label: 'College Applications' },
  { id: 'essays', label: 'Personal Statements & Essays' },
  { id: 'career', label: 'Career Planning' },
  { id: 'networking', label: 'Networking & Mentorship' }
];

export default function BookAdvisorPage() {
  const [selectedDay, setSelectedDay] = useState(AVAILABLE_DAYS[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    background: '',
    goals: ''
  });
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDocumentType(e.target.value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };
  
  const toggleFocusArea = (areaId: string) => {
    setFocusAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId) 
        : [...prev, areaId]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically send the data to an API
    // For now, we'll just simulate a successful submission
    setSubmitted(true);
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  // Determine if the current step is complete and we can proceed
  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name.trim() !== '' && 
             formData.email.trim() !== '' && 
             documentType !== '' && 
             documentFile !== null;
    }
    if (currentStep === 2) {
      return focusAreas.length > 0;
    }
    return selectedTime !== '';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black text-white">
      {/* Top navigation with back button - increased top padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        <Link href="/scholarship-center" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 transition-colors">
          <FiArrowLeft className="mr-2" />
          <span>Back to Opportunities</span>
        </Link>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <FiCheck className="w-10 h-10 text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-6">Consultation Scheduled!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for scheduling a consultation. We've sent a confirmation email to {formData.email} with all the details.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mx-auto max-w-md">
              <div className="text-left">
                <div className="flex items-center border-b border-white/10 pb-4 mb-4">
                  <div className="bg-indigo-500/20 p-3 rounded-full mr-4">
                    <FiCalendar className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{selectedDay.label}, {selectedDay.date}</div>
                    <div className="text-gray-400 text-sm">{selectedTime}</div>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-500/20 p-3 rounded-full mr-4 mt-1">
                    <FiInfo className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Focus Areas</div>
                    <div className="flex flex-wrap gap-2">
                      {focusAreas.map(areaId => (
                        <span 
                          key={areaId} 
                          className="bg-indigo-500/10 text-indigo-300 text-xs px-2 py-1 rounded-full"
                        >
                          {FOCUS_AREAS.find(area => area.id === areaId)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Link 
                href="/scholarship-center"
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-colors text-base font-medium"
              >
                Return to Opportunities
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Schedule Your Personalized Session</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Our scholarship advisors provide one-on-one guidance to help low-income students find and apply for scholarships tailored to your unique background and educational goals.
              </p>
            </motion.div>
            
            {/* Progress steps */}
            <motion.div 
              className="mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {/* Desktop progress indicator */}
              <div className="hidden md:block">
                <div className="relative">
                  {/* Background line that spans the entire width */}
                  <div className="absolute h-0.5 bg-gray-700 left-0 right-0 top-5"></div>
                  
                  {/* Progress line that grows based on current step */}
                  <div 
                    className="absolute h-0.5 bg-indigo-500 left-0 top-5 transition-all duration-500 ease-in-out"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  ></div>
                  
                  {/* Steps container */}
                  <div className="relative flex justify-between">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="text-center flex flex-col items-center">
                        {/* Circle indicator */}
                        <div 
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-3 z-10 bg-[#0a0a18] ${
                            currentStep > step 
                              ? 'border-indigo-500 bg-indigo-500 text-white' 
                              : currentStep === step 
                                ? 'border-indigo-500 text-indigo-500' 
                                : 'border-gray-700 text-gray-700'
                          }`}
                        >
                          {currentStep > step ? (
                            <FiCheck className="w-5 h-5 text-white" />
                          ) : (
                            <span>{step}</span>
                          )}
                        </div>
                        
                        {/* Step text */}
                        <div className={`${currentStep >= step ? 'text-white' : 'text-gray-500'}`}>
                          <div className="font-medium">
                            {step === 1 && 'Basic Information'}
                            {step === 2 && 'Areas of Focus'}
                            {step === 3 && 'Select Time'}
                          </div>
                          <div className={`text-sm ${currentStep >= step ? 'text-gray-400' : 'text-gray-600'}`}>
                            {step === 1 && 'Tell us about yourself'}
                            {step === 2 && 'What would you like help with?'}
                            {step === 3 && 'Choose your preferred slot'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Mobile progress indicator */}
              <div className="block md:hidden">
                <div className="bg-gray-700 h-1 w-full rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${((currentStep) / 3) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <div className={currentStep >= 1 ? 'text-indigo-400' : ''}>Step 1</div>
                  <div className={currentStep >= 2 ? 'text-indigo-400' : ''}>Step 2</div>
                  <div className={currentStep >= 3 ? 'text-indigo-400' : ''}>Step 3</div>
                </div>
                
                {/* Current step display for mobile */}
                <div className="mt-6 text-center">
                  <div className="text-indigo-400 text-sm uppercase tracking-wider mb-1">Step {currentStep} of 3</div>
                  <div className="text-xl font-medium text-white">
                    {currentStep === 1 && 'Basic Information'}
                    {currentStep === 2 && 'Areas of Focus'}
                    {currentStep === 3 && 'Select Time'}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    {currentStep === 1 && 'Tell us about yourself'}
                    {currentStep === 2 && 'What would you like help with?'}
                    {currentStep === 3 && 'Choose your preferred slot'}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Form container with step-based content */}
            <motion.div 
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                <div className={`p-8 ${currentStep === 1 ? 'block' : 'hidden'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          className="block w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="block w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Your Educational Background
                      </label>
                      <div className="relative">
                        <textarea
                          name="background"
                          value={formData.background}
                          onChange={handleFormChange}
                          rows={3}
                          className="block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Tell us about your current education, year in school, or recent graduation status."
                        />
                      </div>
                    </div>
                    
                    {/* Income verification section */}
                    <div className="md:col-span-2 mt-2">
                      <div className="border border-white/10 rounded-lg p-4 bg-white/[0.01]">
                        <div className="flex items-start mb-4">
                          <div className="bg-indigo-500/20 p-2 rounded-lg mr-3 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-base mb-1">Income Verification <span className="text-indigo-400">*</span></h4>
                            <p className="text-gray-400 text-sm mb-3">
                              To qualify for our services, we need documentation verifying your income status or financial aid eligibility.
                              All information is securely encrypted and kept strictly confidential.
                            </p>
                            
                            {/* Document type selector */}
                            <div className="mb-4">
                              <label className="block text-gray-300 text-sm font-medium mb-2">
                                Document Type <span className="text-indigo-400">*</span>
                              </label>
                              <select 
                                className="block w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                                value={documentType}
                                onChange={handleDocumentTypeChange}
                              >
                                <option value="" className="bg-gray-900">Select a document type</option>
                                <option value="fafsa" className="bg-gray-900">FAFSA SAR (Student Aid Report)</option>
                                <option value="taxReturn" className="bg-gray-900">Tax Return</option>
                                <option value="financial" className="bg-gray-900">Financial Aid Award Letter</option>
                                <option value="free-lunch" className="bg-gray-900">Free/Reduced Lunch Program</option>
                                <option value="pell" className="bg-gray-900">Pell Grant Documentation</option>
                                <option value="other" className="bg-gray-900">Other Documentation</option>
                              </select>
                            </div>
                            
                            {/* File upload */}
                            <div className="relative">
                              <label className="block text-gray-300 text-sm font-medium mb-2">
                                Upload Document <span className="text-indigo-400">*</span>
                              </label>
                              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                                <input 
                                  type="file" 
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  required
                                  onChange={handleFileChange}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-gray-300">Drag and drop your file here, or click to select</p>
                                <p className="text-gray-500 text-xs mt-1">PDF, JPG, or PNG (max 5MB)</p>
                              </div>
                            </div>
                            
                            <div className="mt-3 text-xs text-gray-500">
                              <p>🔒 Your documents are encrypted and only accessible to our advisors for verification purposes.</p>
                              <p className="mt-1 text-indigo-400">* Required for scheduling a consultation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Your Goals
                      </label>
                      <div className="relative">
                        <textarea
                          name="goals"
                          value={formData.goals}
                          onChange={handleFormChange}
                          rows={3}
                          className="block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="What are your academic or career goals? What would you like to achieve through this consultation?"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2: Areas of Focus */}
                <div className={`p-8 ${currentStep === 2 ? 'block' : 'hidden'}`}>
                  <h3 className="text-xl font-medium mb-6">What would you like help with?</h3>
                  <p className="text-gray-400 mb-6">Select all the areas you'd like to discuss during your consultation.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FOCUS_AREAS.map(area => (
                      <div 
                        key={area.id}
                        onClick={() => toggleFocusArea(area.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          focusAreas.includes(area.id) 
                            ? 'border-indigo-500 bg-indigo-500/10' 
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                            focusAreas.includes(area.id) 
                              ? 'border-indigo-500 bg-indigo-500 text-white' 
                              : 'border-white/30 bg-transparent'
                          }`}>
                            {focusAreas.includes(area.id) && <FiCheck className="w-3 h-3" />}
                          </div>
                          <span>{area.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Anything Specific?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMessageSquare className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        className="block w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Any specific questions or areas of interest?"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Step 3: Select Time */}
                <div className={`p-8 ${currentStep === 3 ? 'block' : 'hidden'}`}>
                  <h3 className="text-xl font-medium mb-6">Choose a day and time</h3>
                  <p className="text-gray-400 mb-6">All consultations are 30 minutes long. Select a day and time that works for you.</p>
                  
                  {/* Day selector */}
                  <div className="mb-8">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Available Days
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {AVAILABLE_DAYS.map((day) => (
                        <div 
                          key={day.id}
                          onClick={() => setSelectedDay(day)}
                          className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                            selectedDay.id === day.id 
                              ? 'border-indigo-500 bg-indigo-500/10' 
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="font-medium">{day.label}</div>
                          <div className="text-sm text-gray-400">{day.date}</div>
                          <div className="text-xs mt-1 text-indigo-400">{day.slots} slots</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Time selector */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Available Times for {selectedDay.label}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => (
                        <div 
                          key={slot.id}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            !slot.available 
                              ? 'border-gray-700 bg-gray-800/50 text-gray-500 cursor-not-allowed' 
                              : selectedTime === slot.time
                                ? 'border-indigo-500 bg-indigo-500/10 cursor-pointer' 
                                : 'border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <FiClock className="mr-2 h-4 w-4" />
                            <span>{slot.time}</span>
                          </div>
                          {!slot.available && (
                            <div className="text-xs mt-1 text-gray-500">Unavailable</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Navigation buttons */}
                <div className="px-8 py-6 bg-white/[0.02] border-t border-white/10 flex justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div> // Empty div for spacing
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className={`px-6 py-2 rounded-lg ${
                        canProceed()
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white'
                          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canProceed()}
                      className={`px-6 py-2 rounded-lg ${
                        canProceed()
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white'
                          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Schedule Consultation
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
            
            {/* Trust indicators */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h3 className="text-lg font-medium text-white mb-1">What to expect from your consultation</h3>
                <p className="text-gray-400 text-sm">Your session with our advisors is completely free for eligible low-income students and entirely confidential</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Personalized Scholarship Guidance',
                    description: 'Our advisors tailor scholarship recommendations to your specific background, financial situation, and academic goals',
                    icon: FiUser
                  },
                  {
                    title: 'Application Action Plan',
                    description: 'You\'ll leave with concrete next steps and resources to help you apply for scholarships designed for low-income students',
                    icon: FiCheck
                  },
                  {
                    title: 'Follow-up Support',
                    description: 'We provide email support following your consultation to ensure you can access every financial opportunity available',
                    icon: FiMessageSquare
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  >
                    <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/scholarship-center/book-advisor"
                className="inline-flex items-center bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl transition-all text-base font-medium border border-white/10 hover:border-indigo-500/30"
              >
                Book Your Free Low-Income Scholarship Session
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 