'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiCalendar, FiCheckCircle, FiArrowRight, FiUsers, FiTarget, FiBookOpen, FiDollarSign, FiAward, FiStar, FiPenTool } from 'react-icons/fi'

// Animated variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Sample ways we help
const HELP_AREAS = [
  {
    title: 'Find Hidden Opportunities',
    description: 'We connect you with scholarships, internships, and programs that are often overlooked but perfect for your background and goals.',
    icon: <FiStar className="h-6 w-6" />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Application Support',
    description: 'Get friendly feedback on your essays and applications from students who have successfully navigated the process.',
    icon: <FiPenTool className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Financial Aid Guidance',
    description: 'Confused by FAFSA or scholarship requirements? We\'ll help you understand your options in plain language.',
    icon: <FiDollarSign className="h-6 w-6" />,
    color: 'from-orange-500 to-red-600'
  }
];

export default function UnderservedOpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black text-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute w-full h-full opacity-[0.03]">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={`h-line-${i}`} 
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" 
                style={{ top: `${i * 5}%` }}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
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
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent" 
                style={{ left: `${i * 5}%` }}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
          
          {/* Enhanced floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute bg-indigo-400 rounded-full"
              style={{
                width: Math.random() * 4 + (i % 3) + "px",
                height: Math.random() * 4 + (i % 3) + "px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: `blur(${i % 2 ? 1 : 0}px)`,
                opacity: 0.1 + (i % 10) * 0.01,
                zIndex: i % 3
              }}
              animate={{
                y: [0, Math.random() * -30 - 10, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, Math.random() * 0.5 + 1.2, 1],
                opacity: [0.1 + (i % 10) * 0.01, 0.3 + (i % 10) * 0.01, 0.1 + (i % 10) * 0.01],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Glowing orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 40%, rgba(99, 102, 241, 0) 70%)`,
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2,
                filter: "blur(40px)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            {/* Title with animated highlight */}
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-500 relative">Scholarships</span>
                <span className="block text-2xl md:text-3xl mt-2 text-white font-medium">for Low-Income Students</span>
              </h1>
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-8"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 96, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <p className="max-w-3xl mx-auto text-lg text-indigo-100/70 leading-relaxed">
                We understand the financial barriers facing low-income students. Our advisors can help you discover 
                scholarships and grants specifically designed for students from economically disadvantaged backgrounds,
                and guide you through the application process. Let's find your path together — no cost, no catch.
              </p>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="/scholarship-center/book-advisor"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-colors text-lg font-medium shadow-lg shadow-indigo-900/20"
              >
                Talk to a Scholarship Advisor
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">We're Here to Help</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Our community includes first-generation graduates and policy experts who understand the barriers to opportunity.
                    We've developed insights and connections that can help low-income students access resources that might otherwise remain hidden.
                  </p>
                  
                  <div className="space-y-4">
                    {HELP_AREAS.map((area) => (
                      <div key={area.title} className="flex items-start">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${area.color} flex items-center justify-center mr-4 flex-shrink-0 mt-1`}>
                          {area.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                          <p className="text-gray-400 mt-1">{area.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Link href="/scholarship-center/book-advisor"
                      className="text-indigo-300 flex items-center group hover:text-indigo-200 transition-colors text-lg"
                    >
                      Let's chat about your scholarship goals
                      <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4"
                      animate={{
                        boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0.1)', '0 0 0 10px rgba(99, 102, 241, 0)', '0 0 0 0 rgba(99, 102, 241, 0.1)'],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FiUsers className="h-8 w-8 text-indigo-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold">From Our Community</h3>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-5 relative">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="flex items-center justify-center">
                        <FiAward className="h-6 w-6 text-indigo-400 mr-2" />
                        <p className="text-xl font-semibold text-white">$3 Million+ in Scholarships</p>
                      </div>
                      <p className="text-gray-300">
                        That's how much our community of low-income students has secured so far in scholarships and financial aid. Our advisors share proven strategies that have worked for countless students with financial need.
                      </p>
                      <motion.div 
                        className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mt-2" 
                        animate={{ width: [40, 80, 40] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple How It Works */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              Getting started with our scholarship consultation is simple. Our process is straightforward and personal.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto">
            <div className="flex items-center">
              <div className="bg-indigo-500/20 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-indigo-300">1</span>
              </div>
              <p className="text-white">Schedule a 30-minute chat with a scholarship advisor</p>
            </div>
            
            <div className="hidden md:block text-indigo-500">
              <FiArrowRight className="h-6 w-6" />
            </div>
            
            <div className="flex items-center">
              <div className="bg-indigo-500/20 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-indigo-300">2</span>
              </div>
              <p className="text-white">Get personalized guidance and resources</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/scholarship-center/book-advisor"
              className="inline-flex items-center bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl transition-all text-base font-medium border border-white/10 hover:border-indigo-500/30"
            >
              Book Your Free Session
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 