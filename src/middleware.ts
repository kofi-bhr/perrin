import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin') || ''

  // Define allowed origins
  const allowedOrigins = [
    'https://perrininstitution.org',
    'https://www.perrininstitution.org',
    'https://perrinbeta.netlify.app',
    'https://perrininstitution.netlify.app',
    'http://localhost:3000'
  ]

  // Create the response
  const response = NextResponse.next()

  // Only allow specified origins
  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
  }

  return response
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: '/api/:path*',
} 