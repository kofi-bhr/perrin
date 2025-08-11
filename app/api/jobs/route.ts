import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { JobRole } from '../../../lib/jobs'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const jobs = await db.collection('jobs').find({}).sort({ _id: -1 }).toArray()
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error retrieving jobs:', error)
    return NextResponse.json({ message: 'Error retrieving jobs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      type,
      location,
      department,
      salaryRange,
      description,
      requirements,
      benefits,
      urgency,
      formFields,
      active,
      postedDate,
    } = body as Partial<JobRole> & { postedDate?: string }

    if (!title || !type || !location || !department || !description || !Array.isArray(formFields)) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('perrindb')
    const job: JobRole = {
      id: Date.now().toString(),
      title,
      type,
      location,
      department,
      salaryRange,
      description,
      requirements: requirements ?? [],
      benefits: benefits ?? [],
      postedDate: postedDate ?? new Date().toISOString().slice(0, 10),
      urgency: (urgency as any) ?? 'medium',
      formFields,
      active: active ?? true,
    }

    await db.collection('jobs').insertOne(job)
    return NextResponse.json(job)
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ message: 'Error creating job' }, { status: 500 })
  }
}


