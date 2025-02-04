'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiCheck, FiX, FiClock } from 'react-icons/fi'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  url: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default function AdminPanel() {
  const router = useRouter()
  const [papers, setPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    // Check if user is admin
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('userEmail')
    
    if (!token || email !== 'employee@perrin.org') {
      router.push('/auth/signin')
      return
    }

    fetchPapers()
  }, [router])

  const fetchPapers = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Attempting to fetch papers with token:', token?.substring(0, 10) + '...')
      
      const response = await fetch(`${API_URL}/admin/papers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // Remove credentials if not needed for local development
        // credentials: 'include'
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error response:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Received papers:', data?.length || 0)
      setPapers(data || [])
    } catch (error) {
      console.error('Error fetching papers:', error)
      setPapers([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (paperId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/papers/${paperId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        fetchPapers()
      } else {
        alert('Failed to update paper status. Please try again.')
      }
    } catch (error) {
      console.error('Error updating paper status:', error)
      alert('Failed to update paper status. Please try again.')
    }
  }

  const handleDelete = async (paperId: string) => {
    if (!confirm('Are you sure you want to delete this paper? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      console.log('Attempting to delete:', paperId) // Debug log
      
      const response = await fetch(`${API_URL}/papers/${paperId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setPapers(papers.filter(paper => paper.id !== paperId))
        alert('Paper deleted successfully')
        fetchPapers() // Refresh the list
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to delete paper' }))
        throw new Error(errorData.error || 'Failed to delete paper')
      }
    } catch (error) {
      console.error('Error deleting paper:', error)
      alert('Failed to delete paper')
    }
  }

  const filteredPapers = papers.filter(paper => 
    selectedStatus === 'all' || paper.status === selectedStatus
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <FiCheck className="text-green-500" />
      case 'rejected':
        return <FiX className="text-red-500" />
      default:
        return <FiClock className="text-yellow-500" />
    }
  }

  if (isLoading) return (
    <div className="bg-gray-50">
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
            <h1 className="text-4xl font-serif font-bold text-white">Admin Dashboard</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
            <h1 className="text-4xl font-serif font-bold text-white">Admin Dashboard</h1>
            <p className="mt-2 text-gray-300">Manage research submissions and publications</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Submissions', value: papers.length },
            { label: 'Pending Review', value: papers.filter(p => p.status === 'pending').length },
            { label: 'Approved Papers', value: papers.filter(p => p.status === 'approved').length }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 shadow-sm mb-6">
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paper
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{paper.title}</div>
                    <div className="text-sm text-gray-500">{paper.description}</div>
                    {paper.url && (
                      <a 
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 text-sm mt-1 inline-block"
                      >
                        View PDF →
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {paper.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {paper.author}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(paper.status)}
                      <span className="ml-2 text-sm text-gray-900">
                        {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {paper.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(paper.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(paper.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(paper.id)}
                        className="text-red-600 hover:text-red-900 ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 