'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiClock, FiDollarSign, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Navbar from '../../components/Navbar';

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  postedDate: string;
}

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Policy Research Analyst',
      type: 'Full-time',
      location: 'Charlottesville, VA / Remote',
      description: "Join our team as a Policy Research Analyst, where you'll work on cutting-edge research projects at the intersection of technology and policy. You'll analyze data, write reports, and contribute to policy recommendations that shape the future of technology governance.",
      requirements: [
        'Bachelor\'s or Master\'s degree in Public Policy, Political Science, or related field',
        'Strong analytical and research skills',
        'Excellent written and verbal communication',
        'Experience with policy analysis and research',
        'Ability to work independently and in teams'
      ],
      benefits: [
        'Competitive salary and benefits package',
        'Flexible work arrangements',
        'Professional development opportunities',
        'Collaborative work environment',
        'Impactful work on important policy issues'
      ],
      salary: '$60,000 - $80,000',
      postedDate: '2024-04-10'
    },
    {
      id: '2',
      title: 'Data Science Fellow',
      type: 'Fellowship',
      location: 'Remote',
      description: "Our Data Science Fellowship program offers an opportunity to work on real-world policy challenges using data science techniques. Fellows will collaborate with policy experts and develop innovative solutions to complex problems.",
      requirements: [
        'Background in Data Science, Computer Science, or related field',
        'Proficiency in Python or R',
        'Experience with data analysis and visualization',
        'Interest in policy and social impact',
        'Strong problem-solving skills'
      ],
      benefits: [
        'Stipend and professional development budget',
        'Mentorship from industry experts',
        'Networking opportunities',
        'Portfolio-building projects',
        'Flexible schedule'
      ],
      postedDate: '2024-04-10'
    }
  ];

  const jobTypes = ['All', 'Full-time', 'Fellowship', 'Internship'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-400 text-xs uppercase tracking-widest">Join Our Team</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
              Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Perrin</span>
            </h1>
            
            <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-300">
              Shape the future of technology policy through innovative research and analysis
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-black min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type === 'All' ? null : type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    (!selectedType && type === 'All') || selectedType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <FiMapPin className="mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <FiClock className="mr-1" />
                          {job.type}
                        </span>
                        {job.salary && (
                          <span className="flex items-center">
                            <FiDollarSign className="mr-1" />
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {expandedJob === job.id ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: expandedJob === job.id ? 'auto' : 0,
                    opacity: expandedJob === job.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Description</h4>
                      <p className="text-gray-300">{job.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Requirements</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="text-blue-400 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Benefits</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="text-blue-400 mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <a
                        href={`/careers/apply/${job.id}`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-500 hover:to-blue-400 transition-colors"
                      >
                        Apply Now
                        <FiArrowRight className="ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 