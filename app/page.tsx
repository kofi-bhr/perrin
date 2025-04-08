"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation, Variant } from "framer-motion";
import { FiArrowRight, FiMenu, FiX, FiCode, FiDatabase, FiServer, FiArrowDown, FiChevronDown, FiChevronUp, FiActivity } from 'react-icons/fi';
import { images } from "@/lib/images";
import TechGrid from "@/components/TechGrid";
import TechCursor from "@/components/TechCursor";
import Footer from '@/components/Footer';
import { Popover, Dialog, Disclosure, Transition } from '@headlessui/react';
import { useInView } from 'react-intersection-observer' // You may need to install this package
import AboutSection from '../components/about';
import SocialSection from "../components/socialsection";

interface Paper {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  status: string;
  url: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://perrin-production.up.railway.app";

// Typewriter text animation component for tech effect
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true);
      return;
    }
    
    const timeout = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, delay + (currentIndex === 0 ? 0 : Math.random() * 50 + 30));
    
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);
  
  return (
    <span className={`font-mono ${className} ${isComplete ? "" : "after:content-['|'] after:animate-blink"}`}>
      {displayText}
    </span>
  );
};

// Custom text reveal animation component
const RevealText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  
  // If children is a string, split it into words
  // Otherwise, just render the children directly with animation
  const isString = typeof children === 'string';
  const words = isString ? (children as string).split(" ") : null;
  
  if (!isString) {
    return (
      <motion.div
        className={`inline-block ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          delay: delay,
          ease: [0.17, 0.67, 0.83, 0.67],
        }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
    >
      {words?.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            },
            hidden: {
              opacity: 0,
              y: 20,
              transition: {
                duration: 0.7,
                ease: [0.17, 0.67, 0.83, 0.67],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Advanced loading sequence inspired by premium tech brands
const Loader = ({ setIsLoading }: { setIsLoading: (value: boolean) => void }) => {
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("0");
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const [showLogo, setShowLogo] = useState(false);
  
  // Loading phases text - more sophisticated FAANG-style messages
  const loadingPhrases = useMemo(() => [
    "Initializing systems",
    "Loading resources",
    "Preparing data models",
    "Analyzing policy frameworks",
    "Optimizing experience"
  ], []);
  
  // Show logo with slight delay for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Simulate loading progress with a more sophisticated pattern
    const interval = setInterval(() => {
      setProgress(prev => {
        // Create a more natural loading pattern with slowdowns at certain points
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
          return 100;
        }
        
        // Sophisticated loading pattern - more FAANG-like with strategic pauses
        if (prev < 15) return prev + (0.3 + Math.random() * 0.4); // Slow start
        if (prev < 30) return prev + (0.5 + Math.random() * 0.6); // Speed up
        if (prev < 45) return prev + (0.2 + Math.random() * 0.3); // Slow down (simulating resource loading)
        if (prev < 60) return prev + (0.4 + Math.random() * 0.5); // Speed up again
        if (prev < 75) return prev + (0.3 + Math.random() * 0.4); // Maintain pace
        if (prev < 85) return prev + (0.2 + Math.random() * 0.3); // Slow down (finalizing)
        if (prev < 95) return prev + (0.1 + Math.random() * 0.15); // Very slow (polishing)
        return prev + (0.05 + Math.random() * 0.08); // Final touches
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [setIsLoading]);
  
  // Update loading phase based on progress
  useEffect(() => {
    if (progress > 95) setLoadingPhase(4);
    else if (progress > 70) setLoadingPhase(3);
    else if (progress > 40) setLoadingPhase(2);
    else if (progress > 15) setLoadingPhase(1);
    else setLoadingPhase(0);
    
    setLoadingText(loadingPhrases[loadingPhase]);
  }, [progress, loadingPhase, loadingPhrases]);
  
  // Update text with slight delay for visual effect
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setProgressText(Math.floor(progress).toString());
    }, 10);
    
    return () => clearTimeout(textTimer);
  }, [progress]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      {/* Premium background effect with enhanced gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            background: [
              "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 60%)",
              "radial-gradient(circle at 70% 60%, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 60%)"
            ]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Additional subtle gradient layer for depth */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            background: [
              "linear-gradient(45deg, rgba(16,24,39,1) 0%, rgba(17,24,39,0.7) 100%)",
              "linear-gradient(45deg, rgba(17,24,39,0.7) 0%, rgba(16,24,39,1) 100%)"
            ]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Enhanced animated particles - more FAANG-like */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400/30' : i % 3 === 1 ? 'bg-indigo-400/20' : 'bg-purple-400/20'}`}
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
            }}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 15, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid lines - Apple/Google style */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full grid grid-cols-6 gap-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-white/10 h-full"></div>
          ))}
        </div>
        <div className="h-full w-full grid grid-rows-6 gap-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-white/10 w-full"></div>
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-md px-8 relative z-10">
        {/* Premium brand mark with enhanced animation */}
        <AnimatePresence>
          {showLogo && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mb-16 flex justify-center"
            >
              <div className="relative">
                {/* Logo glow effect */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.05, 0.15, 0.05] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)' }}
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0 -m-12 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30"
                      style={{
                        top: `calc(50% + ${Math.sin(i/6 * Math.PI * 2) * 40}px)`,
                        left: `calc(50% + ${Math.cos(i/6 * Math.PI * 2) * 60}px)`,
                      }}
                      animate={{
                        y: [0, -5, 0, 5, 0],
                        x: [0, 3, 0, -3, 0],
                        opacity: [0.2, 0.4, 0.2],
                        scale: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Logo image with animation */}
                <motion.div
                  initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                >
                  <Image 
                    src="/perrinlogonewnew.png" 
                    alt="Perrin Institution Logo" 
                    width={240} 
                    height={80}
                    className="h-20 w-auto object-contain"
                    priority
                  />
                </motion.div>
                
                {/* Underline animation */}
                <motion.div 
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-[2px]"
                  initial={{ width: "0%", background: "rgba(59, 130, 246, 0.5)" }}
                  animate={{ width: "120%", background: "rgba(59, 130, 246, 1)" }}
                  transition={{ 
                    width: { duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] },
                    background: { duration: 2, delay: 0.8 }
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sophisticated progress indicator with enhanced styling */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-widest text-white/60 font-mono flex items-center"
            >
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {loadingText}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm font-mono text-white/80 flex items-center"
            >
              <span className="text-blue-400 mr-1">~</span>
              {progressText}<span className="text-white/40">%</span>
            </motion.div>
          </div>
          
          {/* Premium progress bar with enhanced styling */}
          <div className="h-[3px] bg-white/5 w-full overflow-hidden rounded-full backdrop-blur-sm">
            <motion.div 
              className="h-full"
              style={{
                background: "linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(59,130,246,1) 50%, rgba(96,165,250,1) 100%)",
                backgroundSize: "200% 100%",
              }}
              initial={{ width: "0%", backgroundPosition: "0% 0%" }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ["0% 0%", "100% 0%"]
              }}
              transition={{ 
                width: { ease: "easeOut" },
                backgroundPosition: { 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            />
          </div>
          
          {/* Subtle progress indicator text */}
          <div className="mt-2 flex justify-between text-[10px] text-white/30 font-mono">
            <div>init</div>
            <div>resources</div>
            <div>models</div>
            <div>complete</div>
          </div>
        </div>
        
        {/* Animated loading steps with enhanced styling */}
        <div className="grid grid-cols-5 gap-1 mb-16">
          {loadingPhrases.map((phrase, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div 
                className={`h-[3px] w-full rounded-full ${index <= loadingPhase ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-white/10'}`}
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: index <= loadingPhase ? 1 : 0,
                  opacity: index <= loadingPhase ? 1 : 0.5
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className={`mt-2 w-2 h-2 rounded-full ${index <= loadingPhase ? 'bg-blue-500' : 'bg-white/10'}`}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: index <= loadingPhase ? [0.8, 1, 0.8] : 0.6,
                  opacity: index <= loadingPhase ? 1 : 0.3
                }}
                transition={{ 
                  scale: index <= loadingPhase ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : {
                    duration: 0.3
                  }
                }}
              />
              <motion.div 
                className="mt-1 text-[8px] text-center font-mono"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index <= loadingPhase ? 0.7 : 0.3,
                  color: index <= loadingPhase ? 'rgb(147, 197, 253)' : 'rgb(255, 255, 255, 0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Tech-inspired data points with enhanced styling */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 gap-x-12 gap-y-4 text-[10px] uppercase tracking-wider font-mono"
        >
          <div className="space-y-2">
            <div className="flex items-center text-white/40">
              <motion.span 
                className="inline-block w-1 h-1 bg-blue-500 rounded-full mr-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              Policy Research
            </div>
            <div className="flex items-center text-white/40">
              <motion.span 
                className="inline-block w-1 h-1 bg-indigo-500 rounded-full mr-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.7
                }}
              />
              Data Analysis
            </div>
            <div className="flex items-center text-white/40">
              <motion.span 
                className="inline-block w-1 h-1 bg-purple-500 rounded-full mr-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1.4
                }}
              />
              Innovation Lab
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="text-white/40">University of Virginia</div>
            <div className="text-white/40">Est. 2023</div>
            <div className="text-blue-400/80">v2.1.0</div>
          </div>
        </motion.div>
        
        {/* FAANG-style system status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 pt-4 border-t border-white/10 flex justify-between items-center"
        >
          <div className="flex items-center text-[10px] font-mono text-white/40">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"
              animate={{ 
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            SYSTEM READY
          </div>
          
          <div className="text-[10px] font-mono text-white/40">
            {new Date().toLocaleTimeString()} EST
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Start with false to avoid hydration mismatch
  const [showLoader, setShowLoader] = useState(false); // New state to control loader visibility
  const [animationsReady, setAnimationsReady] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const controls = useAnimation();
  
  // Parallax scroll
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroTranslateY = useTransform(scrollY, [0, 400], [0, 150]);
  
  // Set hasMounted to true after component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Check localStorage and set loading state after component has mounted
  useEffect(() => {
    if (hasMounted) {
      const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
      
      if (!hasVisitedBefore) {
        // Only show loader on first visit
        setIsLoading(true);
        setShowLoader(true);
        sessionStorage.setItem('hasVisitedBefore', 'true');
      }
      
      // Fetch papers regardless of loading state
      fetchLatestPapers();
    }
  }, [hasMounted]);
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Set animations ready after loading completes with a small delay
      setTimeout(() => {
        setAnimationsReady(true);
      }, 100);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  async function fetchLatestPapers() {
    try {
      const response = await fetch(`${API_URL}/papers?limit=3`);
      if (response.ok) {
        const data = await response.json();
        setPapers(data);
      }
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  } // Make sure this closing bracket is here

  // Use the original return statement to avoid changing the UI
  if (showLoader && isLoading) {
    return <Loader setIsLoading={setIsLoading} />;
  }
  
  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* Custom tech cursor */}
      <TechCursor />
      
      {/* Hero Section - moved up with significantly reduced height */}
      <section className="relative flex items-center pt-4 pb-6 overflow-hidden" style={{ minHeight: "35vh" }}>
        {/* Premium dark gradient background with subtle color variation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#0a0a18]"></div>
        
        {/* Extremely subtle tech grid */}
        <TechGrid animated={true} dataPoints={3} opacity={0.008} />
        
        {/* Premium spotlight effect - more subtle and professional */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%] opacity-[0.02]"
            animate={{ 
              background: [
                "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 50%)",
                "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 50%)"
              ]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Subtle animated particles - more professional */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/10"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.1 + 0.05
              }}
              animate={{ 
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ 
                duration: 15 + Math.random() * 20, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Apple-style subtle horizontal lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="h-full w-full flex flex-col justify-between opacity-[0.03]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            ))}
          </div>
        </div>
        
        {/* Hero content - FAANG-style layout with reduced padding */}
        <div className="relative w-full z-10">
          <div className="container mx-auto px-6 md:px-12 py-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left column - Text content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: animationsReady ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Premium brand label with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationsReady ? 1 : 0, y: animationsReady ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-6 inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  <TypewriterText 
                    text="AI-Powered Policy Research Lab" 
                    delay={animationsReady ? 300 : 2500}
                    className="text-blue-400 text-xs uppercase tracking-widest"
                  />
                </motion.div>
                
                {/* FAANG-style headline with premium typography */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Shaping Policy Through </span>
                      <span className="text-blue-400">Data-Driven</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"> Research.</span>
                    </div>
                  </motion.div>
                </h1>
                
                <motion.p 
                  className="mt-6 text-xl text-white/70 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationsReady ? 1 : 0, y: animationsReady ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The Perrin Institution is a contracted research organization based at the University of Virginia, dedicated to shaping the future of technology governance and legal innovation.
                </motion.p>
                
                {/* Google/Apple-style feature highlight with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationsReady ? 1 : 0, y: animationsReady ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-10 flex flex-col space-y-4"
                >
                  {[
                    { 
                      icon: FiDatabase, 
                      title: "Advanced AI-driven policy analysis",
                      color: "bg-gradient-to-r from-blue-500/20 to-blue-400/10"
                    },
                    { 
                      icon: FiCode, 
                      title: "Data-backed research methodologies",
                      color: "bg-gradient-to-r from-purple-500/20 to-purple-400/10"
                    },
                    { 
                      icon: FiServer, 
                      title: "Cross-disciplinary collaboration",
                      color: "bg-gradient-to-r from-green-500/20 to-green-400/10"
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mr-4 border border-white/5 shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300`}>
                        <feature.icon className="text-blue-400 group-hover:text-blue-300 transition-colors" size={18} />
                      </div>
                      <div className="text-white/80 font-medium group-hover:text-white transition-colors">{feature.title}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* FAANG-style CTA buttons with enhanced styling */}
                <motion.div 
                  className="mt-12 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationsReady ? 1 : 0, y: animationsReady ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }} 
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden group rounded-lg shadow-lg"
                  >
                    <Link 
                      href="/Labs"
                      className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg transition-all duration-300 z-10 relative font-medium"
                    >
                      Explore Labs <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <motion.div 
                      className="absolute inset-0 bg-blue-400/20"
                      whileHover={{ x: ["100%", "0%"] }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg overflow-hidden"
                  >
                    <Link 
                      href="/application" 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium"
                    >
                      Apply Now
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Right column - Premium imagery with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: animationsReady ? 1 : 0, x: animationsReady ? 0 : 30 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden lg:block relative"
              >
                {/* Main feature image - Apple/Google style with enhanced styling */}
                <div className="relative h-[420px] w-full rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5">
                  <Image
                    src="/capital.jpeg"
                    alt="Capitol building representing policy and governance"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={95}
                  />
                  
                  {/* Premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent"></div>
                  
                  {/* Apple-style image overlay effect */}
                  <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/30 to-transparent rotate-45 transform origin-top-right"></div>
                  </div>
                </div>
                
                {/* Floating metrics card - Google/Facebook style with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ 
                    opacity: animationsReady ? 1 : 0, 
                    y: animationsReady ? 0 : 20,
                    scale: animationsReady ? 1 : 0.95
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.4,
                    ease: "easeOut"
                  }}
                  className="absolute -bottom-12 -left-12 w-[220px]"
                  whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.5)" }}
                >
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center mb-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      <div className="text-xs font-medium text-white/90">Institute Impact</div>
                    </div>
                    <motion.div 
                      className="h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 mb-4"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ 
                        scaleX: animationsReady ? 1 : 0,
                        opacity: animationsReady ? 1 : 0
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: animationsReady ? 1.6 : 4.6,
                        ease: "easeOut"
                      }}
                    />
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <div className="text-white/60">Policy Adoption</div>
                        <div className="text-green-400 font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          42%
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="text-white/60">Research Citations</div>
                        <div className="text-green-400 font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          1.8k
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="text-white/60">Partner Institutions</div>
                        <div className="text-green-400 font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          40+
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating tech element - Apple style with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ 
                    opacity: animationsReady ? 1 : 0, 
                    y: animationsReady ? 0 : -20,
                    scale: animationsReady ? 1 : 0.95
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.6,
                    ease: "easeOut"
                  }}
                  className="absolute -top-10 -right-10 w-[200px]"
                  whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.5)" }}
                >
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]">
                    <div className="text-xs font-mono text-white/70 mb-3">
                      <TypewriterText text="// Live data processing" delay={animationsReady ? 2000 : 5000} />
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <div className="text-xs font-mono text-white/80">AI Model Active</div>
                    </div>
                    <div className="h-[1px] w-full bg-white/10 mb-3"></div>
                    <div className="flex justify-between items-center text-[10px] text-white/50 font-mono">
                      <div>CPU</div>
                      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                          animate={{ width: ["30%", "80%", "45%"] }}
                          transition={{ duration: 8, repeat: Infinity }}
                        />
                      </div>
                      <div>45%</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Apple-style floating code snippet */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: animationsReady ? 1 : 0, scale: animationsReady ? 1 : 0.9 }}
                  transition={{ duration: 1, delay: 1.8 }}
                  className="absolute top-1/2 right-[-80px] transform -translate-y-1/2 w-[160px] hidden xl:block"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-lg p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] rotate-3">
                    <div className="text-[10px] font-mono text-blue-400/80 mb-1">{`// Policy Analysis`}</div>
                    <div className="text-[9px] font-mono text-white/60 leading-relaxed">
                      <div>function <span className="text-purple-400">analyzePolicy</span>() {`{`}</div>
                      <div className="pl-2">const data = getData();</div>
                      <div className="pl-2">return AI.process(data);</div>
                      <div>{`}`}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* FAANG-style metrics row with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationsReady ? 1 : 0, y: animationsReady ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mt-24 border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { label: "Applicants", value: "3,000+", icon: FiDatabase, color: "text-blue-400" },
                { label: "Reached via Socials", value: "75,000,000+", icon: FiCode, color: "text-purple-400" },
                { label: "Garnered Scholarships", value: "$3,570,000+", icon: FiServer, color: "text-green-400" },
                { 
                  label: "TikTok Followers", 
                  value: "48k+", 
                  icon: FiActivity, 
                  color: "text-pink-400",
                  link: "https://www.tiktok.com/@theperrininstitution?_t=ZT-8ugIWNNxeqw&_r=1"
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-2">
                    <stat.icon className={stat.color} size={16} />
                    <div className="ml-2 text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                  </div>
                  <div className={`text-3xl font-medium ${stat.color}`}>{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Partners Showcase Section - Immediately after Hero */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/10 via-transparent to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section heading */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              U.S. Federal Agencies Advised
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
            We create advanced solutions that prevent malicious policies from being obscured and legitimized by convoluted legal semantics.
            </p>
          </motion.div>

          {/* Partners grid with organization names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "NASA", fullName: "National Aeronautics and Space Administration", logo: "/nasa-logo.png" },
              { name: "Department of State", fullName: "U.S. Department of State", logo: "/state-logo.png" },
              { name: "Department of Education", fullName: "U.S. Department of Education", logo: "/education-logo.png" },
              { name: "Department of Energy", fullName: "U.S. Department of Energy", logo: "/energy-logo.png" },
              { name: "EPA", fullName: "Environmental Protection Agency", logo: "/epa-logo.png" }
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <div className="h-full border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-[2px] group-hover:border-blue-500/30 transition-all duration-300">
                  {/* Tech corner accent */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rotate-45 transform origin-bottom-left"></div>
                  </div>
                  
                  {/* Hover line effect */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent w-0 group-hover:w-[80%] transition-all duration-300"
                  />
                  
                  <div className="mb-4 flex items-center justify-center h-20">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      width={120} 
                      height={60} 
                      className="object-contain h-16 w-auto filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-md font-semibold text-white">{partner.name}</h3>
                    <p className="text-xs text-white/50 mt-1 font-mono">{partner.fullName}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Metrics Section - FAANG-style showcase */}
      <section className="relative bg-black py-32 px-6 overflow-hidden">
        {/* Subtle tech background */}
        <TechGrid animated={false} opacity={0.005} />
        
        {/* Animated gradient - reduced opacity */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 30%, rgba(59,130,246,0.05) 0%, rgba(0,0,0,0) 50%)",
              "radial-gradient(circle at 80% 70%, rgba(59,130,246,0.05) 0%, rgba(0,0,0,0) 50%)"
            ]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <div className="flex items-center mb-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-blue-400 text-xs uppercase tracking-widest font-mono">Institute Impact</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Reach & Influence</h2>
            </div>
          </motion.div>
          
          {/* FAANG-style metrics showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                value: "250+",
                label: "Policy Researchers",
                description: "Our team of 250+ policy researchers leverages expertise in technology and governance to drive impactful, data-driven solutions for all of our clients",
                icon: "graph",
                color: "blue"
              },
              {
                value: "$3M+",
                label: "Garnered Scholarships",
                description: "Total tution value garnered in merit-based scholarships, study abroad oppurunties, and research stipends by the Perrin Institution's employees",
                icon: "money",
                color: "green"
              },
              {
                value: "10+",
                label: "Research Laboratories",
                description: "We operate over 10 technology-driven, policy-focused labs dedicated to developing innovative solutions at the intersection of technology & governence",
                icon: "network",
                color: "purple"
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 * index, duration: 0.8 }}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
                className="group cursor-pointer"
              >
                <div className={`border border-white/10 rounded-xl p-8 h-full flex flex-col hover:border-${metric.color}-500/30 transition-all duration-500 relative bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-[2px]`}>
                  {/* Premium corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-${metric.color}-500/20 to-transparent rotate-45 transform origin-top-right`}></div>
                  </div>
                  
                  {/* Animated icon */}
                  <div className={`w-16 h-16 rounded-full bg-${metric.color}-500/10 flex items-center justify-center mb-6 group-hover:bg-${metric.color}-500/20 transition-all duration-500`}>
                    {metric.icon === "graph" && (
                      <motion.svg 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`text-${metric.color}-400`}
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3M21 7L15.5657 12.4343C15.3677 12.6323 15.2687 12.7313 15.1545 12.7684C15.0541 12.8011 14.9459 12.8011 14.8455 12.7684C14.7313 12.7313 14.6323 12.6323 14.4343 12.4343L12.5657 10.5657C12.3677 10.3677 12.2687 10.2687 12.1545 10.2316C12.0541 10.1989 11.9459 10.1989 11.8455 10.2316C11.7313 10.2687 11.6323 10.3677 11.4343 10.5657L7 15M21 7H17M21 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    )}
                    {metric.icon === "money" && (
                      <motion.svg 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`text-${metric.color}-400`}
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      >
                        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99999L16.25 7.82842M4.92157 19.0784L7.75 16.25M4.92157 4.99999L7.75 7.82842M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    )}
                    {metric.icon === "network" && (
                      <motion.svg 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`text-${metric.color}-400`}
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <path d="M8 15V9M20 18V6M14 18V12M2 12V18M2 12C2 11.0572 2 10.5858 2.29289 10.2929C2.58579 10 3.05719 10 4 10H6C6.94281 10 7.41421 10 7.70711 10.2929C8 10.5858 8 11.0572 8 12M2 12V6M8 12C8 12.9428 8 13.4142 8.29289 13.7071C8.58579 14 9.05719 14 10 14H12C12.9428 14 13.4142 14 13.7071 13.7071C14 13.4142 14 12.9428 14 12M14 12C14 11.0572 14 10.5858 14.2929 10.2929C14.5858 10 15.0572 10 16 10H18C18.9428 10 19.4142 10 19.7071 10.2929C20 10.5858 20 11.0572 20 12M20 12C20 12.9428 20 13.4142 19.7071 13.7071C19.4142 14 18.9428 14 18 14H16C15.0572 14 14.5858 14 14.2929 13.7071C14 13.4142 14 12.9428 14 12M8 9C8 8.05719 8 7.58579 7.70711 7.29289C7.41421 7 6.94281 7 6 7H4C3.05719 7 2.58579 7 2.29289 7.29289C2 7.58579 2 8.05719 2 9M8 9C8 9.94281 8 10.4142 8.29289 10.7071C8.58579 11 9.05719 11 10 11H12C12.9428 11 13.4142 11 13.7071 10.7071C14 10.4142 14 9.94281 14 9M14 9C14 8.05719 14 7.58579 14.2929 7.29289C14.5858 7 15.0572 7 16 7H18C18.9428 7 19.4142 7 19.7071 7.29289C20 7.58579 20 8.05719 20 9M14 9V6M20 9V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    )}
                  </div>
                  
                  {/* Metric value with animated underline */}
                  <div className="relative mb-2">
                    <h3 className={`text-4xl md:text-5xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</h3>
                    <motion.div 
                      className={`h-[2px] bg-gradient-to-r from-${metric.color}-500/80 to-${metric.color}-500/20 w-16`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                    />
                  </div>
                  
                  {/* Label */}
                  <h4 className="text-xl font-medium text-white mb-3">{metric.label}</h4>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm flex-grow">{metric.description}</p>
                  
                  {/* Animated data visualization */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-mono text-white/40">Growth Rate</div>
                      <div className="text-xs font-mono text-green-400">+{28 + index * 4}%</div>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r from-${metric.color}-600 to-${metric.color}-400`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${65 + index * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.6 + index * 0.2 }}
                      />
                    </div>
                    
                    {/* Animated data points */}
                    <div className="mt-4 flex justify-between">
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-1 bg-${metric.color}-500/40 rounded-full`}
                          style={{ 
                            height: 4 + (i % 3) * 2,
                            opacity: 0.5 + (i % 2) * 0.3
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Tech hover effect */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-${metric.color}-600 via-${metric.color}-400 to-${metric.color}-600`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Global Recognition & Achievement section - Enhanced Design */}
          <section className="py-20 bg-black relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
            
            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Section header */}
              <div className="text-center mb-16">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 bg-blue-500/10 rounded-full border border-blue-400/30 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-blue-400 text-sm font-medium">Global Prestige</span>
                </motion.div>
                
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Elite Recognition & Partnerships
                </motion.h2>
                
                <motion.p 
                  className="max-w-2xl mx-auto text-slate-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Our groundbreaking research has received prestigious recognition from world-renowned institutions, placing us among elite policy think tanks
                </motion.p>
              </div>
              
              {/* Recognition cards - with reordered cards and enhanced styling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stanford Card - Now first position */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Logo with container for consistent sizing */}
                  <div className="h-16 mb-6 flex items-center">
                    <div className="relative h-12 w-48">
                      <Image
                        src="/Stanford-University-Logo.png"
                        alt="Stanford University"
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-2">Stanford University</h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    Our revolutionary case study earned the prestigious <span className="text-white font-medium">#1 Best Case Study Award</span> at Stanford's International Young Researchers' Conference, surpassing submissions from elite global universities.
                  </p>
                  
                  {/* Enhanced highlight badge */}
                  <div className="bg-blue-900/30 border border-blue-800/40 rounded-lg p-3 mb-4">
                    <div className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Elite Achievement</div>
                    <div className="text-white font-medium flex items-center">
                      <span className="text-blue-300 text-lg mr-2">🏆</span>
                      <span className="text-gradient-blue">#1 Best Case Study Award</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="text-blue-400 flex items-center text-sm font-medium">
                      <span>Globally Recognized Research Excellence</span>
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                
                {/* US Senate Card - Now in middle position with gold glow */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full relative shadow-[0_0_15px_0_rgba(245,158,11,0.15)]"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(245,158,11,0.03) 100%)"
                  }}
                >
                  {/* Gold accent elements */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
                  
                  <div className="h-16 mb-6 flex items-center">
                    <div className="relative h-14 w-14">
                      <Image
                        src="/US-Senate-Logo.png"
                        alt="US Senate"
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-2">
                    <span className="text-amber-300">U.S. Senate Commendation</span>
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    An exceptional honor: <span className="text-white font-medium">U.S. Senator Chris Van Hollen</span> personally issued an official letter of commendation for the Perrin Institute at UVA, recognizing our transformative contributions to national policy discourse.
                  </p>
                  
                  {/* Highlight badge with gold styling */}
                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 mb-4">
                    <div className="text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">Prestigious Recognition</div>
                    <div className="text-white font-medium flex items-center">
                      <span className="text-amber-300 text-lg mr-2">🏛️</span>
                      <span>Official Senatorial Commendation</span>
                    </div>
                  </div>
                  
                  {/* Quote from Senator */}
                  <div className="italic text-amber-100/70 text-xs border-l-2 border-amber-500/30 pl-3 mb-4">
                    "...your initiative sets a powerful example of how passion and purpose can drive meaningful change..." <span className="not-italic font-medium"> — Senator Chris Van Hollen</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-amber-500/10">
                    <div className="text-amber-300 flex items-center text-sm font-medium">
                      <span>Congressional Recognition</span>
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                
                {/* SSRN Card - Now in last position */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-16 mb-6 flex items-center">
                    <div className="relative h-10 w-40">
                      <Image
                        src="/SSRN_Logo.svg.png"
                        alt="SSRN"
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-2">SSRN Global Recognition</h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    Our groundbreaking policy paper on digital governance achieved a remarkable <span className="text-white font-medium">#2 ranking in global downloads</span> on SSRN History of Science and Environment eJournal, competing with research from institutions like Harvard and Oxford.
                  </p>
                  
                  {/* Enhanced highlight badge */}
                  <div className="bg-blue-900/30 border border-blue-800/40 rounded-lg p-3 mb-4">
                    <div className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Global Research Impact</div>
                    <div className="text-white font-medium flex items-center">
                      <span className="text-blue-300 text-lg mr-2">📊</span>
                      <span>Global Top Downloads List, History of Science and Environment eJournal Top 10</span>
                    </div>
                  </div>
                  
                  {/* Added metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-white/5 rounded p-2 text-center">
                      <div className="text-blue-300 text-xs uppercase">Impressions</div>
                      <div className="text-white font-medium">5,200+</div>
                    </div>
                    <div className="bg-white/5 rounded p-2 text-center">
                      <div className="text-blue-300 text-xs uppercase">Authors</div>
                      <div className="text-white font-medium">10+</div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="text-blue-400 flex items-center text-sm font-medium">
                      <span>Elite Academic Recognition</span>
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Add some custom styling for the text gradients */}
            <style jsx global>{`
              .text-gradient-blue {
                background: linear-gradient(90deg, #60a5fa, #93c5fd);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
            `}</style>
          </section>
        </div>
      </section>

      {/* About Section - placed right after Global Recognition */}
      <AboutSection />

      {/* Featured in BBC Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}></div>
          
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* BBC media badge */}
            <motion.div 
              className="flex justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-full py-2 px-5 backdrop-blur-sm inline-flex items-center gap-2">
                <motion.div 
                  className="text-red-500 font-bold text-sm"
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                    scale: [0.98, 1, 0.98],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <div className="flex items-center">
                    <span className="font-bold text-lg tracking-wider">BBC</span>
                    <span className="ml-1 tracking-wide">NEWS</span>
                  </div>
                </motion.div>
                <span className="text-white/70 text-xs tracking-wider font-medium uppercase">Featured Interview</span>
              </div>
            </motion.div>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Video/image left side */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden aspect-video bg-slate-800 shadow-xl shadow-blue-900/10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Embedded YouTube video with autoplay */}
                <iframe 
                  src="https://www.youtube.com/embed/xS_3pUX3Qvg?autoplay=1&mute=1&loop=1&playlist=xS_3pUX3Qvg&controls=1&modestbranding=1&rel=0"
                  title="BBC Interview with Director Kashaf"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full z-10"
                ></iframe>
                
                {/* BBC logo watermark */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none bg-black/50 px-2 py-1 rounded">
                  <span className="font-bold text-lg text-red-600 tracking-wider">BBC</span>
                </div>
              </motion.div>
              
              {/* Content right side */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="mb-4">
                  <motion.div 
                    className="inline-flex items-center px-3 py-1 mb-4 bg-indigo-500/10 rounded-full border border-indigo-500/30"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    />
                    <span className="text-xs font-mono text-indigo-400 tracking-wider">LEADERSHIP SPOTLIGHT</span>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-2 text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Meet Our Inclusive Policy Laboratory Director
                  </motion.h2>
                  
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/30">
                      <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-purple-900"></div>
                    </div>
                    <div>
                      <div className="text-white font-medium">Kashaf Ahmed</div>
                      <div className="text-white/60 text-sm">Inclusive Policy Laboratory</div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="space-y-4 text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <p className="leading-relaxed">
                    The BBC recently spotlighted our trailblazing Inclusive Policy Laboratory Director, Kashaf Ahmed, highlighting her groundbreaking work at the intersection of technology and governance.
                  </p>
                  <p className="leading-relaxed">
                    In this exclusive interview, Kashaf discusses how the Lab's innovative approach to inclusive policy development is reshaping the landscape of public governance and creating more equitable technological solutions.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="mt-8 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm flex-1 min-w-[140px]">
                    <div className="text-indigo-400 text-sm font-medium mb-1">Featured Research</div>
                    <div className="text-white text-lg font-medium">Inclusive AI Governance</div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm flex-1 min-w-[140px]">
                    <div className="text-indigo-400 text-sm font-medium mb-1">Policy Impact</div>
                    <div className="text-white text-lg font-medium">12+ National Frameworks</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  <a 
                    href="https://www.youtube.com/watch?v=xS_3pUX3Qvg" 
                    target="_blank" 
                    className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                  >
                    Open in YouTube
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
                      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section - Add this before the CTA */}
      <SocialSection />

      {/* Research Think Tank CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-950/30 to-black/50 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          {/* Grid lines */}
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}>
          </div>
          
          {/* Radial gradient */}
          <div className="absolute inset-0 bg-radial-gradient"></div>
          
          {/* Animated circles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full border border-blue-500/20"
              style={{
                width: (i + 1) * 100 + 'px',
                height: (i + 1) * 100 + 'px',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
          
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-blue-400"
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                filter: "blur(1px)",
                opacity: 0.2
              }}
              animate={{
                y: [Math.random() * -100, Math.random() * 100],
                x: [Math.random() * -100, Math.random() * 100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center px-3 py-1 bg-blue-500/10 rounded-full border border-blue-400/30 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="w-2 h-2 bg-blue-400 rounded-full mr-2"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <span className="text-xs font-mono text-blue-400 tracking-wider">COLLABORATION OPPORTUNITY</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Join Our Research Think Tank
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Connect with leading researchers and policymakers working at the intersection of technology and governance
            </motion.p>
          </div>
          
          {/* Main card with content */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Card inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5"></div>
            
            {/* Card content grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 relative z-10">
              {/* Left content area - 3 columns */}
              <div className="md:col-span-3 p-10 md:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-white">Shape the future of policy research</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                    {[
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                          </svg>
                        ),
                        title: "Research Collaboration",
                        description: "Work with leading experts on cutting-edge policy research initiatives",
                        color: "blue"
                      },
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                          </svg>
                        ),
                        title: "Global Network",
                        description: "Access our network of 200+ researchers across 35 countries",
                        color: "indigo"
                      },
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                            <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                          </svg>
                        ),
                        title: "Resources & Funding",
                        description: "Gain access to exclusive research tools, publications, and funding opportunities",
                        color: "purple"
                      },
                      {
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
                            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                          </svg>
                        ),
                        title: "Policy Impact",
                        description: "Influence real-world policy decisions with your research and expertise",
                        color: "cyan"
                      }
                    ].map((benefit, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                        whileHover={{ 
                          x: 5, 
                          transition: { duration: 0.2 } 
                        }}
                      >
                        <motion.div 
                          className={`w-12 h-12 bg-${benefit.color}-500/10 rounded-xl flex items-center justify-center mr-4 border border-${benefit.color}-500/20 flex-shrink-0 overflow-hidden relative`}
                          whileHover={{ 
                            scale: 1.05,
                            borderColor: `rgba(${benefit.color === 'blue' ? '59, 130, 246' : benefit.color === 'indigo' ? '99, 102, 241' : benefit.color === 'purple' ? '139, 92, 246' : '6, 182, 212'}, 0.5)`,
                          }}
                        >
                          <motion.div 
                            className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ 
                              opacity: 1,
                              x: '100%',
                              transition: { duration: 0.6 }
                            }}
                          />
                          <motion.div 
                            className={`text-${benefit.color}-400`}
                            whileHover={{ 
                              scale: 1.2,
                              rotate: [0, 5, -5, 0],
                              transition: { duration: 0.5 }
                            }}
                          >
                            {benefit.icon}
                          </motion.div>
                        </motion.div>
                        
                        <div>
                          <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-white/60 text-sm">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        window.location.href = "/application";
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium"
                    >
                      Apply Now
                      <FiArrowRight className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
              
              {/* Right content area - 2 columns */}
              <div className="md:col-span-2 relative overflow-hidden h-96 md:h-auto bg-gradient-to-br from-blue-900/10 via-indigo-900/20 to-purple-900/10">
                {/* Dynamic background elements */}
                <div className="absolute inset-0">
                  {/* Animated gradient blobs */}
                  <motion.div 
                    className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
                    style={{ top: '20%', left: '30%' }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div 
                    className="absolute w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl"
                    style={{ top: '50%', right: '20%' }}
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
                
                {/* Central visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Connection lines */}
                  <svg className="absolute w-full h-full" viewBox="0 0 400 400">
                    <motion.path 
                      d="M200,100 C240,150 240,250 200,300" 
                      stroke="rgba(59, 130, 246, 0.2)" 
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path 
                      d="M200,100 C160,150 160,250 200,300" 
                      stroke="rgba(99, 102, 241, 0.2)" 
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 0.7 }}
                    />
                    <motion.path 
                      d="M120,200 L280,200" 
                      stroke="rgba(139, 92, 246, 0.2)" 
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </svg>

                  {/* Central globe visualization */}
                  <motion.div 
                    className="relative w-72 h-72"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    {/* Orbiting network connections */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{ border: '1px solid rgba(59, 130, 246, 0.15)' }}
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 100, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {/* Network nodes - inner orbit */}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const x = Math.cos(angle) * 36;
                        const y = Math.sin(angle) * 36;
                        return (
                          <motion.div
                            key={`node-inner-${i}`}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full"
                            style={{
                              left: `calc(50% + ${x}%)`,
                              top: `calc(50% + ${y}%)`,
                            }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 2 + (i % 3),
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        )
                      })}
                    </motion.div>

                    {/* Middle orbit */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{ border: '1px solid rgba(99, 102, 241, 0.15)' }}
                      animate={{ rotate: -360 }}
                      transition={{ 
                        duration: 120, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {/* Network nodes - middle orbit */}
                      {[...Array(16)].map((_, i) => {
                        const angle = (i / 16) * Math.PI * 2;
                        const x = Math.cos(angle) * 60;
                        const y = Math.sin(angle) * 60;
                        return (
                          <motion.div
                            key={`node-middle-${i}`}
                            className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full"
                            style={{
                              left: `calc(50% + ${x}%)`,
                              top: `calc(50% + ${y}%)`,
                            }}
                            animate={{
                              scale: [1, 1.8, 1],
                              opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                              duration: 3 + (i % 4),
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        )
                      })}
                    </motion.div>

                    {/* Outer orbit */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{ border: '1px solid rgba(139, 92, 246, 0.15)' }}
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 150, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {/* Network nodes - outer orbit */}
                      {[...Array(20)].map((_, i) => {
                        const angle = (i / 20) * Math.PI * 2;
                        const x = Math.cos(angle) * 82;
                        const y = Math.sin(angle) * 82;
                        return (
                          <motion.div
                            key={`node-outer-${i}`}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{
                              left: `calc(50% + ${x}%)`,
                              top: `calc(50% + ${y}%)`,
                            }}
                            animate={{
                              scale: [1, 2, 1],
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 4 + (i % 3),
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        )
                      })}
                    </motion.div>

                    {/* Center sphere */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/10 flex items-center justify-center"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <motion.div 
                        className="relative w-full h-full flex items-center justify-center"
                        animate={{ 
                          rotate: [0, 360] 
                        }}
                        transition={{ 
                          duration: 60,
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                      >
                        {/* Connection points */}
                        {[...Array(6)].map((_, i) => {
                          const angle = (i / 6) * Math.PI * 2;
                          const x = Math.cos(angle) * 48;
                          const y = Math.sin(angle) * 48;
                          return (
                            <motion.div
                              key={`connection-${i}`}
                              className="absolute w-0.5 h-0.5 bg-white rounded-full"
                              style={{
                                left: `calc(50% + ${x}%)`,
                                top: `calc(50% + ${y}%)`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            />
                          )
                        })}
                        
                        <motion.div 
                          className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20"
                          animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
                            <motion.path 
                              d="M12 2L2 7L12 12L22 7L12 2Z" 
                              stroke="url(#paint0_linear)" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1.5, delay: 1.4 }}
                            />
                            <motion.path 
                              d="M2 17L12 22L22 17" 
                              stroke="url(#paint1_linear)" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1.5, delay: 1.6 }}
                            />
                            <motion.path 
                              d="M2 12L12 17L22 12" 
                              stroke="url(#paint2_linear)" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1.5, delay: 1.8 }}
                            />
                            <motion.path 
                              d="M12 22V12" 
                              stroke="url(#paint3_linear)" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 2 }}
                            />
                            <defs>
                              <linearGradient id="paint0_linear" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#60A5FA" />
                                <stop offset="1" stopColor="#A78BFA" />
                              </linearGradient>
                              <linearGradient id="paint1_linear" x1="2" y1="19.5" x2="22" y2="19.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#60A5FA" />
                                <stop offset="1" stopColor="#A78BFA" />
                              </linearGradient>
                              <linearGradient id="paint2_linear" x1="2" y1="14.5" x2="22" y2="14.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#60A5FA" />
                                <stop offset="1" stopColor="#A78BFA" />
                              </linearGradient>
                              <linearGradient id="paint3_linear" x1="12" y1="17" x2="13" y2="17" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#60A5FA" />
                                <stop offset="1" stopColor="#A78BFA" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Visual data points - top */}
                <motion.div 
                  className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
                      whileInView={{ 
                        scale: [0.8, 1.3, 1],
                        opacity: [0, 1, 1] 
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <motion.div 
                      className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center"
                      whileInView={{ 
                        scale: [0.8, 1.3, 1],
                        opacity: [0, 1, 1] 
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <motion.div 
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center"
                      whileInView={{ 
                        scale: [0.8, 1.3, 1],
                        opacity: [0, 1, 1] 
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <motion.div 
                      className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
                      whileInView={{ 
                        scale: [0.8, 1.3, 1],
                        opacity: [0, 1, 1] 
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Visual profile bubbles - bottom */}
                <motion.div 
                  className="absolute bottom-6 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  <motion.div 
                    className="flex -space-x-3 justify-center"
                    whileInView={{ scale: [0.9, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        className="w-8 h-8 rounded-full border-2 border-blue-900 overflow-hidden"
                        style={{ 
                          backgroundImage: `url(https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${10 + i}.jpg)`,
                          backgroundSize: 'cover',
                          zIndex: 5 - i,
                        }}
                        initial={{ x: i * 20 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                        whileHover={{ 
                          y: -5, 
                          scale: 1.2, 
                          zIndex: 10,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                        }}
                      />
                    ))}
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-900 flex items-center justify-center text-white font-medium text-xs"
                      style={{ zIndex: 0 }}
                      initial={{ x: 50 }}
                      whileInView={{ x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      whileHover={{ 
                        y: -5, 
                        scale: 1.2, 
                        zIndex: 10,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                      }}
                    >
                      200+
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Application deadline - subtle indicator */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    backgroundPosition: ['100% 0%', '0% 0%'], 
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: "easeInOut" 
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
