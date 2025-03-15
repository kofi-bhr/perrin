'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiDatabase, FiGlobe, FiCpu, FiBarChart2, FiLayers } from 'react-icons/fi'
import { useState } from 'react'

// Lab data
const LABS = [
  {
    id: 'ai-policy',
    title: 'AI Policy & Governance',
    icon: <FiCpu className="h-6 w-6" />,
    color: 'from-blue-500 to-indigo-600',
    textColor: 'text-blue-400',
    description: 'Developing frameworks for responsible AI governance and policy recommendations that balance innovation with ethical considerations.',
    stats: [
      { label: 'Publications', value: '14' },
      { label: 'Researchers', value: '8' },
      { label: 'Partnerships', value: '3' }
    ],
    image: '/lab-ai-policy.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Algorithmic Impact Assessment Framework',
      'AI Governance Models for Public Sector',
      'Ethics in Machine Learning Research'
    ]
  },
  {
    id: 'data-democracy',
    title: 'Data & Democracy',
    icon: <FiDatabase className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-600',
    textColor: 'text-purple-400',
    description: 'Exploring how data-driven technologies impact democratic processes and developing solutions to strengthen democratic institutions.',
    stats: [
      { label: 'Publications', value: '11' },
      { label: 'Researchers', value: '6' },
      { label: 'Case Studies', value: '5' }
    ],
    image: '/lab-data-democracy.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Digital Election Integrity Project',
      'Misinformation Propagation Analysis',
      'Civic Technology Innovation'
    ]
  },
  {
    id: 'climate-tech',
    title: 'Climate Tech Policy',
    icon: <FiGlobe className="h-6 w-6" />,
    color: 'from-emerald-500 to-teal-600',
    textColor: 'text-emerald-400',
    description: 'Researching policy frameworks that accelerate the deployment of climate technologies while ensuring equitable access and implementation.',
    stats: [
      { label: 'Publications', value: '9' },
      { label: 'Researchers', value: '7' },
      { label: 'Policy Briefs', value: '12' }
    ],
    image: '/lab-climate-tech.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Carbon Capture Policy Framework',
      'Green Energy Transition Models',
      'Climate Tech Equity Assessment'
    ]
  },
  {
    id: 'economic-innovation',
    title: 'Economic Innovation',
    icon: <FiBarChart2 className="h-6 w-6" />,
    color: 'from-amber-500 to-orange-600',
    textColor: 'text-amber-400',
    description: 'Developing data-driven policy recommendations to foster economic innovation and resilience in rapidly changing technological landscapes.',
    stats: [
      { label: 'Publications', value: '15' },
      { label: 'Researchers', value: '9' },
      { label: 'Economic Models', value: '7' }
    ],
    image: '/lab-economic.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Future of Work Initiative',
      'Digital Economy Regulation Framework',
      'Innovation Ecosystem Mapping'
    ]
  },
  {
    id: 'computational-policy',
    title: 'Computational Policy',
    icon: <FiLayers className="h-6 w-6" />,
    color: 'from-cyan-500 to-blue-600',
    textColor: 'text-cyan-400',
    description: 'Using advanced computational methods to analyze policy issues and develop evidence-based recommendations for complex societal challenges.',
    stats: [
      { label: 'Publications', value: '12' },
      { label: 'Researchers', value: '10' },
      { label: 'Algorithms Developed', value: '6' }
    ],
    image: '/lab-computational.jpg',
    defaultImage: '/default-lab.jpg',
    projects: [
      'Policy Simulation Models',
      'Computational Social Science Methods',
      'Predictive Policy Analytics'
    ]
  }
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

export default function LabsPage() {
  const [activeLabId, setActiveLabId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black text-white">
      {/* Hero Section with 3D tech elements */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute w-full h-full opacity-[0.03]">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={`h-line-${i}`} 
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                style={{ top: `${i * 5}%` }}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={`v-line-${i}`} 
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" 
                style={{ left: `${i * 5}%` }}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
          
          {/* Enhanced floating particles with 3D depth effect */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute bg-blue-400 rounded-full"
              style={{
                width: Math.random() * 4 + (i % 3) + "px",
                height: Math.random() * 4 + (i % 3) + "px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: `blur(${i % 2 ? 1 : 0}px)`,
                opacity: 0.1 + (i % 10) * 0.01,
                zIndex: i % 3
              }}
              animate={{
                y: [0, Math.random() * -30 - 10, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, Math.random() * 0.5 + 1.2, 1],
                opacity: [0.1 + (i % 10) * 0.01, 0.3 + (i % 10) * 0.01, 0.1 + (i % 10) * 0.01],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Glowing orbs in background for depth */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 40%, rgba(59, 130, 246, 0) 70%)`,
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2,
                filter: "blur(40px)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            {/* Enhanced badge with 3D hover effect */}
            <motion.div 
              className="relative group mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "blur(15px)" }}
              />
              <motion.div 
                className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-lg shadow-blue-900/5"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 0 20px 2px rgba(59, 130, 246, 0.3)" 
                }}
              >
                <motion.div 
                  className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3 relative"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-400"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>
                <span className="text-blue-300 text-sm uppercase tracking-widest font-medium">Research Labs</span>
              </motion.div>
            </motion.div>
            
            {/* Title with animated highlight */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 relative">Research Labs</span>
              </h1>
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 96, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <p className="max-w-3xl mx-auto text-lg text-blue-100/70 leading-relaxed">
                Our specialized labs bring together researchers, policy experts, and technologists 
                to address the most challenging problems at the intersection of technology and public policy.
              </p>
            </motion.div>
            
            {/* Research Areas Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { label: "Research Labs", value: "5" },
                { label: "Researchers", value: "40+" },
                { label: "Publications", value: "60+" },
                { label: "Technologies", value: "12" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/10 px-6 py-4 rounded-xl flex flex-col items-center relative overflow-hidden group"
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 1 }}
                  />
                  <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-sm text-blue-300/70">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Labs Showcase Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {LABS.map((lab, index) => (
              <motion.div 
                key={lab.id}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="relative group"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                onClick={() => setActiveLabId(activeLabId === lab.id ? null : lab.id)}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>
                
                <div className={`h-full rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-sm relative z-10 transition-all duration-300 ${activeLabId === lab.id ? 'ring-2 ring-blue-500/50' : 'group-hover:border-blue-500/30'}`}>
                  {/* Lab card header with gradient */}
                  <div className={`h-2 w-full bg-gradient-to-r ${lab.color}`}></div>
                  
                  <div className="p-6">
                    {/* Icon and title row */}
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${lab.color} flex items-center justify-center mr-4 shadow-lg`}>
                        <div className="text-white">
                          {lab.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white">{lab.title}</h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{lab.description}</p>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {lab.stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-3 text-center">
                          <div className={`text-lg font-bold ${lab.textColor}`}>{stat.value}</div>
                          <div className="text-gray-400 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Projects list - only visible when active */}
                    <motion.div 
                      className="space-y-2 mb-6"
                      initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                      animate={{ 
                        height: activeLabId === lab.id ? 'auto' : 0,
                        opacity: activeLabId === lab.id ? 1 : 0,
                        marginBottom: activeLabId === lab.id ? 24 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="font-medium text-white mb-2">Current Projects:</h4>
                      <ul className="space-y-1">
                        {lab.projects.map((project, i) => (
                          <li key={i} className="flex items-start">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${lab.textColor} mt-1.5 mr-2`}></span>
                            <span className="text-gray-300 text-sm">{project}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    {/* Action link */}
                    <div className="flex justify-between items-center">
                      <button 
                        className={`text-sm ${lab.textColor} flex items-center transition-all hover:opacity-80`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLabId(activeLabId === lab.id ? null : lab.id);
                        }}
                      >
                        <span>{activeLabId === lab.id ? 'View Less' : 'View Details'}</span>
                        <FiArrowRight className="ml-1" />
                      </button>
                      
                      <div className="text-xs text-gray-500">Lab ID: {lab.id}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full mb-6 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <motion.div 
                className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full mr-2"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <span className="text-blue-300 text-xs uppercase tracking-widest font-medium">Technologies</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Research Technologies</span>
            </h2>
            
            <p className="max-w-3xl mx-auto text-gray-300 mb-4">
              Our labs leverage advanced technologies and methodologies to push the boundaries of policy research and analysis.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced Data Analytics",
                description: "Utilizing big data techniques to uncover patterns and insights in complex policy datasets",
                icon: "📊",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Machine Learning Models",
                description: "Developing predictive models to forecast policy outcomes and scenario planning",
                icon: "🧠",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Natural Language Processing",
                description: "Analyzing policy documents and public discourse to extract meaningful insights",
                icon: "📝",
                color: "from-amber-500 to-orange-500"
              },
              {
                title: "Visualization Tools",
                description: "Creating interactive data visualizations to communicate complex policy concepts",
                icon: "📈",
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Simulation Frameworks",
                description: "Building policy simulations to test intervention strategies before implementation",
                icon: "🔬",
                color: "from-red-500 to-pink-500"
              },
              {
                title: "Network Analysis",
                description: "Mapping relationship networks to understand stakeholder dynamics in policy ecosystems",
                icon: "🌐",
                color: "from-indigo-500 to-blue-500"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tech.color} flex items-center justify-center mb-4 text-2xl`}>
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{tech.title}</h3>
                  <p className="text-gray-400">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Collaboration CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl"
          >
            <div className="relative p-8 md:p-12">
              {/* Background elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
              
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Collaborate with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Research Labs</span>
                </h2>
                
                <p className="text-lg text-gray-300 mb-8 max-w-3xl">
                  We're looking for research partners, policy practitioners, and technical experts to join our mission of developing innovative policy solutions through rigorous research and analysis.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/application">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-4 px-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 group"
                    >
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: 'loop', 
                          duration: 2,
                          ease: 'linear'
                        }}
                      />
                      <span className="relative flex items-center z-10">
                        <span>Apply for Collaboration</span>
                        <motion.span 
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: "easeInOut"
                          }}
                          className="ml-2"
                        >
                          <FiArrowRight className="h-5 w-5" />
                        </motion.span>
                      </span>
                    </motion.button>
                  </Link>
                  
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ 
                        scale: 1.03, 
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium py-4 px-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-white/30 relative overflow-hidden"
                    >
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                        initial={{ x: '-100%' }}
                        whileHover={{ 
                          x: '100%',
                          transition: { duration: 0.8 }
                        }}
                      />
                      <span className="relative z-10">Contact Our Team</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
