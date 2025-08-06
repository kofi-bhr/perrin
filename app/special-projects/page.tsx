"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiArrowRight, FiZap, FiTrendingUp, FiUsers, FiTarget, FiBarChart2, FiGlobe } from "react-icons/fi";


const containerVariants = {
  hidden: {opacity : 0},
  visible: {
    opacity : 1,
    transition: {
      staggerChildren : 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden :  {opacity:0, y:30},
  visible : {
    opacity : 1,
    y:0,
    transition: {
      duration : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]

    }
  }
}

const slideInVariants = {
  hidden : {opacity : 0, x:-50},
  visible : {
    opacity : 1,
    x:0,
    transition: {
      duration : 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }}


  // Partnership data with professional metrics
const partnerships = [
  {
    name: "Learn4Lanka",
    category: "Education Technology",
    description: "Transforming education infrastructure in Sri Lankan schools through direct resource delivery and strategic community partnerships.",
    metrics: [
      { label: "Students Reached", value: "5,000+", icon: FiUsers },
      { label: "Schools Partnered", value: "50+", icon: FiTarget },
      { label: "Communities Served", value: "20+", icon: FiGlobe }
    ],
    image: "/learn4lanka.avif",
    website: "https://learn4lanka.org/",
    status: "Active Partnership"
  },
  {
    name: "WikiJobs",
    category: "Career Intelligence Platform",
    description: "AI-powered career reentry platform providing personalized job matching and strategic career guidance for returning professionals.",
    metrics: [
      { label: "Platform Reach", value: "500K+", icon: FiBarChart2 },
      { label: "Success Rate", value: "94%", icon: FiTrendingUp },
      { label: "Career Placements", value: "15K+", icon: FiTarget }
    ],
    image: null,
    website: "https://wikijob.org/",
    status: "Strategic Alliance"
  },
  {
    name: "Menstrual Equity Initiative",
    category: "Health Research & Policy",
    description: "All-female-led research organization advancing evidence-based policy for menstrual health and reproductive equity through comprehensive research initiatives.",
    metrics: [
      { label: "Research Studies", value: "10+", icon: FiBarChart2 },
      { label: "Policy Initiatives", value: "25+", icon: FiTarget },
      { label: "Educational Outreach", value: "1,000+", icon: FiUsers }
    ],
    image: "/menstral.png",
    website: undefined,
    status: "Research Partnership"
  },
  {
    name: "OutsideConnection",
    category: "Reentry Employment Platform",
    description: "Leading second-chance employment platform facilitating successful workforce reintegration through nationwide fair-chance opportunities.",
    metrics: [
      { label: "Reentrants Served", value: "10K+", icon: FiUsers },
      { label: "States Covered", value: "50", icon: FiGlobe },
      { label: "Cities Active", value: "126", icon: FiTarget }
    ],
    image: null,
    website: "https://www.outsideconnection.org/",
    status: "Impact Partnership"
  },
  {
    name: "TechPals",
    category: "Digital Literacy Initiative",
    description: "Comprehensive digital literacy program bridging generational technology gaps through structured education and volunteer mentorship.",
    metrics: [
      { label: "Program Participants", value: "5K+", icon: FiUsers },
      { label: "Training Programs", value: "8+", icon: FiBarChart2 },
      { label: "Volunteer Network", value: "100+", icon: FiTarget }
    ],
    image: null,
    website: "https://www.techpals.io/",
    status: "Educational Alliance"
  },
  {
    name: "VenturEd",
    category: "Tech Fellowship Program",
    description: "Elite 8-week Silicon Valley startup fellowship connecting high-potential students with Y Combinator partners and real-world technology opportunities.",
    metrics: [
      { label: "Diversity Increase", value: "+27.4%", icon: FiTrendingUp },
      { label: "Program Duration", value: "8 Weeks", icon: FiTarget },
      { label: "Partner Network", value: "YC Alumni", icon: FiGlobe }
    ],
    image: null,
    website: "https://www.venturedglobal.org/",
    status: "Fellowship Partnership"
  }
];

export default function SpecialProjectsPage() {

  return(
    <div className = "min-h-screen bg-white text-gray-900">
      {/*Hero Section*/}

      <section className = "relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className = "absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white">
        </div>

        <div className = "relative max-w-7xl mx-auto">
          <motion.div initial = "hidden" animate = "visible" variants = {containerVariants} className = "text-center">
            <div className = "inline-flex items-center px-4 py-2 bg-gray-100 border-gray-200 rounded-full">
              <FiZap className = "h-4 w-4 text-blue-600 mr-2" />
              <span className = "text-sm font-medium text-gray-700">
                Strategic Partnerships
              </span>
            </div>

          </motion.div>

           <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight leading-tight"
            >
              Special Projects
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-16 font-light"
            >
              Strategic alliances with innovative organizations advancing policy research, 
              democratic innovation, and systemic change through data-driven solutions.
            </motion.p>



            <motion.div variants = {itemVariants} className = "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" >

            <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-xl">
                <FiUsers className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 mb-1">500K+</div>
                <div className="text-sm text-gray-600">People Reached</div>
              </div>
              <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-xl">
                <FiTarget className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 mb-1">70+</div>
                <div className="text-sm text-gray-600">Institutions Supported</div>
              </div>
              <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-xl">
                <FiTrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 mb-1">15K+</div>
                <div className="text-sm text-gray-600">Career Placements</div>
              </div>
            </motion.div>
        </div>
      </section>

      {/*Partnerships Section*/}
      <section className = "py-20 px-4 sm:px-6 lg:px-8">
        <div className = "max-w-7xl mx-auto">

          <motion.div
            initial = "hidden"
            animate = "visible"
            variants = {containerVariants}
            className = "space-y-16"
            viewport={{ once: true, margin:"-100px" }}
            >
              {partnerships.map((partnership, index) => (
                <motion.div
                  key={partnership.name}
                  variants={itemVariants}
                  className = "group"
                >
                <div className = "bg-white border border-gray-200 rounded-2xl p-8 lg:p-12 shadown-sm hover:shadow-md transition-all duration-500">
                  <div className = "grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/*Content*/}

                    <div className = "lg:col-span-2 space-y-8">
                      <div className = 'space-y-6'>
                        <div className = "flex items-center justify-between">
                          <div className = "inline-flex items-center px-3 py-1 bg-gray-100 border-gray-200 rounded-full">
                            <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                              {partnership.category}
                            </span>
                          </div>
                          <div className = "px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                            <span className = "text-xs font-medium text-blue-600">
                              {partnership.status}  
                            </span>

                          </div>
                          
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 leading-tight tracking-tight">
                          {partnership.name}
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                          {partnership.description}
                        </p>
                      </div>

                      {/*Metrics*/}
                      
                    </div>
                  </div>
                </div>
                </motion.div>
              ))}
            </motion.div>


          </div>
      </section>
    </div>
  )
}