"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiLayers, FiChevronRight, FiExternalLink, FiAward, FiMapPin } from "react-icons/fi";
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
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-3 mr-4 shadow-lg shadow-blue-500/10 border border-blue-500/20">
                  <FiLayers className="h-7 w-7 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                    Research Labs
                  </h1>
                  <div className="h-1 w-32 bg-blue-500/50 mt-3 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/80 max-w-3xl font-light leading-relaxed"
              >
                Our specialized research labs tackle complex policy challenges through innovation, data, and interdisciplinary collaboration.
              </motion.p>
              
              {/* Category filters with prestigious styling */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-3 pt-10"
              >
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-500/30"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/5"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Main content with lab cards */}
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
                  <div className={`${lab.color} relative px-7 pt-8 pb-10`}>
                    {/* Decorative pattern in background */}
                    <div className="absolute inset-0 opacity-8 bg-[linear-gradient(135deg,rgba(255,255,255,0)_25%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                    
                    {/* Prestigious corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-white/20"></div>
                    </div>
                    
                    {/* Lab icon with improved styling */}
                    <div className="inline-flex items-center">
                      <div className={`rounded-lg p-3 ${lab.textColor} bg-black/20 backdrop-blur-sm shadow-xl border border-white/10 group-hover:scale-105 transition-transform duration-500`}>
                        {IconComponent && <IconComponent className="h-7 w-7" />}
                      </div>
                      <div className="ml-4">
                        <h2 className={`text-xl font-semibold ${lab.textColor} tracking-tight`}>{lab.title}</h2>
                        <div className="h-0.5 w-12 bg-white/30 mt-1.5"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area with improved styling */}
                  <div className="px-7 py-8 bg-gradient-to-br from-gray-900/90 to-gray-900/70">
                    <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">{lab.description}</p>
                    
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
