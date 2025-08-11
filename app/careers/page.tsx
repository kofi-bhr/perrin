'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiClock, FiChevronDown, FiChevronUp, FiUsers, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import { getJobs } from '../../lib/jobs';

interface JobUI {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  salaryRange?: string;
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
  const [jobs, setJobs] = useState<JobUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    // Try restore from sessionStorage to avoid pop-in on back navigation
    try {
      const cached = sessionStorage.getItem('careers-jobs');
      const ui = sessionStorage.getItem('careers-ui');
      if (cached) {
        const parsed: JobUI[] = JSON.parse(cached);
        setJobs(parsed);
        setLoading(false);
        setRestored(true);
      }
      if (ui) {
        const parsedUi = JSON.parse(ui);
        if (typeof parsedUi.searchQuery === 'string') setSearchQuery(parsedUi.searchQuery);
        if (parsedUi.selectedType === null || typeof parsedUi.selectedType === 'string') setSelectedType(parsedUi.selectedType);
        if (parsedUi.selectedDepartment === null || typeof parsedUi.selectedDepartment === 'string') setSelectedDepartment(parsedUi.selectedDepartment);
      }
    } catch {}

    (async () => {
      try {
        const data = await getJobs();
        const active = data.filter((j) => j.active);
        setJobs(active);
        // Cache latest
        try { sessionStorage.setItem('careers-jobs', JSON.stringify(active)); } catch {}
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persist UI state
  useEffect(() => {
    try {
      sessionStorage.setItem('careers-ui', JSON.stringify({ searchQuery, selectedType, selectedDepartment }));
    } catch {}
  }, [searchQuery, selectedType, selectedDepartment]);

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Fellowship'];
  const departments = ['All', ...Array.from(new Set(jobs.map((j) => j.department)))];

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
                {loading ? (
                  <div className="h-[44px] w-full bg-slate-100 border border-slate-200 rounded-lg animate-pulse" />
                ) : (
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 font-roboto"
                  />
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {loading ? (
                  <>
                    <div className="h-[44px] w-40 bg-slate-100 border border-slate-200 rounded-lg animate-pulse" />
                    <div className="h-[44px] w-40 bg-slate-100 border border-slate-200 rounded-lg animate-pulse" />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
            <div className="text-slate-600 text-sm font-roboto min-h-[20px]">
              {!loading && <span>Showing {filteredJobs.length} of {jobs.length} positions</span>}
            </div>
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="space-y-4 sm:space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 animate-pulse">
                  <div className="h-6 w-2/3 bg-slate-100 rounded mb-3" />
                  <div className="flex gap-4 mb-4">
                    <div className="h-4 w-24 bg-slate-100 rounded" />
                    <div className="h-4 w-32 bg-slate-100 rounded" />
                    <div className="h-4 w-20 bg-slate-100 rounded" />
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                  initial={restored ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: restored ? 0.15 : 0.3, ease: 'easeOut' }}
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
          )}

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