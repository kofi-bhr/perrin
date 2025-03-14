'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiArrowRight, FiExternalLink, FiCode, FiLayers, FiMic, FiAward } from 'react-icons/fi'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

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

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState('featured');
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Trigger card animations when tab changes
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
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
    }
  ];

  // Filter events based on active tab
  const filteredEvents = events.filter(event => event.category === activeTab);

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
      
      {/* Main content area */}
      <div className="bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Featured Event */}
          {activeTab === 'featured' && filteredEvents.length > 0 && (
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
                      FEATURED EVENT
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
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedEvent(filteredEvents[0])}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                    >
                      Learn More
                      <FiArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
                  </div>
                  
                  <div className="w-full md:w-2/5 flex justify-center">
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
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Tab Navigation */}
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
                onClick={() => setSelectedEvent(event)}
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity" 
              aria-hidden="true" 
              onClick={() => setSelectedEvent(null)}
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
                      {selectedEvent.type}
                    </div>
                    <h3 className="text-2xl leading-6 font-bold text-white mb-1" id="modal-title">
                      {selectedEvent.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
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
                      <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      {selectedEvent.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <FiClock className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      {selectedEvent.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                      {selectedEvent.location}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Event Description</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">Capacity</h4>
                      <p className="text-gray-300 text-sm">
                        <FiUsers className="inline-block mr-2 h-4 w-4 text-blue-400" />
                        {selectedEvent.capacity}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">Registration</h4>
                      <p className="text-gray-300 text-sm">
                        <FiCalendar className="inline-block mr-2 h-4 w-4 text-blue-400" />
                        {selectedEvent.registration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-5 sm:px-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-t border-white/5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-white">Questions?</span> Contact events@perrin.institute
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                  >
                    Register Now
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
} 