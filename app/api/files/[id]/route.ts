import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import { GridFSBucket, ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' })
    const _id = new ObjectId(params.id)
    const files = await db.collection('uploads.files').find({ _id }).toArray()
    if (files.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    const fileDoc: any = files[0]
    const contentType = fileDoc.contentType || 'application/octet-stream'
    const filename = fileDoc.filename || 'file'
    const stream = bucket.openDownloadStream(_id)
    const chunks: Buffer[] = []
    await new Promise<void>((resolve, reject) => {
      stream.on('data', (d) => chunks.push(Buffer.from(d)))
      stream.on('error', reject)
      stream.on('end', resolve)
    })
    const res = new NextResponse(Buffer.concat(chunks), { status: 200 })
    res.headers.set('content-type', contentType)
    res.headers.set('content-disposition', `inline; filename="${encodeURIComponent(filename)}"`)
    res.headers.set('cache-control', 'private, max-age=600')
    return res
  } catch (e) {
    console.error('GridFS download error:', e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}


