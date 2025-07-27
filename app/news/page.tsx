'use client'
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";
import { FiArrowRight, FiExternalLink, FiClock, FiCalendar, FiBookmark, FiSearch, FiTrendingUp, FiTrendingDown, FiMail,  FiSend, FiMapPin, FiGithub, FiTwitter, FiLinkedin} from "react-icons/fi";
import { FaLemon, FaTiktok, FaTwitter } from "react-icons/fa";
import { getArticles, Article } from "../../lib/articles";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import '@fontsource/oswald';

// Define market data type for better type safety
interface MarketDataItem {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

// Add animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketData, setMarketData] = useState<MarketDataItem[]>([
    { name: "Loading...", value: "--", change: "--", isPositive: true },
    { name: "Loading...", value: "--", change: "--", isPositive: true },
    { name: "Loading...", value: "--", change: "--", isPositive: true },
    { name: "Loading...", value: "--", change: "--", isPositive: true },
    { name: "Loading...", value: "--", change: "--", isPositive: true },
    { name: "Loading...", value: "--", change: "--", isPositive: true }
  ]);
  const [lastUpdated, setLastUpdated] = useState("");
  
  // Get articles from our articles utility instead of hardcoded data
  const [recentNews, setRecentNews] = useState<Article[]>([]);
  
  // Opinion pieces data
  const opinionPieces = [
    {
      id: 1,
      title: "AI Regulation Must Balance Innovation and Risk",
      author: "Dr. Amara Singh",
      position: "AI Ethics Expert",
      excerpt: "As AI capabilities accelerate, we need regulatory frameworks that enable innovation while...",
      date: "June 10, 2023",
      link: "/opinions/ai-regulation-balance"
    },
    {
      id: 2,
      title: "Why Digital Privacy Is Critical for Democracy",
      author: "Marcus Chen",
      position: "Technology Ethics Researcher",
      excerpt: "In an increasingly surveilled world, privacy protections are not just personal concerns but...",
      date: "June 5, 2023",
      link: "/opinions/privacy-democracy"
    },
    {
      id: 3,
      title: "The Growing Tech Divide Between US and China",
      author: "Leila Mwangi",
      position: "Foreign Policy Analyst",
      excerpt: "Technological decoupling between global powers is reshaping international relations and...",
      date: "May 28, 2023",
      link: "/opinions/tech-divide-us-china"
    },
    {
      id: 4,
      title: "How Climate Tech Startups Are Leading Innovation",
      author: "Dr. Kashaf Alvi",
      position: "Climate Technology Advisor",
      excerpt: "A new generation of startups is pioneering solutions to our most pressing climate challenges...",
      date: "May 20, 2023",
      link: "/opinions/climate-tech-startups"
    }
  ];
  
  useEffect(() => {
    async function fetchArticles() {
      const articles = await getArticles();
      setRecentNews(articles);
    }
    
    fetchArticles();
  }, []);

  // Add scroll effect for the category navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  // Scroll to newsletter section
  const scrollToNewsletter = () => {
    // Find the existing NewsletterSubscription component and scroll to it
    const newsletterElement = document.querySelector('[data-test-id="beehiiv-embed"]');
    if (newsletterElement) {
      const parentElement = newsletterElement.closest('.bg-black.py-16') || newsletterElement;
      parentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const categories = ["ALL", "INTERNATIONAL AFFAIRS", "ECONOMICS", "CLIMATE", "AI", "DOMESTIC AFFAIRS", "TECHNOLOGY", "EDUCATION", "LEGAL", "COMMERCE", "HEALTH"];

  const filteredNews = activeCategory && activeCategory !== "ALL" 
    ? recentNews.filter(news => {
        // Handle both single category (string) and multiple categories (array)
        const categories = Array.isArray(news.category) ? news.category : [news.category];
        return categories.some(cat => cat.toLowerCase() === activeCategory.toLowerCase());
      })
    : recentNews;

  // Featured articles (excluding the main featured news)
  const featuredArticles = recentNews.filter(news => news.featured);
  
  // Use the first featured article as main featured, or first article if none are featured, or first article in category if filetered
  const featuredNews = featuredArticles.length > 0 
          ? featuredArticles[0] 
    : recentNews.length > 0 ? filteredNews[0] : {
        id: "0",
        title: "",
        subtitle: "Check back later for intelligence updates",
        date: "Today",
        excerpt: "Check back later for new content.",
        content: "No content available.",
        image: "/news/placeholder-thumb-1.jpg",
        category: "",
        type: "news" as const,
        featured: false
      };
  
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Header section - Professional light theme */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-24">
            <div>
              <motion.h1 
                style={{ fontFamily: 'Oswald, sans-serif'}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-8xl font-bold text-slate-900"
              >
              GLOBAL INTELLIGENCE
              </motion.h1>
              <motion.p 
                style={{ fontFamily: 'Oswald, sans-serif' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-600 text-lg mt-1 font-lato ml-2"
              >
                on the policy and technology of now
              </motion.p>
            </div>
            {/* Social links */}
            <div className="flex space-x-8">
              <motion.a
                href="https://www.tiktok.com/@theperrininstitution?_t=ZT-8ugIWNNxeqw&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-slate-600 hover:text-pink-600 transition-colors border border-slate-200 hover:border-pink-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <span className="sr-only">TikTok</span>
                <FaTiktok className="w-5 h-5" color="white" />
              </motion.a>
              <motion.a
                href="https://www.lemon8-app.com/@theperrininstitution?_r=1&_t=MGcEDJSsUpTM0hN1%2FAEbUQRFyOmB02V%2BMIHsUs9SjlevWPuqEk4jDpyOhGEumD%2FzKwbIEmZiaU%2BM5ZGda7WkaHv6D%2B5aVD6q6JpkfVLEn0B1YoVWT5WqBBAx5G%2FEEKzHpbfZ6FdcsMKf&language=en&region=us&share_platform=copy&ui_language=en"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center text-slate-600 hover:text-yellow-600 transition-colors border border-slate-200 hover:border-yellow-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="sr-only">Lemon8</span>
                <FaLemon className="w-5 h-5" color="black" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/perrin-institution/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <span className="sr-only">LinkedIn</span>
                <FiLinkedin className="w-5 h-5" color="white"/>
              </motion.a>
              <motion.a
                href="https://twitter.com/perrininstit"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-400 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter className="w-5 h-5" color="blue" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      
      {/* Add custom scrollbar styles - Light theme */}
      <style jsx global>{`
        /* Professional light theme scrollbar styles */
        .custom-stocks-scrollbar::-webkit-scrollbar {
          height: 4px;
          background: transparent;
        }
        
        .custom-stocks-scrollbar::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 100px;
          margin: 0 20px;
        }
        
        .custom-stocks-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.6);
          border-radius: 100px;
          background-image: linear-gradient(to right, rgba(148, 163, 184, 0.7), rgba(100, 116, 139, 0.7));
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        }
        
        .custom-stocks-scrollbar::-webkit-scrollbar-thumb:hover {
          background-image: linear-gradient(to right, rgba(148, 163, 184, 0.9), rgba(100, 116, 139, 0.9));
        }
      `}</style>

      {/* Navbar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex items-center font-oswald flex-wrap gap-x-2 sm:gap-x-3 text-black text-sm sm:text-base uppercase tracking-wide" aria-label="Categories">
          {categories.map((category, idx) => (
            <React.Fragment key={category}>
              {idx > 0 && <span className="text-black text-5xl">/</span>}
              <button
                onClick={() => setActiveCategory(category === "All" ? null : category)}
                className="relative px-1 py-2 transition-colors duration-200 group text-black text-4xl"
              >
                <span className="relative z-10">{category}</span>
                {/* Marker hover effect */}
                <span className="absolute left-0 bottom-1 h-7 w-full bg-yellow-300 opacity-0 group-hover:opacity-60 transition duration-200 z-0 rounded-sm -skew-x-6"></span>
              </button>
            </React.Fragment>
          ))}
          </nav>
        </div>
      </motion.div>


      {/* Main content - improved for mobile */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Slate accent glow */}
        <div className="absolute top-24 right-0 w-1/3 h-1/3 bg-slate-300 rounded-full filter blur-3xl opacity-10 pointer-events-none"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10"
        >
          {/* Main column */}
          <div className="col-span-2">
            {/* Featured story - Professional light theme with mobile improvements */}
            <motion.div 
              variants={scaleUp}
              className="relative w-full max-w-4xl mt-5 mb-6"
            >
              <Link href={`/news/${featuredNews.id}`} className="group">
                <div className="relative">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="relative aspect-[12/9] object-cover transition duration-300 ease-in-out group-hover:brightness-110"
                    width={900}
                    height={1000}
                  />
                  <div className="absolute top-0 left-0 m-4 sm:m-4 flex flex-wrap">
                    {(() => {
                      const categories = Array.isArray(featuredNews.category) 
                        ? featuredNews.category 
                        : [featuredNews.category];
                      return categories.map((cat, index) => (
                       <div className="relative overflow-hidden" key={index}>
                          {/* highlighted background */}
                          <span className="absolute inset-0 -skew-y-1 h-4 mt-1 bg-blue-800 z-0 mx-2"></span>

                          {/* text */}
                          <span 
                            className="relative z-10 text-white text-xs font-medium px-3 py-1.5 shadow-lg font-[Inter,sans-serif]"
                          >
                            {cat}
                          </span>
                        </div>
                      ));
                    })()}
                  </div>
                  {/* <div className="absolute top-80 left-0 p-4 sm:p-6">
                    <span className="flex items-center text-xs text-white/90 mb-2 font-lato">
                      <FiCalendar className="relative mr-2" size={14} />
                      {featuredNews.date}
                    </span>
                  </div> */}
                  {featuredNews.title && (
                    <h1 className="font-bold z-10 tracking-wide font-[Bradford,sans-serif] text-black mt-4 text-4xl mb-3 mr-20 w-full group-hover:text-blue-500">
                        {featuredNews.title} 
                    </h1>
                  )}
                  <p className="text-2xl text-black sm:text-2xl mt-7 mb-5 font-[Georgia,serif]">
                    {featuredNews.subtitle}
                  </p>
                  <h3 className="text-xl text-black underline sm:text-md mt-5 mb-5 font-[Inter,sans-serif]">
                    {featuredNews.authorName}
                  </h3>
                  <div>
                    <span className="text-md text-black/50 font-[Inter,sans-serif]">
                      {/* <FiCalendar className="mr-1" size={12} /> */}
                      {featuredNews.date}
                    </span>
                  </div>
                  {/* <div className="inline-flex items-center text-slate-900 font-medium group-hover:text-slate-700 transition-colors text-sm sm:text-base font-lato">
                    Continue reading
                    <FiArrowRight className="ml-2" />
                  </div> */}
                </div>
              </Link>
            </motion.div>
          </div>
          {/* Sidebar - Professional light theme */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-1"
          >
            <div className="sticky top-36">
              <motion.div 
                // whileHover={{ y: -1 }}
                // transition={{ duration: 0.1 }}
                className="bg-white pl-20 pt-5 mb-8 "
              >
                <div className="flex items-center mb-4 pb-2">
                  <h2 className="text-xl font-[Inter,sans-serif] text-blue-800 tracking-tight">Top Voices</h2>
                </div>
                <div className="space-y-5">
                  {opinionPieces.map((piece) => (
                    <div key={piece.id} className="pb-5 border-b border-slate-300 last:border-0 last:pb-0">
                      <Link href={piece.link} className="group">
                        <h4 className="font-[Inter,sans-serif] font-bold text-black text-xl sm:text-2xl tracking-tighter">
                          {piece.title}
                        </h4>
                        <div className="flex items-center text-xs text-slate-500 font-lato pt-2">
                          <span className="text-[14px] font-[Inter,sans-serif] text-blue-800 tracking-tighter">
                            {piece.author.toUpperCase()}
                          </span>
                          <span className="mx-1.5">•</span>
                          <span className="text-slate-500 font-[Inter,sans-serif]">{piece.position}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 font-[Inter,sans-serif]">
                          {piece.date}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100">
                  <Link href="/opinions" className="text-sm hover:text-slate-700 transition-colors flex items-center font-[Inter,sans-serif] text-blue-700">
                    View all voices
                    <FiArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 mt-10"
        >

            {/* News grid - Professional light theme with mobile improvements */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-11"
            >
              {/* <h2 className="text-2xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 pb-2 border-b border-slate-200 font-[Inter,sans-serif]">
                Recommended
              </h2> */}
              {filteredNews.slice(1,31).map((news, index) => (
                <motion.div
                  key={news.id}
                  variants={fadeInUp}
                  // whileHover={{ y: -5 }}
                  // transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link href={`/news/${news.id}`} className="block mt-9">
                    <motion.div 
                      // whileHover={{ scale: 1.05 }}
                      // transition={{ duration: 0.3 }}
                      className="w-full relative aspect-[12/10] object-cover transition duration-300 ease-in-out group-hover:brightness-110"
                    >
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                      <div className="absolute top-0 left-0 m-3 flex flex-wrap">
                        {(() => {
                          const categories = Array.isArray(news.category) 
                            ? news.category 
                            : [news.category];
                          return categories.map((cat, index) => (
                            <div className="relative overflow-hidden">
                              {/* highlighted background */}
                              <span className="absolute inset-0 -skew-y-1 h-4 mt-1 bg-blue-800 z-0 mx-2"></span>

                              {/* text */}
                              <span 
                                key={index}
                                className="relative z-10 text-white text-xs font-medium px-3 py-1.5 shadow-lg font-[Inter,sans-serif]"
                              >
                                {cat}
                              </span>
                            </div>
                          ));
                        })()}
                      </div>
                    </motion.div>
                    <h3 className="font-semibold text-base tracking-tighter sm:text-2xl mt-3 text-slate-900 mb-2 group-hover:text-blue-500 transition-colors font-[Inter,sans-serif]">
                      {news.title}
                    </h3>
                    {news.subtitle && (
                      <p className="text-xl text-black sm:text-xl mt-5 mb-5 font-[Inter,sans-serif]">
                        {news.subtitle}
                      </p>
                    )}
                    <h3 className="text-xl text-black underline sm:text-md mt-5 mb-5 font-[Inter,sans-serif]">
                      {news.authorName}
                    </h3>
                    <div>
                      <span className="text-md text-black/50 font-[Inter,sans-serif]">
                        {/* <FiCalendar className="mr-1" size={12} /> */}
                        {news.date}
                      </span>
                    </div>
                    {/* <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 font-lato">
                      {news.excerpt}
                    </p> */}
                  </Link>
                </motion.div>
              ))}
              
              {/* Load more button - Professional light theme with mobile improvements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 sm:mt-10 text-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-slate-300 shadow-sm text-sm sm:text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors font-lato"
                >
                  Load more intelligence
                </motion.button>
              </motion.div>
            </motion.div>
          
        </motion.div>
      </div>

      {/* Newsletter section */}
      <NewsletterSubscription />
    </main>
  );
} 