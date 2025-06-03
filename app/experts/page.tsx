'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiSearch, FiChevronDown } from 'react-icons/fi'
import Head from 'next/head'
import { Expert, EXPERTS } from '@/lib/experts'

// Get all unique categories and interests for filtering
const allCategories = Array.from(new Set(EXPERTS.map(expert => expert.category || 'Other')));
const allInterests = Array.from(new Set(EXPERTS.flatMap(expert => expert.interests || [])));

// Generate alphabet for navigation
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [filteredExperts, setFilteredExperts] = useState(EXPERTS);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isRegionsOpen, setIsRegionsOpen] = useState(false);
  
  const totalExperts = EXPERTS.length;

  useEffect(() => {
    let result = EXPERTS;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(expert => 
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (expert.interests && expert.interests.some(interest => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(expert => expert.category === selectedCategory);
    }
    
    // Filter by first letter
    if (selectedLetter) {
      result = result.filter(expert => 
        expert.name.charAt(0).toUpperCase() === selectedLetter
      );
    }
    
    // Sort by hierarchy when "All" is selected, alphabetically when specific category is selected
    if (!selectedCategory) {
      // Hierarchy-based sorting
      const hierarchyOrder: { [key: string]: number } = {
        // Executive Leadership
        'Founder & President': 1,
        'Co-Founder & Chief Technology Officer': 2,
        'Chief Marketing Officer': 3,
        'Chief of Staff': 4,
        'Chief Information Security Officer': 5,
        'Chief Information Officer': 6,
        'Chief Compliance Officer': 7,
        'Editor-In-Chief': 8,
        'Chief Design Officer': 9,
        
        // Senior Leadership
        'Vice President of Marketing': 10,
        'Director of Technology': 11,
        'Director of Communications': 12,
        
        // Co-Presidents and Chapter Leadership
        'Co-President': 13,
        'Treasurer': 14,
        'Secretary': 15,
        
        // Research and Academic Roles
        'Policy Researcher': 16,
        'Editorial Board Researcher': 17,
        'Research Fellow': 18,
        'Research Associate': 19,
        
        // Technical Roles
        'Software Engineer': 20,
        
        // General Members
        'Member': 21
      };
      
      result.sort((a, b) => {
        const orderA = hierarchyOrder[a.role] || 999;
        const orderB = hierarchyOrder[b.role] || 999;
        
        // If same hierarchy level, sort alphabetically
        if (orderA === orderB) {
          return a.name.localeCompare(b.name);
        }
        
        return orderA - orderB;
      });
    } else {
      // Sort alphabetically when specific category is selected
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredExperts(result);
  }, [searchTerm, selectedCategory, selectedLetter]);

  const getExpertsByLetter = (letter: string) => {
    return EXPERTS.filter(expert => expert.name.charAt(0).toUpperCase() === letter).length;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Head>
        <title>All Experts | The Perrin Institution</title>
        <meta name="description" content="Browse our complete directory of experts, researchers, and policy analysts at The Perrin Institution." />
      </Head>

      {/* Simple Header */}
      <section className="bg-white border-b border-gray-200 pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-normal text-black mb-4">All Experts</h1>
          <p className="text-lg text-gray-600 mb-2">
            Browse our directory of distinguished researchers, policy analysts, and thought leaders
          </p>
          <p className="text-sm text-gray-500">
            {totalExperts} experts across multiple disciplines and research areas
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                <span>Topics ({allCategories.length})</span>
                <FiChevronDown className={`h-4 w-4 transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-48 py-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsCategoriesOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm ${!selectedCategory ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                  >
                    All Topics
                  </button>
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoriesOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm ${selectedCategory === category ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsRegionsOpen(!isRegionsOpen)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                <span>Regions (1)</span>
                <FiChevronDown className={`h-4 w-4 transform transition-transform ${isRegionsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isRegionsOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-40 py-2">
                  <button
                    onClick={() => setIsRegionsOpen(false)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                  >
                    Global
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Alphabetical Navigation */}
          <div className="flex items-center gap-1 flex-wrap mb-8">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`px-3 py-2 text-sm font-medium border rounded transition-all ${
                !selectedLetter 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              All
            </button>
            {alphabet.map(letter => {
              const count = getExpertsByLetter(letter);
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                  disabled={count === 0}
                  className={`px-3 py-2 text-sm font-medium border rounded transition-all ${
                    selectedLetter === letter
                      ? 'bg-blue-600 text-white border-blue-600'
                      : count > 0
                        ? 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="text-gray-500 text-sm mb-6">
            {filteredExperts.length} RESULTS
          </div>
        </div>
      </section>

      {/* Expert List */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="space-y-6">
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0"
              >
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {expert.image && expert.image !== "" ? (
                      <img 
                        src={expert.image} 
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-lg bg-gray-400 w-full h-full flex items-center justify-center">
                        {expert.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                      <Link href={`/experts/${expert.id}`}>
                        <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer transition-colors mb-1">
                          {expert.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {expert.role}
                        {expert.category && (
                          <span className="text-gray-500"> • {expert.category}</span>
                        )}
                      </p>
                      {expert.email && (
                        <p className="text-gray-500 text-sm leading-relaxed mt-1">
                          {expert.email}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 ml-4">
                      {expert.interests && expert.interests.slice(0, 2).map((interest, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap"
                        >
                          {interest}
                        </span>
                      ))}
                      {expert.category && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full whitespace-nowrap">
                          {expert.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredExperts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No experts found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setSelectedLetter(null);
                    setIsCategoriesOpen(false);
                    setIsRegionsOpen(false);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 