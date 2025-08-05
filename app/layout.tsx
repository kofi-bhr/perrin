import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalLoading from "@/components/GlobalLoading";
import { Providers } from './providers';

// Initialize Roboto font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'The Perrin Institution | AI-Powered Policy Research Lab at UVA',
  description: 'The Perrin Institution is a contracted research organization at the University of Virginia dedicated to shaping policy through data-driven research and technology governance.',
  keywords: 'Perrin Institution, Perrin Institute, policy research, AI policy, technology governance, UVA research, data-driven policy',
  authors: [{ name: 'Perrin Institution' }],
  openGraph: {
    title: 'The Perrin Institution | AI-Powered Policy Research',
    description: 'Shaping the future of technology governance and legal innovation through data-driven research at UVA',
    url: 'https://perrininstitution.org',
    siteName: 'The Perrin Institution',
    images: [
      {
        url: '/moretechperrin-removebg-preview.png',
        width: 1200,
        height: 630,
        alt: 'The Perrin Institution'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Perrin Institution | AI-Powered Policy Research',
    description: 'Shaping policy through data-driven research at UVA',
    images: ['/moretechperrin-removebg-preview.png'],
  },
  alternates: {
    canonical: 'https://perrininstitution.org',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <head>
        {/* Theme color to match site's white theme on mobile devices */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="your-google-site-verification-code" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Perrin Institution",
              "alternateName": ["Perrin Institute", "Perrin Research Institution"],
              "url": "https://perrininstitution.org",
              "logo": {
                "@type": "ImageObject",
                "url": "https://perrininstitution.org/moretechperrin-removebg-preview.png",
                "width": 1200,
                "height": 630
              },
              "image": "https://perrininstitution.org/moretechperrin-removebg-preview.png",
              "description": "The Perrin Institution is a contracted research organization based at the University of Virginia, dedicated to shaping the future of technology governance and legal innovation through data-driven research.",
              "foundingDate": "2023",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Finn Järvi",
                  "jobTitle": "Founder & President"
                },
                {
                  "@type": "Person", 
                  "name": "Cash Hilinski",
                  "jobTitle": "Co-Founder & Chief Technology Officer"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Charlottesville",
                "addressRegion": "Virginia",
                "addressCountry": "United States",
                "postalCode": "22904"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "general inquiry",
                "url": "https://perrininstitution.org/research-request"
              },
              "memberOf": {
                "@type": "Organization",
                "name": "University of Virginia",
                "url": "https://www.virginia.edu"
              },
              "areaServed": "United States",
              "knowsAbout": [
                "AI Policy",
                "Technology Governance", 
                "Data-Driven Research",
                "Legal Innovation",
                "Policy Research",
                "Educational Policy",
                "Environmental Law",
                "Corporate Law"
              ],
              "sameAs": [
                "https://www.tiktok.com/@theperrininstitution"
              ]
            })
          }}
        />
        
        {/* Preload critical hero images */}
        <link
          rel="preload"
          href="/uva-stock-1.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/uva-stock-3.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className={`${roboto.className} font-sans antialiased text-gray-900 bg-white text-sm`}>
        <Providers>
          <GlobalLoading>
            <Navbar />
            <main className="w-full overflow-hidden">{children}</main>
            <Footer />
          </GlobalLoading>
        </Providers>
      </body>
    </html>
  );
}
