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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-r-4 border-slate-600 border-l-transparent border-b-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-slate-600 animate-pulse font-light tracking-wider font-roboto">Loading lab data...</p>
        </div>
      </div>
    );
  }
  
  if (!lab) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 text-slate-900 font-roboto">
        <h1 className="text-3xl font-light mb-4">Lab Not Found</h1>
        <p className="mb-8 text-slate-600 max-w-md text-center leading-relaxed font-light">
          The research lab you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/Labs" 
          className="flex items-center bg-slate-900 hover:bg-slate-800 transition-all duration-300 text-white py-3 px-6 rounded-lg shadow-lg"
        >
          <FiArrowLeft className="mr-2" /> Return to Labs
        </Link>
      </div>
    );
  }

  // Get icon component
  const IconComponent = ICONS_MAP[lab.iconName];
  
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
                  className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
                >
                  <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> 
                  <span className="text-sm uppercase tracking-widest font-light">Back to Labs</span>
                </Link>
                
                {/* Professional institute brand */}
                <div className="hidden md:block text-right">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-light">Perrin Institute</p>
                  <p className="text-sm text-slate-600 italic font-light">Excellence in Research</p>
                </div>
              </motion.div>
              
              {/* Lab icon and title with enhanced styling */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center"
              >
                <div className="rounded-xl p-4 bg-white shadow-lg border border-slate-200">
                  {IconComponent && <IconComponent className="h-10 w-10 text-slate-700" />}
                </div>
                <div className="ml-5">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight">
                    {lab.title}
                  </h1>
                  <div className="h-1 w-24 bg-slate-400/50 mt-3 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Lab description with refined typography */}
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-slate-600 max-w-3xl font-light leading-relaxed"
              >
                {lab.description}
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
                  <FiLayers className="text-slate-600 mr-4 text-2xl mt-1" />
                  <h2 className="text-3xl font-light tracking-tight text-slate-900">About the Lab</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 leading-relaxed text-lg font-light">{lab.longDescription || lab.description}</p>
                  {lab.methodology && (
                    <div className="mt-12 border-t border-slate-200 pt-10">
                      <h3 className="text-2xl font-medium mb-6 text-slate-900 tracking-tight">Our Methodology</h3>
                      <p className="text-slate-700 leading-relaxed text-lg font-light">{lab.methodology}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
            
            {/* Research papers section with formal request information */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-10 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent corners */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-slate-300/30"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-10">
                  <FiFileText className="text-slate-600 mr-4 text-2xl mt-1" />
                  <div>
                    <h2 className="text-3xl font-light tracking-tight text-slate-900">Research Papers</h2>
                    <div className="h-px w-32 bg-slate-400/50 mt-3"></div>
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-medium mb-4 text-slate-900">Request Our Research</h3>
                  <p className="text-slate-700 mb-4 leading-relaxed font-light">
                    The Perrin Institute publishes research findings through official channels including the Federal Register. 
                    Due to the sensitive and proprietary nature of our research, publications are available upon formal request.
                  </p>
                  <p className="text-slate-700 mb-6 leading-relaxed font-light">
                    To request access to papers and publications from the {lab.title} Lab, please submit a formal request 
                    through our secure portal with your credentials and research purpose.
                  </p>
                  <Link 
                    href="/research-request" 
                    className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-md transition-colors duration-300"
                  >
                    Submit Research Request <FiArrowRight className="ml-2" />
                  </Link>
                </div>
                
                <div className="text-slate-600 text-sm italic border-t border-slate-200 pt-6 mt-6 font-light">
                  <p>Note: Research requests are typically processed within 5-7 business days. Some materials may require additional verification or clearance due to confidentiality agreements with our partners.</p>
                </div>
              </div>
            </motion.section>
            
            {/* Call to action section with professional styling */}
            <motion.section 
              variants={itemVariants}
              className="bg-slate-50 rounded-xl p-10 text-center shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent elements */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-slate-300/0 via-slate-400/40 to-slate-300/0"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-slate-300/0 via-slate-400/20 to-slate-300/0"></div>
              
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(148,163,184,0)_25%,rgba(148,163,184,0.1)_50%,rgba(148,163,184,0)_75%)] bg-[length:200%_200%] animate-shimmer"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-medium mb-4 text-slate-900 tracking-tight">
                  Join Our Team
                </h2>
                <p className="text-slate-700 mb-6 max-w-2xl mx-auto text-base font-light leading-relaxed">
                  We're looking for talented individuals to join our mission of driving innovation in policy research.
                </p>
                <Link
                  href="/careers"
                  className="inline-flex items-center px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Careers at Perrin <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.section>
          </motion.div>
          
          {/* Sidebar - 1/3 width */}
          <motion.div variants={containerVariants} className="space-y-10">
            {/* Contact section with professional styling */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent elements */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiMail className="text-slate-600 mr-3 text-xl" />
                  <h2 className="text-2xl font-light tracking-tight text-slate-900">Contact</h2>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed font-light">
                  Have questions or interested in learning more about our research initiatives at {lab.title}?
                </p>
                <a 
                  href={`mailto:${lab.contactEmail}`}
                  className="block w-full text-center py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Email Research Team
                </a>
              </div>
            </motion.section>
            
            {/* Research areas section */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiActivity className="text-slate-600 mr-3 text-xl" />
                  <h2 className="text-2xl font-light tracking-tight text-slate-900">Research Areas</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900 mb-2">Policy Analysis</h3>
                    <p className="text-sm text-slate-600 font-light">Evidence-based analysis of existing and proposed policy frameworks</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900 mb-2">Data-Driven Research</h3>
                    <p className="text-sm text-slate-600 font-light">Leveraging quantitative and qualitative methodologies</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900 mb-2">Strategic Consulting</h3>
                    <p className="text-sm text-slate-600 font-light">Advisory services for public and private sector clients</p>
                  </div>
                </div>
              </div>
            </motion.section>
            
            {/* Related research labs section with professional styling */}
            <motion.section 
              variants={itemVariants}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden"
            >
              {/* Professional accent elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-slate-300/30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <FiActivity className="text-slate-600 mr-3 text-xl" />
                  <h2 className="text-2xl font-light tracking-tight text-slate-900">Related Labs</h2>
                </div>
                <div className="space-y-4">
                  {LABS_DATA.filter(l => l.id !== lab.id).slice(0, 3).map((relatedLab, index) => (
                    <Link
                      key={index}
                      href={`/Labs/${relatedLab.id}`}
                      className="block relative rounded-lg overflow-hidden transition-all duration-300 group"
                    >
                      {/* Clean border for professional look */}
                      <div className="absolute inset-0 rounded-lg border border-slate-200 z-20 pointer-events-none"></div>
                      
                      <div className="flex items-center bg-slate-50 p-4 relative hover:bg-slate-100 transition-colors">
                        {/* Color accent bar on left */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${relatedLab.color}`}></div>
                        
                        {/* Right corner professional accent */}
                        <div className="absolute top-0 right-0 w-16 h-16">
                          <div className="absolute top-1 right-1 w-6 h-6 border-t border-r border-slate-300/30"></div>
                        </div>
                      
                        <div className={`w-10 h-10 rounded-lg ${relatedLab.color} flex items-center justify-center mr-3 flex-shrink-0 shadow-lg transition-transform group-hover:scale-105 duration-300`}>
                          {ICONS_MAP[relatedLab.iconName] && 
                            React.createElement(ICONS_MAP[relatedLab.iconName], { className: "h-5 w-5 text-white" })}
                        </div>
                        <div className="min-w-0 relative z-10">
                          <h3 className="font-medium text-slate-900 group-hover:text-slate-700 transition-colors">{relatedLab.title}</h3>
                          <p className="text-slate-600 text-sm truncate font-light">{relatedLab.description.substring(0, 45)}...</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Professional view all link */}
                <div className="mt-6 text-center">
                  <Link 
                    href="/Labs"
                    className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 group"
                  >
                    <span className="relative">
                      <span className="relative z-10">View All Research Labs</span>
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-400/30 group-hover:bg-slate-600/50 transition-colors"></span>
                    </span>
                    <FiArrowRight className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
                  </Link>
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
              <p className="text-sm text-slate-700 font-light">Center for Excellence in Research and Policy</p>
              <div className="h-0.5 w-12 bg-slate-400/50 mx-auto mt-4"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 