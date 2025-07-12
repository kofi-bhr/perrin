"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiArrowRight, FiZap, FiTrendingUp, FiUsers, FiTarget } from "react-icons/fi";

// Animation variants - Apple-style subtle animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Partnership data with teal theme
const partnerships = [
  {
    name: "Learn4Lanka",
    category: "Education Technology",
    description: "Transforming education in Sri Lankan schools through direct resource delivery and community partnerships.",
    impact: {
      students: "5k+",
      schools: "50+",
      communities: "20+"
    },
    image: "/learn4lanka.avif",
    website: "https://learn4lanka.org/",
    color: "teal",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    name: "WikiJobs",
    category: "Career Platform",
    description: "AI-powered platform helping professionals return to work with personalized job matching and career guidance.",
    impact: {
      reach: "500K+",
      success: "94%",
      placements: "15K+"
    },
    image: null,
    website: "https://wikijob.org/",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "Menstrual Equity Initiative (MĚI)",
    category: "Women's Health & Research",
    description: "Menstrual Equity Initiative (MĚI) is an all-female-led organization dedicated to advancing research and policy for girls, women, and people who undergo the menstrual cycle and reproductive processes. MĚI was created to help educate and support women and girls as they navigate the different physical and cerebral conditions, stages, and challenges that they experience.",
    impact: {
      research: "10+",
      advocacy: "25+",
      education: "1000+"
    },
    image: "/menstral.png",
    website: undefined,
    color: "purple",
    gradient: "from-purple-500 to-pink-500"
  }
];

export default function SpecialProjects() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Apple-style minimal */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                <FiZap className="h-4 w-4 text-teal-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Strategic Partnerships
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-thin text-gray-900 mb-6 tracking-tight leading-[0.9]"
            >
              Special Projects
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-16 font-light"
            >
              We partner with innovative organizations that share our vision of advancing 
              policy research and democratic innovation.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-12 text-sm text-gray-500">
              <div className="flex items-center">
                <FiUsers className="h-4 w-4 mr-2 text-teal-600" />
                <span>500K+ People Reached</span>
              </div>
              <div className="flex items-center">
                <FiTarget className="h-4 w-4 mr-2 text-teal-600" />
                <span>70+ Schools Supported</span>
              </div>
              <div className="flex items-center">
                <FiTrendingUp className="h-4 w-4 mr-2 text-teal-600" />
                <span>15K+ Career Placements</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Cards - Apple-style clean layout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-40"
          >
            {partnerships.map((partnership, index) => (
              <motion.div
                key={partnership.name}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                  index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Content */}
                <motion.div 
                  variants={slideInLeft}
                  className={`space-y-8 ${
                    index % 2 === 0 ? "" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-6">
                    <div className="inline-block">
                      <div className="px-3 py-1 bg-gray-100 rounded-full">
                        <span className="text-sm font-medium text-gray-700">
                          {partnership.category}
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-5xl sm:text-6xl font-thin text-gray-900 leading-tight tracking-tight">
                      {partnership.name}
                    </h2>
                    
                    <p className="text-xl text-gray-600 leading-relaxed font-light">
                      {partnership.description}
                    </p>
                  </div>
                  
                  {/* Impact Metrics - Apple-style minimal */}
                  <div className="grid grid-cols-3 gap-8 pt-8">
                    {Object.entries(partnership.impact).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-4xl font-thin text-gray-900 mb-2">
                          {value}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {partnership.website && (
                    <div className="pt-8">
                      <a 
                        href={partnership.website}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all duration-300 font-medium group"
                      >
                        <span className="mr-3">Learn More</span>
                        <FiExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                    </div>
                  )}
                </motion.div>
                
                {/* Visual - Apple-style clean cards */}
                <motion.div 
                  variants={slideInRight}
                  className={`relative ${
                    index % 2 === 0 ? "" : "lg:order-1"
                  }`}
                >
                  <div className="relative">
                    <div className="bg-gray-50 p-16 rounded-3xl shadow-sm border border-gray-100">
                      {partnership.image ? (
                        <Image
                          src={partnership.image}
                          alt={partnership.name}
                          width={400}
                          height={200}
                          className="w-full h-auto object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-8xl font-thin text-teal-600 mb-4">
                            {partnership.name.split('').slice(0, 2).join('')}
                          </div>
                          <div className="text-2xl font-light text-gray-700">
                            {partnership.name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Apple-style minimal */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={scaleUp} className="mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <FiTarget className="h-4 w-4 text-teal-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Partnership Opportunities
                </span>
              </div>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-5xl sm:text-6xl font-thin text-gray-900 leading-tight tracking-tight"
            >
              Ready to partner with us?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            >
              We're seeking innovative organizations that share our commitment 
              to advancing policy research and democratic innovation.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-8">
              <a 
                href="mailto:admin@perrininstitute.org" 
                className="inline-flex items-center px-8 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all duration-300 font-medium text-lg group"
              >
                <span className="mr-3">Get in Touch</span>
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}