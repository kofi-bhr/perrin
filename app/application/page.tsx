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
  applicationFee: number;
  description: string;
  highlights: string[];
  eligibility: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

export default function ApplicationPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
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
      applicationFee: 15,
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
      subtitle: 'Technical Training Program',
      location: 'Hybrid (In-person workshops + remote collaboration)',
      duration: '8 weeks (Fall 2024)',
      applicationFee: 15,
      description: "The Data Science for Policy Innovation program trains participants to apply cutting-edge data science techniques to complex policy challenges. This technical program focuses on developing the computational and analytical skills needed to transform large datasets into actionable policy insights. Participants will work in teams on real-world policy projects while receiving specialized training in machine learning, causal inference, and data visualization for policy applications.",
      highlights: [
        'Master advanced data science techniques for policy analysis',
        'Work on real-world policy datasets and challenges',
        'Learn from leading experts in data science and policy',
        'Develop a portfolio of policy-focused data projects',
        'Receive technical mentorship from data scientists',
        'Join a community of technically-skilled policy innovators'
      ],
      eligibility: [
        'Background in computer science, statistics, or related technical field',
        'Experience with programming (Python, R, or similar)',
        'Understanding of basic statistical concepts',
        'Interest in applying technical skills to policy problems',
        'Ability to collaborate effectively in interdisciplinary teams',
        'Commitment to ethical data practices and responsible innovation'
      ]
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is the application process?",
      answer: "The application process consists of three stages: (1) Initial application with resume/CV, academic transcripts, and statement of interest; (2) Technical assessment or research proposal relevant to your chosen program; (3) Interview with program faculty and staff. Decisions are typically made within 3-4 weeks after the application deadline."
    },
    {
      question: "Is the application fee waivable?",
      answer: "Yes, application fee waivers are available for students with demonstrated financial need. To request a fee waiver, please email your request along with supporting documentation to applications@perrin.institute before submitting your application."
    },
    {
      question: "Are these programs paid or unpaid?",
      answer: "Both programs offer competitive stipends to participants. The Policy Research Fellowship provides a $5,000 stipend for the 12-week program. The Data Science for Policy Innovation program offers a $3,500 stipend for the 8-week program. Additional funding may be available for exceptional candidates."
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
      question: "Will I receive academic credit?",
      answer: "Academic credit arrangements are possible but depend on your home institution's policies. Many past participants have received academic credit for their work in our programs. We can provide detailed program information and evaluations to support credit arrangements with your academic institution."
    },
    {
      question: "Can high school students apply?",
      answer: "While our programs are primarily designed for undergraduate and graduate students, exceptional high school students (typically juniors and seniors) with demonstrated research experience and advanced coursework may be considered on a case-by-case basis. High school applicants should include a letter of recommendation from a teacher or mentor who can speak to their readiness for college-level research."
    },
    {
      question: "Is the program free to participate in?",
      answer: "Yes, once accepted, participation in the program is free. In fact, we provide stipends to all participants ($5,000 for the Policy Research Fellowship and $3,500 for the Data Science program) to support their time and work. There are no tuition or program fees beyond the initial $15 application fee."
    },
    {
      question: "Why do you have an application fee?",
      answer: "The $15 application fee helps us manage the high volume of applications we receive and ensures applicants are serious about their interest in the program. The fee contributes to the administrative costs of our thorough review process, which includes multiple stages of evaluation by our faculty and staff. As noted above, we offer fee waivers to ensure the fee is not a barrier for qualified applicants with financial need."
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
                Apply to our prestigious policy research programs with a $15 application fee
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
                      <span className="text-sm text-blue-400 font-mono">${program.applicationFee} fee</span>
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
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProgram(program)}
                      className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                    >
                      Apply to Program
                      <FiArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
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

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity" 
              aria-hidden="true" 
              onClick={() => setSelectedProgram(null)}
            ></motion.div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block align-bottom bg-gradient-to-b from-gray-900 to-black rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-white/10"
            >
              <div className="px-6 pt-6 pb-4 sm:p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800/50 mb-4">
                      {selectedProgram.subtitle}
                    </div>
                    <h3 className="text-2xl leading-6 font-bold text-white mb-1" id="modal-title">
                      {selectedProgram.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="bg-white/5 rounded-full p-2 hover:bg-white/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-6 space-y-6">
                  <div className="flex flex-wrap gap-4 py-4 border-t border-b border-white/5">
                    <div className="flex items-center text-sm text-gray-400">
                      <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      {selectedProgram.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      {selectedProgram.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <FiDollarSign className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      ${selectedProgram.applicationFee} application fee
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Program Description</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedProgram.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Program Highlights</h4>
                    <ul className="space-y-2">
                      {selectedProgram.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-300">
                          <FiCheck className="flex-shrink-0 mt-1 mr-2 h-4 w-4 text-blue-400" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Eligibility Requirements</h4>
                    <ul className="space-y-2">
                      {selectedProgram.eligibility.map((req, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-300">
                          <FiCheck className="flex-shrink-0 mt-1 mr-2 h-4 w-4 text-blue-400" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-5 sm:px-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-t border-white/5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-white">Application deadline:</span> March 15, 2024
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                  >
                    Apply Now
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
