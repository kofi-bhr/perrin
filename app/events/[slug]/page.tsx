"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiUsers, FiFileText, FiMail, FiArrowLeft, FiArrowRight, FiExternalLink, FiCalendar, FiMapPin, FiClock, FiInfo, FiMessageCircle, FiLinkedin, FiTwitter, FiCheckCircle, FiCamera } from "react-icons/fi";

// Define types for event data
interface Participant {
  name: string;
  bio: string;
  organization?: string;
  image?: string;
}

interface Outcome {
  title: string;
  description: string;
}

interface AgendaItem {
  title: string;
  description: string;
}

interface EventData {
  slug: string;
  title: string;
  date: string;
  location: string;
  type: string;
  attendance: string;
  schedule: string;
  description: string;
  longDescription: string;
  image: string;
  contactEmail: string;
  participants: Participant[];
  outcomes: Outcome[];
  agenda: AgendaItem[];
  about: string[];
  color?: string;
  gallery?: string[];
}

// Event data for Oxford Meetup
const eventData: EventData = {
  slug: "oxford-policy-meetup",
  title: "Oxford Policy Exchange",
  date: "May 2023 (Past Event)",
  location: "Oxford University, UK",
  type: "Informal Academic Exchange",
  attendance: "Small delegation",
  schedule: "3-day informal visit",
  description: "A casual academic exchange where Perrin Institute researchers met with Oxford faculty to discuss shared interests in policy research.",
  longDescription: "In May 2023, a small delegation from the Perrin Institute visited Oxford University for a three-day informal academic exchange. The meetup facilitated conversations between our researchers and Oxford faculty on shared research interests, potential collaborations, and the exchange of ideas in policy research.",
  image: "/images/events/oxford-event.jpg",
  contactEmail: "admin@perrininstitution.com",
  participants: [],
  outcomes: [
    {
      title: "Research Insights",
      description: "Gained valuable perspective on Oxford's approach to policy research and methodology, which will inform our future work."
    },
    {
      title: "Academic Connections",
      description: "Established informal connections with Oxford faculty that may lead to future collaborative opportunities."
    },
    {
      title: "Knowledge Exchange",
      description: "Shared Perrin Institute's research focus areas and received feedback from experienced Oxford academics."
    }
  ],
  agenda: [
    {
      title: "Day 1: Introductions & Campus Tour",
      description: "Meet with faculty hosts, tour of research facilities, and initial discussions of shared interests."
    },
    {
      title: "Day 2: Discussion Sessions",
      description: "Informal roundtable discussions on current research projects and methodologies."
    },
    {
      title: "Day 3: Next Steps & Wrap-up",
      description: "Exploration of potential future collaborations and closing conversations."
    }
  ],
  about: [
    "In May 2023, a small delegation from the Perrin Institute visited Oxford University for an informal academic exchange. This was not a formal conference or lecture, but rather a series of casual meetings with faculty members.",
    "Over three days, our researchers engaged in discussions about current research projects, toured research facilities, and explored areas of mutual interest in policy research. These conversations provided valuable insights into methodological approaches and research priorities.",
    "The visit focused on building relationships between our institute and Oxford faculty, establishing connections that may lead to future collaborative opportunities. While informal in nature, this meetup represented an important step in expanding our academic network and gaining perspective from respected scholars in our field."
  ],
  gallery: [
    "/IMG_1904.jpg",
    "/IMG_9339.jpg"
  ]
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Subtle parallax effect for elements
const parallaxY = (y: number) => ({
  y: y,
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
});

export default function EventDetailPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const [event, setEvent] = useState<EventData>(eventData);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const parallaxBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  useEffect(() => {
    // Simulate loading event data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-r-4 border-slate-600 border-l-transparent border-b-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-slate-600 animate-pulse font-light tracking-wider font-roboto">Loading event details...</p>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 text-slate-900 font-roboto">
        <h1 className="text-3xl font-light mb-4">Event Not Found</h1>
        <p className="mb-8 text-slate-600 max-w-md text-center leading-relaxed font-light">
          The event you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/events" 
          className="flex items-center bg-slate-900 hover:bg-slate-800 transition-all duration-300 text-white py-3 px-6 rounded-lg shadow-lg"
        >
          <FiArrowLeft className="mr-2" /> Return to Events
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 font-roboto">
      {/* Hero section with parallax effect */}
      <div className="relative h-[80vh] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Background image or gradient with parallax */}
        <motion.div 
          style={{ y: parallaxBackground }}
          className="absolute inset-0 bg-gradient-to-br from-slate-100/40 to-white"
        >
          {/* Professional background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.02]">
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
          
          {/* Professional accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-300/0 via-slate-400/30 to-slate-300/0"></div>
        </motion.div>
        
        {/* Event header content */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerTranslateY }}
          className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 z-10"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              {/* Event navigation with refined styling */}
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <Link 
                  href="/events"
                  className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
                >
                  <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> 
                  <span className="text-sm uppercase tracking-widest font-light">Back to Events</span>
                </Link>
                
                {/* Professional institute brand */}
                <div className="hidden md:block text-right">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-light">Perrin Institute</p>
                  <p className="text-sm text-slate-600 italic font-light">Academic Excellence</p>
                </div>
              </motion.div>
              
              {/* Event tag */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 mb-4">
                  PAST EVENT
                </div>
              </motion.div>
              
              {/* Event title and date with enhanced styling */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight">
                  Oxford Policy Exchange
                </h1>
                <div className="h-1 w-24 bg-slate-400/50 rounded-full"></div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-600">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 text-slate-500" />
                    May 2023 (Past Event)
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-2 text-slate-500" />
                    Oxford University, UK
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="mr-2 text-slate-500" />
                    Small delegation
                  </div>
                </div>
              </motion.div>
              
              {/* Event description with refined typography */}
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-slate-600 max-w-3xl font-light leading-relaxed"
              >
                A casual academic exchange where Perrin Institute researchers met with Oxford faculty to discuss shared interests in policy research.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Main content - 2/3 width */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-16">
            {/* About section with professional styling */}
            <section className="bg-white rounded-xl p-10 shadow-lg border border-slate-200 relative overflow-hidden">
              {/* Professional accent corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-slate-300/30"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-8">
                  <FiInfo className="text-slate-600 mr-4 text-2xl mt-1" />
                  <h2 className="text-3xl font-light tracking-tight text-slate-900">About the Meetup</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 leading-relaxed text-lg font-light">{event.about[0]}</p>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mt-4 font-light">{event.about[1]}</p>
                  
                  <p className="text-slate-700 leading-relaxed text-lg mt-4 font-light">{event.about[2]}</p>
                  
                  <div className="mt-12 border-t border-slate-200 pt-10">
                    <h3 className="text-2xl font-medium mb-6 text-slate-900 tracking-tight">Activities</h3>
                    <p className="text-slate-700 leading-relaxed text-lg font-light">The visit included casual meetings with Oxford faculty members, tours of research facilities, informal discussions over meals, and networking opportunities. The format was deliberately kept flexible to allow for organic conversations and relationship building.</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Outcomes section with professional styling */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-10 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-slate-300/30"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-8">
                  <FiMessageCircle className="text-slate-600 mr-4 text-2xl mt-1" />
                  <h2 className="text-3xl font-light tracking-tight text-slate-900">Meetup Outcomes</h2>
                </div>
                <div className="space-y-6">
                  {event.outcomes.map((outcome, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 mr-4">
                        <span className="text-slate-600 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-slate-900 leading-relaxed font-medium">{outcome.title}</p>
                        <p className="text-slate-700 leading-relaxed font-light">{outcome.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </motion.div>
          
          {/* Sidebar - 1/3 width */}
          <motion.div variants={containerVariants} className="space-y-10">
            {/* Photo gallery instead of participants section */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent elements */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiCamera className="text-slate-600 mr-3 text-xl" />
                  <h2 className="text-2xl font-light tracking-tight text-slate-900">Event Photos</h2>
                </div>
                
                <div className="space-y-4">
                  {event.gallery?.map((image, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                      <div className="relative h-40 bg-gradient-to-r from-slate-100 to-slate-200">
                        {image && (
                          <Image 
                            src={image} 
                            alt={`Oxford Visit Photo ${index + 1}`} 
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
            
            {/* Contact section with professional styling */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiMail className="text-slate-600 mr-3 text-xl" />
                  <h2 className="text-2xl font-light tracking-tight text-slate-900">Contact</h2>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed font-light">
                  Interested in learning more about our Oxford visit and potential future collaborations?
                </p>
                <a 
                  href={`mailto:${event.contactEmail}`}
                  className="block w-full text-center py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Event Team
                </a>
              </div>
            </motion.section>
            
            {/* Event details section */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent elements */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiInfo className="text-slate-600 mr-3 text-xl" />
                  <h2 className="text-2xl font-light tracking-tight text-slate-900">Meetup Details</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-600">Type</span>
                    <span className="text-slate-900 font-medium">Informal Academic Exchange</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-600">Date</span>
                    <span className="text-slate-900 font-medium">{event.date} (Past)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-600">Schedule</span>
                    <span className="text-slate-900 font-medium">Various sessions</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-600">Location</span>
                    <span className="text-slate-900 font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Attendance</span>
                    <span className="text-slate-900 font-medium">{event.attendance}</span>
                  </div>
                </div>
              </div>
            </motion.section>
            
            {/* Professional institute badge */}
            <motion.div 
              variants={itemVariants}
              className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200 space-y-3"
            >
              <div className="h-0.5 w-12 bg-slate-400/50 mx-auto mb-4"></div>
              <p className="text-xs uppercase tracking-widest text-slate-600 font-light">Perrin Institute</p>
              <p className="text-sm text-slate-700 font-light">Excellence in International Collaboration</p>
              <div className="h-0.5 w-12 bg-slate-400/50 mx-auto mt-4"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 