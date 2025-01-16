import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/auth.config'
import { getPapers, savePaper } from '@/lib/db'
import { uploadFile } from '@/lib/upload'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const title = formData.get('title')
    const description = formData.get('description')
    const category = formData.get('category')
    const file = formData.get('file') as File
    const abstract = formData.get('abstract')

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `papers/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const pdfUrl = await uploadFile(buffer, filename)

    const paper = {
      id: Date.now().toString(),
      title: title as string,
      description: description as string,
      category: category as string,
      abstract: abstract as string,
      author: session.user?.name || 'Unknown Author',
      date: new Date().toISOString(),
      status: 'pending',
      pdfUrl,
      imageUrl: '/research-1.jpg'
    }

    savePaper(paper)
    return NextResponse.json(paper)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  const papers = getPapers()
  
  return NextResponse.json(
    papers.filter(paper => session?.user ? true : paper.status === 'approved')
  )
} 