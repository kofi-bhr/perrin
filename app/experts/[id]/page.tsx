'use client'
import { useParams, useRouter } from 'next/navigation'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import { HiOutlineAcademicCap, HiOutlineOfficeBuilding, HiOutlineUserGroup } from 'react-icons/hi'
import { motion } from 'framer-motion'

interface Expert {
  id: number
  name: string
  role: string
  bio: string
  image: string
  email?: string
  phone?: string
  mentor?: string
  interests?: string[]
  category?: string
  affiliations?: {
    education?: string[]
    workExperience?: string[]
    organizations?: string[]
  }
  socialLinks?: {
    linkedin?: string
    instagram?: string
    website?: string
  }
  stats?: {
    sat?: string
    act?: string
    lsat?: string
  }
}

const EXPERTS: Expert[] = [
  {
    id: 1,
    name: "Finn Järvi",
    role: "Founder & President",
    bio: "Founder and President of Perrin Institute.",
    image: "",
    email: "founderperrin@gmail.com",
    category: "Leadership"
  },
  {
    id: 2,
    name: "Cash Hilinski",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Co-Founder and Chief Technology Officer leading technical strategy and implementation.",
    image: "",
    category: "Leadership"
  },
  {
    id: 3,
    name: "Samuel Riverson",
    role: "Chief Marketing Officer",
    bio: "Chief Marketing Officer responsible for all marketing initiatives.",
    image: "",
    category: "Leadership"
  },
  {
    id: 4,
    name: "Thomas Fang",
    role: "Chief of Staff",
    bio: "Chief of Staff overseeing operations and team coordination.",
    image: "",
    email: "hayobro7512@gmail.com",
    category: "Leadership"
  },
  {
    id: 5,
    name: "Ayesha Murtaza",
    role: "Chief Operating Officer",
    bio: "Chief Operating Officer managing day-to-day operations.",
    image: "",
    category: "Leadership"
  },
  {
    id: 6,
    name: "Agneya Tharun",
    role: "Chief Information Security Officer",
    bio: "Chief Information Security Officer ensuring data protection and security protocols.",
    image: "",
    category: "Leadership"
  },
  {
    id: 7,
    name: "Arian Rakhmetzhanov",
    role: "Chief Information Officer",
    bio: "Chief Information Officer overseeing information technology strategy.",
    image: "",
    category: "Leadership"
  },
  {
    id: 8,
    name: "Emmanuel Asamoah",
    role: "Chief Compliance Officer",
    bio: "Chief Compliance Officer ensuring regulatory compliance.",
    image: "",
    category: "Leadership"
  },
  {
    id: 9,
    name: "Danielle Dee",
    role: "Editor-In-Chief",
    bio: "Editor-In-Chief managing content strategy and publication.",
    image: "",
    email: "danielled7599@gmail.com",
    category: "Leadership"
  },
  {
    id: 10,
    name: "Larry Franklin",
    role: "Chief Design Officer",
    bio: "Chief Design Officer leading visual design and user experience.",
    image: "",
    category: "Leadership"
  },
  {
    id: 11,
    name: "Avani Agarwal",
    role: "Software Engineer",
    bio: "Software Engineer developing and maintaining applications.",
    image: "",
    email: "avanipersonal7@gmail.com",
    category: "Engineering"
  },
  {
    id: 12,
    name: "Chankyu Kim",
    role: "Software Engineer",
    bio: "Software Engineer focused on development and technical solutions.",
    image: "",
    email: "nehemiahk.perrin@gmail.com",
    category: "Engineering"
  },
  {
    id: 13,
    name: "Cody Coleman",
    role: "Director of Technology",
    bio: "Director of Technology overseeing technical initiatives and strategy.",
    image: "",
    category: "Engineering"
  },
  {
    id: 14,
    name: "Rienat Kharian",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing policy implications and opportunities.",
    image: "",
    category: "Research"
  },
  {
    id: 15,
    name: "Kashaf Alvi",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting research on various policy areas.",
    image: "",
    category: "Research"
  },
  {
    id: 16,
    name: "Aayam Bansal",
    role: "Policy Researcher",
    bio: "Policy Researcher specializing in policy analysis and development.",
    image: "",
    category: "Research"
  },
  {
    id: 17,
    name: "Daniel Tu",
    role: "Policy Researcher",
    bio: "Policy Researcher focusing on policy implementation and evaluation.",
    image: "",
    category: "Research"
  },
  {
    id: 18,
    name: "Lucas Benardete",
    role: "Policy Researcher",
    bio: "Policy Researcher investigating policy impacts and effectiveness.",
    image: "",
    category: "Research"
  },
  {
    id: 19,
    name: "Anirudh Polagani",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative policy solutions.",
    image: "",
    email: "anirudh.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 20,
    name: "Riya Dutta",
    role: "Policy Researcher",
    bio: "Policy Researcher examining policy frameworks and outcomes.",
    image: "",
    email: "rdutta.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 21,
    name: "Jacob Wolmetz",
    role: "Policy Researcher",
    bio: "Policy Researcher studying emerging policy trends and challenges.",
    image: "",
    category: "Research"
  },
  {
    id: 22,
    name: "Yash Laddha",
    role: "Policy Researcher",
    bio: "Policy Researcher contributing to policy innovation and research.",
    image: "",
    email: "yashladdha75@gmail.com",
    category: "Research"
  },
  {
    id: 23,
    name: "Noah Diaz",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing complex policy issues and solutions.",
    image: "",
    category: "Research"
  },
  {
    id: 24,
    name: "Saanvi Gowda",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting thorough policy analysis and research.",
    image: "",
    category: "Research"
  },
  {
    id: 25,
    name: "Shuwei Guo",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative approaches to policy challenges.",
    image: "",
    email: "shuweiguo1@gmail.com",
    category: "Research"
  },
  {
    id: 26,
    name: "Kiro Moussa",
    role: "Research Fellow | Massachusetts Institute of Technology",
    bio: "Research Fellow affiliated with MIT, specializing in technology policy intersection.",
    image: "/experts/kiro.jpg",
    interests: ["Social Justice", "Technology", "Political Science"],
    category: "Research Fellow",
    affiliations: {
      education: ["MIT"]
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/kiro-moussa",
      website: "https://kiromoussa.com"
    }
  },
  {
    id: 27,
    name: "Lourdes Ronquillo",
    role: "Research Fellow | Tufts University",
    bio: "Research Fellow affiliated with Tufts University, focusing on policy research.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Tufts University"]
    }
  },
  {
    id: 28,
    name: "Christian Wang",
    role: "Research Fellow | University of Oxford",
    bio: "Research Fellow affiliated with Oxford University, focusing on philosophy, politics, and economics.",
    image: "",
    interests: ["Philosophy", "Politics", "Economics"],
    category: "Research Fellow",
    affiliations: {
      education: ["Oxford University"]
    }
  },
  {
    id: 29,
    name: "Oz Smith",
    role: "Research Fellow | Not Applicable",
    bio: "Research Fellow conducting independent policy research.",
    image: "",
    category: "Research Fellow"
  },
  {
    id: 30,
    name: "Heba Elkouraichi",
    role: "Research Fellow | Vassar College",
    bio: "Research Fellow affiliated with Vassar College, studying policy implementation.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Vassar College"]
    }
  },
  {
    id: 31,
    name: "Sophie Sarazin",
    role: "Research Fellow | Not Applicable Yet",
    bio: "Research Fellow preparing for institutional affiliation, focusing on policy research.",
    image: "/experts/sophie.jpg",
    email: "ssarazin.07@gmail.com",
    category: "Research Fellow",
    interests: ["Educational Policy", "Environmental Policy"]
  }
]

export default function ExpertPage() {
  const params = useParams()
  const router = useRouter()
  const expert = EXPERTS.find(e => e.id.toString() === params.id)

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center p-8 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-4">Expert Not Found</h1>
          <p className="text-slate-400 mb-6">The expert you're looking for doesn't exist or has been removed.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/experts')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            Back to Directory
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Fixed positioning - Added proper padding from top to avoid navbar overlap */}
      <div className="pt-32 pb-16">
        {/* Subtle background elements in a container with proper positioning */}
        <div className="relative mx-auto max-w-7xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
        </div>

        {/* Content - Removed negative margin completely */}
        <div className="max-w-3xl mx-auto px-4 pb-16 relative z-10">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-blue-400 mb-6 group 
              bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Directory
          </motion.button>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-slate-700 p-8"
          >
            {/* Header with Initial */}
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-medium mr-4">
                {expert.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  {expert.name}
                </h1>
                <div className="flex items-center mt-1">
                  <p className="text-blue-400 font-medium">
                    {expert.role}
                  </p>
                  {expert.category && (
                    <>
                      <span className="mx-2 text-slate-500">•</span>
                      <span className="text-sm px-2 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50">
                        {expert.category}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bio */}
            <div className="mb-8 pb-8 border-b border-slate-700">
              <p className="text-slate-300 leading-relaxed">
                {expert.bio}
              </p>
            </div>
            
            {/* Contact Information */}
            {expert.email && (
              <div className="mb-8 pb-8 border-b border-slate-700">
                <h3 className="text-lg font-medium text-white mb-3">Contact Information</h3>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-medium text-blue-300">Email:</span>
                  <a href={`mailto:${expert.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                    {expert.email}
                  </a>
                </div>
                {expert.phone && (
                  <div className="flex items-center gap-2 text-slate-300 mt-2">
                    <span className="font-medium text-blue-300">Phone:</span>
                    <a href={`tel:${expert.phone}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      {expert.phone}
                    </a>
                  </div>
                )}
              </div>
            )}
            
            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interests */}
              {expert.interests && expert.interests.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <HiOutlineUserGroup className="text-blue-400" />
                    Research Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm
                          border border-slate-600"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Affiliations - Simplified */}
              {expert.affiliations && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <HiOutlineOfficeBuilding className="text-blue-400" />
                    Affiliations
                  </h3>
                  <ul className="space-y-2">
                    {expert.affiliations.education && expert.affiliations.education.map((edu, index) => (
                      <li key={`edu-${index}`} className="flex items-center text-slate-300">
                        <HiOutlineAcademicCap className="mr-2 text-blue-400" />
                        {edu}
                      </li>
                    ))}
                    {expert.affiliations.workExperience && expert.affiliations.workExperience.map((work, index) => (
                      <li key={`work-${index}`} className="flex items-center text-slate-300">
                        <HiOutlineOfficeBuilding className="mr-2 text-green-400" />
                        {work}
                      </li>
                    ))}
                    {expert.affiliations.organizations && expert.affiliations.organizations.map((org, index) => (
                      <li key={`org-${index}`} className="flex items-center text-slate-300">
                        <HiOutlineUserGroup className="mr-2 text-purple-400" />
                        {org}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Social Links */}
            {expert.socialLinks && (
              <div className="mt-8 pt-8 border-t border-slate-700">
                <h3 className="text-lg font-medium text-white mb-3">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {expert.socialLinks.linkedin && (
                    <a 
                      href={expert.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg text-blue-300 hover:bg-slate-600/50 transition-colors border border-slate-600"
                    >
                      LinkedIn <FiExternalLink size={14} />
                    </a>
                  )}
                  {expert.socialLinks.website && (
                    <a 
                      href={expert.socialLinks.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg text-blue-300 hover:bg-slate-600/50 transition-colors border border-slate-600"
                    >
                      Website <FiExternalLink size={14} />
                    </a>
                  )}
                  {expert.socialLinks.instagram && (
                    <a 
                      href={expert.socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg text-blue-300 hover:bg-slate-600/50 transition-colors border border-slate-600"
                    >
                      Instagram <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}
            
            {/* Mentor - If exists */}
            {expert.mentor && (
              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-slate-300">
                  <span className="font-medium text-blue-300">Mentor: </span>
                  {expert.mentor}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Tech-inspired decorative elements */}
      <div className="fixed top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
    </div>
  )
} 