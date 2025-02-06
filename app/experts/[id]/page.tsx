'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { EXPERTS, type Expert } from '@/lib/constants'
import { FiArrowLeft } from 'react-icons/fi'
import { images } from '@/lib/images'

export default function ExpertPage() {
  const params = useParams()
  const router = useRouter()
  const expert = EXPERTS.find(e => e.id.toString() === params.id)

  if (!expert) {
    return <div>Expert not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Updated to use UVA image */}
      <div className="h-[40vh] relative">
        <Image
          src={images.heroFellows}
          alt="UVA Campus"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-blue-400 mb-6 group 
            bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Research Fellows
        </button>

        {/* Expert Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Profile Image */}
              <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {expert.name}
                  </h1>
                  <p className="text-blue-600 font-medium text-lg">
                    {expert.role}
                  </p>
                </div>
                
                {expert.mentor && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <span className="font-medium text-blue-900">Mentor: </span>
                    <span className="text-blue-800">{expert.mentor}</span>
                  </div>
                )}

                <p className="text-gray-600 leading-relaxed text-lg">
                  {expert.bio}
                </p>
              </div>
            </div>

            {/* Research Interests */}
            {expert.interests && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Research Interests
                </h2>
                <div className="flex flex-wrap gap-3">
                  {expert.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium
                        hover:bg-blue-100 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Publications or Additional Content */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Current Research Focus
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Working on cutting-edge policy research and analysis in their areas of expertise.
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </div>
  )
} 