'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RESEARCH_CATEGORIES } from '@/lib/constants'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/lib/hooks/useAuth'

type SubmissionStep = 'draft' | 'review' | 'success'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  abstract: string
  author: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  url: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function EmployeePanel() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [step, setStep] = useState<SubmissionStep>('draft')
  const [papers, setPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Economic Policy',
    abstract: '',
    file: null as File | null,
  })

  useEffect(() => {
    if (isAuthenticated) {
      fetchPapers()
    }
  }, [isAuthenticated])

  const fetchPapers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/admin/papers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log('Fetched papers:', data)
      setPapers(data)
    } catch (error) {
      console.error('Error fetching papers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'draft') {
      setStep('review')
      return
    }

    if (step === 'review' && formData.file) {
      const form = new FormData()
      form.append('file', formData.file)
      form.append('title', formData.title)
      form.append('description', formData.description)
      form.append('category', formData.category)
      form.append('abstract', formData.abstract)

      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: form
        })

        if (response.ok) {
          const paper = await response.json()
          console.log('Upload successful:', paper)
          setStep('success')
          fetchPapers()
          setFormData({
            title: '',
            description: '',
            category: 'Economic Policy',
            abstract: '',
            file: null,
          })
        } else {
          const error = await response.json()
          console.error('Upload failed:', error)
          alert('Error uploading research: ' + (error.message || 'Unknown error'))
        }
      } catch (error) {
        console.error('Error uploading:', error)
        alert('Network error while uploading. Please try again.')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files[0] }))
    }
  }

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Employee Panel</h1>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            <div className="bg-white shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Submit New Research</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    {RESEARCH_CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Abstract
                  </label>
                  <textarea
                    value={formData.abstract}
                    onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {step === 'draft' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PDF File
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="w-full"
                      required
                    />
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step === 'review' && (
                    <button
                      type="button"
                      onClick={() => setStep('draft')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Back to Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {step === 'draft' ? 'Review Submission' : 'Submit Research'}
                  </button>
                </div>
              </form>
            </div>

            {/* Submissions List */}
            <div className="space-y-4">
              <div className="bg-white shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Submissions</h2>
                {papers.length === 0 ? (
                  <p className="text-gray-500">No submissions yet</p>
                ) : (
                  <div className="space-y-4">
                    {papers.map(paper => (
                      <div key={paper.id} className="border-l-4 border-blue-600 pl-4">
                        <h3 className="font-medium">{paper.title}</h3>
                        <div className="flex justify-between items-center mt-1 text-sm">
                          <span className="text-gray-600">
                            {new Date(paper.date).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            paper.status === 'approved' 
                              ? 'bg-green-100 text-green-800'
                              : paper.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                          </span>
                        </div>
                        {paper.url && (
                          <a 
                            href={paper.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-500 text-sm mt-2 inline-block"
                          >
                            View PDF →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 