'use client'
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight, FiExternalLink, FiClock, FiCalendar, FiBookmark, FiSearch, FiTrendingUp, FiTrendingDown, FiMail } from "react-icons/fi";
import { getArticles, Article } from "../../lib/articles";
import NewsletterSubscription from "@/components/NewsletterSubscription";

const dmSans = DM_Sans({ subsets: ["latin"] });

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

  // Fetch market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Set loading state
        setMarketData([
          { name: "Loading...", value: "--", change: "--", isPositive: true },
          { name: "Loading...", value: "--", change: "--", isPositive: true },
          { name: "Loading...", value: "--", change: "--", isPositive: true },
          { name: "Loading...", value: "--", change: "--", isPositive: true },
          { name: "Loading...", value: "--", change: "--", isPositive: true },
          { name: "Loading...", value: "--", change: "--", isPositive: true }
        ]);

        // Define the Finnhub API key provided by the user
        const finnhubApiKey = "d0c2ro1r01qs9fjk87s0d0c2ro1r01qs9fjk87sg";
        
        // Create a new array to hold our successful market data
        const marketItems: MarketDataItem[] = [];
        
        // If any of our API calls succeed, this will be set to true
        let anyApiSuccess = false;
        
        // Finnhub API for stocks (AAPL)
        try {
          const appleResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${finnhubApiKey}`);
          
          if (appleResponse.ok) {
            const appleData = await appleResponse.json();
            console.log('Apple data:', appleData);
            
            if (appleData && appleData.c) {
              const price = appleData.c;
              const prevClose = appleData.pc;
              const changePercent = ((price - prevClose) / prevClose) * 100;
              
              marketItems.push({
                name: "Apple Inc.",
                value: `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`,
                change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                isPositive: changePercent >= 0
              });
              
              anyApiSuccess = true;
            }
          }
        } catch (error) {
          console.error("Error fetching Apple stock:", error);
        }
        
        // Finnhub API for stocks (MSFT)
        try {
          const msftResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=MSFT&token=${finnhubApiKey}`);
          
          if (msftResponse.ok) {
            const msftData = await msftResponse.json();
            console.log('Microsoft data:', msftData);
            
            if (msftData && msftData.c) {
              const price = msftData.c;
              const prevClose = msftData.pc;
              const changePercent = ((price - prevClose) / prevClose) * 100;
              
              marketItems.push({
                name: "Microsoft",
                value: `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`,
                change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                isPositive: changePercent >= 0
              });
            }
          }
        } catch (error) {
          console.error("Error fetching Microsoft stock:", error);
        }
        
        // Finnhub API for stocks (AMZN)
        try {
          const amznResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=AMZN&token=${finnhubApiKey}`);
          
          if (amznResponse.ok) {
            const amznData = await amznResponse.json();
            console.log('Amazon data:', amznData);
            
            if (amznData && amznData.c) {
              const price = amznData.c;
              const prevClose = amznData.pc;
              const changePercent = ((price - prevClose) / prevClose) * 100;
              
              marketItems.push({
                name: "Amazon",
                value: `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`,
                change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                isPositive: changePercent >= 0
              });
            }
          }
        } catch (error) {
          console.error("Error fetching Amazon stock:", error);
        }
        
        // Finnhub API for stocks (GOOGL)
        try {
          const googlResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=GOOGL&token=${finnhubApiKey}`);
          
          if (googlResponse.ok) {
            const googlData = await googlResponse.json();
            console.log('Google data:', googlData);
            
            if (googlData && googlData.c) {
              const price = googlData.c;
              const prevClose = googlData.pc;
              const changePercent = ((price - prevClose) / prevClose) * 100;
              
              marketItems.push({
                name: "Alphabet",
                value: `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`,
                change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                isPositive: changePercent >= 0
              });
            }
          }
        } catch (error) {
          console.error("Error fetching Google stock:", error);
        }
        
        // Get NVIDIA stock data instead of Tesla
        try {
          const nvdaResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=NVDA&token=${finnhubApiKey}`);
          
          if (nvdaResponse.ok) {
            const nvdaData = await nvdaResponse.json();
            console.log('NVIDIA data:', nvdaData);
            
            if (nvdaData && nvdaData.c) {
              const price = nvdaData.c;
              const prevClose = nvdaData.pc;
              const changePercent = ((price - prevClose) / prevClose) * 100;
              
              marketItems.push({
                name: "NVIDIA",
                value: `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`,
                change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                isPositive: changePercent >= 0
              });
            }
          }
        } catch (error) {
          console.error("Error fetching NVIDIA stock:", error);
        }
        
        // Try to get S&P 500 ETF data
        try {
          const spyResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=SPY&token=${finnhubApiKey}`);
          
          if (spyResponse.ok) {
            const spyData = await spyResponse.json();
            console.log('S&P 500 ETF data:', spyData);
            
            if (spyData && spyData.c) {
              const price = spyData.c;
              const prevClose = spyData.pc;
              const changePercent = ((price - prevClose) / prevClose) * 100;
              
              marketItems.push({
                name: "S&P 500",
                value: `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`,
                change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                isPositive: changePercent >= 0
              });
            }
          }
        } catch (error) {
          console.error("Error fetching S&P 500 ETF:", error);
        }
        
        // If we have at least one successful API call
        if (marketItems.length > 0) {
          anyApiSuccess = true;
        }
        
        if (anyApiSuccess) {
          // Only take up to 6 items
          const finalData = marketItems.slice(0, 6);
          
          // Fill any remaining slots with API unavailable if needed
          while (finalData.length < 6) {
            finalData.push({ 
              name: "API unavailable", 
              value: "--", 
              change: "--", 
              isPositive: true 
            });
          }
          
          setMarketData(finalData);
          
          // Set last updated time
          const now = new Date();
          setLastUpdated(`${now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} ET`);
        } else {
          // If all API calls failed, show unavailable state
          setMarketData([
            { name: "API unavailable", value: "--", change: "--", isPositive: true },
            { name: "API unavailable", value: "--", change: "--", isPositive: true },
            { name: "API unavailable", value: "--", change: "--", isPositive: true },
            { name: "API unavailable", value: "--", change: "--", isPositive: true },
            { name: "API unavailable", value: "--", change: "--", isPositive: true },
            { name: "API unavailable", value: "--", change: "--", isPositive: true }
          ]);
          setLastUpdated('API data unavailable');
        }
      } catch (error) {
        console.error('Error in market data fetching:', error);
        setMarketData([
          { name: "API error", value: "--", change: "--", isPositive: true },
          { name: "API error", value: "--", change: "--", isPositive: true },
          { name: "API error", value: "--", change: "--", isPositive: true },
          { name: "API error", value: "--", change: "--", isPositive: true },
          { name: "API error", value: "--", change: "--", isPositive: true },
          { name: "API error", value: "--", change: "--", isPositive: true }
        ]);
        setLastUpdated('API error - Retry later');
      }
    };

    // Initial fetch
    fetchMarketData();
    
    // Refresh every 5 minutes to avoid hitting API limits
    const intervalId = setInterval(fetchMarketData, 5 * 60 * 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
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
  
  const categories = ["All", "Foreign Policy", "AI", "Startups", "Technology", "Education", "Economics", "Climate Action"];

  const filteredNews = activeCategory && activeCategory !== "All" 
    ? recentNews.filter(news => news.category === activeCategory)
    : recentNews;

  // Featured articles (excluding the main featured news)
  const featuredArticles = recentNews.filter(news => news.featured);
  
  // Use the first featured article as main featured, or first article if none are featured
  const featuredNews = featuredArticles.length > 0 
    ? featuredArticles[0] 
    : recentNews.length > 0 ? recentNews[0] : {
        id: "0",
        title: "No articles available",
        subtitle: "Check back later for news updates",
        date: "Today",
        excerpt: "Check back later for new content.",
        content: "No content available.",
        image: "/news/placeholder-thumb-1.jpg",
        category: "News",
        type: "news" as const,
        featured: false
      };
  
  return (
    <main className="min-h-screen bg-black pt-24">
      {/* Header section - WSJ-inspired masthead */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="border-b border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-serif font-bold text-white"
              >
                Global News
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-sm mt-1"
              >
                Analysis and reporting on global policy and technology trends
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex items-center space-x-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="pl-9 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-200 placeholder-gray-500"
                />
                <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
              </div>
              <button 
                onClick={scrollToNewsletter}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <FiMail className="mr-1.5" size={14} />
                Subscribe
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Market data ticker - WSJ style, with mobile improvements */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="border-b border-gray-900 bg-black"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <div className="overflow-x-auto -mx-3 px-3 custom-stocks-scrollbar">
            <div className="flex space-x-4 sm:space-x-6 py-1 min-w-max">
              {marketData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-1.5 group bg-gray-950 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 border border-gray-800 shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-medium text-gray-300 truncate" style={{ maxWidth: '80px' }}>{item.name}</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-100">{item.value}</span>
                  <span className={`text-xs flex items-center ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {item.isPositive ? <FiTrendingUp className="mr-0.5" size={10} /> : <FiTrendingDown className="mr-0.5" size={10} />}
                    {item.change}
                  </span>
                </div>
              ))}
              <a 
                href="https://www.google.com/finance/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center cursor-pointer group bg-blue-900 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 border border-blue-800 shadow-sm"
              >
                <span className="text-xs text-blue-300 group-hover:text-blue-200">More</span>
                <FiExternalLink className="ml-1 h-3 w-3 text-blue-300 group-hover:text-blue-200" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        /* FAANG-inspired scrollbar styles */
        .custom-stocks-scrollbar::-webkit-scrollbar {
          height: 4px;
          background: transparent;
        }
        
        .custom-stocks-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 100px;
          margin: 0 20px;
        }
        
        .custom-stocks-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.6);
          border-radius: 100px;
          background-image: linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(79, 70, 229, 0.7));
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        }
        
        .custom-stocks-scrollbar::-webkit-scrollbar-thumb:hover {
          background-image: linear-gradient(to right, rgba(59, 130, 246, 0.9), rgba(79, 70, 229, 0.9));
        }
      `}</style>

      {/* Category navigation - FAANG-inspired tabs */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="border-b border-gray-900 bg-black shadow-sm sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === "All" ? null : category)}
                className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm ${
                  (category === "All" && activeCategory === null) || category === activeCategory
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                } transition-colors duration-200`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main content - improved for mobile */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Blue accent glow */}
        <div className="absolute top-24 right-0 w-1/3 h-1/3 bg-blue-900 rounded-full filter blur-3xl opacity-10 pointer-events-none"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10"
        >
          {/* Main column */}
          <div className="col-span-2">
            {/* Featured story - WSJ/Apple News style with mobile improvements */}
            <motion.div 
              variants={scaleUp}
              className="mb-8 sm:mb-12"
            >
              <Link href={`/news/${featuredNews.id}`} className="group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[16/9] overflow-hidden rounded-xl mb-4 sm:mb-6"
                >
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-2 sm:px-3 py-1 m-2 sm:m-3 rounded-md">
                    {featuredNews.category}
                  </div>
                  <div className="absolute bottom-0 left-0 p-3 sm:p-6">
                    <h2 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2 sm:mb-3 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2 sm:line-clamp-none">
                      {featuredNews.title}
                    </h2>
                    <span className="flex items-center text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">
                      <FiCalendar className="mr-2" size={14} />
                      {featuredNews.date}
                    </span>
                  </div>
                </motion.div>
                {featuredNews.subtitle && (
                  <p className="text-gray-300 font-serif mb-3 leading-relaxed text-sm sm:text-xl">
                    {featuredNews.subtitle}
                  </p>
                )}
                <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-lg line-clamp-3 sm:line-clamp-none">
                  {featuredNews.excerpt}
                </p>
                <div className="inline-flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors text-sm sm:text-base">
                  Continue reading
                  <FiArrowRight className="ml-2" />
                </div>
              </Link>
            </motion.div>

            {/* News grid - FAANG-inspired cards with mobile improvements */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 sm:mb-6 pb-2 border-b border-gray-800">
                Latest Articles
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
                        className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3 sm:mb-4"
                      >
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-2 py-1 m-2 rounded-md">
                          {news.category}
                        </div>
                        <div className="absolute bottom-0 left-0 p-3 sm:p-4">
                          <span className="flex items-center text-xs text-gray-300 mb-1">
                            <FiCalendar className="mr-1" size={12} />
                            {news.date}
                          </span>
                        </div>
                      </motion.div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-gray-100 mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      {news.subtitle && (
                        <p className="text-gray-300 font-serif text-xs sm:text-sm mb-2 leading-relaxed line-clamp-2">
                          {news.subtitle}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                        {news.excerpt}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Load more button - Apple-style with mobile improvements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 sm:mt-10 text-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-800 shadow-sm text-sm sm:text-base font-medium rounded-md text-gray-300 bg-gray-950 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Load more articles
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar - WSJ style */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-1"
          >
            <div className="sticky top-36">
              {/* Market summary */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-950 rounded-xl p-6 mb-8 border border-gray-800 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
                  <h3 className="text-lg font-serif font-bold text-white">Market Summary</h3>
                  <span className="text-xs text-gray-400">Last updated: {lastUpdated}</span>
                </div>
                <div className="space-y-4">
                  {marketData.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between pb-2 border-b border-gray-800/50 last:border-0 last:pb-0">
                      <div>
                        <div className="text-gray-200 font-medium">{item.name}</div>
                        <div className="text-sm text-gray-400">{item.value}</div>
                      </div>
                      <div className={`flex items-center ${item.isPositive ? 'text-green-400' : 'text-red-400'} font-medium`}>
                        {item.isPositive ? <FiTrendingUp className="mr-1.5" size={16} /> : <FiTrendingDown className="mr-1.5" size={16} />}
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-gray-800/50">
                  <Link href="#" className="text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center">
                    View all markets
                    <FiArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Opinion section - replacing What's Trending */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-950 rounded-xl p-6 mb-8 border border-gray-800 shadow-sm"
              >
                <div className="flex items-center mb-4 pb-2 border-b border-gray-800">
                  <h3 className="text-lg font-serif font-bold text-white">Opinion</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-900 text-blue-300 border border-blue-800">
                    Perspectives
                  </span>
                </div>
                <div className="space-y-5">
                  {opinionPieces.map((piece) => (
                    <div key={piece.id} className="pb-5 border-b border-gray-800/50 last:border-0 last:pb-0">
                      <Link href={piece.link} className="group">
                        <h4 className="font-serif font-bold text-gray-200 group-hover:text-blue-400 transition-colors mb-1">
                          {piece.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-1.5">
                          {piece.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="font-medium text-gray-300">
                            {piece.author}
                          </span>
                          <span className="mx-1.5">•</span>
                          <span className="text-gray-500">{piece.position}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {piece.date}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-gray-800/50">
                  <Link href="/opinions" className="text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center">
                    View all opinions
                    <FiArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Featured articles */}
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-serif font-bold text-white mb-4 pb-2 border-b border-gray-800">
                  Featured Articles
                </h3>
                {featuredArticles.map((article) => (
                  <div key={article.id} className="mb-5 pb-5 border-b border-gray-800 last:border-0 last:pb-0">
                    <Link href={`/news/${article.id}`} className="group">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-3">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-2 py-1 m-2 rounded-md">
                          {article.category}
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-gray-200 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h4>
                      {article.subtitle && (
                        <p className="text-gray-300 font-serif text-xs leading-relaxed mt-1 mb-1.5">
                          {article.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-gray-400 mt-1">{article.date}</p>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Add NewsletterSubscription at the bottom of the page */}
      <NewsletterSubscription />
    </main>
  );
} 