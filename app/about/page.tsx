'use client'
import Image from 'next/image'
import { images } from '@/lib/images'
import { motion } from 'framer-motion'
import { FiArrowRight, FiUsers, FiTarget, FiAward, FiGlobe, FiBookOpen, FiTrendingUp } from 'react-icons/fi'
import Link from 'next/link'

const FOUNDERS = [
  {
    name: "Cash Hilinski",
    role: "Co-Founder",
    image: images.founders.cash,
    bio: "Former policy researcher at the Brookings Institution with expertise in data-driven policy analysis and economic development strategies."
  },
  {
    name: "Finn B. Jarvi",
    role: "Co-Founder",
    image: images.founders.finn,
    bio: "Background in computational social science with experience applying machine learning techniques to complex policy challenges."
  }
]

const VALUES = [
  {
    title: "Academic Excellence",
    description: "Commitment to rigorous research methodology and evidence-based analysis in all our work.",
    icon: <FiBookOpen className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Innovation",
    description: "Fostering creative solutions and fresh perspectives on complex policy challenges.",
    icon: <FiTrendingUp className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Impact",
    description: "Focusing on practical policy solutions that can create meaningful change in society.",
    icon: <FiTarget className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Collaboration",
    description: "Building partnerships across disciplines and institutions to enhance our research capabilities.",
    icon: <FiUsers className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Global Perspective",
    description: "Addressing policy challenges with an international lens and diverse cultural insights.",
    icon: <FiGlobe className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Excellence",
    description: "Striving for the highest standards in all aspects of our research and operations.",
    icon: <FiAward className="h-6 w-6 text-blue-400" />
  }
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black text-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full opacity-[0.03]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" style={{ top: `${i * 10}%` }}></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" style={{ left: `${i * 10}%` }}></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-400 text-xs uppercase tracking-widest">About Perrin Institute</span>
            </div>
            
            <h1 className="text-4xl font-serif font-bold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
              Shaping Policy Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Research</span>
            </h1>
            
            <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-300">
              A student-led think tank dedicated to advancing public policy through rigorous analysis and innovative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
                <span className="text-blue-400 text-xs uppercase tracking-widest">Our Story</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">What is Perrin Institute?</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The Perrin Institute is a pioneering student-led think tank established at the 
                University of Virginia. We serve as a bridge between academic research and practical 
                policy implementation, focusing on creating innovative solutions for today's most 
                pressing public policy challenges.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Founded by students passionate about data-driven policy analysis, we've grown into a 
                respected research institution that collaborates with leading academics, policymakers, 
                and industry experts to drive meaningful change through evidence-based approaches.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10"></div>
                <Image
                  src="/aboutpageimg2.jpg"
                  alt="Perrin Institute Overview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-30 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-2 md:order-1"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10"></div>
                <Image
                  src="/abtpageimg3.jpg"
                  alt="Research at Perrin"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-30 blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 blur-2xl"></div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
                <span className="text-blue-400 text-xs uppercase tracking-widest">Our Purpose</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The Perrin Institute is dedicated to fostering innovative policy solutions through rigorous research and analysis. 
                We bring together diverse perspectives and emerging scholars to address pressing challenges 
                in public policy.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our work spans multiple policy areas including economic development, environmental 
                sustainability, education reform, and social justice. Through collaboration with academic 
                experts and policy practitioners, we aim to bridge the gap between research and practical 
                policy implementation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
              <span className="text-blue-400 text-xs uppercase tracking-widest">Leadership</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Founders</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Perrin Institute was founded by two visionary UVA students committed to bridging the 
              gap between academic research and practical policy implementation.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {FOUNDERS.map((founder, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl overflow-hidden p-6 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{founder.name}</h3>
                    <p className="text-blue-400 font-medium mb-4">{founder.role}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{founder.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
              <span className="text-blue-400 text-xs uppercase tracking-widest">Principles</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Core Values</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              These principles guide our research, operations, and community engagement as we work to create meaningful impact.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-12 border border-white/10 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Mission</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              We're always looking for passionate individuals who want to contribute to meaningful 
              policy research and make a difference in public policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/application">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                >
                  Apply to Our Programs
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex justify-center items-center px-6 py-3 border border-white/20 text-base font-medium rounded-lg text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 