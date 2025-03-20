'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiArrowRight, FiExternalLink, FiCode, FiLayers, FiMic, FiAward, FiUser, FiSearch, FiMail } from 'react-icons/fi'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { useInView } from 'react-intersection-observer'

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string;
  registration: string;
  category: string;
  icon: any;
  bgColor: string;
  image?: string;
  tags?: string[];
  speakers?: { name: string; title: string; image?: string }[];
  featured?: boolean;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Combined card variants (merging fadeIn and cardHover)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  rest: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "tween", ease: "easeOut", duration: 0.3 }
  }
}

// Add scroll reveal animation
const scrollReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Update Oxford branding colors
const oxfordBlue = 'from-[#002147]'; // Oxford Blue
const oxfordAccent = 'to-[#8c1515]'; // Oxford Accent (more accurate than "Oxford Red")

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('featured');
  const [animateCards, setAnimateCards] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Intersection Observer for scroll animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Trigger card animations when tab changes
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
    
    // Reset filters when changing tabs
    setSearchQuery('');
  }, [activeTab]);

  const events: Event[] = [
    {
      id: '1',
      title: 'Policy Hackathon: Climate Solutions',
      type: 'Hackathon',
      date: 'June 15-17, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'UVA Rotunda & Virtual',
      description: "Join our intensive 3-day hackathon focused on developing innovative policy solutions for climate change. Teams will work with mentors from environmental policy, data science, and economics to create comprehensive policy proposals addressing specific climate challenges. The winning team will have the opportunity to present their solution to Virginia state policymakers and receive a $2,500 research grant.",
      capacity: '100 participants (25 teams)',
      registration: 'Open until May 30, 2024',
      category: 'featured',
      icon: FiCode,
      bgColor: 'from-blue-600/20 to-cyan-600/20'
    },
    {
      id: '2',
      title: 'Distinguished Speaker Series: The Future of AI Governance',
      type: 'Speaker Series',
      date: 'April 12, 2024',
      time: '7:00 PM - 9:00 PM',
      location: 'UVA Darden School of Business, Room 120',
      description: "Join us for an evening with Dr. Alondra Nelson, former Deputy Director for Science and Society at the White House Office of Science and Technology Policy. Dr. Nelson will discuss emerging frameworks for AI governance, ethical considerations in AI development, and the role of policy in shaping responsible innovation. The lecture will be followed by a moderated Q&A session and networking reception.",
      capacity: '250 attendees',
      registration: 'Required, free admission',
      category: 'upcoming',
      icon: FiMic,
      bgColor: 'from-purple-600/20 to-pink-600/20'
    },
    {
      id: '3',
      title: 'Policy Research Workshop: Data Visualization for Impact',
      type: 'Workshop',
      date: 'May 5, 2024',
      time: '1:00 PM - 4:00 PM',
      location: 'UVA Democracy Initiative, Room 302',
      description: "This hands-on workshop will teach participants how to transform complex policy data into compelling visual narratives. Led by data visualization experts from the Washington Post and the Urban Institute, attendees will learn principles of effective data storytelling, tools for creating interactive visualizations, and strategies for communicating policy insights to diverse audiences. Participants should bring laptops with Tableau Public installed.",
      capacity: '40 participants',
      registration: 'Required, $25 fee (waived for UVA students)',
      category: 'upcoming',
      icon: FiLayers,
      bgColor: 'from-green-600/20 to-emerald-600/20'
    },
    {
      id: '4',
      title: 'Annual Policy Research Symposium',
      type: 'Conference',
      date: 'July 20-21, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'UVA Batten School of Leadership and Public Policy',
      description: "The Perrin Institute's flagship annual event brings together student researchers, faculty mentors, and policy practitioners to showcase innovative policy research. The two-day symposium features student research presentations, panel discussions with policy experts, and workshops on translating research into policy impact. This year's theme focuses on 'Evidence-Based Approaches to Social Inequality.'",
      capacity: '300 attendees',
      registration: 'Required, free for presenters and UVA affiliates',
      category: 'featured',
      icon: FiUsers,
      bgColor: 'from-amber-600/20 to-orange-600/20'
    },
    {
      id: '5',
      title: 'Policy Case Competition: Urban Innovation',
      type: 'Competition',
      date: 'September 10, 2024',
      time: '10:00 AM - 8:00 PM',
      location: 'UVA School of Architecture',
      description: "Teams will tackle real urban policy challenges provided by the City of Charlottesville. This one-day intensive competition challenges participants to develop innovative, implementable solutions for urban mobility, affordable housing, or sustainable infrastructure. Teams will present their proposals to a panel of judges including city officials, urban planners, and policy experts. The winning team will receive a $1,500 prize and the opportunity to develop their proposal with city planners.",
      capacity: '80 participants (20 teams)',
      registration: 'Opens July 1, 2024',
      category: 'upcoming',
      icon: FiAward,
      bgColor: 'from-red-600/20 to-rose-600/20'
    },
    {
      id: '6',
      title: 'Policy Writing Workshop Series',
      type: 'Workshop Series',
      date: 'Every Thursday in October 2024',
      time: '5:30 PM - 7:30 PM',
      location: 'UVA Writing Center',
      description: "Develop your policy writing skills in this four-part workshop series. Sessions cover policy brief writing, op-ed development, research paper structuring, and writing for general audiences. Each workshop combines instruction with hands-on practice and peer feedback. Participants who attend all four sessions will receive a certificate of completion and have the opportunity to publish their work on the Perrin Institute blog.",
      capacity: '30 participants per session',
      registration: 'Rolling admission, apply by September 15',
      category: 'upcoming',
      icon: FiLayers,
      bgColor: 'from-blue-600/20 to-indigo-600/20'
    },
    {
      id: '7',
      title: 'Oxford Policy Forum: Global Governance Meetup',
      type: 'Meetup',
      date: '',
      time: '9:00 AM - 6:00 PM',
      location: 'Blavatnik School of Government, Oxford University',
      description: "A distinguished meetup hosted at Oxford University's Blavatnik School of Government where Perrin Institute researchers presented alongside Oxford faculty on pressing global governance challenges. This three-day event featured keynote addresses, interactive workshops, and research presentations focused on institutional innovation in an age of complex global challenges. Participants engaged in productive discussions on multilateral cooperation frameworks, digital governance models, and emerging approaches to international policy coordination.",
      capacity: '150 participants',
      registration: 'By invitation only (completed)',
      category: 'oxford',
      icon: FiUsers,
      bgColor: 'from-blue-600/20 to-purple-600/20',
      image: '/IMG_9339.jpg',
      tags: ['Global Policy', 'Governance', 'International Relations'],
      featured: true,
      speakers: [
        { 
          name: 'Professor Louise Richardson', 
          title: 'Former Vice-Chancellor, University of Oxford' 
        },
        { 
          name: 'Dr. Thomas Hale', 
          title: 'Associate Professor of Global Public Policy, Oxford' 
        },
        { 
          name: 'Professor Ian Goldin', 
          title: 'Professor of Globalization and Development, Oxford' 
        }
      ]
    },
    {
      id: '8',
      title: 'Climate Resilience Workshop at Oxford',
      type: 'Workshop',
      date: 'May 26, 2023',
      time: '10:00 AM - 4:00 PM',
      location: 'Smith School of Enterprise and Environment, Oxford',
      description: "A collaborative workshop during our Oxford meetup, focused on climate adaptation policy. Researchers from the Perrin Institute joined experts from Oxford's Environmental Change Institute to discuss frameworks for assessing climate resilience initiatives. Participants exchanged methodologies for policy evaluation and explored comparative approaches to incentivizing local and regional climate adaptation strategies.",
      capacity: '40 researchers',
      registration: 'By invitation only (completed)',
      category: 'oxford',
      icon: FiLayers,
      bgColor: 'from-green-700/20 to-blue-600/20',
      tags: ['Climate', 'Resilience', 'Adaptation'],
      speakers: [
        { 
          name: 'Dr. Friederike Otto', 
          title: 'Senior Lecturer in Climate Science, Imperial College London' 
        },
        { 
          name: 'Professor Jim Hall', 
          title: 'Professor of Climate and Environmental Risk, Oxford' 
        }
      ]
    },
    {
      id: '9',
      title: 'Transatlantic Student Policy Challenge',
      type: 'Competition',
      date: 'September 5-7, 2024',
      time: 'All day',
      location: 'Oxford Martin School & Virtual',
      description: "An intensive policy case competition bringing together students from Oxford and UVA. Mixed teams will tackle real-world policy challenges presented by government and NGO partners. The competition includes mentorship sessions, professional development workshops, and opportunities to present solutions directly to policymakers. Winning proposals will be published in a joint Oxford-Perrin policy brief series and teams will receive implementation support.",
      capacity: '60 students (15 teams)',
      registration: 'Applications open June 1, 2024',
      category: 'oxford',
      icon: FiAward,
      bgColor: 'from-red-600/20 to-blue-600/20',
      tags: ['Competition', 'Student', 'International'],
      speakers: [
        { 
          name: 'Professor Eric Patashnik', 
          title: 'Director, Perrin Institute' 
        },
        { 
          name: 'Dr. Maya Tudor', 
          title: 'Associate Professor of Government and Public Policy, Oxford' 
        }
      ]
    }
  ];

  // Filter events based on active tab and search
  const filteredEvents = events.filter(event => {
    // First filter by tab
    if (event.category !== activeTab) return false;
    
    // Then by search query if present
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Function to render the icon component
  const renderIcon = (IconComponent: any, size: string) => {
    if (!IconComponent) return null;
    return <IconComponent size={size} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-400 text-xs uppercase tracking-widest">Events & Programs</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
              Perrin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Events</span>
            </h1>
            
            <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-300">
              Hackathons, workshops, speaker series, and research symposiums
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Oxford Partnership Banner - Only show if not on Oxford tab */}
      {activeTab !== 'oxford' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative -mt-8 mb-12 z-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 shadow-xl">
              <div className="absolute inset-0 bg-[url('/images/oxford-pattern.svg')] opacity-10"></div>
              <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-purple-500/10 to-transparent"></div>
              
              <div className="relative px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-6 md:mb-0">
                  <div className="flex-shrink-0 h-14 w-14 rounded-full bg-blue-600/30 border-2 border-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">Oxford Meetup</h3>
                    <p className="text-sm text-gray-300">Distinguished meetup at Oxford University</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('oxford')}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg"
                >
                  View Oxford Meetup
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Main content area */}
      <div className="bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Oxford header - Only show when on Oxford tab */}
          {activeTab === 'oxford' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent"></div>
                <div className="absolute h-full w-1/3 right-0 bg-[url('/images/oxford-pattern.svg')] bg-repeat opacity-5"></div>
                
                <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-3/5">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-200 border border-blue-900/70 mb-4">
                      DISTINGUISHED MEETUP
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Perrin at Oxford</h2>
                    <p className="text-gray-300 mb-6">
                      Our distinguished researchers participated in a prestigious academic meetup at Oxford University, exchanging ideas with leading scholars in policy and governance. This exclusive meetup facilitated valuable connections between our institute and Oxford's renowned academic community.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-400">
                        <FiUsers className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        Academic Exchange
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <FiLayers className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        Policy Discussions
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        Oxford, UK
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/5 flex justify-center">
                    <div className="relative w-72 h-72 rounded-2xl overflow-hidden border border-white/10">
                      <Image 
                        src="/IMG_1904.jpg" 
                        alt="Perrin Institute at Oxford" 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-0 right-0 text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/70 text-white backdrop-blur-sm">
                          May 2023
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Featured Event - For any tab */}
          {filteredEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-3/5">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800/50 mb-4">
                      {activeTab === 'oxford' ? 'OXFORD MEETUP' : 'FEATURED EVENT'}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{filteredEvents[0].title}</h2>
                    <p className="text-gray-300 mb-6">{filteredEvents[0].description.substring(0, 200)}...</p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-400">
                        <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        {filteredEvents[0].date}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        {filteredEvents[0].location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/5 flex justify-center">
                    {filteredEvents[0].image ? (
                      <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-white/10">
                        <Image 
                          src={filteredEvents[0].image} 
                          alt={filteredEvents[0].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{filteredEvents[0].type}</div>
                          <div className="text-sm font-medium text-white">{filteredEvents[0].time}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-64 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
                        <div className="w-24 h-24 text-white/30">
                          {renderIcon(filteredEvents[0].icon, "96")}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{filteredEvents[0].type}</div>
                          <div className="text-sm font-medium text-white">{filteredEvents[0].time}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Tab Navigation with Oxford tab */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-lg bg-white/[0.03] backdrop-blur-sm border border-white/10">
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === 'featured'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('oxford')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === 'oxford'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Oxford Meetup
              </button>
            </div>
          </div>

          {/* Search Bar for events */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Events Grid */}
          <motion.div 
            initial="hidden"
            animate={animateCards ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent hover:border-white/20 transition-all duration-300 shadow-xl"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.bgColor} opacity-20 transition-opacity group-hover:opacity-30`}></div>
                
                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center">
                      <div className="h-6 w-6 text-blue-400">
                        {renderIcon(event.icon, "24")}
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800/50">
                      {event.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      {event.location}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                      <FiArrowRight className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/20 mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No events found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We couldn't find any events in this category. Check back later for updates.
              </p>
            </motion.div>
          )}
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
                  <p className="text-gray-300 max-w-xl">
                    Subscribe to our newsletter to receive updates about upcoming events, workshops, and opportunities at the Perrin Institute.
                  </p>
                </div>
                
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                  >
                    Subscribe
                    <FiExternalLink className="ml-2 h-5 w-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements - FAANG level polish */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow-reverse"></div>
        
        {/* Particle effects */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float-particle ${Math.floor(Math.random() * 10) + 15}s linear infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
} 