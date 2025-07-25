"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getArticleById, Article, getArticles } from "../../../lib/articles";
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2 } from "react-icons/fi";

// Animation variants - simplified for cleaner transitions
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState("");
  const [email, setEmail] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Subtle header effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        const [fetchedArticle, allArticles] = await Promise.all([
          getArticleById(params.id as string),
          getArticles()
        ]);

        if (fetchedArticle) {
          setArticle(fetchedArticle);
          if (fetchedArticle.content) {
            // Format content with enhanced typography styles
            // Only include transformations for standard Quill formats
            const enhancedContent = fetchedArticle.content
              .replace(/<p>/g, '<p class="mb-6 text-gray-800 leading-relaxed text-base font-normal">')
              .replace(/<h2>/g, '<h2 class="text-2xl font-medium text-gray-900 mt-10 mb-4">')
              .replace(/<h3>/g, '<h3 class="text-xl font-medium text-gray-900 mt-8 mb-4">')
              .replace(/<blockquote>/g, '<blockquote class="border-l-2 border-blue-300 pl-4 my-6 text-gray-700 text-base italic">')
              .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 mb-6 text-gray-800">')
              .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 mb-6 text-gray-800">')
              .replace(/<li>/g, '<li class="mb-1 text-gray-800">')
              .replace(/<strong>/g, '<strong class="font-semibold text-gray-900">')
              .replace(/<em>/g, '<em class="italic text-gray-700">')
              .replace(/<a /g, '<a class="text-blue-600 hover:text-blue-800 underline" ')
              .replace(/<img /g, '<img class="my-6 rounded-md shadow-md max-w-full h-auto" ');
              
            setProcessedContent(enhancedContent);
          }
          
          // Get related articles (excluding current article)
          const related = allArticles
            .filter(a => a.id !== fetchedArticle.id)
            .slice(0, 2); // Get two related articles
            
          setRelatedArticles(related);
        }
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-t border-r border-blue-500 border-l-transparent border-b-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700 text-sm">Loading</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
        <h1 className="text-2xl font-medium mb-4">Article Not Found</h1>
        <p className="mb-8 text-gray-700 max-w-md text-center">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/news" 
          className="flex items-center text-gray-800 hover:text-blue-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Return to News
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 pt-24">
      {/* Sophisticated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Simplified background with less opacity */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Very subtle paper texture */}
        <div className="absolute inset-0 opacity-[0.01] mix-blend-multiply bg-[url('/subtle-paper-texture.png')] bg-repeat"></div>
        
        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        {/* Very subtle accent elements */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-100/10 rounded-full filter blur-[140px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-purple-100/10 rounded-full filter blur-[160px]"></div>
      </div>

      {/* Main content with elegant professional styling */}
      <div className="relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-10">
          {/* Article content with refined animations */}
          <motion.article 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative"
          >
            {/* WSJ-style category and section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center mb-6 border-b border-gray-200 pb-3"
            >
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const categories = Array.isArray(article.category) 
                    ? article.category 
                    : [article.category];
                  return categories.map((cat, index) => (
                    <Link 
                      key={index}
                      href="/news" 
                      className="text-blue-600 hover:text-blue-800 uppercase text-sm font-medium"
                    >
                      {cat}
                    </Link>
                  ));
                })()}
              </div>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600 uppercase text-sm font-medium">
                {article.type === 'opinion' ? 'OPINION' : 'ANALYSIS'}
              </span>
            </motion.div>
            
            {/* Article title with elegant typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4"
            >
              {article.title}
            </motion.h1>
            
            {/* WSJ-style subtitle */}
            {article.subtitle && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-xl sm:text-2xl text-gray-700 font-serif mb-8 leading-relaxed"
              >
                {article.subtitle}
              </motion.h2>
            )}
            
            {/* Author and date info in WSJ style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <div className="flex items-center text-gray-700">
                <span className="text-sm font-medium mr-1">By</span>
                <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  {article.authorName || "Perrin Institute Staff"}
                </span>
              </div>
              
              <div className="text-gray-500 text-sm">
                Updated {article.date}
              </div>
              
              <div className="flex items-center text-gray-500 text-sm">
                <FiClock className="mr-1.5" size={14} />
                <span>5 min read</span>
              </div>
            </motion.div>

            {/* WSJ-style main article image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-sm overflow-hidden shadow-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 flex justify-between">
                <span>{article.imageSource || "Photo: The Perrin Institution"}</span>
                <span className="text-xs text-gray-400 italic">{article.date}</span>
              </div>
            </motion.div>
            
            {/* WSJ-style social sharing row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center mb-8 border-b border-gray-200 pb-4"
            >
              <span className="text-sm font-medium text-gray-700 mr-4">Share</span>
              <div className="flex space-x-3">
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a 
                  href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`Check out this article: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
                      alert('Link copied to clipboard!');
                    }
                  }}
                >
                  <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
            
            {/* Article content with elegant typography */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mb-12"
            >
              {/* WSJ style article content */}
              <div 
                dangerouslySetInnerHTML={{ __html: processedContent }} 
                className="prose max-w-none prose-headings:text-gray-900 prose-a:text-blue-700 prose-strong:text-gray-900 prose-headings:font-serif prose-p:leading-relaxed prose-p:text-base prose-p:text-gray-800 sm:prose-p:text-lg relative z-10 prose-p:mb-6 prose-img:rounded-md prose-img:my-8 prose-li:text-gray-800 prose-li:mb-2 prose-ol:mb-6 prose-ol:list-decimal prose-ol:list-inside prose-ul:mb-6 prose-ul:list-disc prose-ul:list-inside"
              />
            </motion.div>
            
            {/* Newsletter subscription - WSJ style (smaller and more subtle) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="my-12 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="p-6 relative bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-1">Stay informed</h4>
                    <p className="text-gray-600 text-sm mb-0">
                      Get the latest policy insights delivered to your inbox
                    </p>
                  </div>
                  
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                    <input 
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-3 py-2 rounded border border-gray-300 text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                      onClick={() => {
                        if (email.trim() && email.includes('@')) {
                          alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
                          setEmail("");
                        } else {
                          alert("Please enter a valid email address.");
                        }
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Back button with elegant styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 pt-8 border-t border-gray-200"
            >
              <Link 
                href="/news"
                className="inline-flex items-center px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-900 rounded-lg transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-gray-300 group"
              >
                <FiArrowLeft className="mr-3 transition-transform group-hover:-translate-x-1" size={16} />
                <span className="text-sm font-medium">Back to Articles</span>
              </Link>
            </motion.div>
          </motion.article>
          
          {/* Related articles with elegant styling */}
          {relatedArticles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 relative inline-block">
                More Articles
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link 
                      href={`/news/${relatedArticle.id}`} 
                      className="group relative overflow-hidden rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-gray-300 block"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-gray-100/50 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-8">
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-3 text-lg">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-700 font-medium">{relatedArticle.date}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced custom typography */}
      <style jsx global>{`
        /* Typography enhancements for better readability */
        .prose h2 {
          font-size: 1.75rem;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
          position: relative;
          padding-bottom: 0.75rem;
          color: #1a202c;
        }
        
        .prose h2:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 2px;
          background: linear-gradient(to right, rgba(37, 99, 235, 0.5), transparent);
          border-radius: 2px;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          font-weight: 300;
          line-height: 1.8;
          color: #1f2937;
        }
        
        .prose strong {
          color: #111827;
          font-weight: 600;
        }
        
        .prose em {
          font-style: italic;
          color: #4b5563;
        }
        
        .prose a {
          text-decoration: none;
          position: relative;
          font-weight: 500;
          transition: all 0.2s ease;
          color: #1d4ed8;
        }
        
        .prose a:hover {
          color: #1e40af;
        }
        
        .prose a:after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(37, 99, 235, 0.4);
          transition: all 0.2s ease;
        }
        
        .prose a:hover:after {
          background: rgba(37, 99, 235, 0.8);
        }
        
        .prose blockquote {
          border-left-color: rgba(37, 99, 235, 0.5);
          background: rgba(237, 242, 247, 0.5);
          border-radius: 0.25rem;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #374151;
        }
        
        .prose blockquote p {
          margin-bottom: 0;
        }
        
        .prose ul {
          margin-bottom: 1.5rem;
          color: #1f2937;
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        
        .prose ol {
          margin-bottom: 1.5rem;
          color: #1f2937;
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose li::marker {
          color: #6b7280;
        }
        
        .prose img {
          border-radius: 0.375rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .prose h3 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1a202c;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
} 