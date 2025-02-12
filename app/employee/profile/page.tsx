'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiBook, FiAward, FiLink } from 'react-icons/fi'
import { images } from '@/lib/images'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

interface Profile {
  name: string
  email: string
  phone: string
  bio: string
  expertise: string[]
  publications: string[]
  education: string[]
  links: { title: string; url: string }[]
  image: string | null
}

export default function EmployeeProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
    bio: '',
    expertise: [],
    publications: [],
    education: [],
    links: [],
    image: null
  })
  const [isEditing, setIsEditing] = useState(false)
  const [newExpertise, setNewExpertise] = useState('')
  const [newPublication, setNewPublication] = useState('')
  const [newEducation, setNewEducation] = useState('')
  const [newLink, setNewLink] = useState({ title: '', url: '' })

  useEffect(() => {
    // Check authentication
    const email = localStorage.getItem('userEmail')
    if (email !== 'employee@perrin.org') {
      router.push('/auth/signin')
      return
    }

    // Load profile from localStorage
    const savedProfile = localStorage.getItem('employeeProfile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [router])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Send complete profile including image
      const response = await fetch(`${API_URL}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)  // Send complete profile including image
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      // Save to localStorage
      localStorage.setItem('employeeProfile', JSON.stringify(profile))
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile. Please try again.')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        // Check file size
        if (file.size > 2 * 1024 * 1024) {
          alert('Image must be smaller than 2MB')
          return
        }

        // Create canvas for compression
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // Load image with proper typing
        const loadImage = () => new Promise<HTMLImageElement>((resolve, reject) => {
          const image = document.createElement('img')
          image.onload = () => resolve(image)
          image.onerror = () => reject(new Error('Failed to load image'))
          image.src = URL.createObjectURL(file)
        })

        try {
          const loadedImage = await loadImage()

          // Calculate new dimensions (max 400px)
          const MAX_SIZE = 400
          let width = loadedImage.width
          let height = loadedImage.height

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width
              width = MAX_SIZE
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height
              height = MAX_SIZE
            }
          }

          // Set canvas size and draw image
          canvas.width = width
          canvas.height = height
          if (ctx) {
            ctx.drawImage(loadedImage, 0, 0, width, height)

            // Get compressed base64 string
            const compressedImage = canvas.toDataURL('image/jpeg', 0.7)

            // Update profile
            setProfile(prev => ({ ...prev, image: compressedImage }))
          }

          // Clean up
          URL.revokeObjectURL(loadedImage.src)
        } catch (loadError) {
          console.error('Error loading image:', loadError)
          alert('Failed to load image. Please try again.')
        }
      } catch (error) {
        console.error('Error processing image:', error)
        alert('Failed to process image. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <Image
          src={images.heroFellows}
          alt="Profile"
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
                Employee Profile
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
                {profile.name || 'Your Profile'}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-12">
                <div className="flex gap-8 items-center">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white 
                    bg-white shadow-lg">
                    {profile.image ? (
                      <img
                        src={profile.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <FiUser className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    {isEditing && (
                      <label className="absolute inset-0 bg-black/50 flex items-center justify-center 
                        cursor-pointer transition-opacity hover:opacity-75">
                        <span className="text-white text-sm">Change Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="text-3xl font-bold mb-2 border-b-2 border-blue-500 focus:outline-none"
                        placeholder="Your Name"
                      />
                    ) : (
                      <h2 className="text-3xl font-bold mb-2">{profile.name || 'Your Name'}</h2>
                    )}
                    <p className="text-gray-600">Research Fellow at Perrin Institute</p>
                  </div>
                </div>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isEditing 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Contact Information */}
                  <section>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FiMail className="text-gray-400" />
                        {isEditing ? (
                          <input
                            type="email"
                            value={profile.email}
                            onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            placeholder="Email"
                          />
                        ) : (
                          <span>{profile.email || 'Add email'}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <FiPhone className="text-gray-400" />
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                            className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            placeholder="Phone"
                          />
                        ) : (
                          <span>{profile.phone || 'Add phone'}</span>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Bio */}
                  <section>
                    <h2 className="text-xl font-bold mb-4">Bio</h2>
                    {isEditing ? (
                      <textarea
                        value={profile.bio}
                        onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full h-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                          focus:border-transparent"
                        placeholder="Write your bio..."
                      />
                    ) : (
                      <p className="text-gray-600">{profile.bio || 'Add your bio'}</p>
                    )}
                  </section>

                  {/* Areas of Expertise */}
                  <section>
                    <h2 className="text-xl font-bold mb-4">Areas of Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {item}
                          {isEditing && (
                            <button
                              onClick={() => setProfile(prev => ({
                                ...prev,
                                expertise: prev.expertise.filter((_, i) => i !== index)
                              }))}
                              className="ml-2 text-blue-400 hover:text-blue-600"
                            >
                              ×
                            </button>
                          )}
                        </span>
                      ))}
                      {isEditing && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newExpertise}
                            onChange={e => setNewExpertise(e.target.value)}
                            className="border rounded px-2 py-1 text-sm"
                            placeholder="Add expertise"
                          />
                          <button
                            onClick={() => {
                              if (newExpertise) {
                                setProfile(prev => ({
                                  ...prev,
                                  expertise: [...prev.expertise, newExpertise]
                                }))
                                setNewExpertise('')
                              }
                            }}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Publications */}
                  <section>
                    <h2 className="text-xl font-bold mb-4">Publications</h2>
                    <div className="space-y-2">
                      {profile.publications.map((pub, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiBook className="text-gray-400 flex-shrink-0" />
                          <span>{pub}</span>
                          {isEditing && (
                            <button
                              onClick={() => setProfile(prev => ({
                                ...prev,
                                publications: prev.publications.filter((_, i) => i !== index)
                              }))}
                              className="text-red-400 hover:text-red-600"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={newPublication}
                            onChange={e => setNewPublication(e.target.value)}
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="Add publication"
                          />
                          <button
                            onClick={() => {
                              if (newPublication) {
                                setProfile(prev => ({
                                  ...prev,
                                  publications: [...prev.publications, newPublication]
                                }))
                                setNewPublication('')
                              }
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Education */}
                  <section>
                    <h2 className="text-xl font-bold mb-4">Education</h2>
                    <div className="space-y-2">
                      {profile.education.map((edu, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiAward className="text-gray-400 flex-shrink-0" />
                          <span>{edu}</span>
                          {isEditing && (
                            <button
                              onClick={() => setProfile(prev => ({
                                ...prev,
                                education: prev.education.filter((_, i) => i !== index)
                              }))}
                              className="text-red-400 hover:text-red-600"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={newEducation}
                            onChange={e => setNewEducation(e.target.value)}
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="Add education"
                          />
                          <button
                            onClick={() => {
                              if (newEducation) {
                                setProfile(prev => ({
                                  ...prev,
                                  education: [...prev.education, newEducation]
                                }))
                                setNewEducation('')
                              }
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Links */}
                  <section>
                    <h2 className="text-xl font-bold mb-4">Links</h2>
                    <div className="space-y-2">
                      {profile.links.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiLink className="text-gray-400 flex-shrink-0" />
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {link.title}
                          </a>
                          {isEditing && (
                            <button
                              onClick={() => setProfile(prev => ({
                                ...prev,
                                links: prev.links.filter((_, i) => i !== index)
                              }))}
                              className="text-red-400 hover:text-red-600"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={newLink.title}
                            onChange={e => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="Link title"
                          />
                          <input
                            type="url"
                            value={newLink.url}
                            onChange={e => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="URL"
                          />
                          <button
                            onClick={() => {
                              if (newLink.title && newLink.url) {
                                setProfile(prev => ({
                                  ...prev,
                                  links: [...prev.links, newLink]
                                }))
                                setNewLink({ title: '', url: '' })
                              }
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 