'use client'
import Image from 'next/image'
import { images } from '@/lib/images'
import { motion } from 'framer-motion'

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2 backdrop-blur-sm">
                About Us
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
                Shaping Policy Through Research
              </h1>
              <p className="mt-6 text-xl text-gray-200 max-w-3xl">
                A student-led think tank dedicated to advancing public policy through rigorous analysis and innovative solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Perrin?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Perrin Institute is a pioneering student-led think tank established at the 
                University of Virginia. We serve as a bridge between academic research and practical 
                policy implementation, focusing on creating innovative solutions for today&apos;s most 
                pressing public policy challenges.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/aboutpageimg2.jpg"
                alt="Perrin Institute Overview"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Founders Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Founders</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Perrin Institute was founded by two visionary UVA students committed to bridging the 
              gap between academic research and practical policy implementation.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {FOUNDERS.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="text-center"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/abtpageimg3.jpg"
                alt="Research at Perrin"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-50 py-20"
      >
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Us Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We&apos;re always looking for passionate individuals who want to contribute to meaningful 
            policy research and make a difference in public policy.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg 
              hover:bg-blue-700 transition-colors"
          >
            Get Involved
          </motion.a>
        </div>
      </motion.section>
    </div>
  )
} 