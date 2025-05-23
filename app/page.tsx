"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiBook, FiGlobe, FiLayers, FiUsers, FiChevronDown, FiArrowDown, FiExternalLink, FiClock, FiPlay } from 'react-icons/fi';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RESEARCH_CATEGORIES } from '@/lib/constants';
import MorphingShape from '@/components/MorphingShape';
import FloatingElement from '@/components/FloatingElement';
import Parallax from '@/components/Parallax';
import Transform3D from '@/components/Transform3D';

// Dynamic import for Spline
const Spline = React.lazy(() => import('@splinetool/react-spline'));

// Article interface (copied locally to avoid import issues)
interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  type: 'news' | 'opinion';
  authorName?: string;
  authorPosition?: string;
  date: string;
  image: string;
  featured: boolean;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
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

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.9, 
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

// Component to render icons based on category name
const CategoryIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Human-Centered AI Laboratory':
      return <FiUsers className="w-6 h-6" />;
    case 'Policy Entrepreneurship Laboratory':
      return <FiLayers className="w-6 h-6" />;
    case 'Governance Technology Laboratory':
      return <FiGlobe className="w-6 h-6" />;
    case 'International Studies Laboratory':
      return <FiBook className="w-6 h-6" />;
    default:
      return <div className="w-6 h-6 rounded-full bg-teal-100"></div>;
  }
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [regularArticles, setRegularArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);
  
  // Refs for scroll-driven animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuredRef = useRef(null);
  
  // Scroll progress for hero section
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const headerTranslateY = useTransform(heroProgress, [0, 0.2], [0, -50]);
  const parallaxBackground = useTransform(heroProgress, [0, 1], [0, 100]);
  
  // Function to handle slide changing
  const nextSlide = () => {
    if (featuredArticles.length > 0) {
      setCurrentSlideIndex((prev) => 
        prev === featuredArticles.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  // Auto advance slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds
    
    return () => clearInterval(slideInterval);
  }, [featuredArticles]);
  
  // Fetch articles when component mounts
  useEffect(() => {
    async function fetchArticles() {
      // Only fetch articles on the client side
      if (typeof window === 'undefined') return;
      
      try {
        console.log('Attempting to import articles library...');
        
        // Use a more defensive dynamic import approach
        const articlesModule = await import('@/lib/articles').catch(err => {
          console.error('Failed to import articles module:', err);
          return null;
        });
        
        if (!articlesModule) {
          throw new Error('Articles module failed to load');
        }
        
        console.log('Articles library imported successfully');
        const { getArticles } = articlesModule;
        
        const fetchedArticles = await getArticles().catch(err => {
          console.error('Failed to fetch articles:', err);
          return [];
        });
        
        console.log('Articles fetched successfully:', fetchedArticles.length);
        setArticles(fetchedArticles)
        
        if (fetchedArticles && fetchedArticles.length > 0) {
          // Find featured articles first
          const featured = fetchedArticles.filter((article: Article) => article.featured);
          
          // If we have featured articles, use those, otherwise use the most recent
          if (featured.length > 0) {
            setFeaturedArticles(featured.slice(0, 4));
            setRegularArticles(fetchedArticles.filter((a: Article) => !featured.slice(0, 4).some((f: Article) => f.id === a.id)));
          } else {
            // Just use the most recent articles as featured
            setFeaturedArticles(fetchedArticles.slice(0, 4));
            setRegularArticles(fetchedArticles.slice(4));
          }
        } else {
          setError("No articles available");
        }
        
      } catch (error) {
        console.error('Error in fetchArticles:', error);
        setError("Failed to load articles");
        // Don't let article loading errors break the page
        setFeaturedArticles([]);
        setRegularArticles([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchArticles()
  }, [])

  // Retry function for error state
  const retryFetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    
    // Only fetch articles on the client side
    if (typeof window === 'undefined') return;
    
    try {
      // Dynamic import to avoid SSR issues
      const { getArticles } = await import('@/lib/articles');
      const fetchedArticles = await getArticles()
      setArticles(fetchedArticles)
      
      if (fetchedArticles && fetchedArticles.length > 0) {
        // Find featured articles first
        const featured = fetchedArticles.filter((article: Article) => article.featured);
        
        // If we have featured articles, use those, otherwise use the most recent
        if (featured.length > 0) {
          setFeaturedArticles(featured.slice(0, 4));
          setRegularArticles(fetchedArticles.filter((a: Article) => !featured.slice(0, 4).some((f: Article) => f.id === a.id)));
        } else {
          // Just use the most recent articles as featured
          setFeaturedArticles(fetchedArticles.slice(0, 4));
          setRegularArticles(fetchedArticles.slice(4));
        }
      } else {
        setError("No articles available");
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError("Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  }

  const onSplineLoad = () => {
    setSplineLoaded(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Old Money Tech Prestige Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-white"
      >
        {/* Spline 3D Scene - More Visible, Less Blurry */}
        <div className="absolute inset-0 z-5">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="w-8 h-8 border border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-400 text-sm">Loading</p>
              </div>
            </div>
          }>
            <div className="w-full h-full relative">
              {/* Re-enable Spline component after Next.js upgrade */}
              {typeof window !== 'undefined' && (
                <Spline 
                  scene="https://prod.spline.design/N-7Bwb97Q2XUmz3O/scene.splinecode"
                  onLoad={onSplineLoad}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent'
                  }}
                />
              )}
              {/* White box to cover Spline watermark */}
              <div className="absolute bottom-1 right-1 w-48 h-16 bg-white z-10"></div>
              {/* Lighter overlay - more refined, less blurry */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/65 to-white/80"></div>
            </div>
          </Suspense>
        </div>
        
        {/* Refined Content Layout */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-screen py-16 sm:py-20">
              
              {/* Left Column - Sophisticated Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6 sm:space-y-8 text-center lg:text-left"
              >
                {/* Refined institutional badge */}
                <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  <span className="text-xs sm:text-sm font-medium text-slate-600 tracking-wide">
                    Advanced Policy Research
                  </span>
                </motion.div>
                
                {/* Sophisticated headline */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-slate-900 leading-[0.95] tracking-tight"
                  style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
                >
                  Transforming
                  <br />
                  <span className="font-medium text-slate-700">
                    policy research
                  </span>
                  <br />
                  <span className="text-slate-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light">
                    with AI
                  </span>
                </motion.h1>
                
                {/* Refined description */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-light max-w-xl mx-auto lg:mx-0"
                >
                  Advanced analytics and machine learning to solve complex policy challenges at the University of Virginia.
                </motion.p>
                
                {/* Understated CTAs */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 justify-center lg:justify-start"
                >
                  <Link 
                    href="/Labs" 
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-sm sm:text-base"
                  >
                    Explore research labs
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  
                  <Link 
                    href="/news" 
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 text-sm sm:text-base"
                  >
                    View articles
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Right Column - Refined Image & Subtle Elements */}
              <motion.div 
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="relative mt-8 lg:mt-0"
              >
                {/* Main refined image */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200">
                    <Image 
                      src="/capital.jpeg"
                      alt="Policy Research Excellence" 
                      width={700} 
                      height={500}
                      className="w-full h-auto object-cover"
                      priority
                      quality={95}
                    />
                    
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Refined floating elements - smaller and more elegant */}
                  
                  {/* Compact Analytics Card - Mobile optimized */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200 p-3 sm:p-4 w-44 sm:w-56">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs font-medium text-slate-900">Research Analytics</span>
                      </div>
                      <div className="text-xs text-slate-500">Live</div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Impact Score</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">94.7%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1 sm:h-1.5">
                        <div className="bg-slate-600 h-1 sm:h-1.5 rounded-full w-[94.7%]"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Insights Panel - Mobile optimized */}
                  <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200 p-3 sm:p-4 w-48 sm:w-60">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-lg bg-slate-900 flex items-center justify-center">
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-sm"></div>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-slate-900">Research Engine</h3>
                        <p className="text-xs text-slate-600">Policy Analysis</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">127</div>
                        <div className="text-xs text-slate-600">Papers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">15K</div>
                        <div className="text-xs text-slate-600">Citations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">98%</div>
                        <div className="text-xs text-slate-600">Accuracy</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Minimal Status Indicator - Mobile optimized */}
                  <div className="absolute top-1/2 -right-2 sm:-right-3 transform -translate-y-1/2 bg-white/95 backdrop-blur-lg rounded-lg shadow-md border border-slate-200 p-2 sm:p-3">
                    <div className="text-center space-y-1">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-slate-900 flex items-center justify-center mx-auto">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="text-xs font-medium text-slate-900">AI</div>
                      <div className="text-xs text-green-600">Online</div>
                    </div>
                  </div>
                  
                  {/* Subtle corner accents */}
                  <div className="absolute -top-1 -right-1 w-6 sm:w-8 h-6 sm:h-8">
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-3 sm:w-4 h-3 sm:h-4 border-t border-r border-slate-300"></div>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-6 sm:w-8 h-6 sm:h-8">
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-3 sm:w-4 h-3 sm:h-4 border-b border-l border-slate-300"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Federal Agencies Partnership Carousel */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
              <span className="text-xs sm:text-sm uppercase tracking-wide text-slate-600 font-medium px-4 sm:px-6">Federal Partnerships</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-3 sm:mb-4 font-roboto">
              Trusted by Leading Agencies
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 font-light max-w-2xl mx-auto px-4 sm:px-0">
              We've provided strategic policy recommendations and research to key federal departments
            </motion.p>
          </motion.div>
          
          {/* Carousel Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative"
          >
            {/* Agency Logos Carousel */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll-x space-x-8 sm:space-x-12 lg:space-x-16 py-6 sm:py-8">
                {/* First set */}
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/environmental_protection_agency-epa-logo.png"
                      alt="US Environmental Protection Agency"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Environmental Protection</h3>
                  <p className="text-xs text-slate-500 text-center">Climate Policy Research</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/energy-logo.png"
                      alt="US Department of Energy"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Energy</h3>
                  <p className="text-xs text-slate-500 text-center">Energy Infrastructure Analysis</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/education-logo.png"
                      alt="US Department of Education"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Education</h3>
                  <p className="text-xs text-slate-500 text-center">Educational Technology Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/us-department-of-state-2-logo-png-transparent.png"
                      alt="US Department of State"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of State</h3>
                  <p className="text-xs text-slate-500 text-center">International Relations Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/Federal-Bureau-of-Investigation-Logo.png"
                      alt="Federal Bureau of Investigation"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Federal Bureau of Investigation</h3>
                  <p className="text-xs text-slate-500 text-center">Cybersecurity Frameworks</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/nasa-logo.png"
                      alt="NASA"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">NASA</h3>
                  <p className="text-xs text-slate-500 text-center">Space Technology Governance</p>
                </motion.div>
                
                {/* Duplicate set for seamless endless loop */}
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/environmental_protection_agency-epa-logo.png"
                      alt="US Environmental Protection Agency"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Environmental Protection</h3>
                  <p className="text-xs text-slate-500 text-center">Climate Policy Research</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/energy-logo.png"
                      alt="US Department of Energy"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Energy</h3>
                  <p className="text-xs text-slate-500 text-center">Energy Infrastructure Analysis</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/education-logo.png"
                      alt="US Department of Education"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Education</h3>
                  <p className="text-xs text-slate-500 text-center">Educational Technology Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/us-department-of-state-2-logo-png-transparent.png"
                      alt="US Department of State"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of State</h3>
                  <p className="text-xs text-slate-500 text-center">International Relations Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/Federal-Bureau-of-Investigation-Logo.png"
                      alt="Federal Bureau of Investigation"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Federal Bureau of Investigation</h3>
                  <p className="text-xs text-slate-500 text-center">Cybersecurity Frameworks</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/nasa-logo.png"
                      alt="NASA"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">NASA</h3>
                  <p className="text-xs text-slate-500 text-center">Space Technology Governance</p>
                </motion.div>
              </div>
            </div>
            
            {/* Gradient overlays for seamless effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </motion.div>
          
          {/* Call to action */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center mt-12"
          >
            <Link 
              href="/research-request" 
              className="inline-flex items-center px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl font-roboto"
            >
              Request Policy Analysis
              <FiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Institutional Honors - Horizontal Layout */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <span className="text-xs sm:text-sm uppercase tracking-wide text-slate-600 font-medium px-4 sm:px-6">Institutional Recognition</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 font-roboto leading-tight">
              Distinguished Acknowledgments
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Recognition from distinguished leaders and prominent media coverage of our research impact
            </motion.p>
          </motion.div>
          
          {/* Horizontal Four-Element Layout - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-6 sm:gap-8 mb-12 sm:mb-16">
            
            {/* 1. Van Hollen Letter Image */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="sm:col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-64 sm:h-72 lg:h-80">
                <Image
                  src="/download (2).jpg"
                  alt="Letter from Senator Van Hollen"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* 2. Van Hollen Quote */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="sm:col-span-1 lg:col-span-3 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-500 flex flex-col justify-center h-64 sm:h-72 lg:h-80"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="rounded-full bg-slate-100 p-2 sm:p-3 shadow-sm mr-3 sm:mr-4 border border-slate-200">
                  <Image
                    src="/US-Senate-Logo.png"
                    alt="U.S. Senate"
                    width={24}
                    height={24}
                    className="sm:w-8 sm:h-8"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-slate-900 font-roboto">U.S. Senate Recognition</h3>
                  <p className="text-slate-600 font-light text-xs sm:text-sm">Senator Chris Van Hollen</p>
                </div>
              </div>
              
              <blockquote className="text-sm sm:text-base italic text-slate-700 font-light leading-relaxed mb-3 sm:mb-4 border-l-4 border-slate-300 pl-3 sm:pl-4">
                "...your initiative sets a powerful example of how passion and purpose can drive meaningful change..."
              </blockquote>
              
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                Official Letter of Commendation
              </div>
            </motion.div>

            {/* 3. BBC Interview Video - Slightly Wider */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="sm:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-64 sm:h-72 lg:h-80">
                <iframe
                  src="https://www.youtube.com/embed/xS_3pUX3Qvg?autoplay=1&mute=1&controls=1&rel=0&showinfo=0"
                  title="BBC Interview - Inclusive Policy Lab Director"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            {/* 4. BBC Interview Text */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="sm:col-span-2 lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-500 flex flex-col justify-center h-64 sm:h-72 lg:h-80"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="rounded-lg bg-red-600 p-2 sm:p-3 shadow-sm mr-3 sm:mr-4">
                  <span className="text-white font-bold text-xs sm:text-sm">BBC</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-slate-900 font-roboto">BBC International</h3>
                  <p className="text-slate-600 font-light text-xs sm:text-sm">Global Coverage</p>
                </div>
              </div>
              
              <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-2 sm:mb-3 font-roboto leading-tight">
                Policy Expert Interview
              </h4>
              
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-3 sm:mb-4">
                Our Inclusive Policy Lab Director featured in BBC's international coverage, discussing innovative governance approaches.
              </p>
              
              <a 
                href="https://www.youtube.com/watch?list=TLGGGfHfzVOPgocyMzA1MjAyNQ&v=xS_3pUX3Qvg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors font-roboto group text-xs sm:text-sm"
              >
                <span>Watch Full Interview</span>
                <FiExternalLink className="ml-2 w-3 sm:w-4 h-3 sm:h-4" />
              </a>
            </motion.div>
          </div>
          
          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/news" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl font-roboto text-sm sm:text-base"
              >
                View Media Coverage
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 font-roboto text-sm sm:text-base"
              >
                Our Story
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles - Refined Design */}
      <section 
        ref={featuredRef}
        className="py-12 sm:py-16 md:py-20 lg:py-32 bg-slate-50 relative"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-medium mb-3 sm:mb-4 font-roboto">Latest Articles</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 font-roboto text-slate-900">Our latest insights</h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl font-light font-roboto">In-depth analysis from our team on today's most pressing policy challenges</p>
            </div>
            
            <Link 
              href="/news" 
              className="hidden md:flex items-center text-slate-700 hover:text-slate-900 transition-colors mt-6 md:mt-0 font-roboto font-medium"
            >
              <span>View all articles</span>
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
          
          {/* Error state */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <p className="font-roboto text-sm sm:text-base">{error}</p>
              <button 
                onClick={retryFetchArticles}
                className="mt-2 sm:mt-3 text-sm font-medium text-red-600 hover:text-red-800 underline font-roboto"
              >
                Retry
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Article 1 - Large feature (left) */}
            <Link 
              href={featuredArticles[0] ? `/news/${featuredArticles[0].id}` : "#"}
              className="block bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 transition-shadow hover:shadow-md group"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={featuredArticles[0]?.image || "/uva-stock-3.jpg"}
                  alt={featuredArticles[0]?.title || "Featured article"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-lg font-roboto">
                    Paper
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-3 group-hover:text-slate-700 transition-colors font-roboto leading-tight">
                  {featuredArticles[0]?.title || "The Key to AI Governance: A Balanced Approach"}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2 font-roboto font-light">
                  {featuredArticles[0]?.subtitle || featuredArticles[0]?.excerpt || "A comprehensive framework for approaching AI governance that balances innovation with necessary regulation."}
                </p>
                <div className="flex items-center">
                  <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mr-3 font-roboto text-sm">
                    {featuredArticles[0]?.authorName ? featuredArticles[0]?.authorName.charAt(0) : 'P'}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-500 font-roboto">{featuredArticles[0]?.authorName || "Perrin Researcher"}</span>
                </div>
              </div>
            </Link>
            
            {/* Articles right column */}
            <div className="space-y-4 sm:space-y-6">
              {featuredArticles.slice(1, 4).map((article, index) => (
                <Link 
                  key={article.id || index}
                  href={article ? `/news/${article.id}` : "#"}
                  className="block bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 transition-shadow hover:shadow-md group"
                >
                  <div className="p-4 sm:p-6">
                    <div className="mb-3 sm:mb-4">
                      <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-lg font-roboto">
                        {index % 2 === 0 ? "Commentary" : "Paper"}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-3 group-hover:text-slate-700 transition-colors font-roboto leading-tight">
                      {article.title}
                    </h3>
                    <div className="flex items-center">
                      <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mr-3 font-roboto text-sm">
                        {article.authorName ? article.authorName.charAt(0) : 'P'}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-500 font-roboto">{article.authorName || "Perrin Researcher"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile view all button */}
          <div className="md:hidden mt-8 sm:mt-10 text-center">
            <Link 
              href="/news" 
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors font-roboto text-sm sm:text-base"
            >
              View all articles
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Research Publication Section - Refined Design */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Left column - Text content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 text-slate-900 leading-tight font-roboto">
                We deliver unbiased research to decisionmakers who help set the global policy agenda
              </h2>
              
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 font-light font-roboto">
                Our scholars generate strategic ideas and independent analysis to help inform countries, institutions, and leaders as they take on the most difficult global problems.
              </p>
              
              <Link 
                href="/research" 
                className="inline-flex items-center justify-center sm:justify-start border border-slate-900 text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors self-stretch sm:self-start mb-8 sm:mb-10 font-roboto text-sm sm:text-base"
              >
                See our research
                <FiArrowRight className="ml-2" />
              </Link>
              
              {/* Research items directly below button */}
              <div className="space-y-6 sm:space-y-8 mt-2">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-slate-700 font-medium mb-1 font-roboto">Report</span>
                  <h3 className="text-lg sm:text-xl font-medium mb-2 font-roboto text-slate-900 leading-tight">Rethinking a Political Approach to Nuclear Abolition</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-medium ring-1 ring-white text-xs">GP</div>
                      <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-medium ring-1 ring-white text-xs">FY</div>
                      <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-medium ring-1 ring-white text-xs">MN</div>
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600 font-roboto">George Perkovich, Fumihiko Yoshida, Michiru Nishida</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-slate-700 font-medium mb-1 font-roboto">Paper</span>
                  <h3 className="text-lg sm:text-xl font-medium mb-2 font-roboto text-slate-900 leading-tight">Democratic Recovery After Significant Backsliding</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-medium ring-1 ring-white text-xs">TC</div>
                      <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-medium ring-1 ring-white text-xs">MC</div>
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600 font-roboto">Thomas Carothers, McKenzie Carrier</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Featured publication with full image */}
            <div className="lg:col-span-7 mt-8 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image 
                  src="/yip_x_perrin_cover_page_option_2.png"
                  alt="Rethinking a Political Approach to Nuclear Abolition"
                  width={600}
                  height={600}
                  className="w-auto h-auto max-w-full sm:max-w-[500px] lg:max-w-[600px] rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

