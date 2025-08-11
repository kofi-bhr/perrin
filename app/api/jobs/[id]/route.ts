import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import { JobRole } from '../../../../lib/jobs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const job = await db.collection('jobs').findOne({ id: params.id })
    if (!job) return NextResponse.json({ message: 'Job not found' }, { status: 404 })
    return NextResponse.json(job)
  } catch (error) {
    console.error('Error retrieving job:', error)
    return NextResponse.json({ message: 'Error retrieving job' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db('perrindb')
    const existing = await db.collection('jobs').findOne({ id: params.id })
    if (!existing) return NextResponse.json({ message: 'Job not found' }, { status: 404 })

    const allowed: Partial<JobRole> = {}
    const fields: (keyof JobRole)[] = [
      'title','type','location','department','salaryRange','description','requirements','benefits','postedDate','urgency','formFields','active'
    ]
    for (const key of fields) {
      if (key in body) (allowed as any)[key] = body[key]
    }

    await db.collection('jobs').updateOne({ id: params.id }, { $set: allowed })
    const updated = { ...existing, ...allowed }
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json({ message: 'Error updating job' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const res = await db.collection('jobs').deleteOne({ id: params.id })
    if (res.deletedCount === 0) return NextResponse.json({ message: 'Job not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json({ message: 'Error deleting job' }, { status: 500 })
  }
}


