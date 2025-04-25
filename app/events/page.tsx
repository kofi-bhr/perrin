'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiArrowRight, FiExternalLink, FiCode, FiLayers, FiMic, FiAward, FiUser, FiSearch, FiInfo, FiChevronRight } from 'react-icons/fi'
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
  participants?: { name: string; title: string }[];
  featured?: boolean;
  isUpcoming: boolean;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Card hover effect
const cardHover = {
  rest: { y: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)", 
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

// Update Oxford branding colors
const oxfordBlue = 'from-[#002147]'; // Oxford Blue
const oxfordAccent = 'to-[#8c1515]'; // Oxford Accent (more accurate than "Oxford Red")

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const parallaxBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
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
      title: 'Oxford Policy Meetup',
      type: 'Informal Academic Exchange',
      date: 'May 15-17, 2023',
      time: '9:00 AM - 6:00 PM',
      location: 'Blavatnik School of Government, Oxford University',
      description: "A casual academic exchange where Perrin Institute researchers met with Oxford faculty to discuss shared interests in policy research. This three-day visit facilitated informal conversations on current research projects, potential collaborations, and the exchange of ideas. The format was deliberately kept flexible to allow for organic conversations and relationship building.",
      capacity: 'Small delegation',
      registration: 'By invitation only (completed)',
      category: 'oxford',
      icon: FiUsers,
      bgColor: 'from-blue-600/20 to-purple-600/20',
      image: '/IMG_9339.jpg',
      tags: ['Academic Exchange', 'Research', 'Networking'],
      featured: true,
      participants: [
        { 
          name: 'Perrin Institute Delegation', 
          title: 'Research Team' 
        },
        { 
          name: 'Oxford Faculty Hosts', 
          title: 'Blavatnik School of Government' 
        }
      ],
      isUpcoming: false
    }
  ];

  // Group categories for filter display - simplified since only one category
  const categories = ['all'];

  // Filter events based on search only
  const filteredEvents = events.filter(event => {
    // Only filter by search query
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
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section with parallax effect */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background gradient and pattern */}
        <motion.div 
          style={{ y: parallaxBackground }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black"
        >
          {/* Prestigious background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.4)_0%,rgba(0,0,0,0)_70%)]"></div>
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
          
          {/* Prestigious accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
        </motion.div>
        
        {/* Hero content */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerTranslateY }}
          className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 z-10"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Institute badge */}
              <motion.div variants={itemVariants} className="hidden md:flex items-center mb-4">
                <div className="h-px w-10 bg-blue-500/50 mr-3"></div>
                <p className="text-xs uppercase tracking-widest text-white/60 font-light">Perrin Institute</p>
              </motion.div>
            
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-3 mr-4 shadow-lg shadow-blue-500/10 border border-blue-500/20">
                  <FiCalendar className="h-7 w-7 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                    Events
                  </h1>
                  <div className="h-1 w-32 bg-blue-500/50 mt-3 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/80 max-w-3xl font-light leading-relaxed"
              >
                Explore academic exchanges, research symposiums, and policy discussions hosted by the Perrin Institute.
              </motion.p>
              
              {/* Category filters with prestigious styling */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-3 pt-10"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === category
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-500/30"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/5"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Main content with event cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-24 relative z-10">
        {/* Institute description for prestigious tone */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-blue-500/50 mr-4"></div>
            <p className="text-sm uppercase tracking-widest text-blue-400/80 font-light">Academic & Policy Forums</p>
            <div className="h-px w-8 bg-blue-500/50 ml-4"></div>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-light italic">
            Connecting researchers, policymakers, and academic institutions
          </p>
        </motion.div>
        
        {/* Search Bar for events */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
            />
          </div>
        </div>
      
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredEvents.map((event) => {
            return (
              <motion.div
                key={event.id}
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={cardHover}
                className="group backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 shadow-2xl relative"
              >
                {/* Clean white border for prestigious look */}
                <div className="absolute inset-0 rounded-xl border border-white/10 z-20 pointer-events-none"></div>
                
                {/* Primary content area */}
                <div className="relative overflow-hidden">
                  {/* Header with event color and improved visuals */}
                  <div className={`bg-gradient-to-br ${event.bgColor} relative px-7 pt-8 pb-10`}>
                    {/* Decorative pattern in background */}
                    <div className="absolute inset-0 opacity-8 bg-[linear-gradient(135deg,rgba(255,255,255,0)_25%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                    
                    {/* Prestigious corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-white/20"></div>
                    </div>
                    
                    {/* Event badge */}
                    <div className="inline-flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="rounded-lg p-3 text-white bg-black/20 backdrop-blur-sm shadow-xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
                          {renderIcon(event.icon, "24")}
                        </div>
                        <div className="ml-4">
                          <h2 className="text-xl font-semibold text-white tracking-tight line-clamp-1">{event.title}</h2>
                          <div className="h-0.5 w-12 bg-white/30 mt-1.5"></div>
                        </div>
                      </div>
                      
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white backdrop-blur-sm border border-white/10">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content area with improved styling */}
                  <div className="px-7 py-8 bg-gradient-to-br from-gray-900/90 to-gray-900/70">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-300">
                        <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        <span>{event.date || "Date TBA"}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <FiClock className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4 text-blue-400" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">{event.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/events/${event.id}`}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                      >
                        <span className="relative">
                          <span className="relative z-10">Event Details</span>
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400/30 group-hover:bg-blue-400/50 transition-colors"></span>
                        </span>
                        <FiChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                      
                      {event.isUpcoming && (
                        <span className="text-xs text-blue-300 flex items-center bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-500/30">
                          {event.registration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Empty state if no events match filter */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/10 border border-blue-500/20">
              <FiCalendar className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Events Found</h3>
            <p className="text-gray-400 mb-6">No events match your current filter criteria.</p>
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-500/30"
            >
              Show All Events
            </button>
          </motion.div>
        )}
        
        {/* Prestigious footer element */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 border-t border-gray-800/50 pt-12 text-center"
        >
          <div className="flex items-center justify-center mb-5">
            <div className="h-px w-12 bg-blue-500/50 mr-5"></div>
            <FiCalendar className="text-blue-400 mx-1" />
            <FiUsers className="text-blue-400 mx-1" />
            <div className="h-px w-12 bg-blue-500/50 ml-5"></div>
          </div>
          <p className="text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            The Perrin Institute hosts a variety of events to facilitate knowledge exchange, build research partnerships, and advance discourse in policy research across different academic institutions.
          </p>
        </motion.div>
      </div>
    </div>
  )
} 