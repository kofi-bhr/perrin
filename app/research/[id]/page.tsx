'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  abstract: string
  author: string
  date: string
  pdfUrl: string
  imageUrl: string
}

export default function ResearchPaperPage() {
  const params = useParams()
  const [paper, setPaper] = useState<Paper | null>(null)

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await fetch('/api/papers', {
          credentials: 'include'
        })
        const papers = await response.json()
        const foundPaper = papers.find((p: Paper) => p.id === params.id)
        setPaper(foundPaper || null)
      } catch (error) {
        console.error('Error fetching paper:', error)
      }
    }

    fetchPaper()
  }, [params.id])

  if (!paper) return <div>Loading...</div>

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gray-900">
        <Image
          src={paper.imageUrl || '/research-1.jpg'}
          alt={paper.title}
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 w-full pb-12">
            <div className="max-w-3xl">
              <span className="text-blue-400 font-semibold tracking-wider uppercase">
                {paper.category}
              </span>
              <h1 className="mt-4 text-4xl font-serif font-bold text-white leading-tight">
                {paper.title}
              </h1>
              <div className="mt-4 flex items-center text-gray-300 space-x-4">
                <span>{paper.author}</span>
                <span>•</span>
                <span>{new Date(paper.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Abstract</h2>
              <p className="whitespace-pre-line">{paper.abstract}</p>
            </div>
            
            {/* PDF Viewer */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Full Paper</h2>
              <div className="aspect-[16/9] bg-gray-100">
                <object
                  data={paper.pdfUrl}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <iframe
                    src={`${paper.pdfUrl}#toolbar=0`}
                    className="w-full h-full"
                    title={paper.title}
                  />
                </object>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6">
              <h3 className="text-lg font-bold mb-4">Download & Share</h3>
              <div className="space-y-4">
                <a
                  href={paper.pdfUrl}
                  download
                  className="block w-full bg-blue-600 text-white text-center py-3 hover:bg-blue-700 transition-colors"
                >
                  Download PDF
                </a>
                <div className="flex space-x-4">
                  <button className="flex-1 bg-gray-200 py-2 hover:bg-gray-300 transition-colors">
                    Share
                  </button>
                  <button className="flex-1 bg-gray-200 py-2 hover:bg-gray-300 transition-colors">
                    Cite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 