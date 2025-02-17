'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RESEARCH_CATEGORIES } from '@/lib/constants'
import LoadingSpinner from '@/components/LoadingSpinner'
import Image from 'next/image'
import { images } from '@/lib/images'
import { motion } from 'framer-motion'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  status: string
  url: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function ResearchPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`${API_URL}/papers`)
        if (!response.ok) throw new Error('Failed to fetch papers')
        const data = await response.json()
        setPapers(data)
      } catch (error) {
        console.error('Error fetching papers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPapers()
  }, [])

  const filteredPapers = papers.filter(paper => {
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <Image
          src={images.heroResearch}
          alt="UVA Research"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2 backdrop-blur-sm">
                Research & Publications
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
                Our Research
              </h1>
              <p className="mt-6 text-xl text-gray-200 max-w-3xl">
                Explore our collection of policy research and analysis from UVA scholars.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-50 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 border-2 
                  ${selectedCategory === 'all' 
                    ? 'border-blue-600 text-blue-600 bg-blue-50' 
                    : 'border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'}`}
              >
                All Labs
              </motion.button>
              {RESEARCH_CATEGORIES.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 text-sm font-medium transition-all duration-300 border-2 
                    ${selectedCategory === category 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'}`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full md:w-64"
            >
              <input
                type="search"
                placeholder="Search research..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Research Papers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={`/research/${paper.id}`}
                  className="group block bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-xl 
                    transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 
                        transition-colors">
                        {paper.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {paper.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{paper.category}</span>
                      <span>{new Date(paper.date).toLocaleDateString()}</span>
                    </div>
                    <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      View Details
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-600">No research papers found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}