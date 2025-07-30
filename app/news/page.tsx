'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { getArticles, Article } from "../../lib/articles";
import NewsletterSubscription from "@/components/NewsletterSubscription";

// Minimal animations for performance
const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05
    }
  }
};

const categories = [
  { name: "All", slug: "all" },
  { name: "Politics", slug: "International Affairs" },
  { name: "Technology", slug: "AI" },
  { name: "Economics", slug: "Economics" },
  { name: "Climate", slug: "Climate" },
  { name: "Health", slug: "Health" },
  { name: "Intelligence", slug: "Intelligence" },
  { name: "Opinion", slug: "opinion" },
];

export default function News() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [recentNews, setRecentNews] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    async function fetchArticles() {
      const articles = await getArticles();
      setRecentNews(articles);
      setFilteredArticles(articles);
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = recentNews;
    
    if (activeCategory !== "All") {
      const categorySlug = categories.find(cat => cat.name === activeCategory)?.slug;
      if (categorySlug && categorySlug !== "all") {
        filtered = filtered.filter(article => {
          if (Array.isArray(article.category)) {
            return article.category.includes(categorySlug);
          }
          return article.category === categorySlug || (categorySlug === "opinion" && article.type === "opinion");
        });
      }
    }
    
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredArticles(filtered);
  }, [activeCategory, searchTerm, recentNews]);

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const mainFeatured = featuredArticles.length > 0 ? featuredArticles[0] : filteredArticles[0];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Pure newspaper masthead */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="text-center border-b border-gray-300 pb-3 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-8 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
              <FiSearch className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <h1 className="text-5xl font-serif text-black mb-1 font-bold">
            Perrin Research Institution
          </h1>
          <div className="text-sm text-gray-600 uppercase tracking-widest">
            Policy Research • Strategic Analysis • Intelligence
          </div>
        </div>

        {/* Newspaper navigation */}
        <nav className="border-b border-gray-200 mb-4">
          <div className="flex items-center justify-center space-x-8 pb-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`text-sm font-medium py-1 px-3 transition-colors ${
                  activeCategory === category.name
                    ? "text-black border-b-2 border-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>

        {/* WSJ/NYT style content grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-1">
              {/* Main content area */}
              <div className="col-span-12 lg:col-span-8 pr-2">
                {/* Lead story - more compact */}
                {mainFeatured && (
                  <motion.div variants={fadeIn} className="mb-4 pb-4 border-b border-gray-200">
                    <Link href={`/news/${mainFeatured.id}`} className="group">
                      <article>
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-6">
                            <div className="aspect-[4/3] overflow-hidden mb-2">
                              <Image
                                src={mainFeatured.image}
                                alt={mainFeatured.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                                {Array.isArray(mainFeatured.category) ? mainFeatured.category[0] : mainFeatured.category}
                              </div>
                              <h2 className="text-2xl font-serif text-black leading-tight font-bold group-hover:text-gray-700 transition-colors line-clamp-3">
                                {mainFeatured.title}
                              </h2>
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                                {mainFeatured.excerpt}
                              </p>
                              <div className="text-xs text-gray-500 pt-1">
                                By <span className="font-medium">{mainFeatured.authorName || "Perrin Institute"}</span> | {mainFeatured.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                )}

                {/* Secondary stories grid - more stories visible */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {filteredArticles.slice(1, 10).map((article, index) => (
                    <motion.div key={article.id} variants={fadeIn}>
                      <Link href={`/news/${article.id}`} className="group">
                        <article className={`pb-3 ${index < 6 ? 'border-b border-gray-100' : ''}`}>
                          <div className="aspect-[4/3] overflow-hidden mb-1">
                            <Image
                              src={article.image}
                              alt={article.title}
                              width={200}
                              height={150}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                              {Array.isArray(article.category) ? article.category[0] : article.category}
                            </div>
                            <h3 className="text-sm font-serif text-black leading-tight font-semibold group-hover:text-gray-700 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <div className="text-xs text-gray-500">
                              {article.authorName || "Perrin Institute"} | {article.date}
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right sidebar - newspaper style */}
              <div className="col-span-12 lg:col-span-4 border-l border-gray-300 pl-2">
                {/* What's News */}
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-black mb-2 pb-1 border-b border-gray-300">
                    What's News
                  </h3>
                  <div className="space-y-2">
                    {filteredArticles.slice(10, 15).map((article, index) => (
                      <motion.div key={article.id} variants={fadeIn}>
                        <Link href={`/news/${article.id}`} className="group">
                          <article className="flex space-x-2 pb-2 border-b border-gray-100">
                            <div className="flex-shrink-0 w-5 h-5 bg-black text-white rounded-sm flex items-center justify-center">
                              <span className="text-xs font-bold">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-serif text-black group-hover:text-gray-700 transition-colors leading-tight line-clamp-3 mb-1 font-medium">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500">
                                {article.date}
                              </div>
                            </div>
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Opinion */}
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-black mb-2 pb-1 border-b border-gray-300">
                    Opinion
                  </h3>
                  <div className="space-y-2">
                    {filteredArticles.filter(a => a.type === 'opinion').slice(0, 4).map((article) => (
                      <motion.div key={article.id} variants={fadeIn}>
                        <Link href={`/news/${article.id}`} className="group">
                          <article className="pb-2 border-b border-gray-100">
                            <h4 className="text-sm font-serif text-black group-hover:text-gray-700 transition-colors leading-tight line-clamp-3 mb-1 font-medium">
                              {article.title}
                            </h4>
                            <div className="text-xs text-gray-500">
                              By {article.authorName || "Perrin Institute"}
                            </div>
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* More Headlines */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-black mb-2 pb-1 border-b border-gray-300">
                    More Headlines
                  </h3>
                  <div className="space-y-1">
                    {filteredArticles.slice(15, 25).map((article) => (
                      <motion.div key={article.id} variants={fadeIn}>
                        <Link href={`/news/${article.id}`} className="group">
                          <article className="pb-1 border-b border-gray-50">
                            <h4 className="text-xs font-serif text-black group-hover:text-gray-700 transition-colors leading-tight line-clamp-2 mb-1">
                              {article.title}
                            </h4>
                            <div className="text-xs text-gray-500">
                              {article.date}
                            </div>
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom section - more stories */}
          {filteredArticles.length > 20 && (
            <div className="mt-6 pt-4 border-t-2 border-gray-300">
              <h2 className="text-2xl font-serif font-bold text-black mb-3">More Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {filteredArticles.slice(20).map((article) => (
                  <motion.div key={article.id} variants={fadeIn}>
                    <Link href={`/news/${article.id}`} className="group">
                      <article className="space-y-1">
                        <div className="aspect-[4/3] overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            width={200}
                            height={150}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                            {Array.isArray(article.category) ? article.category[0] : article.category}
                          </div>
                          <h3 className="text-sm font-serif text-black leading-tight group-hover:text-gray-700 transition-colors line-clamp-2 font-medium">
                            {article.title}
                          </h3>
                          <div className="text-xs text-gray-500">
                            {article.date}
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Simple newsletter footer */}
      <div className="border-t-2 border-gray-300 bg-gray-50 mt-8">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h2 className="text-xl font-serif font-bold text-black mb-2">
            Stay Informed
          </h2>
          <p className="text-gray-600 mb-4">
            Get our latest policy analysis delivered to your inbox.
          </p>
          <div className="max-w-sm mx-auto">
            <NewsletterSubscription />
          </div>
        </div>
      </div>
    </div>
  );
} 