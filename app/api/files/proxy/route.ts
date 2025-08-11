import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const urlParam = request.nextUrl.searchParams.get('u')
    if (!urlParam) return NextResponse.json({ message: 'Missing url' }, { status: 400 })
    let decoded = ''
    try {
      decoded = decodeURIComponent(urlParam)
    } catch {
      decoded = urlParam
    }
    // Attempt secondary decode in case of double-encoding
    try {
      decoded = decodeURIComponent(decoded)
    } catch {}

    // Basic allowlist: only allow Cloudinary res.cloudinary.com
    try {
      const u = new URL(decoded)
      if (!/cloudinary\.com/i.test(u.hostname)) {
        return NextResponse.json({ message: 'Forbidden host' }, { status: 400 })
      }
    } catch {
      return NextResponse.json({ message: 'Invalid url' }, { status: 400 })
    }

    const upstream = await fetch(decoded)
    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '')
      return NextResponse.json({ message: 'Upstream error', status: upstream.status, detail: text.slice(0, 300) }, { status: 400 })
    }
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream'
    const contentDisposition = upstream.headers.get('content-disposition') || undefined

    const arrayBuffer = await upstream.arrayBuffer()
    const res = new NextResponse(arrayBuffer, { status: 200 })
    res.headers.set('content-type', contentType)
    if (contentDisposition) res.headers.set('content-disposition', contentDisposition)
    res.headers.set('cache-control', 'private, max-age=600')
    return res
  } catch (e) {
    return NextResponse.json({ message: 'Proxy error' }, { status: 500 })
  }
}


