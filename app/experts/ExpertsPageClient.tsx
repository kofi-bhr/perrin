'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { FiSearch, FiChevronDown, FiUsers, FiChevronRight, FiUser } from 'react-icons/fi'
import Navbar from '../../components/Navbar'
import { useInView } from 'react-intersection-observer'
import { Expert, EXPERTS } from '@/lib/experts'

// Get all unique categories and interests for filtering
const allCategories = Array.from(new Set(EXPERTS.map(expert => expert.category || 'Other')));

// Generate alphabet for navigation
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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

// Card hover effect
const cardHover = {
  rest: { y: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", 
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

export default function ExpertsPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [filteredExperts, setFilteredExperts] = useState(EXPERTS);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const parallaxBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Intersection Observer for scroll animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const totalExperts = EXPERTS.length;

  useEffect(() => {
    let result = EXPERTS;
    
    // Filter by search term
    if (searchQuery) {
      result = result.filter(expert => 
        expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (expert.interests && expert.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(expert => expert.category === selectedCategory);
    }
    
    // Filter by first letter
    if (selectedLetter) {
      result = result.filter(expert => expert.name.charAt(0).toUpperCase() === selectedLetter);
    }
    
    setFilteredExperts(result);
  }, [searchQuery, selectedCategory, selectedLetter]);

  const categories = ['all', ...allCategories];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedLetter(null);
    setActiveTab('all');
  };

  // Generate expert colors
  const getExpertColor = (index: number) => {
    const colors = [
      'from-blue-100 to-indigo-200',
      'from-green-100 to-emerald-200', 
      'from-purple-100 to-violet-200',
      'from-teal-100 to-cyan-200',
      'from-orange-100 to-amber-200',
      'from-pink-100 to-rose-200',
      'from-slate-100 to-slate-200'
    ];
    return colors[index % colors.length];
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 font-roboto">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section with parallax effect */}
      <div className="relative h-[50vh] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Background gradient and pattern */}
        <motion.div 
          style={{ y: parallaxBackground }}
          className="absolute inset-0 bg-gradient-to-br from-slate-100/40 to-white"
        >
          {/* Professional background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.02]">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={`h-line-${i}`} 
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" 
                style={{ top: `${i * 5}%` }}
                initial={{ opacity: 0.05 }}
                animate={{ opacity: [0.05, 0.1, 0.05] }}
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
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-slate-400 to-transparent" 
                style={{ left: `${i * 5}%` }}
                initial={{ opacity: 0.05 }}
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
          
          {/* Professional accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-300/0 via-slate-400/30 to-slate-300/0"></div>
        </motion.div>
        
        {/* Hero content */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerTranslateY }}
          className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 z-10"
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Institute badge */}
              <motion.div variants={itemVariants} className="hidden md:flex items-center mb-4">
                <div className="h-px w-10 bg-slate-400/50 mr-3"></div>
                <p className="text-xs uppercase tracking-widest text-slate-600 font-light">Perrin Institute</p>
              </motion.div>
            
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="bg-slate-100 rounded-lg p-2 mr-3 shadow-lg border border-slate-200">
                  <FiUsers className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight">
                    Experts
                  </h1>
                  <div className="h-1 w-24 bg-slate-400/50 mt-2 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-600 max-w-2xl font-light leading-relaxed"
              >
                Connect with leading policy experts, researchers, and scholars at The Perrin Institution.
              </motion.p>
              
              {/* Category filters with professional styling */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-3 pt-6"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'all' ? null : category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      (category === 'all' && !selectedCategory) || selectedCategory === category
                        ? "bg-slate-900 text-white shadow-lg border border-slate-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* Main content with expert cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-10">
        {/* Institute description for professional tone */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-slate-400/50 mr-4"></div>
            <p className="text-sm uppercase tracking-widest text-slate-600 font-light">Expert Directory</p>
            <div className="h-px w-8 bg-slate-400/50 ml-4"></div>
          </div>
          <p className="text-slate-600 text-sm md:text-base font-light italic">
            Connecting with leading researchers and policy professionals
          </p>
        </motion.div>
        
        {/* Search Bar for experts */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experts..."
              className="block w-full pl-10 pr-3 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 shadow-lg"
            />
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="mb-6 flex justify-center">
          <div className="flex flex-wrap gap-2 max-w-4xl">
            {alphabet.map((letter) => (
              <button
                key={letter}
                className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                  selectedLetter === letter
                    ? 'bg-slate-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-slate-600">
            Showing {filteredExperts.length} of {totalExperts} experts
            {(searchQuery || selectedCategory || selectedLetter) && (
              <span className="ml-2 text-slate-600 font-medium">
                (filtered)
              </span>
            )}
          </p>
        </div>
      
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredExperts.map((expert, index) => {
            return (
              <motion.div
                key={expert.id}
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={cardHover}
                className="group bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg border border-slate-200 relative"
              >
                {/* Clean border for professional look */}
                <div className="absolute inset-0 rounded-xl border border-slate-200 z-20 pointer-events-none"></div>
                
                {/* Primary content area */}
                <div className="relative overflow-hidden">
                  {/* Header with expert color and improved visuals */}
                  <div className={`bg-gradient-to-br ${getExpertColor(index)} relative px-7 pt-8 pb-10`}>
                    {/* Decorative pattern in background */}
                    <div className="absolute inset-0 opacity-8 bg-[linear-gradient(135deg,rgba(255,255,255,0)_25%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                    
                    {/* Professional corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-slate-300/20"></div>
                    </div>
                    
                    {/* Expert badge */}
                    <div className="inline-flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="rounded-lg p-3 text-slate-700 bg-white/20 backdrop-blur-sm shadow-xl border border-slate-300/10 group-hover:scale-105 transition-transform duration-500">
                          <FiUser size="24" />
                        </div>
                        <div className="ml-4">
                          <h2 className="text-xl font-medium text-slate-900 tracking-tight line-clamp-1">{expert.name}</h2>
                          <div className="h-0.5 w-12 bg-slate-500/30 mt-1.5"></div>
                        </div>
                      </div>
                      
                      {expert.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/30 text-slate-800 backdrop-blur-sm border border-slate-300/10">
                          {expert.category}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Content area with improved styling */}
                  <div className="px-7 py-8 bg-white">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-slate-600">
                        <FiUser className="flex-shrink-0 mr-2 h-4 w-4 text-slate-500" />
                        <span>{expert.role}</span>
                      </div>
                      {expert.email && (
                        <div className="flex items-center text-sm text-slate-600">
                          <span className="flex-shrink-0 mr-2 h-4 w-4 text-slate-500">@</span>
                          <span className="line-clamp-1">{expert.email}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-slate-700 leading-relaxed mb-6 line-clamp-3 font-light">{expert.bio}</p>
                    
                    {/* Interests Tags */}
                    {expert.interests && expert.interests.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {expert.interests.slice(0, 3).map((interest, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-200"
                            >
                              {interest}
                            </span>
                          ))}
                          {expert.interests.length > 3 && (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                              +{expert.interests.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/experts/${expert.id}`}
                        className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors group"
                      >
                        <span className="relative">
                          <span className="relative z-10">Expert Profile</span>
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-400/30 group-hover:bg-slate-600/50 transition-colors"></span>
                        </span>
                        <FiChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Empty state if no experts match filter */}
        {filteredExperts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-lg border border-slate-200">
              <FiUsers className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">No Experts Found</h3>
            <p className="text-slate-600 mb-6 font-light">No experts match your current filter criteria.</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Show All Experts
            </button>
          </motion.div>
        )}
        
        {/* Professional footer element */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 border-t border-slate-200 pt-12 text-center"
        >
          <div className="flex items-center justify-center mb-5">
            <div className="h-px w-12 bg-slate-400/50 mr-4"></div>
            <p className="text-xs uppercase tracking-widest text-slate-600 font-light">Academic Excellence</p>
            <div className="h-px w-12 bg-slate-400/50 ml-4"></div>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            The Perrin Institute brings together distinguished experts and researchers dedicated to advancing policy research and academic excellence.
          </p>
        </motion.div>
      </div>
    </div>
  );
}