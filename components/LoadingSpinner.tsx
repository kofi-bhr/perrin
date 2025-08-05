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
export function PerrinLoadingScreen({ isFirstVisit = true }: { isFirstVisit?: boolean }) {
  // For returning visitors, show a minimal loading screen
  if (!isFirstVisit) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      >
        <div className="relative flex flex-col items-center">
          <Image
            src="/moretechperrin-removebg-preview.png"
            alt="Perrin Institution"
            width={200}
            height={60}
            className="h-12 w-auto object-contain mx-auto mb-6"
            priority
          />
          
          {/* Simple spinner for returning visitors */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full"
          />
        </div>
      </motion.div>
    );
  }

  // Full loading experience for first-time visitors
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-50 via-white to-slate-50/40 flex items-center justify-center"
    >
      {/* Enhanced background pattern with animated grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        {/* Animated background lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`h-line-${i}`}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-slate-400/20 to-transparent"
            style={{ top: `${i * 7}%` }}
            initial={{ opacity: 0.02 }}
            animate={{ opacity: [0.02, 0.08, 0.02] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`v-line-${i}`}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-slate-400/20 to-transparent"
            style={{ left: `${i * 7}%` }}
            initial={{ opacity: 0.02 }}
            animate={{ opacity: [0.02, 0.08, 0.02] }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15
            }}
          />
        ))}
      </div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-300/0 via-slate-400/30 to-slate-300/0"></div>
      
      {/* Main loading container */}
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-8">
        
        {/* Logo section with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 2.0, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6 
          }}
          className="mb-16 text-center"
        >
          <div className="relative">
            {/* Background glow that appears first */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/30 to-transparent blur-2xl -z-10"
            />
            
            <Image
              src="/moretechperrin-removebg-preview.png"
              alt="Perrin Institution"
              width={320}
              height={100}
              className="h-20 w-auto object-contain mx-auto"
              priority
            />
            
            {/* Animated border that draws in */}
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ delay: 1.8, duration: 2.0, ease: "easeInOut" }}
              className="absolute -inset-6 rounded-lg"
            >
              <div className="w-full h-full border border-slate-300/40 rounded-lg"></div>
            </motion.div>
          </div>
          
          {/* Institution tagline with staggered reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1.2 }}
            className="mt-6 space-y-2"
          >
            <div className="flex items-center justify-center mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="h-px bg-slate-400/50 mr-3"
              />
              <p className="text-slate-600 text-sm font-light tracking-[0.08em] uppercase">
                Advanced Policy Research
              </p>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="h-px bg-slate-400/50 ml-3"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 1.0 }}
              className="text-slate-500 text-xs font-light tracking-wide"
            >
              University of Virginia
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Enhanced multi-layered loading animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 1.2 }}
          className="relative mb-12"
        >
          {/* Outermost decorative ring with pulse */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3.0,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -inset-8 rounded-full border border-slate-200/20"
          />
          
          {/* Middle decorative ring */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -inset-6 rounded-full border border-slate-300/25"
          />
          
          {/* Primary spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 4.0,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-24 h-24 border-[3px] border-slate-200/30 border-t-slate-600 border-r-slate-500 rounded-full"
          />
          
          {/* Secondary counter-rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 6.0,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-1 w-22 h-22 border-2 border-slate-100/40 border-l-slate-400 border-b-slate-300 rounded-full"
          />
          
          {/* Tertiary inner ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-3 w-18 h-18 border border-slate-200/60 border-t-slate-500 rounded-full"
          />
          
          {/* Inner core with enhanced styling */}
          <div className="absolute inset-6 w-12 h-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-full border border-slate-200/60 flex items-center justify-center shadow-inner">
            <motion.div
              animate={{ 
                scale: [0.8, 1.4, 0.8],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 3.0, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-4 h-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full shadow-sm"
            />
          </div>
          
          {/* Orbiting dots */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8.0 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
              className="absolute inset-0 w-24 h-24"
            >
              <div 
                className="w-2 h-2 bg-slate-400 rounded-full absolute"
                style={{
                  top: `${2 + i * 2}px`,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced status section with loading phases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1.0 }}
          className="text-center space-y-6 mb-10"
        >
          <h3 className="text-slate-800 text-xl font-medium tracking-wide">
            Loading Research Platform
          </h3>
          
          {/* Enhanced progress dots with wave animation */}
          <div className="flex items-center justify-center space-x-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.6, 1],
                  opacity: [0.2, 1, 0.2],
                  y: [0, -4, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                className="w-2.5 h-2.5 bg-slate-500 rounded-full"
              />
            ))}
          </div>
          
          {/* Multi-phase loading progress with detailed messages */}
          <motion.div className="space-y-3 min-h-[60px]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 4.0, duration: 0.8 }}
              className="text-slate-600 text-sm font-medium"
            >
              Initializing research environment...
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 4.8, duration: 0.8 }}
              className="text-slate-500 text-xs font-light"
            >
              Loading policy analysis frameworks
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 5.4, duration: 0.8 }}
              className="text-slate-500 text-xs font-light"
            >
              Connecting to research databases
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 6.0, duration: 0.8 }}
              className="text-slate-500 text-xs font-light"
            >
              Preparing expert directory
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Enhanced institutional badge with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 5.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-lg">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "1.5rem" }}
              transition={{ delay: 6.2, duration: 1.0 }}
              className="h-px bg-gradient-to-r from-transparent to-slate-400/60"
            />
            <span className="text-xs uppercase tracking-[0.12em] text-slate-700 font-medium">
              Excellence in Research
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "1.5rem" }}
              transition={{ delay: 6.2, duration: 1.0 }}
              className="h-px bg-gradient-to-l from-transparent to-slate-400/60"
            />
          </div>
          
          {/* Additional subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.6, duration: 0.8 }}
            className="text-slate-400 text-xs font-light mt-3 tracking-wide"
          >
            Est. 2023 • Charlottesville, Virginia
          </motion.p>
        </motion.div>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent"></div>
    </motion.div>
  );
} 