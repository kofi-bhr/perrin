"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleById, Article } from "../../../lib/articles";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";

// Define a style object to override any inline styles from the rich text editor
const richTextStyle = {
  color: 'white',
  '& p, & h1, & h2, & h3, & h4, & h5, & h6, & ul, & li, & a, & blockquote, & span': {
    color: 'white !important'
  }
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      if (params.id) {
        const fetchedArticle = await getArticleById(params.id as string);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          
          // Process the content to ensure white text
          if (fetchedArticle.content) {
            // Wrap content in a div with white text color
            setProcessedContent(`<div style="color: white;">${fetchedArticle.content}</div>`);
          }
        }
        setLoading(false);
      }
    }
    
    fetchArticle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex justify-center items-center">
        <div className="text-white">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/news" className="inline-flex items-center text-blue-400 hover:text-blue-300">
              <FiArrowLeft className="mr-2" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/news" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
          <FiArrowLeft className="mr-2" />
          Back to News
        </Link>

        <article>
          <div className="mb-6">
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center text-gray-400 mb-8">
            <div className="flex items-center mr-6">
              <FiCalendar className="mr-2" size={16} />
              <span>{article.date}</span>
            </div>
            
            {article.authorName && (
              <div className="flex items-center">
                <FiUser className="mr-2" size={16} />
                <span>{article.authorName}{article.authorPosition ? `, ${article.authorPosition}` : ''}</span>
              </div>
            )}
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none article-content">
            <div 
              dangerouslySetInnerHTML={{ __html: processedContent }} 
            />
          </div>
        </article>
      </div>
    </main>
  );
} 