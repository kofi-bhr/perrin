import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <Image
          src="/hero-image.jpg"
          alt="Think tank hero image"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        <div className="absolute w-full z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl space-y-8">
              <div>
                <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2">
                  Policy Research Institute
                </span>
                <h1 className="mt-4 text-7xl font-serif font-bold text-white leading-[1.15] tracking-tight drop-shadow-lg">
                  Shaping Tomorrow's Policy Today
                </h1>
              </div>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-lg">
                Leading research institution dedicated to advancing public policy through rigorous analysis
                and innovative solutions for a more prosperous and equitable society.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/research"
                  className="bg-white text-gray-900 px-8 py-4 text-lg font-semibold 
                    hover:bg-gray-100 transition-colors border-2 border-white"
                >
                  View Our Research
                </Link>
                <Link
                  href="/experts"
                  className="border-2 border-white text-white px-8 py-4 text-lg font-semibold 
                    hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Meet Our Experts
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 pb-20">
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: '25+', label: 'Years of Excellence' },
                { number: '200+', label: 'Research Publications' },
                { number: '50+', label: 'Policy Experts' }
              ].map((stat, index) => (
                <div key={index} className="text-white border-l-2 border-blue-400 pl-6">
                  <div className="text-4xl font-bold">{stat.number}</div>
                  <div className="text-gray-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-white"
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">Featured Research</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={`/research-${item}.jpg`}
                    alt="Research thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-blue-600 font-semibold text-sm">Policy Analysis</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">Understanding Global Economic Trends</h3>
                  <p className="text-gray-600 mb-4">An in-depth analysis of emerging economic patterns and their implications for policy makers</p>
                  <Link href="/research/1" className="text-blue-600 font-semibold hover:text-blue-700">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">Our Experts</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <div className="relative h-64 mb-4 overflow-hidden">
                  <Image
                    src={`/expert-${item}.jpg`}
                    alt="Expert portrait"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Dr. Sarah Johnson</h3>
                <p className="text-gray-600 text-sm mb-2">Senior Fellow, Economic Policy</p>
                <Link href="/experts/1" className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Publications */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">Latest Publications</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[1, 2].map((item) => (
              <div key={item} className="flex gap-6">
                <div className="relative w-48 h-64 flex-shrink-0">
                  <Image
                    src={`/publication-${item}.jpg`}
                    alt="Publication cover"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-blue-400 font-semibold text-sm">New Release</span>
                  <h3 className="text-2xl font-bold mt-2 mb-3">The Future of Democratic Institutions</h3>
                  <p className="text-gray-300 mb-4">A comprehensive study of democratic systems and their evolution in the modern era.</p>
                  <Link href="/publications/1" className="text-blue-400 font-semibold hover:text-blue-300">
                    Download PDF →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 