import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { Application, ApplicationStatus, ApplicationField, ApplicationFile } from '../../../lib/applications'
import { JobRole } from '../../../lib/jobs'

function sanitize(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
}

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const jobId = request.nextUrl.searchParams.get('jobId')
    const q = jobId ? { jobId } : {}
    const list = await db.collection('applications').find(q).sort({ _id: -1 }).toArray()
    return NextResponse.json(list)
  } catch (e) {
    console.error('List applications error:', e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, jobTitle, fields, files }: { jobId: string; jobTitle: string; fields: ApplicationField[]; files?: ApplicationFile[] } = body
    if (!jobId || !Array.isArray(fields)) return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })

    const client = await clientPromise
    const db = client.db('perrindb')
    const job: JobRole | null = await db.collection('jobs').findOne({ id: jobId }) as any
    if (!job || !job.active) return NextResponse.json({ message: 'Job not found or inactive' }, { status: 400 })

    // Validate required fields exist
    const requiredNames = (job.formFields || []).filter(f => f.required).map(f => f.name)
    const provided = new Set(fields.map(f => f.name))
    for (const r of requiredNames) {
      if (!provided.has(r)) return NextResponse.json({ message: `Missing field: ${r}` }, { status: 400 })
    }

    const sanitizedFields: ApplicationField[] = fields.map(f => ({
      name: f.name,
      label: sanitize(String(f.label ?? '')),
      type: String(f.type ?? ''),
      value: typeof f.value === 'string' ? sanitize(f.value) : !!f.value,
    }))

    const emailField = sanitizedFields.find(f => f.name.toLowerCase() === 'email')
    const now = new Date().toISOString()
    const app: Application = {
      id: Date.now().toString(),
      jobId,
      jobTitle: jobTitle || job.title,
      status: 'new',
      fields: sanitizedFields,
      files,
      email: emailField && typeof emailField.value === 'string' ? emailField.value : undefined,
      createdAt: now,
      updatedAt: now,
    }

    await db.collection('applications').insertOne(app)
    return NextResponse.json({ success: true, id: app.id })
  } catch (e) {
    console.error('Create application error:', e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}


