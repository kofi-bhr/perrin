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
  }

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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-tight overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Shaping policy through </span>
                      <span className="text-blue-400">data-driven</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"> research.</span>
                    </div>
                  </motion.div>
                </h1>
                
                <motion.p 
                  className="mt-6 text-xl text-white/70 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationsReady ? 1 : 0, y: animationsReady ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The Perrin Institute is a student-led think tank at the University of Virginia 
                  dedicated to advancing innovative solutions for complex policy challenges.
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
                { label: "Research Areas", value: "12+", icon: FiDatabase, color: "text-blue-400" },
                { label: "Policy Papers", value: "30+", icon: FiCode, color: "text-purple-400" },
                { label: "Researchers", value: "25+", icon: FiServer, color: "text-green-400" },
                { label: "Partner Institutions", value: "8+", icon: FiServer, color: "text-yellow-400" }
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
              Suggested Policy To
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Collaborating with leading organizations to transform policy research into actionable impact
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
                description: "Leading experts and emerging scholars shaping the future of policy",
                icon: "graph",
                color: "blue"
              },
              {
                value: "$3.57M",
                label: "Scholarships garnered by our alumni",
                description: "Supporting the next generation of policy innovators and leaders",
                icon: "money",
                color: "green"
              },
              {
                value: "40+",
                label: "Partner Institutions",
                description: "Collaborating with universities and organizations worldwide",
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
          
          {/* FAANG-style data visualization element */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 p-6 border border-white/10 rounded-xl bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <div className="flex items-center mb-2">
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"
                    animate={{ 
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-xs font-mono text-green-400/80">GLOBAL IMPACT ANALYSIS</span>
                </div>
                <h3 className="text-xl font-medium">Policy Influence Metrics</h3>
              </div>
              
              <div className="mt-4 md:mt-0 text-xs font-mono text-white/40 flex items-center">
                <span>Updated {new Date().toLocaleDateString()}</span>
                <div className="ml-3 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Policy Adoption Rate", value: "42%", change: "+12%", color: "blue" },
                { label: "Research Citations", value: "1.8k", change: "+24%", color: "purple" },
                { label: "Media Mentions", value: "320+", change: "+18%", color: "green" },
                { label: "Academic Partnerships", value: "40+", change: "+15%", color: "yellow" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-4 border border-white/5 rounded-lg bg-gradient-to-b from-white/[0.01] to-transparent"
                >
                  <div className="text-xs font-mono text-white/40 mb-2">{metric.label}</div>
                  <div className="flex items-end justify-between">
                    <div className={`text-2xl font-medium text-${metric.color}-400`}>{metric.value}</div>
                    <div className="text-xs text-green-400 flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {metric.change}
                    </div>
                  </div>
                  
                  {/* Visualization bar */}
                  <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-${metric.color}-500`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${60 + index * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Institute Overview with Tech Focus */}
      <section className="relative py-32 px-6 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] to-black"></div>
        
        {/* Extremely subtle tech grid */}
        <TechGrid animated={false} opacity={0.003} />
        
        {/* Tech-inspired floating elements - very subtle */}
        <motion.div 
          className="absolute top-[20%] left-[5%] w-32 h-32 rounded-full bg-blue-500/3 blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[5%] w-40 h-40 rounded-full bg-indigo-500/3 blur-3xl"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7"
            >
              <div className="flex items-center mb-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-blue-400 text-xs uppercase tracking-widest font-mono">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">The Institute</h2>
              
              {/* Premium content layout with enhanced typography */}
              <div className="space-y-6">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-white/70 text-lg leading-relaxed"
                >
                  The Perrin Institute is a pioneering student-led think tank at the University of Virginia,
                  serving as a bridge between academic research and practical policy implementation.
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/70 text-lg leading-relaxed"
                >
                  Our work spans multiple policy areas including economic development, environmental 
                  sustainability, education reform, and social justice. We bring together diverse 
                  perspectives and emerging scholars to address pressing challenges in public policy.
                </motion.p>
              </div>
              
              {/* FAANG-style feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-10 grid grid-cols-2 gap-6"
              >
                {[
                  { title: "Student-Led", description: "Empowering the next generation of policy leaders" },
                  { title: "Data-Driven", description: "Leveraging advanced analytics for policy insights" },
                  { title: "Interdisciplinary", description: "Combining diverse perspectives and methodologies" },
                  { title: "Impact-Focused", description: "Creating real-world policy solutions" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute top-0 left-0 w-8 h-8 -mt-2 -ml-2">
                      <motion.div 
                        className="w-full h-full rounded-full bg-blue-500/10"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-medium mb-1 text-white">{feature.title}</h3>
                    <p className="text-sm text-white/60">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ x: 5 }}
                className="mt-10"
              >
                <Link 
                  href="/about"
                  className="inline-flex items-center px-6 py-3 bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-lg transition-all duration-300 text-blue-400 hover:text-blue-300 group"
                >
                  Learn About Our Mission <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative md:col-span-5"
            >
              {/* Premium image presentation with enhanced styling */}
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5">
                <Image
                  src="/congress.webp"
                  alt="United States Congress"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                
                {/* Tech overlay */}
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/30 to-transparent rotate-45 transform origin-top-right"></div>
                </div>
              </div>
              
              {/* Floating tech element - Apple style with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.6,
                  ease: "easeOut"
                }}
                className="absolute -bottom-10 -left-10 w-[240px]"
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.5)" }}
              >
                <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center mb-3">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <div className="text-xs font-medium text-white/90">Institute Metrics</div>
                  </div>
                  <motion.div 
                    className="h-[1px] w-full bg-white/10 mb-4"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ 
                      scaleX: 1,
                      opacity: 1
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.8,
                      ease: "easeOut"
                    }}
                  />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-white/60">Research Fellows</div>
                      <div className="text-blue-400 font-medium">250+</div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-white/60">Policy Areas</div>
                      <div className="text-blue-400 font-medium">12+</div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-white/60">Partner Institutions</div>
                      <div className="text-blue-400 font-medium">40+</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating code snippet - Apple style */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -top-8 -right-8 w-[180px] hidden md:block"
                whileHover={{ scale: 1.05, rotate: "-1deg" }}
              >
                <div className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-lg p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] rotate-3">
                  <div className="text-[10px] font-mono text-blue-400/80 mb-1">{`// Our Mission`}</div>
                  <div className="text-[9px] font-mono text-white/60 leading-relaxed">
                    <div>function <span className="text-purple-400">createImpact</span>() {`{`}</div>
                    <div className="pl-2">const research = getData();</div>
                    <div className="pl-2">const policy = analyze(research);</div>
                    <div className="pl-2">return implement(policy);</div>
                    <div>{`}`}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with Tech Elements */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="relative py-32 px-6 overflow-hidden"
      >
        {/* Premium gradient background with depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] to-[#030308]"></div>
        
        {/* Advanced animated background gradient - Apple/Google style */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            background: [
              "radial-gradient(circle at 30% 50%, rgba(30,64,144,0.15) 0%, rgba(0,0,0,0) 70%)",
              "radial-gradient(circle at 70% 50%, rgba(30,64,144,0.15) 0%, rgba(0,0,0,0) 70%)"
            ]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Enhanced tech grid with more data points */}
        <TechGrid animated={true} opacity={0.004} dataPoints={8} />
        
        {/* Premium animated particles - Apple/Meta style */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-blue-400/15' : i % 3 === 1 ? 'bg-indigo-400/15' : 'bg-purple-400/15'}`}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.15 + 0.05,
                scale: Math.random() * 0.5 + 0.5
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
                opacity: [0.05, 0.15, 0.05],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 20 + Math.random() * 30, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Apple-style subtle grid lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="h-full w-full grid grid-cols-6 gap-0 opacity-[0.02]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full"></div>
            ))}
          </div>
          <div className="h-full w-full grid grid-rows-6 gap-0 opacity-[0.02]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-b border-white/10 w-full"></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Premium floating label - Google style */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10 shadow-lg">
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
                <span className="text-xs font-mono text-blue-400/90 tracking-wider">JOIN OUR RESEARCH NETWORK</span>
              </div>
            </motion.div>
            
            {/* Premium CTA card with enhanced styling */}
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {/* Premium corner accent - Apple style */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/20 to-transparent rotate-45 transform origin-top-right"></div>
              </div>
              
              {/* Subtle animated gradient overlay - Google style */}
              <motion.div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)",
                    "linear-gradient(45deg, rgba(0,0,0,0) 30%, rgba(59,130,246,0.1) 100%)"
                  ]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating tech elements - Apple style */}
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-blue-500/5 blur-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-500/5 blur-3xl"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              {/* Premium headline with enhanced typography */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-serif font-bold mb-6 max-w-3xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80"
              >
                Shape the future of policy innovation
              </motion.h2>
              
              {/* Premium subtitle with enhanced typography */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/70 text-xl max-w-2xl mb-8 leading-relaxed"
              >
                Join a community of forward-thinking researchers, policy experts, and students dedicated to 
                solving today's most complex challenges through data-driven approaches.
              </motion.p>
              
              {/* Premium feature highlights - Google/Apple style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                {[
                  { 
                    icon: FiDatabase, 
                    title: "Research Opportunities",
                    description: "Collaborate on cutting-edge policy research with leading experts",
                    color: "blue"
                  },
                  { 
                    icon: FiCode, 
                    title: "Fellowship Program",
                    description: "Access mentorship, resources, and a network of policy innovators",
                    color: "purple"
                  },
                  { 
                    icon: FiServer, 
                    title: "Events & Workshops",
                    description: "Participate in exclusive policy discussions and training sessions",
                    color: "green"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`p-6 border border-white/5 rounded-xl bg-gradient-to-b from-${feature.color}-500/5 to-transparent backdrop-blur-sm relative overflow-hidden group`}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: `0 20px 40px -10px rgba(0,0,0,0.3), 0 0 15px -3px rgba(59, 130, 246, 0.15)`,
                      borderColor: `rgba(59, 130, 246, 0.2)`
                    }}
                  >
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-${feature.color}-500/20 to-transparent rotate-45 transform origin-top-right`}></div>
                    </div>
                    
                    {/* Animated icon */}
                    <motion.div 
                      className={`w-12 h-12 rounded-full bg-${feature.color}-500/10 flex items-center justify-center mb-4 border border-${feature.color}-500/20 group-hover:border-${feature.color}-500/40 transition-colors duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <feature.icon className={`text-${feature.color}-400 group-hover:text-${feature.color}-300 transition-colors duration-300`} size={20} />
                    </motion.div>
                    
                    <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors duration-300">{feature.description}</p>
                    
                    {/* Hover line effect */}
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-${feature.color}-500/50 to-${feature.color}-500/0 w-0 group-hover:w-full transition-all duration-500`}
                    />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Premium CTA buttons with enhanced styling */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div 
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.4), 0 0 30px -10px rgba(59, 130, 246, 0.3)" 
                  }} 
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden group rounded-xl shadow-lg w-full sm:w-auto"
                >
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl transition-all duration-300 z-10 relative font-medium text-center"
                  >
                    Get Involved <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <motion.div 
                    className="absolute inset-0 bg-blue-400/20"
                    whileHover={{ x: ["100%", "0%"] }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl overflow-hidden w-full sm:w-auto"
                >
                  <Link 
                    href="/fellows"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 font-medium text-center"
                  >
                    Meet Our Fellows
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Premium floating status indicator - Apple style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex justify-center"
            >
              <div className="inline-flex items-center px-5 py-2.5 bg-white/[0.02] backdrop-blur-sm rounded-full border border-white/5 shadow-lg">
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"
                  animate={{ 
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs font-mono text-white/60">Applications Open &bull; {new Date().toLocaleDateString()} &bull; <span className="text-blue-400">Limited Positions Available</span></span>
              </div>
            </motion.div>
            
            {/* Premium tech code snippet - Google/Meta style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 max-w-md mx-auto"
              whileHover={{ scale: 1.03, rotate: "-1deg" }}
            >
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/5 p-4 rounded-lg shadow-lg">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <div className="ml-auto text-[10px] font-mono text-white/30">perrin_institute.js</div>
                </div>
                <div className="text-xs font-mono leading-relaxed">
                  <div className="text-blue-400/80">&#47;&#47; Join our research network</div>
                  <div><span className="text-purple-400">async function</span> <span className="text-green-400">joinPerrinInstitute</span>() &#123;</div>
                  <div className="pl-4"><span className="text-white/60">const</span> <span className="text-yellow-400">researcher</span> = <span className="text-white/60">await</span> <span className="text-blue-400">createProfile</span>();</div>
                  <div className="pl-4"><span className="text-white/60">const</span> <span className="text-yellow-400">impact</span> = <span className="text-white/60">await</span> <span className="text-blue-400">collaborateOnPolicy</span>();</div>
                  <div className="pl-4"><span className="text-white/60">return</span> <span className="text-purple-400">buildBetterFuture</span>(impact);</div>
                  <div>&#125;</div>
                  <div className="mt-2 text-green-400/80">&#47;&#47; Ready to make a difference?</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
