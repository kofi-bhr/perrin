"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useAnimation, Variant } from "framer-motion";
import { FiArrowRight, FiMenu, FiX, FiCode, FiDatabase, FiServer, FiArrowDown, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { images } from "@/lib/images";
import TechGrid from "@/components/TechGrid";
import TechCursor from "@/components/TechCursor";
import Footer from '@/components/Footer';
import { Popover, Dialog, Disclosure, Transition } from '@headlessui/react';

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
              <div className="text-3xl font-serif font-bold tracking-tight relative">
                <motion.span 
                  className="text-white inline-block"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ 
                    opacity: 1, 
                    filter: "blur(0px)",
                    transition: { duration: 1.5, delay: 0.2 }
                  }}
                >
                  PERRIN
                </motion.span>
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-[1px]"
                  initial={{ width: "0%", background: "rgba(59, 130, 246, 0.5)" }}
                  animate={{ 
                    width: "100%", 
                    background: "rgba(59, 130, 246, 1)"
                  }}
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
                      href="/research"
                      className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg transition-all duration-300 z-10 relative font-medium"
                    >
                      Explore Research <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
                      href="/about"
                      className="inline-flex items-center px-8 py-3.5 bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-lg transition-all duration-300 font-medium"
                    >
                      Learn More
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
                { label: "Supporters", value: "48,000+", icon: FiDatabase, color: "text-blue-400" },
                { label: "Reached via Socials", value: "75,000,000+", icon: FiCode, color: "text-purple-400" },
                { label: "Garnered Scholarships", value: "$3,570,000+", icon: FiServer, color: "text-green-400" },
                { label: "Applicants", value: "3,000+", icon: FiServer, color: "text-yellow-400" }
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
        
        {/* Scroll indicator - Apple style with enhanced styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animationsReady ? 1 : 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="text-white/40 text-xs uppercase tracking-wider font-medium mb-2">Scroll</div>
          <motion.div 
            className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-white/5 rounded-full"
            animate={{ 
              scaleY: [1, 0.6, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
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
          
          {/* Global Recognition & Achievement section - MOVED HERE */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10 shadow-lg mb-6">
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs font-mono text-blue-400/90 tracking-wider">RESEARCH EXCELLENCE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Global Recognition & Achievement</h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Our research and policy contributions have received prestigious recognition from leading global institutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Enhanced SSRN Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/30 border border-blue-500/20 rounded-2xl shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
                  
                  <div className="p-8">
                    {/* Top badge */}
                    <div className="absolute -right-3 -top-3 transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                      <div className="bg-blue-600/90 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm text-white tracking-wider">
                        GLOBALLY RECOGNIZED
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center mb-8 gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl p-0.5 flex-shrink-0">
                        <div className="w-full h-full bg-blue-950 rounded-lg flex items-center justify-center">
                          <span className="text-lg text-blue-200 font-bold">SSRN</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-blue-300 tracking-tight uppercase mb-1">Social Science Research Network</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">eJournal Downloads</h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-12 mb-10">
                      <div className="flex items-center gap-6">
                        <div className="text-5xl font-bold text-white">#3</div>
                        <div className="h-14 w-px bg-blue-500/20 hidden md:block"></div>
                        <div className="hidden md:block">
                          <div className="text-sm text-blue-300">Global Ranking</div>
                          <div className="text-xs text-blue-400/60">Among 4,200+ Institutions</div>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute inset-1 rounded-full border border-blue-400/20"></div>
                        <div className="text-xl font-bold text-white">85%</div>
                        <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                      </motion.div>
                    </div>
                    
                    <div className="md:hidden mb-6">
                      <div className="text-sm text-blue-300">Global Ranking</div>
                      <div className="text-xs text-blue-400/60">Among 4,200+ Institutions</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Progress to #1</span>
                        <span className="text-blue-400">85%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "85%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                        />
                      </div>
                      
                      <div className="pt-6 grid grid-cols-2 gap-4">
                        {[
                          { value: "42K+", label: "Downloads" },
                          { value: "124+", label: "Papers" },
                          { value: "89%", label: "Citation Rate" },
                          { value: "4.8", label: "Impact Factor" }
                        ].slice(0, 2).map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-sm font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs text-blue-300/60">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* New US Senator Recognition Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative group isolate overflow-hidden"
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                {/* Enhanced background effects with more intensity */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-purple-400/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/40 to-violet-400/40 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800/5 to-fuchsia-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Moving particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-purple-400"
                      initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                      animate={{ 
                        x: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%"
                        ],
                        y: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%"
                        ],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 10 + Math.random() * 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                      style={{ scale: 1 + Math.random() * 2 }}
                    />
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-purple-950/30 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden relative backdrop-blur-sm group-hover:border-purple-500/50 transition-colors duration-300">
                  {/* Enhanced hover glow */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated top bar with enhanced animation */}
                  <motion.div 
                    className="h-2.5 w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-400"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 100%" }}
                  />
                  
                  <div className="p-8 relative">
                    {/* Enhanced top badge with improved animation */}
                    <motion.div 
                      className="absolute -right-3 -top-3 z-10"
                      initial={{ rotate: 12 }}
                      whileHover={{ rotate: 0, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative">
                        {/* Badge glow effect */}
                        <div className="absolute inset-0 bg-purple-500/60 rounded-full blur-md"></div>
                        <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg animate-pulse"></div>
                        <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm text-white tracking-wider relative border border-purple-400/30">
                          FEDERAL RECOGNITION
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row md:items-center mb-8 gap-6">
                      {/* Enhanced icon container with more dramatic animation */}
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl p-0.5 flex-shrink-0 relative group-hover:shadow-lg group-hover:shadow-purple-500/30"
                        whileHover={{ 
                          rotate: [0, -5, 5, -3, 0],
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {/* Add subtle light effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                          {/* Add subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Add subtle pulsing effect */}
                          <motion.div 
                            className="absolute inset-0 bg-purple-500/5"
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          <div className="text-lg text-purple-200 font-bold flex items-center justify-center">
                            <motion.svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor" 
                              className="w-10 h-10"
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0117.25 17H2.75A1.75 1.75 0 011 15.25V4.75zm3.5 2.75a.75.75 0 011.5 0v5.75a.75.75 0 01-1.5 0V7.5zm3.25-.5a.75.75 0 00-.75.75v6.25a.75.75 0 001.5 0V7.75a.75.75 0 00-.75-.75zm3.25.5a.75.75 0 011.5 0v5.75a.75.75 0 01-1.5 0V7.5zm3.25-.5a.75.75 0 00-.75.75v6.25a.75.75 0 001.5 0V7.75a.75.75 0 00-.75-.75z" clipRule="evenodd" />
                            </motion.svg>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div>
                        <motion.div 
                          className="text-sm font-medium text-purple-300 tracking-tight uppercase mb-1"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1, x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="inline-block mr-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                            </svg>
                          </span>
                          United States Senate
                        </motion.div>
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 tracking-tight"
                          initial={{ opacity: 0.9 }}
                          whileHover={{ opacity: 1, scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          Official Recognition
                        </motion.h3>
                      </div>
                    </div>
                    
                    {/* Enhanced federal stats section */}
                    <div className="flex items-center gap-12 mb-10">
                      <div className="flex items-center gap-6">
                        {/* Enhanced US display with glow */}
                        <div className="relative">
                          <div className="absolute inset-0 text-5xl font-bold text-purple-400 blur-sm opacity-50">US</div>
                          <div className="text-5xl font-bold text-white relative">US</div>
                        </div>
                        <div className="h-14 w-px bg-purple-500/30 hidden md:block"></div>
                        <div className="hidden md:block">
                          <div className="text-sm text-purple-300 font-medium">Senatorial Acknowledgment</div>
                          <div className="text-xs text-purple-400/70 mt-0.5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                            </svg>
                            Sen. Chris Van Hollen
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced circular progress with more visual effects */}
                      <motion.div 
                        className="w-24 h-24 rounded-full border-4 border-purple-500/40 flex items-center justify-center relative group-hover:border-purple-500/60 transition-colors duration-300"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute inset-1 rounded-full border border-purple-400/30"></div>
                        <motion.div 
                          className="absolute inset-2 rounded-full"
                          style={{
                            background: "conic-gradient(from 0deg, #a855f7 0%, #a855f750 100%)",
                          }}
                          animate={{
                            background: ["conic-gradient(from 0deg, #a855f7 100%, #a855f750 100%)", "conic-gradient(from 360deg, #a855f7 100%, #a855f750 100%)"]
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                        <div className="absolute inset-3 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-xl font-bold text-white">100%</div>
                        </div>
                        <div className="absolute top-0 right-0 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse"></div>
                      </motion.div>
                    </div>
                    
                    <div className="md:hidden mb-6">
                      <div className="text-sm text-purple-300 font-medium">Senatorial Acknowledgment</div>
                      <div className="text-xs text-purple-400/70 mt-0.5 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                        </svg>
                        Sen. Chris Van Hollen
                      </div>
                    </div>
                    
                    {/* Enhanced content section with improved typography and effects */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Federal Accreditation</span>
                        <span className="text-purple-400 font-bold">100%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full relative"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                        >
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      </div>
                      
                      <div className="pt-4 mt-6 border-t border-purple-500/30">
                        <div className="text-slate-300 leading-relaxed relative">
                          <motion.div
                            initial={{ opacity: 0.9 }}
                            whileHover={{ opacity: 1 }}
                            className="relative"
                          >
                            <span className="absolute -left-3 top-0 text-purple-400 font-bold text-xl">"</span>
                            <span className="font-medium">Special recognition</span> from the <span className="font-semibold text-white">United States Senate</span> for exceptional contributions to advancing science education and innovation leadership in America.
                            <span className="absolute -bottom-1 -right-1 text-purple-400 font-bold text-xl">"</span>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-purple-500/30 mt-6">
                        <div className="flex justify-between items-center">
                          <motion.div 
                            className="text-purple-400 text-sm font-medium flex items-center" 
                            whileHover={{ scale: 1.05, x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            Recognized by United States Senate
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/30 backdrop-blur-sm"
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                            </svg>
                            June 2023
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Enhanced animated view button with more effects */}
                      <motion.button
                        className="mt-4 w-full bg-gradient-to-r from-purple-800/70 to-fuchsia-700/70 hover:from-purple-700/90 hover:to-fuchsia-600/90 text-white rounded-lg p-2.5 text-sm font-medium flex items-center justify-center gap-2 group border border-purple-500/30 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Add shimmer effect */}
                        <motion.div 
                          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2,
                            ease: "linear",
                          }}
                        />
                        
                        <span>View Recognition</span>
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                          </svg>
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Stanford Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative group isolate overflow-hidden"
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                {/* Enhanced background effects with more intensity */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-400/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/40 to-orange-400/40 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-800/5 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Moving particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-red-400"
                      initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                      animate={{ 
                        x: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%"
                        ],
                        y: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%"
                        ],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 10 + Math.random() * 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                      style={{ scale: 1 + Math.random() * 2 }}
                    />
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-red-950/30 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden relative backdrop-blur-sm group-hover:border-red-500/50 transition-colors duration-300">
                  {/* Enhanced hover glow */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated top bar with enhanced animation */}
                  <motion.div 
                    className="h-2.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-orange-400"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 100%" }}
                  />
                  
                  <div className="p-8 relative">
                    {/* Enhanced top badge with improved animation */}
                    <motion.div 
                      className="absolute -right-3 -top-3 z-10"
                      initial={{ rotate: 12 }}
                      whileHover={{ rotate: 0, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative">
                        {/* Badge glow effect */}
                        <div className="absolute inset-0 bg-red-500/60 rounded-full blur-md"></div>
                        <div className="absolute inset-0 bg-red-400/20 rounded-full blur-lg animate-pulse"></div>
                        <div className="bg-gradient-to-r from-red-600 to-orange-400 text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm text-white tracking-wider relative border border-red-400/30">
                          RECOGNITION
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row md:items-center mb-8 gap-6">
                      {/* Enhanced icon container with more dramatic animation */}
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-400 rounded-xl p-0.5 flex-shrink-0 relative group-hover:shadow-lg group-hover:shadow-red-500/30"
                        whileHover={{ 
                          rotate: [0, -5, 5, -3, 0],
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {/* Add subtle light effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                          {/* Add subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Add subtle pulsing effect */}
                          <motion.div 
                            className="absolute inset-0 bg-red-500/5"
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          <div className="text-lg text-red-200 font-bold flex items-center justify-center">
                            <motion.svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              className="w-10 h-10"
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                              <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                              <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
                            </motion.svg>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div>
                        <motion.div 
                          className="text-sm font-medium text-red-300 tracking-tight uppercase mb-1"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1, x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="inline-block mr-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Stanford University
                        </motion.div>
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200 tracking-tight"
                          initial={{ opacity: 0.9 }}
                          whileHover={{ opacity: 1, scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          Research Recognition
                        </motion.h3>
                      </div>
                    </div>
                    
                    {/* Add similar stats section as the other cards */}
                    <div className="flex items-center gap-12 mb-10">
                      <div className="flex items-center gap-6">
                        {/* Enhanced Stanford display with glow */}
                        <div className="relative">
                          <div className="absolute inset-0 text-5xl font-bold text-red-400 blur-sm opacity-50">SU</div>
                          <div className="text-5xl font-bold text-white relative">SU</div>
                        </div>
                        <div className="h-14 w-px bg-red-500/30 hidden md:block"></div>
                        <div className="hidden md:block">
                          <div className="text-sm text-red-300 font-medium">Academic Excellence</div>
                          <div className="text-xs text-red-400/70 mt-0.5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                              <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.747 29.747 0 00-2.455 1.45.75.75 0 01-.836-.98c.329-.987.713-1.95 1.149-2.888a1.5 1.5 0 012.142 2.118z" clipRule="evenodd" />
                              <path d="M18 10.5a.75.75 0 01-.75.75h-1.513c-.96 0-1.919.122-2.850.364a.75.75 0 11-.352-1.459A16.695 16.695 0 0115.75 9.75h1.5a.75.75 0 01.75.75z" />
                              <path fillRule="evenodd" d="M7.5 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zm9-2.25a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-9.5a.75.75 0 010-1.5h9.5v-3.75a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>
                            Research Publication
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced circular progress with more visual effects */}
                      <motion.div 
                        className="w-24 h-24 rounded-full border-4 border-red-500/40 flex items-center justify-center relative group-hover:border-red-500/60 transition-colors duration-300"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute inset-1 rounded-full border border-red-400/30"></div>
                        <motion.div 
                          className="absolute inset-2 rounded-full"
                          style={{
                            background: "conic-gradient(from 0deg, #ef4444 0%, #ef444450 100%)",
                          }}
                          animate={{
                            background: ["conic-gradient(from 0deg, #ef4444 98%, #ef444450 98%)", "conic-gradient(from 360deg, #ef4444 98%, #ef444450 98%)"]
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                        <div className="absolute inset-3 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-xl font-bold text-white">98%</div>
                        </div>
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>
                      </motion.div>
                    </div>
                    
                    <div className="md:hidden mb-6">
                      <div className="text-sm text-red-300 font-medium">Academic Excellence</div>
                      <div className="text-xs text-red-400/70 mt-0.5 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                          <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.747 29.747 0 00-2.455 1.45.75.75 0 01-.836-.98c.329-.987.713-1.95 1.149-2.888a1.5 1.5 0 012.142 2.118z" clipRule="evenodd" />
                          <path d="M18 10.5a.75.75 0 01-.75.75h-1.513c-.96 0-1.919.122-2.850.364a.75.75 0 11-.352-1.459A16.695 16.695 0 0115.75 9.75h1.5a.75.75 0 01.75.75z" />
                          <path fillRule="evenodd" d="M7.5 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zm9-2.25a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-9.5a.75.75 0 010-1.5h9.5v-3.75a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Research Publication
                      </div>
                    </div>
                    
                    {/* Enhanced content section with improved typography and effects */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Academic Standing</span>
                        <span className="text-red-400 font-bold">98%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-red-600 to-orange-400 rounded-full relative"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "98%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                        >
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      </div>
                      
                      <div className="pt-4 mt-6 border-t border-red-500/30">
                        <div className="text-slate-300 leading-relaxed relative">
                          <motion.div
                            initial={{ opacity: 0.9 }}
                            whileHover={{ opacity: 1 }}
                            className="relative"
                          >
                            <span className="absolute -left-3 top-0 text-red-400 font-bold text-xl">"</span>
                            <span className="font-medium">Special recognition</span> from <span className="font-semibold text-white">Stanford University</span> for exceptional research and academic contributions to the advancement of machine learning and AI technologies.
                            <span className="absolute -bottom-1 -right-1 text-red-400 font-bold text-xl">"</span>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-red-500/30 mt-6">
                        <div className="flex justify-between items-center">
                          <motion.div 
                            className="text-red-400 text-sm font-medium flex items-center" 
                            whileHover={{ scale: 1.05, x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            Stanford Research Excellence
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-red-950/60 text-red-300 border border-red-500/30 backdrop-blur-sm"
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                            </svg>
                            March 2023
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Enhanced animated view button with more effects */}
                      <motion.button
                        className="mt-4 w-full bg-gradient-to-r from-red-800/70 to-orange-700/70 hover:from-red-700/90 hover:to-orange-600/90 text-white rounded-lg p-2.5 text-sm font-medium flex items-center justify-center gap-2 group border border-red-500/30 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Add shimmer effect */}
                        <motion.div 
                          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2,
                            ease: "linear",
                          }}
                        />
                        
                        <span>View Recognition</span>
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                          </svg>
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* SRRN Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative group isolate overflow-hidden"
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                {/* Enhanced background effects with more intensity */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-400/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/40 to-cyan-400/40 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Moving particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-blue-400"
                      initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                      animate={{ 
                        x: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%"
                        ],
                        y: [
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%", 
                          Math.random() * 100 + "%"
                        ],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 10 + Math.random() * 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                      style={{ scale: 1 + Math.random() * 2 }}
                    />
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/30 border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden relative backdrop-blur-sm group-hover:border-blue-500/50 transition-colors duration-300">
                  {/* Enhanced hover glow */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated top bar with enhanced animation */}
                  <motion.div 
                    className="h-2.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 100%" }}
                  />
                  
                  <div className="p-8 relative">
                    {/* Enhanced top badge with improved animation */}
                    <motion.div 
                      className="absolute -right-3 -top-3 z-10"
                      initial={{ rotate: 12 }}
                      whileHover={{ rotate: 0, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative">
                        {/* Badge glow effect */}
                        <div className="absolute inset-0 bg-blue-500/60 rounded-full blur-md"></div>
                        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-pulse"></div>
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-400 text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm text-white tracking-wider relative border border-blue-400/30">
                          RECOGNITION
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row md:items-center mb-8 gap-6">
                      {/* Enhanced icon container with more dramatic animation */}
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl p-0.5 flex-shrink-0 relative group-hover:shadow-lg group-hover:shadow-blue-500/30"
                        whileHover={{ 
                          rotate: [0, -5, 5, -3, 0],
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {/* Add subtle light effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                          {/* Add subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Add subtle pulsing effect */}
                          <motion.div 
                            className="absolute inset-0 bg-blue-500/5"
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          <div className="text-lg text-blue-200 font-bold flex items-center justify-center">
                            <motion.svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              className="w-10 h-10"
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                              <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                              <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                            </motion.svg>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div>
                        <motion.div 
                          className="text-sm font-medium text-blue-300 tracking-tight uppercase mb-1"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1, x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="inline-block mr-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Science Research Recognition Network
                        </motion.div>
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 tracking-tight"
                          initial={{ opacity: 0.9 }}
                          whileHover={{ opacity: 1, scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          SRRN Recognition
                        </motion.h3>
                      </div>
                    </div>
                    
                    {/* Add similar stats section as the Senate card */}
                    <div className="flex items-center gap-12 mb-10">
                      <div className="flex items-center gap-6">
                        {/* Enhanced SRRN display with glow */}
                        <div className="relative">
                          <div className="absolute inset-0 text-5xl font-bold text-blue-400 blur-sm opacity-50">SR</div>
                          <div className="text-5xl font-bold text-white relative">SR</div>
                        </div>
                        <div className="h-14 w-px bg-blue-500/30 hidden md:block"></div>
                        <div className="hidden md:block">
                          <div className="text-sm text-blue-300 font-medium">Research Excellence</div>
                          <div className="text-xs text-blue-400/70 mt-0.5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                              <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                            </svg>
                            Academic Citation
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced circular progress with more visual effects */}
                      <motion.div 
                        className="w-24 h-24 rounded-full border-4 border-blue-500/40 flex items-center justify-center relative group-hover:border-blue-500/60 transition-colors duration-300"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute inset-1 rounded-full border border-blue-400/30"></div>
                        <motion.div 
                          className="absolute inset-2 rounded-full"
                          style={{
                            background: "conic-gradient(from 0deg, #3b82f6 0%, #3b82f650 100%)",
                          }}
                          animate={{
                            background: ["conic-gradient(from 0deg, #3b82f6 95%, #3b82f650 95%)", "conic-gradient(from 360deg, #3b82f6 95%, #3b82f650 95%)"]
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                        <div className="absolute inset-3 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-xl font-bold text-white">95%</div>
                        </div>
                        <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></div>
                      </motion.div>
                    </div>
                    
                    <div className="md:hidden mb-6">
                      <div className="text-sm text-blue-300 font-medium">Research Excellence</div>
                      <div className="text-xs text-blue-400/70 mt-0.5 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                          <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                        </svg>
                        Academic Citation
                      </div>
                    </div>
                    
                    {/* Enhanced content section with improved typography and effects */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Research Impact</span>
                        <span className="text-blue-400 font-bold">95%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full relative"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "95%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                        >
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      </div>
                      
                      <div className="pt-4 mt-6 border-t border-blue-500/30">
                        <div className="text-slate-300 leading-relaxed relative">
                          <motion.div
                            initial={{ opacity: 0.9 }}
                            whileHover={{ opacity: 1 }}
                            className="relative"
                          >
                            <span className="absolute -left-3 top-0 text-blue-400 font-bold text-xl">"</span>
                            <span className="font-medium">Honored</span> by the <span className="font-semibold text-white">Science Research Recognition Network</span> for outstanding achievements in scientific research and contribution to the field of AI & machine learning.
                            <span className="absolute -bottom-1 -right-1 text-blue-400 font-bold text-xl">"</span>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-blue-500/30 mt-6">
                        <div className="flex justify-between items-center">
                          <motion.div 
                            className="text-blue-400 text-sm font-medium flex items-center" 
                            whileHover={{ scale: 1.05, x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            SRRN Research Excellence
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-500/30 backdrop-blur-sm"
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                            </svg>
                            February 2023
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Enhanced animated view button with more effects */}
                      <motion.button
                        className="mt-4 w-full bg-gradient-to-r from-blue-800/70 to-cyan-700/70 hover:from-blue-700/90 hover:to-cyan-600/90 text-white rounded-lg p-2.5 text-sm font-medium flex items-center justify-center gap-2 group border border-blue-500/30 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Add shimmer effect */}
                        <motion.div 
                          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2,
                            ease: "linear",
                          }}
                        />
                        
                        <span>View Recognition</span>
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                          </svg>
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Think Tank CTA Section */}
      <section className="py-32 relative overflow-hidden border-t border-white/10">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-blue-950/30"></div>
        
        {/* Academic pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        {/* Subtle floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                background: i % 3 === 0 ? "rgba(255, 255, 255, 0.3)" : i % 3 === 1 ? "rgba(56, 189, 248, 0.4)" : "rgba(96, 165, 250, 0.3)",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 5 + 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/60 rounded-2xl border border-blue-900/20 p-12 backdrop-blur-sm shadow-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.div 
                  className="flex justify-center mb-6 gap-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400">
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                  </svg>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                    Transform
                  </span> your academic influence
                </h2>
                
                <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Perrin combines AI-driven analytics with expert insight to help researchers, think tanks, and academic institutions maximize their policy impact and scholarly influence.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
                  {[
                    {
                      title: "Policy Impact",
                      value: "93%",
                      desc: "of users report increased policy citations"
                    },
                    {
                      title: "Research Visibility",
                      value: "4.8×",
                      desc: "average increase in scholarly reach"
                    },
                    {
                      title: "AI-Powered",
                      value: "24/7",
                      desc: "continuous influence monitoring"
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="text-center p-4 relative"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                    >
                      <div className="text-3xl font-bold text-blue-400 mb-1">{item.value}</div>
                      <div className="text-sm text-blue-100 font-medium mb-1">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  {[
                    {
                      title: "Individual Researchers",
                      feature: "Enhanced Impact Tracking",
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                      )
                    },
                    {
                      title: "Academic Institutions",
                      feature: "Cross-Department Analytics",
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                          <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                        </svg>
                      )
                    },
                    {
                      title: "Think Tanks & Policy Groups",
                      feature: "Policy Influence Metrics",
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
                        </svg>
                      )
                    }
                  ].map((program, i) => (
                    <motion.div 
                      key={i}
                      className="flex flex-col items-center p-5 rounded-xl bg-gradient-to-br from-blue-900/20 to-slate-800/40 border border-blue-500/10 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="mb-3 p-2 bg-gradient-to-br from-blue-600/80 to-cyan-500/80 rounded-lg text-white">
                        {program.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{program.title}</h3>
                      <p className="text-sm text-blue-200/70">{program.feature}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-medium text-lg shadow-lg shadow-blue-500/10 border border-blue-500/30 relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 2,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Join Our Research Network
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        className="w-5 h-5"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                      >
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                      </motion.svg>
                    </span>
                  </motion.a>
                  
                  <motion.a
                    href="#whitepaper"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 bg-slate-800/60 backdrop-blur-sm border border-blue-900/30 rounded-lg text-white font-medium text-lg transition-colors duration-300 flex items-center justify-center gap-2 hover:bg-slate-800/80"
                  >
                    <span>Download Whitepaper</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 6.75a.75.75 0 011.5 0v2.546l.943-1.048a.75.75 0 011.114 1.004l-2.25 2.5a.75.75 0 01-1.114 0l-2.25-2.5a.75.75 0 111.114-1.004l.943 1.048V8.75z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
                
                <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                  <motion.div 
                    className="px-3 py-1.5 rounded-full bg-blue-950/30 border border-blue-900/20 text-xs text-blue-300/70 flex items-center gap-1.5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <motion.div 
                  className="mt-8 text-sm text-blue-300/60 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>Applications for 2024 programs now open</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}        
