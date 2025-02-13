'use client'
import Image from 'next/image'
import { images } from '@/lib/images'
import { motion } from 'framer-motion'
import { FiCalendar, FiExternalLink } from 'react-icons/fi'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <Image
          src={images.heroEvents}
          alt="UVA Events"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-400 font-semibold tracking-wider uppercase 
                bg-black/30 px-4 py-2 backdrop-blur-sm rounded-lg">
                Events & Activities
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
                Stay Connected with <br />UVA Events
              </h1>
              <p className="mt-6 text-xl text-gray-200 max-w-3xl">
                Discover lectures, seminars, and networking opportunities at the University of Virginia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Calendar Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <FiCalendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  UVA Events Calendar
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Access the official University of Virginia events calendar. Find academic talks, 
                  policy discussions, student activities, and more. All events are hosted by UVA, 
                  its schools, departments, units and approved programs.
                </p>
                <a
                  href="https://www.virginia.edu/calendar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl
                    hover:bg-blue-700 transition-colors group"
                >
                  View Calendar
                  <FiExternalLink className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {[
                {
                  title: "Academic Events",
                  description: "Attend lectures, seminars, and workshops from leading scholars and practitioners."
                },
                {
                  title: "Policy Discussions",
                  description: "Engage in meaningful discussions about current policy issues and research."
                },
                {
                  title: "Networking Opportunities",
                  description: "Connect with fellow researchers, policy experts, and industry leaders."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="mt-20 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest events and opportunities at UVA. The events calendar 
              is regularly updated with new academic and policy-related activities.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 