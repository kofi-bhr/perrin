"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function SpecialProjects() {
  return (
    <div className="min-h-screen bg-white">
      {/* FAANG-style Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">
                Strategic Partnerships
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-light text-slate-900 mb-8 tracking-tight leading-none"
            >
              Special Projects
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Organizations we support and collaborate with to drive innovation and impact
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Learn4Lanka - Apple-style layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Content */}
            <motion.div variants={slideInLeft} className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    Education
                  </span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-light text-slate-900 leading-tight">
                  Learn4Lanka
                </h2>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  A youth-led initiative transforming education in Sri Lankan schools through 
                  direct resource delivery and community partnerships.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-light text-slate-900 mb-1">140+</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide">Students Supported</div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-slate-900 mb-1">50+</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide">Schools Reached</div>
                  </div>
                </div>
              </div>
              
              <div>
                <a 
                  href="https://learn4lanka.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center group text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span className="text-lg font-medium mr-3">Learn more</span>
                  <FiExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
            
            {/* Visual */}
            <motion.div variants={slideInRight} className="relative">
              <div className="relative z-10 bg-white p-12 rounded-3xl shadow-2xl shadow-blue-500/10">
                <Image
                  src="/learn4lanka.avif"
                  alt="Learn4Lanka"
                  width={300}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WikiJobs - Google-style layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Visual */}
            <motion.div variants={slideInLeft} className="relative order-2 lg:order-1">
              <div className="relative z-10 bg-gradient-to-br from-emerald-50 to-teal-50 p-16 rounded-3xl shadow-2xl shadow-emerald-500/10">
                <div className="text-center">
                  <div className="text-6xl font-light text-emerald-600 mb-4">WJ</div>
                  <div className="text-lg font-medium text-emerald-700">WikiJobs</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl transform -rotate-3 scale-105 -z-10"></div>
            </motion.div>
            
            {/* Content */}
            <motion.div variants={slideInRight} className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                    Career Platform
                  </span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-light text-slate-900 leading-tight">
                  WikiJobs
                </h2>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  AI-powered platform helping professionals return to work with 
                  personalized job matching and career guidance.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-light text-slate-900 mb-1">10M+</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide">People Reached</div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-slate-900 mb-1">94%</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide">Success Rate</div>
                  </div>
                </div>
              </div>
              
              <div>
                <a 
                  href="https://wikijob.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center group text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-lg font-medium mr-3">Learn more</span>
                  <FiExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA - Subtle FAANG style */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-light text-slate-900 leading-tight"
            >
              Ready to partner with us?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              We're always seeking innovative organizations that share our commitment 
              to advancing policy research and democratic innovation.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-4">
              <a 
                href="mailto:admin@perrininstitute.org" 
                className="inline-flex items-center px-8 py-4 border border-slate-300 text-slate-700 rounded-full hover:border-slate-400 hover:text-slate-900 transition-all duration-300 font-medium text-lg group"
              >
                <span className="mr-3">Get in touch</span>
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}