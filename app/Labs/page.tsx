"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiLayers, FiChevronRight, FiExternalLink, FiAward, FiMapPin, FiBookOpen, FiUser } from "react-icons/fi";
import { LABS_DATA, ICONS_MAP, Lab } from "../data/labs";
import { useRouter } from "next/navigation";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
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

// Subtle hover effect for cards
const cardHover = {
  rest: { y: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)", 
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

// Shimmer animation
const shimmerAnimation = {
  hidden: { backgroundPosition: "200% 0" },
  visible: { 
    backgroundPosition: "-200% 0",
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "linear"
    }
  }
};

export default function Labs() {
  const router = useRouter();
  const [labs, setLabs] = useState<Lab[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const parallaxBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Initialize labs with icons on client side
  useEffect(() => {
    setLabs(LABS_DATA);
  }, []);

  // Group labs by first letter of category for the category filter
  const categories = Array.from(new Set(LABS_DATA.map(lab => lab.title.split(' ')[0])));

  const filteredLabs = activeCategory 
    ? labs.filter(lab => lab.title.startsWith(activeCategory))
    : labs;

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Hero section with parallax effect */}
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
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 mr-3 sm:mr-4 shadow-lg shadow-blue-500/10 border border-blue-500/20">
                  <FiLayers className="h-5 w-5 sm:h-7 sm:w-7 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                    Research Labs
                  </h1>
                  <div className="h-1 w-20 sm:w-32 bg-blue-500/50 mt-2 sm:mt-3 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl font-light leading-relaxed"
              >
                Our specialized research labs tackle complex policy challenges through innovation, data, and interdisciplinary collaboration.
              </motion.p>
              
              {/* Category filters with prestigious styling - mobile friendly */}
              <motion.div 
                variants={itemVariants}
                className="pt-6 sm:pt-10 overflow-hidden"
              >
                <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:gap-2 md:space-x-0 no-scrollbar">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`whitespace-nowrap flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeCategory === null
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-500/30"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/5"
                    }`}
                  >
                    All Labs
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-500/30"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Featured Associates - Apple/FAANG inspired design */}
      <div className="relative z-20 -mt-12 sm:-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Refined label with subtle styling */}
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <p className="text-xs uppercase tracking-wide text-white/60 font-light px-3">Featured Authors</p>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Apple/FAANG-style card grid with increased white space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Dara Mohd - Apple/FAANG styled card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-300 overflow-hidden"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row">
                  {/* Photo with clean styling */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm mb-4 sm:mb-0 sm:mr-4 border border-white/5 mx-auto sm:mx-0">
                    <Image 
                      src="/dara-mohd.jpeg" 
                      alt="Dara Mohd" 
                      width={64}
                      height={64}
                      className="object-cover w-full h-full" 
                    />
                  </div>
                  
                  {/* Content with precise typography */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-between">
                      <h3 className="text-base font-medium text-white tracking-tight">Dara Mohd</h3>
                      <a 
                        href="https://www.tiktok.com/@ladywellington_" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hidden sm:block text-white/40 hover:text-white/80 transition-all duration-300"
                      >
                        <FiExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <p className="text-sm text-white/50 mb-3 sm:mb-4">Senior Research Fellow, Legal Lab</p>
                    
                    <p className="text-sm text-white/70 mb-3 line-clamp-2">
                      Palestinian-Canadian author of 'A Darker Side of Dorcha' studying Philosophy at Oxford.
                    </p>
                    
                    <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                      <div className="inline-flex items-center py-1 px-2 bg-white/5 rounded-md">
                        <FiBookOpen className="h-3 w-3 mr-1.5 text-blue-400/70" />
                        <span className="text-xs text-white/60">Oxford University</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Kashaf Alvi - Apple/FAANG styled card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="group bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] transition-all duration-300 overflow-hidden"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row">
                  {/* Photo with clean styling */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm mb-4 sm:mb-0 sm:mr-4 border border-white/5 mx-auto sm:mx-0">
                    <Image 
                      src="/kashaf-alvi.jpg" 
                      alt="Kashaf Alvi" 
                      width={64}
                      height={64}
                      className="object-cover w-full h-full" 
                    />
                  </div>
                  
                  {/* Content with precise typography */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="text-base font-medium text-white tracking-tight">Kashaf Alvi</h3>
                    <p className="text-sm text-white/50 mb-3 sm:mb-4">Inclusive Policy Lab Director</p>
                    
                    <p className="text-sm text-white/70 mb-3 line-clamp-2">
                      Author of 'The Language of Paradise' and Pakistan's first Microsoft Associate with a disability.
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      <div className="inline-flex items-center py-1 px-2 bg-white/5 rounded-md">
                        <FiAward className="h-3 w-3 mr-1.5 text-emerald-400/70" />
                        <span className="text-xs text-white/60">Pride of Pakistan</span>
                      </div>
                      <div className="inline-flex items-center py-1 px-2 bg-white/5 rounded-md">
                        <FiUser className="h-3 w-3 mr-1.5 text-emerald-400/70" />
                        <span className="text-xs text-white/60">Global Shaper</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main content with lab cards - Moved up */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Institute description for prestigious tone */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-blue-500/50 mr-4"></div>
            <p className="text-sm uppercase tracking-widest text-blue-400/80 font-light">Excellence in Research</p>
            <div className="h-px w-8 bg-blue-500/50 ml-4"></div>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-light italic">
            Explore our world-class research labs where policy meets innovation
          </p>
        </motion.div>
      
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredLabs.map((lab) => {
            // Create icon component dynamically
            const IconComponent = ICONS_MAP[lab.iconName];
            
            return (
              <motion.div
                key={lab.id}
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
                  {/* Header with lab color and improved visuals */}
                  <div className={`${lab.color} relative px-5 sm:px-7 pt-6 sm:pt-8 pb-8 sm:pb-10`}>
                    {/* Decorative pattern in background */}
                    <div className="absolute inset-0 opacity-8 bg-[linear-gradient(135deg,rgba(255,255,255,0)_25%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                    
                    {/* Prestigious corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-white/20"></div>
                    </div>
                    
                    {/* Lab icon with improved styling */}
                    <div className="inline-flex flex-col sm:flex-row items-center sm:items-start">
                      <div className={`rounded-lg p-2.5 sm:p-3 ${lab.textColor} bg-black/20 backdrop-blur-sm shadow-xl border border-white/10 group-hover:scale-105 transition-transform duration-500 mb-3 sm:mb-0`}>
                        {IconComponent && <IconComponent className="h-5 w-5 sm:h-7 sm:w-7" />}
                      </div>
                      <div className="sm:ml-4 text-center sm:text-left">
                        <h2 className={`text-lg sm:text-xl font-semibold ${lab.textColor} tracking-tight`}>{lab.title}</h2>
                        <div className="h-0.5 w-12 bg-white/30 mt-1.5 mx-auto sm:mx-0"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area with improved styling */}
                  <div className="px-4 sm:px-7 py-6 sm:py-8 bg-gradient-to-br from-gray-900/90 to-gray-900/70">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">{lab.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/Labs/${lab.id}`}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                      >
                        <span className="relative">
                          <span className="relative z-10">Explore Lab</span>
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400/30 group-hover:bg-blue-400/50 transition-colors"></span>
                        </span>
                        <FiChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Empty state if no labs match filter */}
        {filteredLabs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/10 border border-blue-500/20">
              <FiLayers className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Labs Found</h3>
            <p className="text-gray-400 mb-6">No labs match your current filter criteria.</p>
            <button
              onClick={() => setActiveCategory(null)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-500/30"
            >
              Show All Labs
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
            <FiAward className="text-blue-400 mx-1" />
            <FiMapPin className="text-blue-400 mx-1" />
            <div className="h-px w-12 bg-blue-500/50 ml-5"></div>
          </div>
          <p className="text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            The Perrin Institute's research labs are centers of excellence dedicated to advancing the knowledge frontier and shaping policy outcomes through rigorous research and innovative methodologies.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
