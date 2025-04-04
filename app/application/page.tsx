'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiMapPin, FiClock, FiDollarSign, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

// Fix the navbar component import path
import Navbar from '../../components/Navbar';

interface Program {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  description: string;
  highlights: string[];
  eligibility: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

export default function ApplicationPage() {
  // Remove selectedProgram state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

  // Track scroll for subtle UI effects
  useEffect(() => {
    setAnimationsReady(true);
  }, []);

  const programs: Program[] = [
    {
      id: '1',
      title: 'Policy Research Fellowship',
      subtitle: 'Advanced Research Program',
      location: 'University of Virginia / Remote',
      duration: '12 weeks (Summer 2024)',
      description: "The Policy Research Fellowship is our flagship program for exceptional students interested in data-driven policy research. Fellows work directly with faculty mentors and policy experts to conduct original research on pressing policy challenges. This immersive experience combines rigorous academic research with practical policy applications, preparing participants for impactful careers in policy analysis, government, and academia.",
      highlights: [
        'Conduct original research with faculty mentors',
        'Present findings to policy stakeholders',
        'Receive personalized mentorship from experts',
        'Develop advanced data analysis skills',
        'Build a professional network in policy research',
        'Earn academic credit (where applicable)'
      ],
      eligibility: [
        'Current undergraduate or graduate students',
        'Strong academic record (minimum 3.5 GPA)',
        'Background in economics, political science, data science, or related fields',
        'Demonstrated interest in policy research',
        'Proficiency in data analysis tools (R, Python, or similar)',
        'Excellent written and verbal communication skills'
      ]
    },
    {
      id: '2',
      title: 'Data Science for Policy Innovation',
      subtitle: 'Applications Closed',
      location: 'Hybrid (In-person workshops + remote collaboration)',
      duration: 'Applications Open Spring 2024',
      description: "Applications for the Fall 2024 cohort are currently closed. The next application cycle will open in Spring 2024. Join our waitlist to be notified when applications reopen for this intensive program that trains participants to apply cutting-edge data science techniques to complex policy challenges.",
      highlights: [
        <s key="1">Master advanced data science techniques for policy analysis</s>,
        <s key="2">Work on real-world policy datasets and challenges</s>,
        <s key="3">Learn from leading experts in data science and policy</s>,
        <s key="4">Develop a portfolio of policy-focused data projects</s>,
        <s key="5">Receive technical mentorship from data scientists</s>,
        <s key="6">Join a community of technically-skilled policy innovators</s>
      ],
      eligibility: [
        <s key="1">Background in computer science, statistics, or related technical field</s>,
        <s key="2">Experience with programming (Python, R, or similar)</s>,
        <s key="3">Understanding of basic statistical concepts</s>,
        <s key="4">Interest in applying technical skills to policy problems</s>,
        <s key="5">Ability to collaborate effectively in interdisciplinary teams</s>,
        <s key="6">Commitment to ethical data practices and responsible innovation</s>
      ]
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is the application process?",
      answer: "The application process consists of three stages: (1) Initial application with resume/CV, academic transcripts, and statement of interest; (2) Technical assessment or research proposal relevant to your chosen program; (3) Interview with program faculty and staff. Decisions are typically made within 3-4 weeks after the application deadline."
    },
    {
      question: "Are these programs paid or unpaid?",
      answer: "Only our top-performing fellows receive stipends. The Policy Research Fellowship may award stipends of up to $5,000 for exceptional candidates who demonstrate outstanding results, while the Data Science for Policy Innovation program may provide stipends of up to $3,500 for top performers. These merit-based stipends are highly competitive and awarded only to those who consistently exceed expectations."
    },
    {
      question: "Can international students apply?",
      answer: "Yes, international students are welcome to apply. For remote participation, there are no visa requirements. For in-person components, international students must have appropriate visa status that allows participation in academic programs or internships in the United States."
    },
    {
      question: "What is the time commitment?",
      answer: "The Policy Research Fellowship requires a full-time commitment (approximately 35-40 hours per week) during the 12-week summer program. The Data Science for Policy Innovation program requires approximately 20-25 hours per week during the 8-week fall program, making it possible to participate alongside other academic commitments."
    },
    {
      question: "Can high school students apply?",
      answer: "While our programs are primarily designed for undergraduate and graduate students, exceptional high school students (typically juniors and seniors) with demonstrated research experience and advanced coursework may be considered on a case-by-case basis. High school applicants should include a letter of recommendation from a teacher or mentor who can speak to their readiness for college-level research."
    },
    {
      question: "Is the program free to participate in?",
      answer: "Yes, participation in the program is free. There are no tuition or program fees. However, stipends are reserved exclusively for top performers who demonstrate exceptional talent and commitment throughout the program. The majority of participants should not expect to receive financial compensation."
    },
    {
      question: "What is the acceptance rate for these programs?",
      answer: "Our programs are highly selective, with an acceptance rate of approximately 4-6% for the Policy Research Fellowship and 7-9% for the Data Science program. This level of selectivity is comparable to the most elite graduate programs at Ivy League institutions. For high school applicants, the acceptance rate is even more competitive at less than 1%, as we only admit truly exceptional students who demonstrate college or graduate-level capabilities. We receive applications from top students at leading universities worldwide, and our selection committee—composed of distinguished faculty and industry leaders—employs a rigorous evaluation process to identify candidates with exceptional potential. Many of our alumni have gone on to prestigious positions at top research institutions, policy organizations, and technology companies."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <>
      {/* Keep the Navbar component */}
      <Navbar />
      
      {/* Premium dark hero section */}
      <div className="bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Subtle tech grid background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full opacity-[0.03]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" style={{ top: `${i * 10}%` }}></div>
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" style={{ left: `${i * 10}%` }}></div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-blue-400 text-xs uppercase tracking-widest">Application Portal</span>
              </div>
              
              <h1 className="text-4xl font-serif font-bold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
                Research Programs
              </h1>
              
              <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-300">
                Present Research at Conferences, Universities, and Summits
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Programs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Available Programs</h2>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800/50">
                        {program.subtitle}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-medium text-white mb-4">{program.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-400">
                        <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                        {program.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                        {program.duration}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-8 leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="text-md font-medium text-white mb-3 flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                          <FiCheck className="h-3 w-3 text-blue-400" />
                        </span>
                        Program Highlights
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {program.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-300">
                            <span className="text-blue-400 mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {program.id === '2' ? (
                      <button 
                        disabled
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-slate-600 text-base font-medium rounded-lg text-slate-400 bg-slate-800/50 cursor-not-allowed"
                      >
                        Applications Closed
                      </button>
                    ) : (
                      <a 
                        href={`/application/apply?program=${program.id}`}
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                      >
                        Apply to Program
                        <FiArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl overflow-hidden">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/5 last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium text-white">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <FiChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div 
                    className={`px-6 pb-5 text-gray-300 text-sm leading-relaxed transition-all duration-300 ${
                      expandedFAQ === index ? 'block opacity-100' : 'hidden opacity-0'
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Completely removed the Program Details Modal */}
    </>
  );
}
