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

interface AccessRequest {
  id: string
  name: string
  email: string
  department: string
  reason: string
  status: 'pending' | 'approved'
  createdAt: string
  pin?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function AdminPanel() {
  const router = useRouter()
  const [papers, setPapers] = useState<Paper[]>([])
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null)
  const [showPinModal, setShowPinModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newPin, setNewPin] = useState<string>('')

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      const [papersRes, requestsRes] = await Promise.all([
        fetch(`${API_URL}/admin/papers`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/admin/access-requests`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      if (papersRes.ok) {
        const papersData = await papersRes.json()
        setPapers(papersData)
      }

      if (requestsRes.ok) {
        const requestsData = await requestsRes.json()
        setAccessRequests(requestsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('userEmail')
    
    if (!token || email !== 'employee@perrin.org') {
      router.push('/auth/signin')
      return
    }

    fetchData()
  }, [router])

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
        fetchData()
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
        fetchData() // Refresh the list
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

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Access Requests</h2>
          
          <div className="bg-white shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{request.name}</div>
                      <div className="text-sm text-gray-500">{request.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {request.department}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedRequest(request)
                          setShowPinModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PIN Modal */}
          {showPinModal && selectedRequest && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Access Request Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1">{selectedRequest.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1">{selectedRequest.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <p className="mt-1">{selectedRequest.department}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reason</label>
                    <p className="mt-1">{selectedRequest.reason}</p>
                  </div>

                  {selectedRequest.status === 'approved' && selectedRequest.pin && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-blue-800">Access PIN</label>
                      <p className="mt-1 text-2xl font-mono text-blue-900">{selectedRequest.pin}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowPinModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Close
                  </button>
                  {selectedRequest.status === 'pending' && (
                    <button
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem('token')
                          const response = await fetch(`${API_URL}/admin/approve-request/${selectedRequest.id}`, {
                            method: 'POST',
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                            }
                          })

                          if (response.ok) {
                            const updatedRequest = await response.json()
                            setAccessRequests(prev => prev.map(r => 
                              r.id === updatedRequest.id ? updatedRequest : r
                            ))
                            setSelectedRequest(updatedRequest)
                            
                            // Update success message
                            alert(`Access approved! PIN has been emailed to ${selectedRequest.email}`)
                          }
                        } catch (error) {
                          console.error('Error approving request:', error)
                          alert('Failed to approve request')
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium 
                        hover:bg-blue-700"
                    >
                      Approve & Generate PIN
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 