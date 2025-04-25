"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiUsers, FiFileText, FiMail, FiArrowLeft, FiArrowRight, FiExternalLink, FiActivity, FiLayers } from "react-icons/fi";
import { LABS_DATA, ICONS_MAP, getLabById, Lab } from "../../data/labs";

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

export default function LabDetailPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const [lab, setLab] = useState<Lab | null>(null);
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
    if (slug) {
      const labData = getLabById(slug);
      setLab(labData || null);
      setLoading(false);
    }
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-r-4 border-blue-500 border-l-transparent border-b-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-blue-500 animate-pulse font-light tracking-wider">Loading lab data...</p>
        </div>
      </div>
    );
  }
  
  if (!lab) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Lab Not Found</h1>
        <p className="mb-8 text-gray-400 max-w-md text-center leading-relaxed">
          The research lab you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/Labs" 
          className="flex items-center bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 px-6 rounded-lg shadow-lg shadow-blue-600/10"
        >
          <FiArrowLeft className="mr-2" /> Return to Labs
        </Link>
      </div>
    );
  }

  // Get icon component
  const IconComponent = ICONS_MAP[lab.iconName];
  
  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Hero section with parallax effect */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background image or gradient with parallax */}
        <motion.div 
          style={{ y: parallaxBackground }}
          className={`absolute inset-0 ${lab.color} bg-opacity-80`}
        >
          {/* Prestigious background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.4)_0%,rgba(0,0,0,0)_70%)]"></div>
          
          {/* Prestigious accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
        </motion.div>
        
        {/* Lab header content */}
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
              {/* Lab navigation with refined styling */}
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <Link 
                  href="/Labs"
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors group"
                >
                  <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> 
                  <span className="text-sm uppercase tracking-widest font-light">Back to Labs</span>
                </Link>
                
                {/* Prestigious institute brand */}
                <div className="hidden md:block text-right">
                  <p className="text-xs uppercase tracking-widest text-white/60 font-light">Perrin Institute</p>
                  <p className="text-sm text-white/80 italic">Excellence in Research</p>
                </div>
              </motion.div>
              
              {/* Lab icon and title with enhanced styling */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center"
              >
                <div className={`rounded-xl p-4 ${lab.textColor} bg-white/10 backdrop-blur-sm shadow-xl border border-white/5`}>
                  {IconComponent && <IconComponent className="h-10 w-10" />}
                </div>
                <div className="ml-5">
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${lab.textColor} tracking-tight`}>
                    {lab.title}
                  </h1>
                  <div className="h-1 w-24 bg-blue-500/50 mt-3 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Lab description with refined typography */}
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/90 max-w-3xl font-light leading-relaxed"
              >
                {lab.description}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
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
            {/* About section with prestigious styling */}
            <section className="bg-gradient-to-br from-gray-900/70 to-gray-900/50 rounded-xl backdrop-blur-sm p-10 shadow-xl border border-gray-800/40 relative overflow-hidden">
              {/* Prestigious accent corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-blue-500/30"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-blue-500/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-8">
                  <FiLayers className="text-blue-400 mr-4 text-2xl mt-1" />
                  <h2 className="text-3xl font-bold tracking-tight">About the Lab</h2>
                </div>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">{lab.longDescription || lab.description}</p>
                  {lab.methodology && (
                    <div className="mt-12 border-t border-gray-800/60 pt-10">
                      <h3 className="text-2xl font-semibold mb-6 text-white tracking-tight">Our Methodology</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{lab.methodology}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
            
            {/* Publications section with prestigious styling */}
            {lab.publications && lab.publications.length > 0 && (
              <motion.section 
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-900/70 to-gray-900/50 rounded-xl backdrop-blur-sm p-10 shadow-xl border border-gray-800/40 relative overflow-hidden"
              >
                {/* Prestigious accent corners */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-blue-500/30"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-blue-500/30"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start mb-10">
                    <FiFileText className="text-blue-400 mr-4 text-2xl mt-1" />
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">Featured Publications</h2>
                      <div className="h-px w-32 bg-blue-500/50 mt-3"></div>
                    </div>
                  </div>
                  <div className="space-y-12">
                    {lab.publications.map((pub, index) => (
                      <div 
                        key={index} 
                        className="border-b border-gray-800/60 pb-12 last:border-0 last:pb-0"
                      >
                        <h3 className="text-xl font-semibold mb-3 text-white">{pub.title}</h3>
                        <p className="text-gray-400 mb-4 font-light">
                          {pub.authors.join(", ")} • {pub.date}
                        </p>
                        <p className="text-gray-300 mb-5 leading-relaxed">{pub.abstract}</p>
                        {pub.link && (
                          <a 
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                          >
                            Read Publication <FiExternalLink className="ml-2 transition-transform group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
            
            {/* Call to action section with prestigious styling */}
            <motion.section 
              variants={itemVariants}
              className={`${lab.color} bg-opacity-95 rounded-xl p-12 text-center shadow-2xl shadow-blue-900/20 border border-white/10 relative overflow-hidden`}
            >
              {/* Prestigious accent elements */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/0 via-white/40 to-white/0"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
              
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0)_25%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_75%)] bg-[length:200%_200%] animate-shimmer"></div>
              
              <div className="relative z-10">
                <h2 className={`text-3xl font-bold mb-4 ${lab.textColor} tracking-tight`}>
                  Partner With Our Research Team
                </h2>
                <p className={`${lab.textColor} text-opacity-90 mb-10 max-w-2xl mx-auto text-lg font-light leading-relaxed`}>
                  We're actively seeking research partners, collaborators, and talented individuals to join our mission of driving innovation in {lab.title.toLowerCase()}.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href={`mailto:${lab.contactEmail}`}
                    className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-white/90 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
                  >
                    <FiMail className="mr-2" /> Contact Research Team
                  </a>
                  <Link
                    href="/careers"
                    className="px-8 py-3 bg-black/20 hover:bg-black/30 text-white rounded-lg font-medium transition-all duration-300 flex items-center border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl"
                  >
                    Careers at Perrin <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.section>
          </motion.div>
          
          {/* Sidebar - 1/3 width */}
          <motion.div variants={containerVariants} className="space-y-10">
            {/* Team members section - Removed as we don't want to show fake people */}
            
            {/* Contact section with prestigious styling */}
            <motion.section 
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/70 to-gray-900/50 rounded-xl backdrop-blur-sm p-8 shadow-xl border border-gray-800/40 relative overflow-hidden"
            >
              {/* Prestigious accent elements */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-blue-500/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiMail className="text-blue-400 mr-3 text-xl" />
                  <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Have questions or interested in learning more about our research initiatives at {lab.title}?
                </p>
                <a 
                  href={`mailto:${lab.contactEmail}`}
                  className="block w-full text-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Email Research Team
                </a>
              </div>
            </motion.section>
            
            {/* Related research or resources section with prestigious styling */}
            <motion.section 
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/70 to-gray-900/50 rounded-xl backdrop-blur-sm p-8 shadow-xl border border-gray-800/40 relative overflow-hidden"
            >
              {/* Prestigious accent elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-blue-500/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiActivity className="text-blue-400 mr-3 text-xl" />
                  <h2 className="text-2xl font-bold tracking-tight">Related Labs</h2>
                </div>
                <div className="space-y-4">
                  {LABS_DATA.filter(l => l.id !== lab.id).slice(0, 3).map((relatedLab, index) => (
                    <Link
                      key={index}
                      href={`/Labs/${relatedLab.id}`}
                      className="block relative rounded-lg overflow-hidden transition-all duration-300 group"
                    >
                      {/* Clean white border for prestigious look */}
                      <div className="absolute inset-0 rounded-lg border border-white/10 z-20 pointer-events-none"></div>
                      
                      <div className="flex items-center bg-gradient-to-r from-gray-900/90 to-gray-900/60 p-4 relative">
                        {/* Color accent bar on left */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${relatedLab.color}`}></div>
                        
                        {/* Right corner prestigious accent */}
                        <div className="absolute top-0 right-0 w-16 h-16">
                          <div className="absolute top-1 right-1 w-6 h-6 border-t border-r border-white/10"></div>
                        </div>
                      
                        <div className={`w-10 h-10 rounded-lg ${relatedLab.color} flex items-center justify-center mr-3 flex-shrink-0 shadow-lg transition-transform group-hover:scale-105 duration-300`}>
                          {ICONS_MAP[relatedLab.iconName] && 
                            React.createElement(ICONS_MAP[relatedLab.iconName], { className: "h-5 w-5 text-white" })}
                        </div>
                        <div className="min-w-0 relative z-10">
                          <h3 className="font-medium text-white group-hover:text-blue-200 transition-colors">{relatedLab.title}</h3>
                          <p className="text-gray-400 text-sm truncate">{relatedLab.description.substring(0, 45)}...</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Prestigious view all link */}
                <div className="mt-6 text-center">
                  <Link 
                    href="/Labs"
                    className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 group"
                  >
                    <span className="relative">
                      <span className="relative z-10">View All Research Labs</span>
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-400/30 group-hover:bg-blue-400/50 transition-colors"></span>
                    </span>
                    <FiArrowRight className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.section>
            
            {/* Prestigious institute badge */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800/40 space-y-3"
            >
              <div className="h-0.5 w-12 bg-blue-500/50 mx-auto mb-4"></div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-light">Perrin Institute</p>
              <p className="text-sm text-gray-300">Center for Excellence in Research and Policy</p>
              <div className="h-0.5 w-12 bg-blue-500/50 mx-auto mt-4"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 