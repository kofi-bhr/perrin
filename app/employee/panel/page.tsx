'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

export default function EmployeePanel() {
  const router = useRouter()
  const [papers, setPapers] = useState<Paper[]>([]) // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('userEmail')
    
    if (!token || !email) {
      router.push('/auth/signin')
      return
    }

    const fetchPapers = async () => {
      try {
        const response = await fetch(`${API_URL}/papers`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          // Ensure we're setting an array
          setPapers(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Error fetching papers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPapers()
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Papers</h1>
        
        {papers.length === 0 ? (
          <p>No papers found.</p>
        ) : (
          <div className="grid gap-4">
            {papers.map((paper) => (
              <div key={paper.id} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">{paper.title}</h2>
                <p className="text-gray-600">{paper.description}</p>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    {new Date(paper.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 