'use client'
import Image from 'next/image'
import { images } from '@/lib/images'
import { motion } from 'framer-motion'
import { FiExternalLink, FiCalendar, FiUsers, FiMapPin } from 'react-icons/fi'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <Image
          src={images.heroEvents}
          alt="UVA Events"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2 backdrop-blur-sm">
                Events & Programs
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
                University Events
              </h1>
              <p className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto">
                Discover upcoming events, lectures, and programs at the University of Virginia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative -mt-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: FiCalendar,
                title: "Academic Calendar",
                description: "Access comprehensive academic schedules and important dates"
              },
              {
                icon: FiUsers,
                title: "Community Events",
                description: "Engage with lectures, workshops, and cultural celebrations"
              },
              {
                icon: FiMapPin,
                title: "Campus Activities",
                description: "Discover events happening across UVA grounds"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 
                  hover:shadow-lg transition-all duration-300 group"
              >
                <feature.icon className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 
                  transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Calendar Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 
              relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full 
                -mr-32 -mt-32 opacity-50" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full 
                -ml-32 -mb-32 opacity-50" />
              
              <div className="relative">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
                  UVA Events Calendar
                </h2>
                <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                  Visit the official University of Virginia events calendar to browse and register for 
                  upcoming events, lectures, seminars, and other academic programs.
                </p>
                <div className="text-center">
                  <a
                    href="https://www.virginia.edu/calendar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 
                      rounded-xl font-medium hover:bg-blue-700 transition-colors group/btn 
                      shadow-lg hover:shadow-xl"
                  >
                    View UVA Calendar
                    <FiExternalLink className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                For event-specific inquiries or support, please contact the respective event organizers 
                or visit the UVA events support page.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 