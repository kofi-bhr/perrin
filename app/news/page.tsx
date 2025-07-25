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

  // // Fetch market data
  // useEffect(() => {
  //   const fetchMarketData = async () => {
  //     try {
  //       // Set loading state
  //       setMarketData([
  //         { name: "Loading...", value: "--", change: "--", isPositive: true },
  //         { name: "Loading...", value: "--", change: "--", isPositive: true },
  //         { name: "Loading...", value: "--", change: "--", isPositive: true },
  //         { name: "Loading...", value: "--", change: "--", isPositive: true },
  //         { name: "Loading...", value: "--", change: "--", isPositive: true },
  //         { name: "Loading...", value: "--", change: "--", isPositive: true }
  //       ]);

  //       // Define the Finnhub API key provided by the user
  //       const finnhubApiKey = "d0c2ro1r01qs9fjk87s0d0c2ro1r01qs9fjk87sg";
        
  //       // Create a new array to hold our successful market data
  //       const marketItems: MarketDataItem[] = [];
        
  //       // If any of our API calls succeed, this will be set to true
  //       let anyApiSuccess = false;
        
  //       // Finnhub API for stocks (AAPL)
  //       try {
  //         const appleResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${finnhubApiKey}`);
          
  //         if (appleResponse.ok) {
  //           const appleData = await appleResponse.json();
  //           console.log('Apple data:', appleData);
            
  //           if (appleData && appleData.c) {
  //             const price = appleData.c;
  //             const prevClose = appleData.pc;
  //             const changePercent = ((price - prevClose) / prevClose) * 100;
              
  //             marketItems.push({
  //               name: "Apple Inc.",
  //               value: `$${price.toLocaleString(undefined, {
  //                 minimumFractionDigits: 2,
  //                 maximumFractionDigits: 2
  //               })}`,
  //               change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
  //               isPositive: changePercent >= 0
  //             });
              
  //             anyApiSuccess = true;
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching Apple stock:", error);
  //       }
        
  //       // Finnhub API for stocks (MSFT)
  //       try {
  //         const msftResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=MSFT&token=${finnhubApiKey}`);
          
  //         if (msftResponse.ok) {
  //           const msftData = await msftResponse.json();
  //           console.log('Microsoft data:', msftData);
            
  //           if (msftData && msftData.c) {
  //             const price = msftData.c;
  //             const prevClose = msftData.pc;
  //             const changePercent = ((price - prevClose) / prevClose) * 100;
              
  //             marketItems.push({
  //               name: "Microsoft",
  //               value: `$${price.toLocaleString(undefined, {
  //                 minimumFractionDigits: 2,
  //                 maximumFractionDigits: 2
  //               })}`,
  //               change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
  //               isPositive: changePercent >= 0
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching Microsoft stock:", error);
  //       }
        
  //       // Finnhub API for stocks (AMZN)
  //       try {
  //         const amznResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=AMZN&token=${finnhubApiKey}`);
          
  //         if (amznResponse.ok) {
  //           const amznData = await amznResponse.json();
  //           console.log('Amazon data:', amznData);
            
  //           if (amznData && amznData.c) {
  //             const price = amznData.c;
  //             const prevClose = amznData.pc;
  //             const changePercent = ((price - prevClose) / prevClose) * 100;
              
  //             marketItems.push({
  //               name: "Amazon",
  //               value: `$${price.toLocaleString(undefined, {
  //                 minimumFractionDigits: 2,
  //                 maximumFractionDigits: 2
  //               })}`,
  //               change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
  //               isPositive: changePercent >= 0
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching Amazon stock:", error);
  //       }
        
  //       // Finnhub API for stocks (GOOGL)
  //       try {
  //         const googlResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=GOOGL&token=${finnhubApiKey}`);
          
  //         if (googlResponse.ok) {
  //           const googlData = await googlResponse.json();
  //           console.log('Google data:', googlData);
            
  //           if (googlData && googlData.c) {
  //             const price = googlData.c;
  //             const prevClose = googlData.pc;
  //             const changePercent = ((price - prevClose) / prevClose) * 100;
              
  //             marketItems.push({
  //               name: "Alphabet",
  //               value: `$${price.toLocaleString(undefined, {
  //                 minimumFractionDigits: 2,
  //                 maximumFractionDigits: 2
  //               })}`,
  //               change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
  //               isPositive: changePercent >= 0
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching Google stock:", error);
  //       }
        
  //       // Get NVIDIA stock data instead of Tesla
  //       try {
  //         const nvdaResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=NVDA&token=${finnhubApiKey}`);
          
  //         if (nvdaResponse.ok) {
  //           const nvdaData = await nvdaResponse.json();
  //           console.log('NVIDIA data:', nvdaData);
            
  //           if (nvdaData && nvdaData.c) {
  //             const price = nvdaData.c;
  //             const prevClose = nvdaData.pc;
  //             const changePercent = ((price - prevClose) / prevClose) * 100;
              
  //             marketItems.push({
  //               name: "NVIDIA",
  //               value: `$${price.toLocaleString(undefined, {
  //                 minimumFractionDigits: 2,
  //                 maximumFractionDigits: 2
  //               })}`,
  //               change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
  //               isPositive: changePercent >= 0
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching NVIDIA stock:", error);
  //       }
        
  //       // Try to get S&P 500 ETF data
  //       try {
  //         const spyResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=SPY&token=${finnhubApiKey}`);
          
  //         if (spyResponse.ok) {
  //           const spyData = await spyResponse.json();
  //           console.log('S&P 500 ETF data:', spyData);
            
  //           if (spyData && spyData.c) {
  //             const price = spyData.c;
  //             const prevClose = spyData.pc;
  //             const changePercent = ((price - prevClose) / prevClose) * 100;
              
  //             marketItems.push({
  //               name: "S&P 500",
  //               value: `$${price.toLocaleString(undefined, {
  //                 minimumFractionDigits: 2,
  //                 maximumFractionDigits: 2
  //               })}`,
  //               change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
  //               isPositive: changePercent >= 0
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching S&P 500 ETF:", error);
  //       }
        
  //       // If we have at least one successful API call
  //       if (marketItems.length > 0) {
  //         anyApiSuccess = true;
  //       }
        
  //       if (anyApiSuccess) {
  //         // Only take up to 6 items
  //         const finalData = marketItems.slice(0, 6);
          
  //         // Fill any remaining slots with API unavailable if needed
  //         while (finalData.length < 6) {
  //           finalData.push({ 
  //             name: "API unavailable", 
  //             value: "--", 
  //             change: "--", 
  //             isPositive: true 
  //           });
  //         }
          
  //         setMarketData(finalData);
          
  //         // Set last updated time
  //         const now = new Date();
  //         setLastUpdated(`${now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} ET`);
  //       } else {
  //         // If all API calls failed, show unavailable state
  //         setMarketData([
  //           { name: "API unavailable", value: "--", change: "--", isPositive: true },
  //           { name: "API unavailable", value: "--", change: "--", isPositive: true },
  //           { name: "API unavailable", value: "--", change: "--", isPositive: true },
  //           { name: "API unavailable", value: "--", change: "--", isPositive: true },
  //           { name: "API unavailable", value: "--", change: "--", isPositive: true },
  //           { name: "API unavailable", value: "--", change: "--", isPositive: true }
  //         ]);
  //         setLastUpdated('API data unavailable');
  //       }
  //     } catch (error) {
  //       console.error('Error in market data fetching:', error);
  //       setMarketData([
  //         { name: "API error", value: "--", change: "--", isPositive: true },
  //         { name: "API error", value: "--", change: "--", isPositive: true },
  //         { name: "API error", value: "--", change: "--", isPositive: true },
  //         { name: "API error", value: "--", change: "--", isPositive: true },
  //         { name: "API error", value: "--", change: "--", isPositive: true },
  //         { name: "API error", value: "--", change: "--", isPositive: true }
  //       ]);
  //       setLastUpdated('API error - Retry later');
  //     }
  //   };

  //   // Initial fetch
  //   fetchMarketData();
    
  //   // Refresh every 5 minutes to avoid hitting API limits
  //   const intervalId = setInterval(fetchMarketData, 5 * 60 * 1000);
    
  //   // Clean up interval on unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  // Scroll to newsletter section
  const scrollToNewsletter = () => {
    // Find the existing NewsletterSubscription component and scroll to it
    const newsletterElement = document.querySelector('[data-test-id="beehiiv-embed"]');
    if (newsletterElement) {
      const parentElement = newsletterElement.closest('.bg-black.py-16') || newsletterElement;
      parentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const categories = ["ALL", "INTERNATIONAL AFFAIR", "ECONOMICS", "CLIMATE", "AI", "DOMESTIC AFFAIRS", "TECHNOLOGY", "EDUCATION", "LEGAL", "COMMERCE", "HEALTH"];

  const filteredNews = activeCategory && activeCategory !== "All" 
    ? recentNews.filter(news => {
        // Handle both single category (string) and multiple categories (array)
        const categories = Array.isArray(news.category) ? news.category : [news.category];
        return categories.includes(activeCategory);
      })
    : recentNews;

  // Featured articles (excluding the main featured news)
  const featuredArticles = recentNews.filter(news => news.featured);
  
  // Use the first featured article as main featured, or first article if none are featured
  const featuredNews = featuredArticles.length > 0 
          ? featuredArticles[0] 
    : recentNews.length > 0 ? recentNews[0] : {
        id: "0",
        title: "No intelligence available",
        subtitle: "Check back later for intelligence updates",
        date: "Today",
        excerpt: "Check back later for new content.",
        content: "No content available.",
        image: "/news/placeholder-thumb-1.jpg",
        category: "Intelligence",
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
{/* <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex items-center space-x-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search intelligence..."
                  className="pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 text-sm text-slate-700 placeholder-slate-400 font-lato"
                />
                <FiSearch className="absolute left-3 top-2.5 text-slate-500" />
              </div>
              <button 
                onClick={scrollToNewsletter}
                className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors flex items-center font-lato"
              >
                <FiMail className="mr-1.5" size={14} />
                Subscribe
              </button>
            </motion.div> */}
          </div>
        </div>
      </motion.div>

      {/* Market data ticker - Light theme with mobile improvements
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <div className="overflow-x-auto -mx-3 px-3 custom-stocks-scrollbar">
            <div className="flex space-x-4 sm:space-x-6 py-1 min-w-max">
              {marketData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-1.5 group bg-white rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-200 shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-medium text-slate-700 truncate font-lato" style={{ maxWidth: '80px' }}>{item.name}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-lato">{item.value}</span>
                  <span className={`text-xs flex items-center font-lato ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {item.isPositive ? <FiTrendingUp className="mr-0.5" size={10} /> : <FiTrendingDown className="mr-0.5" size={10} />}
                    {item.change}
                  </span>
                </div>
              ))}
              <a 
                href="https://www.google.com/finance/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center cursor-pointer group bg-slate-900 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-800 shadow-sm"
              >
                <span className="text-xs text-slate-100 group-hover:text-white font-lato">More</span>
                <FiExternalLink className="ml-1 h-3 w-3 text-slate-100 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </motion.div> */}

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

      {/* Category navigation - Professional light theme tabs
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === "All" ? null : category)}
                className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm font-lato ${
                  (category === "All" && activeCategory === null) || category === activeCategory
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                } transition-colors duration-200`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </motion.div> */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <nav className="flex items-center font-oswald flex-wrap gap-x-2 sm:gap-x-3 text-black text-sm sm:text-base uppercase tracking-wide">
        {categories.map((category, idx) => (
          <React.Fragment key={category}>
            {idx > 0 && <span className="text-black text-7xl">/</span>}
            <button
              onClick={() => setActiveCategory(category === "All" ? null : category)}
              className="relative px-1 py-2 transition-colors duration-200 group text-black text-5xl"
            >
              <span className="relative z-10">{category}</span>
              {/* Marker hover effect */}
              <span className="absolute left-0 bottom-1 h-10 w-full bg-yellow-300 opacity-0 group-hover:opacity-60 transition duration-200 z-0 rounded-sm -skew-x-6"></span>
            </button>
          </React.Fragment>
        ))}
        </nav>
      </div>


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
              className="mb-8 sm:mb-12"
            >
              <Link href={`/news/${featuredNews.id}`} className="group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl mb-4 sm:mb-6 shadow-lg"
                >
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-0 right-0 m-3 sm:m-4 flex flex-wrap gap-1">
                    {(() => {
                      const categories = Array.isArray(featuredNews.category) 
                        ? featuredNews.category 
                        : [featuredNews.category];
                      return categories.map((cat, index) => (
                        <span 
                          key={index}
                          className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg font-lato"
                        >
                          {cat}
                        </span>
                      ));
                    })()}
                  </div>
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    <span className="flex items-center text-xs text-white/90 mb-2 font-lato">
                      <FiCalendar className="mr-2" size={14} />
                      {featuredNews.date}
                    </span>
                  </div>
                </motion.div>
                {featuredNews.subtitle && (
                  <p className="text-slate-700 mb-3 leading-relaxed text-sm sm:text-xl font-lato">
                    {featuredNews.subtitle}
                  </p>
                )}
                <p className="text-slate-600 mb-4 leading-relaxed text-sm sm:text-lg line-clamp-3 sm:line-clamp-none font-lato">
                  {featuredNews.excerpt}
                </p>
                <div className="inline-flex items-center text-slate-900 font-medium group-hover:text-slate-700 transition-colors text-sm sm:text-base font-lato">
                  Continue reading
                  <FiArrowRight className="ml-2" />
                </div>
              </Link>
            </motion.div>

            {/* News grid - Professional light theme with mobile improvements */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 pb-2 border-b border-slate-200 font-lato">
                Latest Intelligence
              </h2>
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
              >
                {filteredNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Link href={`/news/${news.id}`} className="block">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3 sm:mb-4 shadow-md"
                      >
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-0 right-0 m-2 flex flex-wrap gap-1">
                          {(() => {
                            const categories = Array.isArray(news.category) 
                              ? news.category 
                              : [news.category];
                            return categories.map((cat, index) => (
                              <span 
                                key={index}
                                className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md font-lato"
                              >
                                {cat}
                              </span>
                            ));
                          })()}
                        </div>
                        <div className="absolute bottom-0 left-0 p-3 sm:p-4">
                          <span className="flex items-center text-xs text-white/90 mb-1 font-lato">
                            <FiCalendar className="mr-1" size={12} />
                            {news.date}
                          </span>
                        </div>
                      </motion.div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-slate-700 transition-colors line-clamp-2 font-lato">
                        {news.title}
                      </h3>
                      {news.subtitle && (
                        <p className="text-slate-700 text-xs sm:text-sm mb-2 leading-relaxed line-clamp-2 font-lato">
                          {news.subtitle}
                        </p>
                      )}
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 font-lato">
                        {news.excerpt}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
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
          </div>

          {/* Sidebar - Professional light theme */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-1"
          >
            <div className="sticky top-36">
              {/* Market summary
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 mb-8 border border-slate-200 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 font-lato">Market Summary</h3>
                  <span className="text-xs text-slate-500 font-lato">Last updated: {lastUpdated}</span>
                </div>
                <div className="space-y-4">
                  {marketData.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                      <div>
                        <div className="text-slate-900 font-medium font-lato">{item.name}</div>
                        <div className="text-sm text-slate-600 font-lato">{item.value}</div>
                      </div>
                      <div className={`flex items-center ${item.isPositive ? 'text-green-600' : 'text-red-600'} font-medium font-lato`}>
                        {item.isPositive ? <FiTrendingUp className="mr-1.5" size={16} /> : <FiTrendingDown className="mr-1.5" size={16} />}
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100">
                  <Link href="#" className="text-slate-900 text-sm hover:text-slate-700 transition-colors flex items-center font-lato">
                    View all markets
                    <FiArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div> */}

              {/* Opinion section - replacing What's Trending
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 mb-8 border border-slate-200 shadow-lg"
              >
                <div className="flex items-center mb-4 pb-2 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 font-lato">Opinion</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-lato">
                    Perspectives
                  </span>
                </div>
                <div className="space-y-5">
                  {opinionPieces.map((piece) => (
                    <div key={piece.id} className="pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                      <Link href={piece.link} className="group">
                        <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors mb-1 font-lato">
                          {piece.title}
                        </h4>
                        <p className="text-slate-600 text-sm mb-1.5 font-lato">
                          {piece.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-slate-500 font-lato">
                          <span className="font-medium text-slate-700">
                            {piece.author}
                          </span>
                          <span className="mx-1.5">•</span>
                          <span className="text-slate-500">{piece.position}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 font-lato">
                          {piece.date}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100">
                  <Link href="/opinions" className="text-slate-900 text-sm hover:text-slate-700 transition-colors flex items-center font-lato">
                    View all opinions
                    <FiArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div> */}

              {/* Featured articles
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 font-lato">
                  Featured Intelligence
                </h3>
                {featuredArticles.map((article) => (
                  <div key={article.id} className="mb-5 pb-5 border-b border-slate-200 last:border-0 last:pb-0">
                    <Link href={`/news/${article.id}`} className="group">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-3 shadow-md">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-0 right-0 m-2 flex flex-wrap gap-1">
                          {(() => {
                            const categories = Array.isArray(article.category) 
                              ? article.category 
                              : [article.category];
                            return categories.map((cat, index) => (
                              <span 
                                key={index}
                                className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md font-lato"
                              >
                                {cat}
                              </span>
                            ));
                          })()}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors mb-1 font-lato">
                        {article.title}
                      </h4>
                      {article.subtitle && (
                        <p className="text-slate-700 text-sm mb-1 font-lato">
                          {article.subtitle}
                        </p>
                      )}
                      <span className="flex items-center text-xs text-slate-500 font-lato">
                        <FiCalendar className="mr-1" size={12} />
                        {article.date}
                      </span>
                    </Link>
                  </div>
                ))}
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Newsletter section */}
      <NewsletterSubscription />
    </main>
  );
} 