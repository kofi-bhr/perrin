'use client'
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight, FiExternalLink, FiClock, FiCalendar, FiBookmark, FiSearch, FiTrendingUp, FiTrendingDown, FiMail } from "react-icons/fi";

const dmSans = DM_Sans({ subsets: ["latin"] });

// Define market data type for better type safety
interface MarketDataItem {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

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
      const parentElement = newsletterElement.closest('.bg-black.py-12') || newsletterElement;
      parentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Placeholder news data
  const featuredNews = {
    title: "EU Announces Major Climate Legislation Targeting Carbon-Neutral Economy by 2050",
    date: "June 15, 2023",
    excerpt: "The landmark legislation introduces binding emission targets, carbon pricing reforms, and significant investments in green technology to position Europe as a global climate leader.",
    image: "/news/placeholder-news.jpg",
    link: "/news/eu-climate-legislation",
    category: "Climate Action"
  };

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

  const categories = ["All", "Climate Action", "Foreign Policy", "AI", "Startups", "Technology"];

  const recentNews = [
    {
      id: 1,
      title: "India-US Tech Partnership Summit Focuses on AI Collaboration",
      date: "May 22, 2023",
      excerpt: "Leaders from both nations converged in New Delhi to discuss AI development standards, joint research initiatives, and market access for emerging technologies.",
      image: "/news/placeholder-thumb-1.jpg",
      category: "Foreign Policy",
      featured: false
    },
    {
      id: 2,
      title: "Breakthrough Carbon Capture Technology Shows 40% Efficiency Increase",
      date: "May 10, 2023",
      excerpt: "A new direct air capture method developed by researchers at MIT demonstrates significantly improved efficiency at lower costs, potentially accelerating climate mitigation efforts.",
      image: "/news/placeholder-thumb-2.jpg",
      category: "Climate Action",
      featured: true
    },
    {
      id: 3,
      title: "Y Combinator's Latest Batch Shows Surge in AI Startups",
      date: "April 28, 2023",
      excerpt: "Nearly 40% of startups in Y Combinator's latest cohort are leveraging artificial intelligence, with focus areas including healthcare diagnostics, legal tech, and content generation.",
      image: "/news/placeholder-thumb-3.jpg",
      category: "Startups",
      featured: false
    },
    {
      id: 4,
      title: "UN Climate Panel Warns Critical Tipping Points May Be Reached By 2030",
      date: "April 15, 2023",
      excerpt: "The latest IPCC report highlights accelerating climate impacts and emphasizes the need for immediate action to prevent irreversible damage to global ecosystems.",
      image: "/news/placeholder-thumb-4.jpg",
      category: "Climate Action",
      featured: false
    },
    {
      id: 5,
      title: "OpenAI Releases Research on AI Alignment Challenges",
      date: "April 8, 2023",
      excerpt: "The research outlines key technical and governance challenges in ensuring advanced AI systems remain aligned with human values and beneficial goals.",
      image: "/news/placeholder-thumb-1.jpg",
      category: "AI",
      featured: false
    },
    {
      id: 6,
      title: "African Tech Ecosystem Sees Record $4.8B Investment",
      date: "March 30, 2023",
      excerpt: "Venture capital flowing into African startups reached an all-time high, with fintech, cleantech, and logistics attracting significant international investment.",
      image: "/news/placeholder-thumb-2.jpg",
      category: "Startups",
      featured: true
    }
  ];

  const filteredNews = activeCategory && activeCategory !== "All" 
    ? recentNews.filter(news => news.category === activeCategory)
    : recentNews;

  // Featured articles (excluding the main featured news)
  const featuredArticles = recentNews.filter(news => news.featured);
  
  return (
    <main className="min-h-screen bg-black pt-24">
      {/* Header section - WSJ-inspired masthead */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold text-white">Global News</h1>
              <p className="text-gray-400 text-sm mt-1">Analysis and reporting on global policy and technology trends</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-200 placeholder-gray-500"
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
            </div>
          </div>
        </div>
      </div>

      {/* Market data ticker - WSJ style, with mobile improvements */}
      <div className="border-b border-gray-800 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <div className="overflow-x-auto -mx-3 px-3 custom-stocks-scrollbar">
            <div className="flex space-x-4 sm:space-x-6 py-1 min-w-max">
              {marketData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-1.5 group bg-gray-800/20 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 border border-gray-700/20"
                >
                  <span className="text-xs sm:text-sm font-medium text-gray-400 truncate" style={{ maxWidth: '80px' }}>{item.name}</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{item.value}</span>
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
                className="flex items-center cursor-pointer group bg-blue-900/20 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 border border-blue-700/20"
              >
                <span className="text-xs text-blue-400 group-hover:text-blue-300">More</span>
                <FiExternalLink className="ml-1 h-3 w-3 text-blue-400 group-hover:text-blue-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        /* FAANG-inspired scrollbar styles */
        .custom-stocks-scrollbar::-webkit-scrollbar {
          height: 4px;
          background: transparent;
        }
        
        .custom-stocks-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.1);
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

      {/* Category navigation - FAANG-inspired tabs without sticky behavior */}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === "All" ? null : category)}
                className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm ${
                  (category === "All" && activeCategory === null) || category === activeCategory
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700"
                } transition-colors duration-200`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content - improved for mobile */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Blue accent glow */}
        <div className="absolute top-24 right-0 w-1/3 h-1/3 bg-blue-700/20 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {/* Main column */}
          <div className="col-span-2">
            {/* Featured story - WSJ/Apple News style with mobile improvements */}
            <div className="mb-8 sm:mb-12">
              <Link href={featuredNews.link} className="group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-4 sm:mb-6">
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
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-lg line-clamp-3 sm:line-clamp-none">
                  {featuredNews.excerpt}
                </p>
                <div className="inline-flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors text-sm sm:text-base">
                  Continue reading
                  <FiArrowRight className="ml-2" />
                </div>
              </Link>
            </div>

            {/* News grid - FAANG-inspired cards with mobile improvements */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 sm:mb-6 pb-2 border-b border-gray-800">
                Latest Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {filteredNews.map((news) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <Link href={`/news/${news.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3 sm:mb-4">
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
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                        {news.excerpt}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Load more button - Apple-style with mobile improvements */}
              <div className="mt-8 sm:mt-10 text-center">
                <button className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-700 shadow-sm text-sm sm:text-base font-medium rounded-md text-gray-300 bg-gray-900/50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Load more articles
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - WSJ style */}
          <div className="col-span-1">
            <div className="sticky top-36">
              {/* Market summary */}
              <div className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
                  <h3 className="text-lg font-serif font-bold text-white">Market Summary</h3>
                  <span className="text-xs text-gray-400">Last updated: {lastUpdated}</span>
                </div>
                <div className="space-y-4">
                  {marketData.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between pb-2 border-b border-gray-800/50 last:border-0 last:pb-0">
                      <div>
                        <div className="text-gray-300 font-medium">{item.name}</div>
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
              </div>

              {/* Opinion section - replacing What's Trending */}
              <div className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800">
                <div className="flex items-center mb-4 pb-2 border-b border-gray-800">
                  <h3 className="text-lg font-serif font-bold text-white">Opinion</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-900/50 text-blue-300 border border-blue-800/50">
                    Perspectives
                  </span>
                </div>
                <div className="space-y-5">
                  {opinionPieces.map((piece) => (
                    <div key={piece.id} className="pb-5 border-b border-gray-800/50 last:border-0 last:pb-0">
                      <Link href={piece.link} className="group">
                        <h4 className="font-serif font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                          {piece.title}
                        </h4>
                        <p className="text-gray-300 text-sm mb-1.5">
                          {piece.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-400">
                          <span className="font-medium text-gray-300">
                            {piece.author}
                          </span>
                          <span className="mx-1.5">•</span>
                          <span>{piece.position}</span>
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
              </div>

              {/* Featured articles */}
              <div className="mb-8">
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
                      <h4 className="font-serif font-bold text-white group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">{article.date}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 