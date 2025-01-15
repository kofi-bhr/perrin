import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow access to files in the public/papers directory
  if (request.nextUrl.pathname.startsWith('/papers/')) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/papers/:path*',
} 