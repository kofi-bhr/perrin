'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiTarget, FiGlobe, FiCpu, FiFileText } from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full opacity-[0.03] blur-[100px]"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600 rounded-full opacity-[0.04] blur-[80px]"
        animate={{ 
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="absolute inset-0 overflow-hidden">
        {/* Circuit-like tech pattern */}
        <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M0,0 L100,0 L100,100 L0,100 Z" 
            fill="none" 
            stroke="rgba(59, 130, 246, 0.1)" 
            strokeWidth="0.1"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M0,50 L100,50" 
            fill="none" 
            stroke="rgba(59, 130, 246, 0.1)" 
            strokeWidth="0.1"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M50,0 L50,100" 
            fill="none" 
            stroke="rgba(59, 130, 246, 0.1)" 
            strokeWidth="0.1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      
      {/* Enhanced border accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with refined styling */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center px-3 py-1 bg-blue-500/10 rounded-full border border-blue-400/30 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-400 text-sm font-medium tracking-wide">Federally Accredited</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Perrin Institution
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-slate-300 text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A premier think tank advancing policy research at the intersection of technology, governance, and global affairs
          </motion.p>
        </div>
        
        {/* Two column layout with better alignment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left column: Content with refined typography */}
          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-medium text-white mb-6 flex items-center">
              <span className="bg-blue-500/10 rounded-lg p-2 mr-3 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <FiCpu className="text-blue-400 w-5 h-5" />
              </span>
              <span className="bg-gradient-to-r from-white to-blue-50 bg-clip-text text-transparent">Pioneering AI-Driven Policy Research</span>
            </h3>
            
            <p className="text-slate-300 mb-5 leading-relaxed">
              The Perrin Institution was founded to honor the legacy of Dartmouth College professor and essayist Noel Perrin. As a federally accredited think tank, we uphold his commitment to transparency, environmental policy, and public engagement in decision-making processes.
            </p>
            
            <p className="text-slate-300 mb-8 leading-relaxed">
              Through rigorous research and AI-driven analysis, we author policy insights for federal agencies, leveraging cutting-edge methodologies to shape informed governance. Our expertise spans law, technology, and public policy, enabling us to drive meaningful change in the policy landscape.
            </p>
            
            {/* Enhanced core values with better styling */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-start p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.15)" }}
              >
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-3 rounded-lg mr-4 flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <FiFileText className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Summary of the Declared</h4>
                  <p className="text-slate-400 text-sm">Simplifying complex legal language to ensure public accessibility and prevent regulatory overreach.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.15)" }}
              >
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-3 rounded-lg mr-4 flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <FiTarget className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">AI-Enhanced Methodology</h4>
                  <p className="text-slate-400 text-sm">Leveraging artificial intelligence to process and analyze complex policy data for more accurate insights.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.15)" }}
              >
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-3 rounded-lg mr-4 flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <FiGlobe className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Global Governance Focus</h4>
                  <p className="text-slate-400 text-sm">Addressing complex international policy challenges at the intersection of technology and governance.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column: Improved image container */}
          <motion.div 
            className="md:col-span-5 flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Improved image aspect ratio and positioning */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border border-white/10 group">
              <Image
                src="/congress.webp"
                alt="Perrin Institution policy impact"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
                className="rounded-xl group-hover:scale-105 transition-transform duration-1000"
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
              
              {/* Enhanced image caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-gradient-to-r from-black/40 to-blue-900/10">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <div className="text-white/90 text-sm font-medium tracking-wide">Shaping policy through advanced technology and research</div>
                </div>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-500/50"></div>
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-500/50"></div>
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-500/50"></div>
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-500/50"></div>
              
              {/* Floating badge element */}
              <div className="absolute -right-5 top-8 bg-gradient-to-r from-blue-900/30 to-blue-800/20 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-500/20 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.2)] transform rotate-3">
                <div className="text-xs text-blue-300 font-medium uppercase tracking-wider">Established 2021</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
