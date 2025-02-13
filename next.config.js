/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['perrin-production.up.railway.app', 'perrininstitution.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'standalone'
}

module.exports = nextConfig 