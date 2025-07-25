'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiMail, FiPhone, FiLinkedin, FiGlobe, FiInstagram, FiMapPin, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi'
import Head from 'next/head'
import { Expert, EXPERTS } from '@/lib/experts'

interface ExpertProfilePageProps {
  params: {
    id: string
  }
}

export default function ExpertProfilePage({ params }: ExpertProfilePageProps) {
  const [expert, setExpert] = useState<Expert | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const expertId = parseInt(params.id)
    const foundExpert = EXPERTS.find(e => e.id === expertId)
    
    if (!foundExpert) {
      notFound()
    }
    
    setExpert(foundExpert)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!expert) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>{expert.name} | The Perrin Institution</title>
        <meta name="description" content={expert.bio} />
      </Head>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/experts"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to All Experts
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden">
                {expert.image && expert.image !== "" ? (
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-medium text-4xl md:text-5xl bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full flex items-center justify-center">
                    {expert.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="mb-4">
                {expert.category && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
                    {expert.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
                  {expert.name}
                </h1>
                <p className="text-xl text-gray-600 font-medium mb-4">
                  {expert.role}
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                {expert.email && (
                  <a 
                    href={`mailto:${expert.email}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FiMail className="mr-2 h-4 w-4" />
                    {expert.email}
                  </a>
                )}
                {expert.phone && (
                  <a 
                    href={`tel:${expert.phone}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FiPhone className="mr-2 h-4 w-4" />
                    {expert.phone}
                  </a>
                )}
              </div>

              {/* Social Links */}
              {expert.socialLinks && (
                <div className="flex gap-3 mt-6">
                  {expert.socialLinks.linkedin && (
                    <a
                      href={expert.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <FiLinkedin className="h-5 w-5" />
                    </a>
                  )}
                  {expert.socialLinks.website && (
                    <a
                      href={expert.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <FiGlobe className="h-5 w-5" />
                    </a>
                  )}
                  {expert.socialLinks.instagram && (
                    <a
                      href={expert.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <FiInstagram className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-8"
              >
                <h2 className="text-2xl font-medium text-gray-900 mb-6 flex items-center">
                  <FiUsers className="mr-3 h-6 w-6 text-blue-600" />
                  About
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg">
                  {expert.bio}
                </div>
              </motion.div>

              {/* Areas of Expertise */}
              {expert.interests && expert.interests.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-medium text-gray-900 mb-6 flex items-center">
                    <FiBookOpen className="mr-3 h-6 w-6 text-blue-600" />
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {expert.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full text-sm border border-blue-100"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Affiliations */}
              {expert.affiliations && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FiAward className="mr-2 h-5 w-5 text-blue-600" />
                    Affiliations
                  </h3>
                  <div className="space-y-4">
                    {expert.affiliations.education && expert.affiliations.education.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Education</h4>
                        <ul className="space-y-1">
                          {expert.affiliations.education.map((edu, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {expert.affiliations.organizations && expert.affiliations.organizations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Organizations</h4>
                        <ul className="space-y-1">
                          {expert.affiliations.organizations.map((org, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {org}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {expert.affiliations.workExperience && expert.affiliations.workExperience.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Experience</h4>
                        <ul className="space-y-1">
                          {expert.affiliations.workExperience.map((work, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {work}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  {expert.email && (
                    <a
                      href={`mailto:${expert.email}`}
                      className="flex items-center justify-center w-full px-4 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm border border-gray-200"
                    >
                      <FiMail className="mr-2 h-4 w-4" />
                      Send Email
                    </a>
                  )}
                  {expert.socialLinks?.linkedin && (
                    <a
                      href={expert.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      <FiLinkedin className="mr-2 h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 