"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticles, updateArticle, deleteArticle, Article } from "../../../../lib/articles";
import dynamic from "next/dynamic";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

// Define the formats that Quill will recognize and maintain
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'color', 'background',
  'align', 'code-block'
];

// Define categories matching the news page
const ARTICLE_CATEGORIES = [
  "International Affairs",
  "Economics", 
  "Climate",
  "AI",
  "Domestic Affairs",
  "Technology",
  "Education",
  "Legal",
  "Commerce",
  "Health"
];

export default function ArticlesManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{articleId: string, articleTitle: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [quillContent, setQuillContent] = useState("");
  
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

  // Load articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Sync quill content when selectedArticle changes
  useEffect(() => {
    if (selectedArticle && isEditing) {
      console.log("Setting quill content:", selectedArticle.content); // Debug log
      setQuillContent(selectedArticle.content || "");
    }
  }, [selectedArticle, isEditing]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

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
        if (selectedArticle) {
          setSelectedArticle({
            ...selectedArticle,
            image: data.url
          });
        }
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

  const handleEditArticle = async (article: Article) => {
    console.log("Editing article:", article); // Debug log
    console.log("Article content before fetch:", article.content); // Debug log
    
    try {
      // Fetch the complete article with content from the API
      const response = await fetch(`/api/articles/${article.id}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      
      const fullArticle = await response.json();
      console.log("Full article with content:", fullArticle); // Debug log
      console.log("Full article content:", fullArticle.content); // Debug log
      
      setSelectedArticle(fullArticle);
      setIsEditing(true);
      setError("");
      setIsSuccess(false);
      setSuccessMessage("");
      setUploadedImage(null); // Reset uploaded image state
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Error fetching article details:", err);
      setError("Failed to load article for editing");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedArticle(null);
    setQuillContent("");
    setUploadedImage(null);
  };

  const handleSaveArticle = async () => {
    if (!selectedArticle) return;
    
    // Validate form
    const selectedCategories = Array.isArray(selectedArticle.category) 
      ? selectedArticle.category 
      : [selectedArticle.category];
    
    if (!selectedArticle.title?.trim() || !selectedArticle.content?.trim() || selectedCategories.length === 0) {
      setError("Please fill in all required fields and select at least one category");
      return;
    }
    
    if (selectedArticle.type === "opinion" && (!selectedArticle.authorName?.trim() || !selectedArticle.authorPosition?.trim())) {
      setError("Please provide author information for opinion articles");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      // Create plain text excerpt from content (first ~150 characters)
      // Remove HTML tags for the excerpt
      const plainText = selectedArticle.content.replace(/<[^>]*>/g, '');
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      
      // Determine which image URL to use
      const finalImageUrl = uploadedImage || selectedArticle.image;
      
      // Create article data
      const articleData = {
        ...selectedArticle,
        excerpt,
        image: finalImageUrl
      };
      
      // Update the article using our API-based function
      const result = await updateArticle(selectedArticle.id, articleData);
      
      if (!result) {
        throw new Error("Failed to update article");
      }
      
      // Show success message and refresh the articles list
      setIsSuccess(true);
      setSuccessMessage("Article updated successfully!");
      setIsEditing(false);
      setSelectedArticle(null);
      fetchArticles();
      
      // Reset success message after some time
      setTimeout(() => {
        setIsSuccess(false);
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to update article");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    setDeleteConfirm({ articleId: id, articleTitle: title });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    
    setIsDeleting(true);
    setError("");
    
    try {
      const success = await deleteArticle(deleteConfirm.articleId);
      
      if (success) {
        setIsSuccess(true);
        setSuccessMessage(`Article "${deleteConfirm.articleTitle}" deleted successfully!`);
        fetchArticles(); // Refresh the articles list
        
        // Reset success message after some time
        setTimeout(() => {
          setIsSuccess(false);
          setSuccessMessage("");
        }, 3000);
      } else {
        setError("Failed to delete article");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to delete article");
    } finally {
      setIsDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", zIndex: 9999, overflow: "auto" }}>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="mt-4 text-gray-300">Loading articles...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", zIndex: 9999, overflow: "auto" }}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-6xl mx-auto">
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
          <div className="flex mb-6 text-sm border-b border-gray-800">
            <Link href="/admin/dashboard" className="px-4 py-2 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
              Create Article
            </Link>
            <div className="px-4 py-2 border-b-2 border-blue-500 text-blue-400 font-medium">
              Manage Articles
            </div>
            <Link href="/news" className="px-4 py-2 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
              View Articles
            </Link>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Manage Articles</h1>
          </div>

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

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-300 rounded-md flex items-center">
              <div className="mr-2 flex-shrink-0 h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>{successMessage}</p>
            </div>
          )}

          {isEditing && selectedArticle && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-3">Edit Article</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedArticle.title || ""}
                    onChange={(e) => setSelectedArticle({...selectedArticle, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={selectedArticle.subtitle || ""}
                    onChange={(e) => setSelectedArticle({...selectedArticle, subtitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Categories <span className="text-red-500">*</span>
                    <span className="ml-2 text-xs text-gray-400">Select one or more categories</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    {ARTICLE_CATEGORIES.map((category) => {
                      const selectedCategories = Array.isArray(selectedArticle.category) 
                        ? selectedArticle.category 
                        : [selectedArticle.category];
                      
                      return (
                        <label
                          key={category}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700/50 p-2 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              const currentCategories = Array.isArray(selectedArticle.category) 
                                ? selectedArticle.category 
                                : [selectedArticle.category];
                              
                              if (e.target.checked) {
                                setSelectedArticle({
                                  ...selectedArticle, 
                                  category: [...currentCategories, category]
                                });
                              } else {
                                setSelectedArticle({
                                  ...selectedArticle, 
                                  category: currentCategories.filter(c => c !== category)
                                });
                              }
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-300">{category}</span>
                        </label>
                      );
                    })}
                  </div>
                  {(() => {
                    const selectedCategories = Array.isArray(selectedArticle.category) 
                      ? selectedArticle.category 
                      : [selectedArticle.category];
                    return selectedCategories.length === 0 && (
                      <p className="mt-2 text-sm text-red-400">Please select at least one category</p>
                    );
                  })()}
                </div>

                {/* Article Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedArticle.type}
                    onChange={(e) => setSelectedArticle({...selectedArticle, type: e.target.value as 'news' | 'opinion'})}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    required
                  >
                    <option value="news">News</option>
                    <option value="opinion">Opinion</option>
                  </select>
                </div>

                {selectedArticle.type === "opinion" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Author Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={selectedArticle.authorName || ""}
                        onChange={(e) => setSelectedArticle({...selectedArticle, authorName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        required={selectedArticle.type === "opinion"}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Author Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={selectedArticle.authorPosition || ""}
                        onChange={(e) => setSelectedArticle({...selectedArticle, authorPosition: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        required={selectedArticle.type === "opinion"}
                      />
                    </div>
                  </div>
                )}

                {/* Author fields for news articles */}
                {selectedArticle.type === "news" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={selectedArticle.authorName || ""}
                        onChange={(e) => setSelectedArticle({...selectedArticle, authorName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Enter author name (optional for news articles)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Author Position
                      </label>
                      <input
                        type="text"
                        value={selectedArticle.authorPosition || ""}
                        onChange={(e) => setSelectedArticle({...selectedArticle, authorPosition: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Enter author position/title (optional for news articles)"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Featured Image
                  </label>
                  <div className="flex items-center space-x-4 mb-2">
                    {selectedArticle.image && (
                      <div className="relative w-32 h-24 rounded-md overflow-hidden border border-gray-700">
                        <Image
                          src={selectedArticle.image}
                          alt="Article thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </span>
                      ) : "Upload New Image"}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image Source Credit
                    <span className="ml-2 text-xs text-gray-400">Optional: Credit the photographer, website, or organization</span>
                  </label>
                  <input
                    type="text"
                    value={selectedArticle.imageSource || ""}
                    onChange={(e) => setSelectedArticle({...selectedArticle, imageSource: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="e.g., Photo by John Doe, Unsplash, Getty Images, etc."
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    This will be displayed as a small credit below the article image
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  {editorLoaded && (
                    <div>
                      <div className="bg-gray-800 rounded-md overflow-hidden mb-2">
                        <ReactQuill
                          key={selectedArticle.id}
                          theme="snow"
                          value={quillContent}
                          onChange={(content) => {
                            console.log("Quill content changed:", content); // Debug log
                            setQuillContent(content);
                            setSelectedArticle({...selectedArticle, content});
                          }}
                          modules={modules}
                          formats={formats}
                          className="h-80"
                        />
                        <style jsx global>{`
                          .ql-toolbar {
                            background-color: #1f2937;
                            border-color: #374151 !important;
                          }
                          .ql-container {
                            background-color: #1f2937;
                            border-color: #374151 !important;
                          }
                          .ql-editor {
                            color: white !important;
                            background-color: #1f2937;
                          }
                          .ql-editor * {
                            color: white !important;
                          }
                          .ql-editor p,
                          .ql-editor h1,
                          .ql-editor h2,
                          .ql-editor h3,
                          .ql-editor h4,
                          .ql-editor h5,
                          .ql-editor h6,
                          .ql-editor span,
                          .ql-editor div,
                          .ql-editor li,
                          .ql-editor strong,
                          .ql-editor em,
                          .ql-editor u {
                            color: white !important;
                          }
                          .ql-editor.ql-blank::before {
                            color: #9ca3af;
                          }
                          .ql-toolbar .ql-picker-label {
                            color: white;
                          }
                          .ql-toolbar .ql-picker-options {
                            background-color: #1f2937;
                          }
                          .ql-toolbar .ql-picker-item {
                            color: white;
                          }
                          .ql-toolbar button svg {
                            fill: white;
                            stroke: white;
                          }
                          .ql-snow .ql-stroke {
                            stroke: white;
                          }
                          .ql-snow .ql-fill {
                            fill: white;
                          }
                        `}</style>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveArticle}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-xl max-w-md w-full mx-4">
                <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete the article "{deleteConfirm.articleTitle}"? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </span>
                    ) : "Delete Article"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
            <h2 className="text-xl font-semibold text-white p-6 bg-gray-900 border-b border-gray-800">
              Articles ({articles.length})
            </h2>
            
            {articles.length === 0 ? (
              <div className="p-6 text-center text-gray-400">No articles found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Article
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="relative flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border border-gray-700">
                              <Image
                                src={article.image || "/news/placeholder-thumb-1.jpg"}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-200">
                                {article.title}
                              </div>
                              {article.subtitle && (
                                <div className="text-xs text-gray-400 line-clamp-1">
                                  {article.subtitle}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {(() => {
                              const categories = Array.isArray(article.category) 
                                ? article.category 
                                : [article.category];
                              return categories.map((cat, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 text-xs rounded-full bg-blue-900/50 text-blue-400 border border-blue-800/50"
                                >
                                  {cat}
                                </span>
                              ));
                            })()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            article.type === 'opinion' 
                              ? 'bg-purple-900/50 text-purple-400 border border-purple-800/50' 
                              : 'bg-green-900/50 text-green-400 border border-green-800/50'
                          }`}>
                            {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {article.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="text-blue-400 hover:text-blue-300 mr-3 transition-colors"
                          >
                            Edit
                          </button>
                          <Link
                            href={`/news/${article.id}`}
                            target="_blank"
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteArticle(article.id, article.title)}
                            className="text-red-400 hover:text-red-300 ml-3 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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