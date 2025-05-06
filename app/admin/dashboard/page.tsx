"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addArticle } from "../../../lib/articles";
import dynamic from "next/dynamic";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Define categories matching the news page
const ARTICLE_CATEGORIES = [
  "Climate Action", 
  "Foreign Policy", 
  "AI", 
  "Startups", 
  "Technology"
];

// Quill editor formats
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'color', 'background',
  'align', 'code-block', 'formula'
];

// Quill modules/toolbar options
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};

export default function AdminDashboard() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleCategory, setArticleCategory] = useState(ARTICLE_CATEGORIES[0]);
  const [articleType, setArticleType] = useState("news"); // "news" or "opinion"
  const [authorName, setAuthorName] = useState("");
  const [authorPosition, setAuthorPosition] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter();

  // Load editor after component mounts to avoid SSR issues
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // Check authentication with sessionStorage
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("perrinAdminAuth") === "true";
    if (!isAuthenticated) {
      router.push("/admin");
    }
  }, [router]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file");
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Use the uploaded file path
        setUploadedImage(data.url);
        setImageUrl(data.url);
        setError("");
      } else {
        setError(data.message || "Error uploading file");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!articleTitle.trim() || !articleContent.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (articleType === "opinion" && (!authorName.trim() || !authorPosition.trim())) {
      setError("Please provide author information for opinion articles");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Create plain text excerpt from content (first ~150 characters)
      // Remove HTML tags for the excerpt
      const plainText = articleContent.replace(/<[^>]*>/g, '');
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      
      // Format the date in a readable format
      const currentDate = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(currentDate);
      
      // Determine which image URL to use
      const finalImageUrl = uploadedImage || imageUrl || "/news/placeholder-thumb-1.jpg";
      
      // Create article data
      const articleData = {
        title: articleTitle,
        content: articleContent,
        category: articleCategory,
        type: articleType as 'news' | 'opinion',
        authorName: authorName.trim() || undefined,
        authorPosition: authorPosition.trim() || undefined,
        excerpt,
        date: formattedDate,
        image: finalImageUrl,
        featured: false
      };
      
      // Add the article using our API-based function
      const result = await addArticle(articleData);
      
      if (!result) {
        throw new Error("Failed to publish article");
      }
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form after some time
      setTimeout(() => {
        setArticleTitle("");
        setArticleContent("");
        setArticleCategory(ARTICLE_CATEGORIES[0]);
        setArticleType("news");
        setAuthorName("");
        setAuthorPosition("");
        setImageUrl("");
        setUploadedImage(null);
        setIsSuccess(false);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);
      
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", zIndex: 9999, overflow: "auto" }}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with Navigation */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
            <div className="flex items-center">
              <Image 
                src="/moretechperrin-removebg-preview.png" 
                alt="Perrin Institution Logo" 
                width={140} 
                height={50}
                className="h-10 w-auto mr-4"
              />
              <h1 className="text-xl font-bold text-white hidden sm:block">Employee Portal</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center text-gray-400 text-sm">
                <span className="mr-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Staff Access</span>
              </div>
              
              <button
                onClick={() => {
                  sessionStorage.removeItem("perrinAdminAuth");
                  router.push("/admin");
                }}
                className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md flex items-center transition-colors"
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Page Navigation Tabs */}
          <div className="flex border-b border-gray-800 mb-6">
            <div className="px-4 py-2 border-b-2 border-blue-500 text-blue-400 font-medium">
              Create Article
            </div>
            <div className="px-4 py-2 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
              View Articles
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl font-medium text-white mb-6 border-b border-gray-800 pb-3">Create New Article</h2>
            
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-300 rounded-md flex items-center">
                <div className="mr-2 flex-shrink-0 h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Article successfully published! It will now appear on the news page.</p>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-300 rounded-md flex items-center">
                <div className="mr-2 flex-shrink-0 h-6 w-6 rounded-full bg-red-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Article Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Article Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                      articleType === "news"
                        ? "bg-blue-900/20 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                        : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600"
                    }`}
                    onClick={() => setArticleType("news")}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 transition-colors ${articleType === "news" ? "bg-blue-500" : "bg-gray-600"}`}></div>
                      <span>News Article</span>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                      articleType === "opinion"
                        ? "bg-blue-900/20 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                        : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600"
                    }`}
                    onClick={() => setArticleType("opinion")}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 transition-colors ${articleType === "opinion" ? "bg-blue-500" : "bg-gray-600"}`}></div>
                      <span>Opinion Piece</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Article Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter article title"
                  required
                />
              </div>
              
              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={articleCategory}
                  onChange={(e) => setArticleCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                >
                  {ARTICLE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Author Info (for all article types) */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author Name {articleType === "opinion" && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Dr. Jane Smith"
                    required={articleType === "opinion"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author Position {articleType === "opinion" && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={authorPosition}
                    onChange={(e) => setAuthorPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="AI Ethics Researcher"
                    required={articleType === "opinion"}
                  />
                </div>
              </div>
              
              {/* Image Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Article Image
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Option 1: Upload an image */}
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <h3 className="font-medium text-white mb-2">Upload an Image</h3>
                    <div className="relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:transition-colors file:cursor-pointer"
                        disabled={isUploading}
                      />
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/70 rounded">
                          <div className="flex items-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-blue-400">Uploading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {uploadedImage && (
                      <div className="mt-3">
                        <p className="text-green-400 text-sm mb-2 flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Image uploaded successfully
                        </p>
                        <div className="relative h-24 w-40 rounded overflow-hidden">
                          <Image
                            src={uploadedImage}
                            alt="Uploaded preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Option 2: Use an external URL */}
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <h3 className="font-medium text-white mb-2">Or use an external URL</h3>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="https://example.com/image.jpg"
                      disabled={!!uploadedImage}
                    />
                    <p className="mt-2 text-xs text-gray-400">
                      {uploadedImage ? "Clear uploaded image to use URL instead" : "Or leave empty to use default image"}
                    </p>
                    
                    {!uploadedImage && imageUrl && (
                      <div className="mt-3">
                        <div className="relative h-24 w-40 rounded overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt="URL preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Clear image button */}
                {(uploadedImage || imageUrl) && (
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedImage(null);
                      setImageUrl("");
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear image selection
                  </button>
                )}
              </div>
              
              {/* Article Content */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Article Content <span className="text-red-500">*</span>
                </label>
                
                {editorLoaded ? (
                  <div>
                    <div className="bg-white rounded-md overflow-hidden mb-2">
                      <ReactQuill
                        theme="snow"
                        value={articleContent}
                        onChange={setArticleContent}
                        modules={modules}
                        formats={formats}
                        className="h-80 bg-white text-black" 
                        placeholder="Write your article content here..."
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      Use the formatting toolbar to style your content. You can add headings, lists, links, images, and more.
                    </p>
                  </div>
                ) : (
                  <textarea
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Write your article content here..."
                    required
                  />
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-md text-white font-medium transition-colors ${
                  isSubmitting 
                    ? "bg-blue-700/50 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  "Publish Article"
                )}
              </button>
            </form>
          </div>
          
          {/* Footer */}
          <div className="mt-6 text-center text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} Perrin Institution. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 