"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-slate-400 animate-spin"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-slate-200 animate-spin animation-delay-1000"></div>
      </div>
    </div>
  );
}

// New sophisticated loading screen for initial website load
export function PerrinLoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-white via-slate-50/30 to-white flex items-center justify-center"
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-400/40 to-transparent"></div>
      
      {/* Main loading container */}
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-8">
        
        {/* Logo section with improved spacing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.6, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 
          }}
          className="mb-12 text-center"
        >
          <div className="relative">
            <Image
              src="/moretechperrin-removebg-preview.png"
              alt="Perrin Institution"
              width={280}
              height={90}
              className="h-18 w-auto object-contain mx-auto"
              priority
            />
            {/* Subtle glow effect behind logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent blur-xl -z-10"></div>
          </div>
          
          {/* Institution tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1.0 }}
            className="mt-4"
          >
            <p className="text-slate-600 text-sm font-light tracking-[0.05em] uppercase">
              Advanced Policy Research
            </p>
          </motion.div>
        </motion.div>
        
        {/* Enhanced loading animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1.0 }}
          className="relative mb-8"
        >
          {/* Outer decorative ring */}
          <div className="absolute -inset-4 rounded-full border border-slate-200/30"></div>
          
          {/* Primary ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-20 h-20 border-[3px] border-slate-200/40 border-t-slate-600 border-r-slate-500 rounded-full"
          />
          
          {/* Secondary ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 5.0,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-1 w-18 h-18 border-2 border-slate-100/60 border-l-slate-400 rounded-full"
          />
          
          {/* Inner core with improved styling */}
          <div className="absolute inset-4 w-12 h-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full border border-slate-200/50 flex items-center justify-center shadow-inner">
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-slate-600 rounded-full"
            />
          </div>
        </motion.div>
        
        {/* Status section with improved typography */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1.0 }}
          className="text-center space-y-4 mb-8"
        >
          <h3 className="text-slate-800 text-lg font-medium tracking-wide">
            Loading Research Platform
          </h3>
          
          {/* Enhanced progress dots */}
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2.0, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-slate-500 rounded-full"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2.0, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-slate-500 rounded-full"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2.0, repeat: Infinity, delay: 0.8 }}
              className="w-2 h-2 bg-slate-500 rounded-full"
            />
          </div>
          
          {/* Loading progress text with staggered messages */}
          <motion.div className="space-y-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="text-slate-500 text-sm font-light"
            >
              Initializing research environment...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6, duration: 0.8 }}
              className="text-slate-500 text-xs font-light"
            >
              Loading policy analysis frameworks
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Enhanced institutional badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-slate-400/50"></div>
            <span className="text-xs uppercase tracking-[0.1em] text-slate-600 font-medium">
              Excellence in Research
            </span>
            <div className="h-px w-6 bg-gradient-to-l from-transparent to-slate-400/50"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent"></div>
    </motion.div>
  );
} 