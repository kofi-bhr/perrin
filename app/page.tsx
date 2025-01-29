'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FlipWords } from "../components/ui/flip-words"
import { images } from '@/lib/images'
import nasa from '@/public/nasa.png'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  status: string
  url: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function Home() {
  const [latestPapers, setLatestPapers] = useState<Paper[]>([])
  const words = ["future", "public policy", "world", "legislation"]

  useEffect(() => {
    async function fetchLatestPapers() {
      try {
        const response = await fetch(`${API_URL}/papers`)
        if (!response.ok) throw new Error('Failed to fetch papers')
        const data = await response.json()
        // Sort by date and take latest 3
        const sorted = data.sort((a: Paper, b: Paper) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 3)
        setLatestPapers(sorted)
      } catch (error) {
        console.error('Error fetching papers:', error)
      }
    }

    fetchLatestPapers()
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[900px] md:h-screen flex items-center">
        <Image
          src={images.heroHome}
          alt="UVA campus"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="absolute w-full z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="2xl:max-w-3xl space-y-2 2xl:space-y-8">
              <div>
                <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2">
                  An Institution of The University of Virginia
                </span>
                <h1 className="mt-4 text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.15] tracking-tight drop-shadow-lg">
                  Shaping Tomorrow&apos;s <br/> <FlipWords words={words} />
                </h1>
              </div>
              <p className="text-xl text-gray-200 text-sm md:text-lg leading-relaxed max-w-4xl drop-shadow-lg">
                Leading research institution dedicated to advancing public policy through rigorous analysis
                and innovative solutions for a more prosperous and equitable society.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/research"
                  className="bg-white text-gray-900 px-6 py-2 text-lg font-semibold 
                    hover:bg-gray-100 transition-colors border-2 border-white"
                >
                  View Our Research
                </Link>
                <Link
                  href="/experts"
                  className="border-2 border-white text-white px-6 py-2 text-lg font-semibold 
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
            {[
              {
                image: nasa,
                category: 'Technology',
                title: 'NASA Research Journal: CHAPEA Operation Dynamics and Performance Utility Delta',
                description: 'A comprehensive analysis of Mars analog missions and recommendations for enhanced data collection',
                link: '/research/1'
              },
              {
                image: '/research-2.jpg',
                category: 'Economic Policy',
                title: 'Economic Impact of Green Energy Transition',
                description: 'Analyzing the economic implications of transitioning to renewable energy sources across different sectors',
                link: '/research/2'
              },
              {
                image: '/research-3.jpg',
                category: 'Social Policy',
                title: 'Digital Inclusion in Rural Communities',
                description: 'Examining barriers to digital access and proposing solutions for rural development',
                link: '/research/3'
              }
            ].map((item) => (
              <div key={item.title} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={`${item.title} thumbnail`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-blue-600 font-semibold text-sm">{item.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link href={item.link} className="text-blue-600 font-semibold hover:text-blue-700">
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

      {/* Latest Publications - Updated */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">Latest Publications</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {latestPapers.map((paper) => (
              <Link 
                key={paper.id}
                href={`/research/${paper.id}`}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden 
                  hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full 
                      bg-blue-600/20 text-blue-400">
                      {paper.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(paper.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 
                    transition-colors">
                    {paper.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {paper.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <span className="text-sm text-gray-400">{paper.author}</span>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                      Read More
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/research"
              className="inline-block border-2 border-blue-400 text-blue-400 px-8 py-3 
                font-medium hover:bg-blue-400 hover:text-gray-900 transition-colors"
            >
              View All Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 