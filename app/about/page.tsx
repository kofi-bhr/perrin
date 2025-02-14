'use client'
import Image from 'next/image'
import { images } from '@/lib/images'

const FOUNDERS = [
  {
    name: "Cash Hilinski",
    role: "Co-Founder",
    image: images.founders.cash,
  },
  {
    name: "Finn B. Jarvi",
    role: "Co-Founder",
    image: images.founders.finn,
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <Image
          src="/aboutpageimg.jpg"
          alt="About Perrin Institute"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2 backdrop-blur-sm">
              About Us
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Shaping Policy Through Research
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl">
              A student-led think tank dedicated to advancing public policy through rigorous analysis and innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Perrin?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Perrin Institute is a pioneering student-led think tank established at the 
                University of Virginia. We serve as a bridge between academic research and practical 
                policy implementation, focusing on creating innovative solutions for today&apos;s most 
                pressing public policy challenges.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/aboutpageimg2.jpg"
                alt="Perrin Institute Overview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Founders</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Perrin Institute was founded by two visionary UVA students committed to bridging the 
            gap between academic research and practical policy implementation.
          </p>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {FOUNDERS.map((founder, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-medium">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/abtpageimg3.jpg"
                alt="Research at Perrin"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Perrin Institute is a student-led think tank at the University of Virginia, 
                dedicated to fostering innovative policy solutions through rigorous research and analysis. 
                We bring together diverse perspectives and emerging scholars to address pressing challenges 
                in public policy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our work spans multiple policy areas including economic development, environmental 
                sustainability, education reform, and social justice. Through collaboration with academic 
                experts and policy practitioners, we aim to bridge the gap between research and practical 
                policy implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Excellence",
                description: "Commitment to rigorous research methodology and evidence-based analysis in all our work."
              },
              {
                title: "Innovation",
                description: "Fostering creative solutions and fresh perspectives on complex policy challenges."
              },
              {
                title: "Impact",
                description: "Focusing on practical policy solutions that can create meaningful change in society."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We&apos;re always looking for passionate individuals who want to contribute to meaningful 
            policy research and make a difference in public policy.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg 
              hover:bg-blue-700 transition-colors"
          >
            Get Involved
          </a>
        </div>
      </section>
    </div>
  )
} 