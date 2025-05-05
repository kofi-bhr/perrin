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
    title: "Perrin Institution Launches New Research Initiative on Sustainable Technology",
    date: "June 15, 2023",
    excerpt: "The initiative aims to bridge policy gaps and develop frameworks for responsible innovation in emerging technologies, with a focus on environmental sustainability and ethical governance.",
    image: "/news/placeholder-news.jpg",
    link: "/news/perrin-research-initiative",
    category: "Research"
  };

  // Opinion pieces data
  const opinionPieces = [
    {
      id: 1,
      title: "The False Promise of Unregulated AI Development",
      author: "Dr. Amara Singh",
      position: "Senior Policy Fellow",
      excerpt: "We need to dispel the myth that innovation thrives without guardrails...",
      date: "June 10, 2023",
      link: "/opinions/false-promise-ai"
    },
    {
      id: 2,
      title: "Why Digital Privacy Should Be Considered a Human Right",
      author: "Marcus Chen",
      position: "Technology Ethics Researcher",
      excerpt: "As our lives become increasingly digitized, we must reconsider...",
      date: "June 5, 2023",
      link: "/opinions/privacy-human-right"
    },
    {
      id: 3,
      title: "Bridging the Digital Divide: More Than Just Access",
      author: "Leila Mwangi",
      position: "Inclusive Design Advocate",
      excerpt: "Access alone doesn't solve systematic exclusion in our digital...",
      date: "May 28, 2023",
      link: "/opinions/digital-divide"
    },
    {
      id: 4,
      title: "The Case for Decentralized Technologies in Democratic Societies",
      author: "Dr. Kashaf Alvi",
      position: "Inclusive Policy Lab Director",
      excerpt: "Decentralized systems offer a pathway to more accountable...",
      date: "May 20, 2023",
      link: "/opinions/decentralized-tech"
    }
  ];

  const categories = ["All", "Research", "Events", "Publications", "Policy", "Announcements"];

  const recentNews = [
    {
      id: 1,
      title: "Dr. Alvi Presents at International Policy Conference",
      date: "May 22, 2023",
      excerpt: "Inclusive Policy Lab Director Dr. Kashaf Alvi presented groundbreaking research on inclusive policy frameworks at the Geneva Convention on Technology Ethics.",
      image: "/news/placeholder-thumb-1.jpg",
      category: "Events",
      featured: false
    },
    {
      id: 2,
      title: "Legal Lab Publishes New Working Paper Series",
      date: "May 10, 2023",
      excerpt: "The Legal Lab, under the guidance of Senior Fellow Dara Mohd, has published a new series of working papers examining regulatory frameworks for artificial intelligence deployment.",
      image: "/news/placeholder-thumb-2.jpg",
      category: "Publications",
      featured: true
    },
    {
      id: 3,
      title: "Perrin Institution Announces New Scholarship Program",
      date: "April 28, 2023",
      excerpt: "A new scholarship program aimed at supporting underrepresented students in technology policy has been announced, with applications opening next month.",
      image: "/news/placeholder-thumb-3.jpg",
      category: "Announcements",
      featured: false
    },
    {
      id: 4,
      title: "Technology Lab Hosts Industry Roundtable",
      date: "April 15, 2023",
      excerpt: "Leading technologists and policymakers gathered to discuss the future of AI governance and regulation at our quarterly industry roundtable.",
      image: "/news/placeholder-thumb-4.jpg",
      category: "Events",
      featured: false
    },
    {
      id: 5,
      title: "Policy Brief: The Future of Digital Identity",
      date: "April 8, 2023",
      excerpt: "Our latest policy brief examines the ethical implications and technological challenges of digital identity systems in an increasingly connected world.",
      image: "/news/placeholder-thumb-1.jpg",
      category: "Policy",
      featured: false
    },
    {
      id: 6,
      title: "Research Partnership with Oxford Internet Institute Announced",
      date: "March 30, 2023",
      excerpt: "The Perrin Institution has established a new research partnership with the Oxford Internet Institute to collaborate on digital governance projects.",
      image: "/news/placeholder-thumb-2.jpg",
      category: "Research",
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
              <h1 className="text-4xl font-serif font-bold text-white">News & Updates</h1>
              <p className="text-gray-400 text-sm mt-1">The latest from the Perrin Institution</p>
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

      {/* Market data ticker - WSJ style */}
      <div className="border-b border-gray-800 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="overflow-x-auto">
            <div className="flex space-x-6 py-1 min-w-max">
              {marketData.map((item, index) => (
                <div key={index} className="flex items-center space-x-1.5 group">
                  <span className="text-sm font-medium text-gray-400">{item.name}</span>
                  <span className="text-sm font-bold text-white">{item.value}</span>
                  <span className={`text-xs flex items-center ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {item.isPositive ? <FiTrendingUp className="mr-0.5" size={12} /> : <FiTrendingDown className="mr-0.5" size={12} />}
                    {item.change}
                  </span>
                </div>
              ))}
              <a 
                href="https://www.google.com/finance/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center cursor-pointer group"
              >
                <span className="text-xs text-blue-400 group-hover:text-blue-300">More Markets</span>
                <FiExternalLink className="ml-1 h-3 w-3 text-blue-400 group-hover:text-blue-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Category navigation - FAANG-inspired tabs */}
      <div className={`border-b border-gray-800 sticky top-[60px] z-30 ${isScrolled ? 'bg-black/95 shadow-xl shadow-black/50' : 'bg-black/80 backdrop-blur-sm'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide" aria-label="Categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === "All" ? null : category)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
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

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Blue accent glow */}
        <div className="absolute top-24 right-0 w-1/3 h-1/3 bg-blue-700/20 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Main column */}
          <div className="col-span-2">
            {/* Featured story - WSJ/Apple News style */}
            <div className="mb-12">
              <Link href={featuredNews.link} className="group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-6">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-3 py-1 m-3 rounded-md">
                    {featuredNews.category}
                  </div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-3xl font-serif font-bold text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors">
                      {featuredNews.title}
                    </h2>
                    <span className="flex items-center text-sm text-gray-300 mb-2">
                      <FiCalendar className="mr-2" size={14} />
                      {featuredNews.date}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                  {featuredNews.excerpt}
                </p>
                <div className="inline-flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                  Continue reading
                  <FiArrowRight className="ml-2" />
                </div>
              </Link>
            </div>

            {/* News grid - FAANG-inspired cards */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6 pb-2 border-b border-gray-800">
                Latest Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredNews.map((news) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <Link href={`/news/${news.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
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
                        <div className="absolute bottom-0 left-0 p-4">
                          <span className="flex items-center text-xs text-gray-300 mb-1">
                            <FiCalendar className="mr-1" size={12} />
                            {news.date}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {news.excerpt}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Load more button - Apple-style */}
              <div className="mt-10 text-center">
                <button className="inline-flex items-center px-6 py-3 border border-gray-700 shadow-sm text-base font-medium rounded-md text-gray-300 bg-gray-900/50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
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