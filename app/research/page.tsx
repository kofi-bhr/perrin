'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RESEARCH_CATEGORIES } from '@/lib/constants'

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

export default function ResearchPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        console.log('Fetching papers from server...')
        const response = await fetch('http://localhost:3001/papers')
        if (!response.ok) {
          throw new Error('Failed to fetch papers')
        }
        const data = await response.json()
        console.log('Received papers:', data)
        setPapers(data)
      } catch (error) {
        console.error('Error fetching papers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPapers()
  }, [])

  const handlePdfClick = (url: string) => {
    window.open(url, '_blank')
  }

  const filteredPapers = papers.filter(paper => {
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-5xl font-serif font-bold text-white mb-4">
              Research & Publications
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Explore our comprehensive collection of policy research, analysis, and publications.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Research
              </button>
              {RESEARCH_CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <input
                type="search"
                placeholder="Search research..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Research Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => (
            <Link 
              key={paper.id} 
              href={`/research/${paper.id}`}
              className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-2">{paper.title}</h3>
              <p className="text-gray-600 mb-4">{paper.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{paper.category}</span>
                <span>{new Date(paper.date).toLocaleDateString()}</span>
              </div>
              <div className="mt-4 text-blue-600 hover:text-blue-500">
                View Details →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 