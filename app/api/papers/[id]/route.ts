import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { updatePaper } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.email !== 'employee@perrin.org') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status } = await req.json()
    const updatedPaper = updatePaper(params.id, { status })
    
    if (!updatedPaper) {
      return NextResponse.json({ 
        error: 'Paper not found',
        requestedId: params.id
      }, { status: 404 })
    }
    
    return NextResponse.json(updatedPaper)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 