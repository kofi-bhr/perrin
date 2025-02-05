/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'perrin-production.up.railway.app',
      'localhost',
      'images.unsplash.com'  // Add back if you're using Unsplash
    ],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ]
  },
  output: 'standalone'
}

module.exports = nextConfig 