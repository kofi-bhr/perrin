'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { RESEARCH_CATEGORIES } from '@/lib/constants'

type SubmissionStep = 'draft' | 'review' | 'success'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function EmployeePanel() {
  const { data: session, status } = useSession()
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('/api/papers', {
          credentials: 'include'
        })
        const data = await response.json()
        // Only show the current user's papers
        setPapers(data.filter((paper: Paper) => paper.author === session?.user?.name))
      } catch (error) {
        console.error('Error fetching papers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchPapers()
    }
  }, [session])

  if (status === 'loading') return <div>Loading...</div>
  if (!session) redirect('/api/auth/signin')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'draft') {
      setStep('review')
      return
    }

    if (step === 'review') {
      setIsSubmitting(true)
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value)
      })

      try {
        const response = await fetch('/api/papers', {
          method: 'POST',
          body: data,
          credentials: 'include',
        })
        
        if (response.ok) {
          setStep('success')
          setFormData({
            title: '',
            description: '',
            category: 'Economic Policy',
            abstract: '',
            file: null,
          })
        }
      } catch (error) {
        console.error('Error uploading research:', error)
        alert('Error uploading research')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section with gradient */}
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        {/* Header Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
            <h1 className="text-4xl font-serif font-bold text-white">Employee Dashboard</h1>
            <p className="mt-2 text-gray-300">Upload and manage your research publications</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {step === 'success' ? (
              <div className="bg-white shadow-sm p-8 text-center">
                <div className="text-green-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Research Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Your research paper has been submitted and is pending review.
                </p>
                <button
                  onClick={() => setStep('draft')}
                  className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700"
                >
                  Submit Another Paper
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {step === 'draft' ? 'Submit New Research' : 'Review Submission'}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className={step === 'draft' ? 'text-blue-600 font-bold' : ''}>Draft</span>
                    <span>→</span>
                    <span className={step === 'review' ? 'text-blue-600 font-bold' : ''}>Review</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      disabled={step === 'review'}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
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
                      disabled={step === 'review'}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
                      required
                    >
                      {RESEARCH_CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brief Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      disabled={step === 'review'}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Abstract
                    </label>
                    <textarea
                      value={formData.abstract}
                      onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                      disabled={step === 'review'}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
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
                        onChange={(e) => setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
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
                      disabled={isSubmitting}
                      className="ml-auto px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {step === 'draft' ? 'Review Submission' : 'Submit Research'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Stats and Quick Links */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Publications</span>
                  <span className="text-2xl font-bold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="text-2xl font-bold text-gray-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Downloads</span>
                  <span className="text-2xl font-bold text-gray-900">1.2k</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
              <nav className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-500">View My Publications</a>
                <a href="#" className="block text-blue-600 hover:text-blue-500">Research Guidelines</a>
                <a href="#" className="block text-blue-600 hover:text-blue-500">Publication Style Guide</a>
                <a href="#" className="block text-blue-600 hover:text-blue-500">Help & Support</a>
              </nav>
            </div>

            <div className="bg-white shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Submissions</h2>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-gray-500">Loading submissions...</div>
                ) : papers.length === 0 ? (
                  <div className="text-gray-500">No submissions yet</div>
                ) : (
                  papers.map(paper => (
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
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 