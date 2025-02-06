'use client'
import Image from 'next/image'
import { images } from '@/lib/images'
import Link from 'next/link'
import { EXPERTS, type Expert } from '@/lib/constants'

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <Image
          src={images.heroFellows}
          alt="UVA Research Fellows"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2 backdrop-blur-sm">
              Our Team
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Meet Our Research Fellows
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl">
              A diverse group of emerging scholars and policy experts shaping the future of public policy.
            </p>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {EXPERTS.map((expert) => (
              <Link 
                key={expert.id}
                href={`/experts/${expert.id}`}
                className="block group bg-white border border-gray-100 rounded-lg shadow-sm 
                  hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      console.error(`Error loading image for ${expert.name}:`, e);
                      // Updated fallback image
                      e.currentTarget.src = "/default-avatar-photo-placeholder-profile-picture-vector.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {expert.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium mt-1">
                    {expert.role}
                  </p>
                  
                  {expert.mentor && (
                    <p className="text-gray-600 text-sm mt-2">
                      Mentor: {expert.mentor}
                    </p>
                  )}
                  
                  <p className="mt-4 text-gray-600 text-sm line-clamp-4">
                    {expert.bio}
                  </p>
                  
                  {expert.interests && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expert.interests.map((interest, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 