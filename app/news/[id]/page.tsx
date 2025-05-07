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
            // Format content with clean typography styles
            const enhancedContent = fetchedArticle.content
              .replace(/<p>/g, '<p class="mb-6 text-gray-200 leading-relaxed text-base font-normal">')
              .replace(/<h2>/g, '<h2 class="text-2xl font-medium text-white mt-10 mb-4">')
              .replace(/<h3>/g, '<h3 class="text-xl font-medium text-white mt-8 mb-4">')
              .replace(/<blockquote>/g, '<blockquote class="border-l-2 border-gray-500 pl-4 my-6 text-gray-300 text-base italic">')
              .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 mb-6 text-gray-200">');
              
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-t border-r border-white border-l-transparent border-b-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-400 text-sm">Loading</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-medium mb-4">Article Not Found</h1>
        <p className="mb-8 text-gray-400 max-w-md text-center">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/news" 
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Return to News
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-24">
      {/* Professional background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-black/95 to-black animate-gradient-shift"></div>
        
        {/* Refined grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] animate-grid-shift"></div>
        
        {/* Subtle diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[size:64px_64px]"></div>
        
        {/* Professional accent elements */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-[120px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-purple-500/5 rounded-full filter blur-[140px] animate-float-delayed"></div>
        
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
        
        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Main content with enhanced professional styling */}
      <div className="relative">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Article content with refined animations */}
          <motion.article 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative"
          >
            {/* Article title with professional typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300"
            >
              {article.title}
            </motion.h1>
            
            {/* Article metadata with refined styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <div className="flex items-center bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/5">
                <FiCalendar className="mr-2.5 text-gray-400" size={14} />
                <span className="text-gray-300 font-medium">{article.date}</span>
              </div>
              
              {article.authorName && (
                <div className="flex items-center bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/5">
                  <FiUser className="mr-2.5 text-gray-400" size={14} />
                  <span className="text-gray-300 font-medium">{article.authorName}</span>
                </div>
              )}
              
              <div className="flex items-center bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/5">
                <FiClock className="mr-2.5 text-gray-400" size={14} />
                <span className="text-gray-300 font-medium">5 min read</span>
              </div>
            </motion.div>
            
            {/* Lead paragraph with sophisticated styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-16"
            >
              <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 rounded-full animate-pulse-slow"></div>
              <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed pl-6 font-light">
                {article.excerpt}
              </p>
            </motion.div>
            
            {/* Article content with enhanced typography */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-headings:font-medium prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg"
            >
              <div 
                dangerouslySetInnerHTML={{ __html: processedContent }} 
                className="relative z-10"
              />
            </motion.div>
            
            {/* Back button with refined styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 pt-8 border-t border-gray-800/50"
            >
              <Link 
                href="/news"
                className="inline-flex items-center px-8 py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/5 border border-white/5 hover:border-white/10"
              >
                <FiArrowLeft className="mr-3 transition-transform group-hover:-translate-x-1" size={16} />
                <span className="text-sm font-medium">Back to Articles</span>
              </Link>
            </motion.div>
          </motion.article>
          
          {/* Related articles with enhanced styling */}
          {relatedArticles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10">
                More Articles
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
                      className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-white/5 border border-white/5 hover:border-white/10"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-8">
                        <h4 className="font-bold text-white group-hover:text-gray-300 transition-colors mb-3 text-lg">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-400 font-medium">{relatedArticle.date}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced custom animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes grid-shift {
          0% { transform: translateY(0); }
          100% { transform: translateY(32px); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-40px) scale(1.05); opacity: 0.7; }
          100% { transform: translateY(0) scale(1); opacity: 0.5; }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 25s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-grid-shift {
          animation: grid-shift 40s linear infinite;
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 12s ease-in-out infinite;
          animation-delay: -6s;
        }
        
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
} 