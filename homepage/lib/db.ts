import { readStorage, writeStorage } from './storage'

export interface Paper {
  id: string
  title: string
  description: string
  category: string
  abstract: string
  author: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  pdfUrl: string
  imageUrl: string
}

export const getPapers = (): Paper[] => {
  if (typeof window === 'undefined') {
    return readStorage()
  }
  
  try {
    const saved = localStorage.getItem('papers')
    if (saved) {
      return JSON.parse(saved)
    }
    const serverPapers = readStorage()
    localStorage.setItem('papers', JSON.stringify(serverPapers))
    return serverPapers
  } catch (error) {
    console.error('Error getting papers:', error)
    return []
  }
}

export const savePaper = (paper: Paper) => {
  const papers = [...getPapers(), paper]
  
  if (typeof window === 'undefined') {
    writeStorage(papers)
  } else {
    localStorage.setItem('papers', JSON.stringify(papers))
  }
  
  return papers
}

export const updatePaper = (paperId: string, updates: Partial<Paper>) => {
  const papers = getPapers()
  const index = papers.findIndex(p => p.id === paperId)
  
  if (index === -1) return null

  const updatedPapers = [...papers]
  updatedPapers[index] = { ...updatedPapers[index], ...updates }
  
  if (typeof window === 'undefined') {
    writeStorage(updatedPapers)
  } else {
    localStorage.setItem('papers', JSON.stringify(updatedPapers))
  }
  
  return updatedPapers[index]
} 