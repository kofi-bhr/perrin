'use client'
import { useState } from 'react'

interface PDFViewerProps {
  url: string
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const [isError, setIsError] = useState(false)

  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded">
        <p className="text-red-600">Failed to load PDF. <a href={url} className="underline">Download directly</a></p>
      </div>
    )
  }

  return (
    <iframe
      src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
      className="w-full h-[800px] border-0"
      onError={() => setIsError(true)}
    />
  )
} 