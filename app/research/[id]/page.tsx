'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FiDownload, FiCopy, FiCheck, FiArrowLeft } from 'react-icons/fi'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  abstract: string
  author: string
  date: string
  status: string
  url: string
  fileName: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function ResearchPaperPage() {
  const params = useParams()
  const router = useRouter()
  const [paper, setPaper] = useState<Paper | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        }
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(`${API_URL}/papers/${params.id}`, {
          headers
        })
        
        if (!response.ok) {
          throw new Error('Paper not found')
        }
        
        const data = await response.json()
        console.log('Paper URL:', data.url)
        setPaper(data)
      } catch (error) {
        console.error('Error fetching paper:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchPaper()
    }
  }, [params.id])

  useEffect(() => {
    if (paper?.url) {
      // Force Railway URL if needed
      const url = paper.url.replace(/http:\/\/localhost:\d+/g, API_URL)
                          .replace(/https?:\/\/localhost:\d+/g, API_URL)
      setPdfUrl(url)
    }
  }, [paper])

  const handleCiteCopy = () => {
    if (!paper) return
    
    // Format date components
    const date = new Date(paper.date)
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    
    // Chicago style format:
    // Author's Last Name, First Name. "Title of Paper." Perrin Institute, Month Day, Year.
    // Note: This assumes author name is in "First Last" format - you might need to adjust if format differs
    const [firstName, ...lastNames] = paper.author.split(' ')
    const lastName = lastNames.join(' ')
    const citation = `${lastName}, ${firstName}. "${paper.title}." Perrin Institute, ${month} ${day}, ${year}.`
    
    navigator.clipboard.writeText(citation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    </div>
  )

  if (!paper) return (
    <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Paper Not Found</h2>
        <p className="text-gray-600 mb-4">
          This paper may not exist or may have been removed.
        </p>
        <button
          onClick={() => router.push('/research')}
          className="inline-flex items-center text-blue-600 hover:text-blue-500"
        >
          <FiArrowLeft className="mr-2" />
          Back to Research
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <button
              onClick={() => router.push('/research')}
              className="inline-flex items-center text-gray-300 hover:text-white mb-6"
            >
              <FiArrowLeft className="mr-2" />
              Back to Research
            </button>
            <div className="space-y-4">
              <div className="text-blue-400 text-sm font-semibold">
                {paper.category}
              </div>
              <h1 className="text-4xl font-serif font-bold text-white">
                {paper.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>{paper.author}</span>
                <span>•</span>
                <span>{new Date(paper.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* PDF Viewer */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-[800px]"
                  title={paper.title}
                />
              ) : (
                <div className="flex items-center justify-center h-[800px]">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {paper?.url && (
                  <a
                    href={`${API_URL}/uploads/${paper.fileName}`}
                    download
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-500"
                  >
                    <FiDownload className="text-lg" />
                    <span>Download PDF</span>
                  </a>
                )}
                <button
                  onClick={handleCiteCopy}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-500"
                >
                  {copied ? <FiCheck className="text-lg" /> : <FiCopy className="text-lg" />}
                  <span>{copied ? 'Copied!' : 'Copy Citation'}</span>
                </button>
              </div>
            </div>

            {/* Abstract */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Abstract</h3>
              <p className="text-gray-600">
                {paper.abstract || paper.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 