'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { FiCheck, FiX, FiClock } from 'react-icons/fi'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminPanel() {
  const { data: session, status } = useSession()
  const [papers, setPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('/api/papers', {
          credentials: 'include'
        })
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

  const handleStatusUpdate = async (paperId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/papers/${paperId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const refreshResponse = await fetch('/api/papers', {
          credentials: 'include',
          cache: 'no-store'
        })
        const refreshedData = await refreshResponse.json()
        setPapers(refreshedData)
        
        localStorage.setItem('papers', JSON.stringify(refreshedData))
      } else {
        const errorData = await response.json()
        console.error('Error updating paper status:', errorData)
        alert('Failed to update paper status. Please try again.')
      }
    } catch (error) {
      console.error('Error updating paper status:', error)
      alert('Failed to update paper status. Please try again.')
    }
  }

  if (status === 'loading') return <div>Loading...</div>
  if (!session) redirect('/api/auth/signin')
  if (session.user?.email !== 'employee@perrin.org') redirect('/')

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
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title & Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
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
                      <div className="text-sm text-gray-500">
                        {paper.author} • {new Date(paper.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {paper.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(paper.status)}
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          paper.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : paper.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {paper.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusUpdate(paper.id, 'approved')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <FiCheck className="mr-1" />
                            Approve
                          </button>
                        )}
                        {paper.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusUpdate(paper.id, 'rejected')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <FiX className="mr-1" />
                            Reject
                          </button>
                        )}
                        {paper.status !== 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(paper.id, 'pending')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            <FiClock className="mr-1" />
                            Reset
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 