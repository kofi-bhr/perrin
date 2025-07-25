'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiClock, FiChevronDown, FiChevronUp, FiUsers, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  urgency: 'low' | 'medium' | 'high';
}

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Junior Policy Research Assistant',
      type: 'Full-time',
      location: 'Charlottesville, VA / Hybrid',
      department: 'Research',
      salaryRange: '$35,000 - $45,000',
      description: "Join our research team to support policy analysis and contribute to meaningful research on technology governance. You'll assist with research projects, help draft reports, and learn from experienced researchers while making a real impact on policy development.",
      requirements: [
        "Bachelor's degree in Public Policy, Political Science, Economics, or related field",
        'Strong interest in technology policy and governance',
        'Excellent research and analytical skills',
        'Strong written and verbal communication skills',
        'Proficiency in Microsoft Office and Google Workspace',
        'Ability to work independently and as part of a team',
        'Previous internship or project experience preferred but not required'
      ],
      benefits: [
        'Competitive entry-level salary',
        'Health and dental insurance',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Mentorship from senior researchers',
        'Conference attendance opportunities',
        'Career advancement pathways',
        'Student loan assistance program'
      ],
      postedDate: '2024-04-20',
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Data Analyst - Policy Research',
      type: 'Full-time',
      location: 'Charlottesville, VA / Remote',
      department: 'Research',
      salaryRange: '$40,000 - $55,000',
      description: "Help us analyze data to inform policy decisions. You'll work with datasets related to technology and governance, create visualizations, and support our research team with data-driven insights. This is a great opportunity for recent graduates interested in data science and policy.",
      requirements: [
        "Bachelor's degree in Data Science, Statistics, Economics, or related field",
        'Experience with Excel, R, or Python (any level)',
        'Interest in data visualization and analysis',
        'Basic understanding of statistics',
        'Strong problem-solving skills',
        'Willingness to learn new tools and technologies',
        'Previous coursework or projects in data analysis helpful'
      ],
      benefits: [
        'Competitive salary with growth opportunities',
        'Training in advanced data tools',
        'Health and wellness benefits',
        'Flexible work schedule',
        'Technology stipend for equipment',
        'Professional development courses',
        'Collaborative learning environment',
        'Opportunity to publish research findings'
      ],
      postedDate: '2024-04-18',
      urgency: 'high'
    },
    {
      id: '3',
      title: 'Communications and Social Media Coordinator',
      type: 'Full-time',
      location: 'Charlottesville, VA / Hybrid',
      department: 'Communications',
      salaryRange: '$32,000 - $42,000',
      description: "Help us share our research and engage with young policy enthusiasts. You'll manage our social media presence, write blog posts, and help develop content that makes policy research accessible to students and young professionals. Perfect for someone passionate about communications and policy.",
      requirements: [
        "Bachelor's degree in Communications, Marketing, Journalism, or related field",
        'Strong writing and editing skills',
        'Experience with social media platforms',
        'Basic knowledge of content creation tools',
        'Interest in policy and current events',
        'Creative thinking and attention to detail',
        'Previous internship or project experience in communications helpful'
      ],
      benefits: [
        'Entry-level salary with advancement opportunities',
        'Health benefits package',
        'Professional development in digital marketing',
        'Flexible work arrangements',
        'Creative freedom in content development',
        'Networking opportunities with policy experts',
        'Conference and event attendance',
        'Skills training and certifications'
      ],
      postedDate: '2024-04-15',
      urgency: 'medium'
    },
    {
      id: '4',
      title: 'International Studies Research Fellow',
      type: 'Full-time',
      location: 'Charlottesville, VA / Hybrid',
      department: 'International Studies',
      salaryRange: '$38,000 - $48,000',
      description: "Support our international policy research by analyzing global technology governance trends. You'll research international best practices, contribute to comparative studies, and help produce reports on global policy developments. Great opportunity for recent graduates interested in international affairs.",
      requirements: [
        "Bachelor's degree in International Relations, Political Science, or related field",
        'Strong interest in international policy and global affairs',
        'Research and analytical skills',
        'Foreign language skills preferred but not required',
        'Strong written communication abilities',
        'Ability to work with diverse international sources',
        'Previous coursework in international studies helpful'
      ],
      benefits: [
        'Competitive salary for early-career professionals',
        'Opportunities for international conferences',
        'Language learning support',
        'Health and retirement benefits',
        'Flexible work arrangements',
        'Access to global research networks',
        'Professional development in international affairs',
        'Mentorship opportunities'
      ],
      postedDate: '2024-04-12',
      urgency: 'medium'
    },
    {
      id: '5',
      title: 'Marketing and Outreach Assistant',
      type: 'Part-time',
      location: 'Charlottesville, VA / Remote',
      department: 'Marketing',
      salaryRange: '$18 - $22/hour',
      description: "Join our marketing team to help promote our policy research and engage with student communities. You'll help develop social media content, support event planning, and create materials that connect with young policy enthusiasts. Perfect for students or recent graduates.",
      requirements: [
        "Current student or recent graduate in Marketing, Communications, or related field",
        'Basic understanding of social media marketing',
        'Creative thinking and design skills',
        'Strong communication skills',
        'Interest in policy and public affairs',
        'Ability to work 15-20 hours per week',
        'Previous internship or project experience helpful'
      ],
      benefits: [
        'Flexible part-time schedule',
        'Valuable work experience',
        'Mentorship and skill development',
        'Opportunity to build professional network',
        'Possible transition to full-time role',
        'Access to professional development resources',
        'Letter of recommendation opportunities',
        'Skills training in digital marketing'
      ],
      postedDate: '2024-04-15',
      urgency: 'low'
    },
    {
      id: '6',
      title: 'Student Web Developer',
      type: 'Contract',
      location: 'Remote',
      department: 'Technology',
      salaryRange: '$25 - $35/hour',
      description: "Help us improve our website and develop digital tools for policy research. You'll work on front-end development, help maintain our online presence, and contribute to projects that make our research more accessible. Great opportunity for students studying computer science or web development.",
      requirements: [
        'Current student or recent graduate in Computer Science, Web Development, or related field',
        'Basic knowledge of HTML, CSS, and JavaScript',
        'Interest in web development and design',
        'Willingness to learn new technologies',
        'Strong problem-solving skills',
        'Portfolio of personal or academic projects',
        'Familiarity with version control (Git) helpful'
      ],
      benefits: [
        'Competitive hourly rate for students',
        'Flexible project timeline',
        'Remote work opportunity',
        'Real-world development experience',
        'Mentorship from experienced developers',
        'Portfolio building opportunities',
        'Access to modern development tools',
        'Possible ongoing collaboration'
      ],
      postedDate: '2024-04-10',
      urgency: 'low'
    },
    {
      id: '7',
      title: 'Policy Advocacy Intern',
      type: 'Part-time',
      location: 'Washington, DC / Hybrid',
      department: 'Government Relations',
      salaryRange: '$15 - $18/hour',
      description: "Learn about government relations and policy advocacy while supporting our efforts to engage with policymakers. You'll help research legislative developments, support briefing preparations, and gain firsthand experience in policy advocacy. Perfect for students interested in government and public service.",
      requirements: [
        'Current student in Political Science, Public Policy, or related field',
        'Strong interest in government and policy advocacy',
        'Excellent research and communication skills',
        'Ability to work in Washington, DC area',
        'Professional demeanor and strong work ethic',
        'Previous internship experience helpful but not required',
        'Ability to work 15-20 hours per week during school year'
      ],
      benefits: [
        'Valuable government relations experience',
        'Networking opportunities in Washington, DC',
        'Mentorship from policy professionals',
        'Flexible schedule for students',
        'Professional development opportunities',
        'Exposure to high-level policy discussions',
        'Letter of recommendation',
        'Possible transition to full-time role after graduation'
      ],
      postedDate: '2024-04-08',
      urgency: 'high'
    }
  ];

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract'];
  const departments = ['All', 'Research', 'Communications', 'International Studies', 'Marketing', 'Technology', 'Government Relations'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || selectedType === 'All' || job.type === selectedType;
    const matchesDepartment = !selectedDepartment || selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesSearch && matchesType && matchesDepartment;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Research': return <FiBookOpen className="w-4 h-4" />;
      case 'Communications': return <FiUsers className="w-4 h-4" />;
      case 'Government Relations': return <FiTrendingUp className="w-4 h-4" />;
      default: return <FiUsers className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              <span className="text-xs sm:text-sm font-medium text-slate-600 tracking-wide mx-4">JOIN OUR MISSION</span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-tight tracking-tight mb-6 font-roboto">
              Shape Policy
              <br />
              <span className="font-medium text-slate-700">at Perrin</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 font-light leading-relaxed font-roboto max-w-3xl mx-auto">
              Join a community of researchers, analysts, and innovators working to transform how policy is made in the digital age
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8 sm:mb-12 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 font-roboto"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={selectedType || 'All'}
                  onChange={(e) => setSelectedType(e.target.value === 'All' ? null : e.target.value)}
                  className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-roboto"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select
                  value={selectedDepartment || 'All'}
                  onChange={(e) => setSelectedDepartment(e.target.value === 'All' ? null : e.target.value)}
                  className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-roboto"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-slate-600 text-sm font-roboto">
              Showing {filteredJobs.length} of {jobs.length} positions
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4 sm:space-y-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full p-6 sm:p-8 text-left"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl sm:text-2xl font-medium text-slate-900 font-roboto">{job.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3 font-roboto">
                        <span className="flex items-center">
                          {getDepartmentIcon(job.department)}
                          <span className="ml-2">{job.department}</span>
                        </span>
                        <span className="flex items-center">
                          <FiMapPin className="mr-2" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <FiClock className="mr-2" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base line-clamp-2 font-roboto font-light">{job.description}</p>
                    </div>
                    <div className="text-slate-400 ml-4">
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
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-3 font-roboto">Description</h4>
                      <p className="text-slate-600 font-roboto font-light leading-relaxed">{job.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-3 font-roboto">Requirements</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start text-slate-600 font-roboto font-light">
                            <span className="text-teal-600 mr-3 font-medium">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-3 font-roboto">Benefits</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-slate-600 font-roboto font-light">
                            <span className="text-teal-600 mr-3 font-medium">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <a
                        href={`/careers/apply/${job.id}`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 font-roboto"
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

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-600 text-lg mb-4 font-roboto">No jobs found matching your criteria</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType(null);
                  setSelectedDepartment(null);
                }}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-roboto font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 