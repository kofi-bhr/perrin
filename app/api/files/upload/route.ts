import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import { GridFSBucket } from 'mongodb'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const file = form.get('file') as File
    if (!file) return NextResponse.json({ success: false, message: 'No file' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const client = await clientPromise
    const db = client.db('perrindb')
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' })
    const filename = (file as any).name || `upload-${Date.now()}`
    const contentType = file.type || 'application/octet-stream'

    const uploadStream = bucket.openUploadStream(filename, { contentType })
    await new Promise<void>((resolve, reject) => {
      uploadStream.on('error', (e) => reject(e))
      uploadStream.on('finish', () => resolve())
      uploadStream.end(buffer)
    })

    const fileId = uploadStream.id.toString()
    const url = `/api/files/${fileId}`
    return NextResponse.json({ success: true, url, fileId, storage: 'gridfs', filename })
  } catch (e) {
    console.error('GridFS upload error:', e)
    return NextResponse.json({ success: false, message: 'Upload error' }, { status: 500 })
  }
}


