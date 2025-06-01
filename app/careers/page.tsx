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
      title: 'Senior Policy Research Analyst',
      type: 'Full-time',
      location: 'Charlottesville, VA / Hybrid',
      department: 'Research',
      salaryRange: '$75,000 - $95,000',
      description: "Lead cutting-edge research on AI policy and technology governance. You'll conduct in-depth analysis of emerging technologies, draft policy recommendations, and work with government stakeholders to implement evidence-based solutions. This role offers the opportunity to shape the future of technology policy at both state and federal levels.",
      requirements: [
        'PhD in Public Policy, Political Science, Economics, or related field',
        '5+ years of experience in policy research or analysis',
        'Strong background in quantitative and qualitative research methods',
        'Experience with AI/ML technologies and their policy implications',
        'Excellent written and verbal communication skills',
        'Experience working with government agencies or think tanks',
        'Proficiency in statistical software (R, Python, STATA)'
      ],
      benefits: [
        'Competitive salary with annual performance bonuses',
        'Comprehensive health, dental, and vision insurance',
        'Retirement plan with university matching',
        'Flexible work arrangements and remote work options',
        'Professional development budget ($3,000 annually)',
        'Conference attendance and speaking opportunities',
        'Access to UVA research facilities and libraries',
        'Sabbatical opportunities for continued research'
      ],
      postedDate: '2024-04-20',
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Data Scientist - Policy Analytics',
      type: 'Full-time',
      location: 'Charlottesville, VA / Remote',
      department: 'Research',
      salaryRange: '$80,000 - $110,000',
      description: "Join our data science team to develop innovative analytical tools for policy research. You'll work with large datasets, build predictive models, and create visualizations that help policymakers understand complex social and economic trends. Your work will directly influence policy decisions at the highest levels of government.",
      requirements: [
        'Master\'s degree in Data Science, Statistics, Computer Science, or related field',
        '3+ years of experience in data science or analytics',
        'Proficiency in Python, R, and SQL',
        'Experience with machine learning frameworks (TensorFlow, PyTorch, scikit-learn)',
        'Strong background in statistical modeling and analysis',
        'Experience with data visualization tools (Tableau, PowerBI, D3.js)',
        'Understanding of causal inference methods',
        'Experience with policy or social science research preferred'
      ],
      benefits: [
        'Competitive salary with performance incentives',
        'Stock options in spin-off technology ventures',
        'Top-tier health and wellness benefits',
        'Flexible PTO and sabbatical opportunities',
        'Latest technology and equipment provided',
        'Conference travel and professional development',
        'Collaborative, innovation-focused work environment',
        'Opportunities to publish research and present findings'
      ],
      postedDate: '2024-04-18',
      urgency: 'high'
    },
    {
      id: '3',
      title: 'Communications and Outreach Coordinator',
      type: 'Full-time',
      location: 'Charlottesville, VA / Hybrid',
      department: 'Communications',
      salaryRange: '$55,000 - $70,000',
      description: "Lead our efforts to communicate complex policy research to diverse audiences. You'll manage our digital presence, coordinate media relations, and develop content strategies that amplify our research impact. This role is perfect for someone passionate about translating academic research into accessible, actionable insights.",
      requirements: [
        'Bachelor\'s degree in Communications, Marketing, Journalism, or related field',
        '3+ years of experience in strategic communications or public relations',
        'Excellent writing and editing skills across multiple formats',
        'Experience with social media management and digital marketing',
        'Knowledge of SEO/SEM and content management systems',
        'Basic design skills and familiarity with Adobe Creative Suite',
        'Understanding of academic research and policy issues',
        'Experience with media relations and press outreach'
      ],
      benefits: [
        'Competitive salary with annual reviews',
        'Comprehensive benefits package',
        'Professional development opportunities',
        'Flexible work schedule and location',
        'Creative freedom in developing campaigns',
        'Network with leading policy experts and journalists',
        'Opportunities to attend high-profile events and conferences',
        'Health and wellness program'
      ],
      postedDate: '2024-04-15',
      urgency: 'medium'
    },
    {
      id: '4',
      title: 'Research Associate - International Policy',
      type: 'Full-time',
      location: 'Charlottesville, VA / Hybrid',
      department: 'International Studies',
      salaryRange: '$65,000 - $80,000',
      description: "Support our international policy research initiatives by conducting comparative analysis of global technology governance frameworks. You'll research international best practices, analyze cross-border policy implications, and contribute to reports that inform U.S. foreign policy on technology issues.",
      requirements: [
        'Master\'s degree in International Relations, Political Science, or related field',
        '2+ years of experience in international policy or research',
        'Strong analytical and research skills',
        'Proficiency in at least one foreign language',
        'Experience with comparative policy analysis',
        'Understanding of international law and institutions',
        'Excellent written communication skills',
        'Experience living or working abroad preferred'
      ],
      benefits: [
        'Competitive salary with growth opportunities',
        'International travel for research and conferences',
        'Language learning support and cultural exchange programs',
        'Comprehensive health and retirement benefits',
        'Flexible work arrangements',
        'Access to global research networks',
        'Professional development in international affairs',
        'Visa and work authorization support if needed'
      ],
      postedDate: '2024-04-12',
      urgency: 'medium'
    },
    {
      id: '5',
      title: 'Marketing Specialist',
      type: 'Full-time',
      location: 'Charlottesville, VA / Remote',
      department: 'Marketing',
      salaryRange: '$50,000 - $65,000',
      description: "Join our team as a Marketing Specialist and help us promote our policy research and initiatives. You'll develop creative content, manage our social media presence, and design engaging campaigns to increase the visibility and impact of our work in the policy community.",
      requirements: [
        'Bachelor\'s degree in Marketing, Communications, or related field',
        '2+ years of experience in digital marketing',
        'Proficiency in social media platforms and analytics tools',
        'Experience with email marketing and CRM systems',
        'Basic graphic design skills',
        'Understanding of content marketing strategies',
        'Excellent communication and project management skills',
        'Interest in policy and public affairs'
      ],
      benefits: [
        'Flexible work arrangements',
        'Professional development opportunities',
        'Collaborative work environment',
        'Impactful work on important policy issues',
        'Health and wellness benefits',
        'Creative freedom in campaign development',
        'Access to industry conferences and training',
        'Performance-based bonuses'
      ],
      postedDate: '2024-04-15',
      urgency: 'low'
    },
    {
      id: '6',
      title: 'UI/UX Designer',
      type: 'Contract',
      location: 'Remote',
      department: 'Technology',
      salaryRange: '$60 - $80/hour',
      description: "We're looking for a talented UI/UX Designer to help us create intuitive interfaces for our policy research tools and public-facing platforms. You'll work on data visualization interfaces, research portals, and public engagement tools that make complex policy information accessible to diverse audiences.",
      requirements: [
        'Bachelor\'s degree in Design, HCI, or related field',
        '3+ years of experience in UI/UX design',
        'Proficiency in Figma, Sketch, or similar design tools',
        'Experience with user research and usability testing',
        'Strong portfolio demonstrating data visualization design',
        'Understanding of accessibility standards (WCAG)',
        'Experience with responsive web design',
        'Knowledge of HTML/CSS and design systems'
      ],
      benefits: [
        'Competitive hourly rate',
        'Flexible project timeline',
        'Remote work flexibility',
        'Opportunity to work on high-impact projects',
        'Potential for ongoing collaboration',
        'Creative freedom and autonomy',
        'Access to cutting-edge design tools',
        'Portfolio development opportunities'
      ],
      postedDate: '2024-04-10',
      urgency: 'low'
    },
    {
      id: '7',
      title: 'Legislative Affairs Coordinator',
      type: 'Full-time',
      location: 'Washington, DC / Hybrid',
      department: 'Government Relations',
      salaryRange: '$70,000 - $90,000',
      description: "Serve as our liaison with Congress and federal agencies, helping to translate our research into actionable policy recommendations. You'll brief congressional staff, participate in policy briefings, and help build coalitions around key technology governance issues.",
      requirements: [
        'Bachelor\'s degree in Political Science, Public Policy, or related field',
        '3+ years of experience in government relations or congressional affairs',
        'Strong understanding of the legislative process',
        'Existing relationships with congressional staff and federal agencies',
        'Excellent communication and interpersonal skills',
        'Experience in technology policy preferred',
        'Ability to work in fast-paced, politically sensitive environment',
        'Strong ethical standards and discretion'
      ],
      benefits: [
        'Competitive salary with location adjustment',
        'Premium health and retirement benefits',
        'Professional development in government affairs',
        'Network building opportunities',
        'Flexible work arrangements',
        'Travel allowance for Capitol Hill meetings',
        'Access to high-level policy discussions',
        'Career advancement opportunities in public service'
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