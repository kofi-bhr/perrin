import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/')
  const response = await fetch(`${API_URL}/${path}`)
  const data = await response.json()
  return NextResponse.json(data)
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/')
  const body = await request.json()
  const response = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': request.headers.get('Authorization') || ''
    },
    body: JSON.stringify(body)
  })
  const data = await response.json()
  return NextResponse.json(data)
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
} 