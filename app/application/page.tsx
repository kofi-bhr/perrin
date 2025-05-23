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
      title: 'Research Internship, Technology Policy Group',
      subtitle: 'Advanced Research Program',
      location: 'University of Virginia / Remote',
      duration: '12 weeks (Summer 2025)',
      description: "The Research Internship is our flagship program for exceptional students interested in data-driven policy research. Fellows work directly with faculty mentors and policy experts to conduct original research on pressing policy challenges. This immersive experience combines rigorous academic research with practical policy applications, preparing participants for impactful careers in policy analysis, government, and academia.",
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
      title: 'News Department Correspondent',
      subtitle: 'Now Accepting Applications',
      location: 'Remote',
      duration: 'Ongoing',
      description: "Apply to be a correspondent reporting publicly to our audience of 48,000+ on news in cross-sector policy entrepreneurship. Correspondents will write a 600-1100-word article per week to be published on the Perrin website. Highly qualified applicants may be asked to lead as an editor of a particular news category (e.g. foreign policy, climate action, AI) and will make edits on 1-2 other articles each week.",
      highlights: [
        'Write 600-1100 word articles on policy topics weekly',
        'Publish on the Perrin website to 48k+ audience',
        'Develop expertise in specific policy areas',
        'Build a professional portfolio of published work',
        'Connect with policy experts and thought leaders',
        'Opportunity to advance to editorial leadership roles'
      ],
      eligibility: [
        'Strong writing and research skills',
        'Interest in policy entrepreneurship and innovation',
        'Ability to meet weekly deadlines consistently',
        'Knowledge in one or more policy domains',
        'Analytical thinking and attention to detail',
        'Editorial experience a plus for leadership roles'
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
      answer: "Only our top-performing fellows receive stipends. The Research Internship may award stipends of up to $5,000 for exceptional candidates who demonstrate outstanding results, while the News Department Correspondent may provide stipends of up to $3,500 for top performers. These merit-based stipends are highly competitive and awarded only to those who consistently exceed expectations."
    },
    {
      question: "Can international students apply?",
      answer: "Yes, international students are welcome to apply. For remote participation, there are no visa requirements. For in-person components, international students must have appropriate visa status that allows participation in academic programs or internships in the United States."
    },
    {
      question: "What is the time commitment?",
      answer: "The Research Internship requires a full-time commitment (approximately 35-40 hours per week) during the 12-week summer program. The News Department Correspondent requires approximately 20-25 hours per week during the 8-week fall program, making it possible to participate alongside other academic commitments."
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
      answer: "Our programs are highly selective, with an acceptance rate of approximately 4-6% for the Research Internship and 7-9% for the News Department Correspondent. For high school applicants, the acceptance rate is even more competitive at less than 1%, as we only admit truly exceptional students who demonstrate college or graduate-level capabilities. We receive applications from top students at leading universities worldwide, and our selection committee—composed of distinguished faculty and industry leaders—employs a rigorous evaluation process to identify candidates with exceptional potential. Many of our alumni have gone on to prestigious positions at top research institutions, policy organizations, and technology companies."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 font-roboto">
      {/* Keep the Navbar component */}
      <Navbar />
      
      {/* Professional light hero section */}
      <div className="bg-gradient-to-b from-slate-50 to-white pt-28 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full opacity-[0.02]">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                  key={`h-line-${i}`} 
                  className="absolute h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" 
                  style={{ top: `${i * 5}%` }}
                  initial={{ opacity: 0.05 }}
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                  key={`v-line-${i}`} 
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-slate-400 to-transparent" 
                  style={{ left: `${i * 5}%` }}
                  initial={{ opacity: 0.05 }}
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{
                    duration: 4 + (i % 4),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                />
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
              <div className="inline-flex items-center bg-slate-100 px-3 py-1.5 rounded-full mb-6 border border-slate-200">
                <div className="w-2 h-2 bg-slate-600 rounded-full mr-2 animate-pulse"></div>
                <span className="text-slate-700 text-xs uppercase tracking-widest font-medium">Application Portal</span>
              </div>
              
              <h1 className="text-4xl font-roboto font-light text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
                Research Programs
              </h1>
              
              <p className="mt-5 max-w-2xl mx-auto text-xl text-slate-600 font-light">
                Present Research at Conferences, Universities, and Summits
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Programs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-light text-slate-900 mb-12 text-center">Available Programs</h2>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all duration-300 hover:shadow-xl shadow-lg"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {program.subtitle}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-medium text-slate-900 mb-4">{program.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-slate-600">
                        <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-slate-500" />
                        {program.location}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-slate-500" />
                        {program.duration}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-700 mb-8 leading-relaxed font-light">
                      {program.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="text-md font-medium text-slate-900 mb-3 flex items-center">
                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center mr-2 border border-slate-200">
                          <FiCheck className="h-3 w-3 text-slate-600" />
                        </span>
                        Program Highlights
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {program.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-700">
                            <span className="text-slate-600 mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {program.id === '2' ? (
                      <a 
                        href={`/application/apply?program=${program.id}`}
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-white transition-colors"
                      >
                        Apply to Program
                        <FiArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    ) : (
                      <a 
                        href={`/application/apply?program=${program.id}`}
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-white transition-colors"
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
            <h2 className="text-3xl font-light text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-200 last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-lg font-medium text-slate-900">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <FiChevronUp className="h-5 w-5 text-slate-600" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-slate-600" />
                    )}
                  </button>
                  
                  <div 
                    className={`px-6 pb-5 text-slate-700 text-sm leading-relaxed transition-all duration-300 font-light ${
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
    </div>
  );
}
