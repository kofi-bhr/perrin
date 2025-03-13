'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { FiArrowLeft, FiLinkedin, FiInstagram, FiGlobe, FiExternalLink } from 'react-icons/fi'
import { HiOutlineAcademicCap, HiOutlineOfficeBuilding, HiOutlineUserGroup, HiOutlineChartBar, HiOutlineChip } from 'react-icons/hi'
import { images } from '@/lib/images'
import { motion } from 'framer-motion'

interface Expert {
  id: number
  name: string
  role: string
  bio: string
  image: string
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
    name: "Kaylee Tate",
    role: "Research Fellow",
    bio: "Kaylee is a local journalist and aspiring politician from Jim Thorpe, Pennsylvania. She is a Leukemia & Lymphoma Society SVOY candidate as well as alumni of National History Academy and PSJP.",
    image: "/experts/kaylee.jpg",
    mentor: "Princeton University (Simran)",
    interests: ["Journalism", "Politics", "Public Policy"],
    category: "Research Fellow",
    affiliations: {
      education: ["Princeton University"],
      organizations: ["Leukemia & Lymphoma Society", "National History Academy", "PSJP"]
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/kaylee-tate"
    }
  },
  {
    id: 2,
    name: "Lexie Hobbs",
    role: "Research Fellow",
    bio: "Lexie Hobbs is a current senior at Ringgold High School and admitted to Smith College through Questbridge National College Match. She intends to major in government and molecular biology. She is currently a fellow at Grassroots Democrats HQ and an emergency technician at Hamilton Medical Center as well.",
    image: "/experts/anonymous.jpg",
    interests: ["Government", "Molecular Biology", "Healthcare"],
    category: "Research Fellow",
    affiliations: {
      education: ["Ringgold High School", "Smith College"],
      workExperience: ["Grassroots Democrats HQ", "Hamilton Medical Center"],
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/lexie-hobbs"
    }
  },
  {
    id: 3,
    name: "Kiro Moussa",
    role: "Research Fellow",
    bio: "Hello! I'm Kiro Moussa. I've lived in Alexandria, Egypt for the first seven years of my life. Seeing extraordinary events such as the Egyptian Revolution of 2011 has allowed me to develop a passion to fight for social justice and equality. I will be studying Electrical Engineering & Computer Science with a minor in Political Science at MIT.",
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
    id: 4,
    name: "Neha Nair",
    role: "Senior Leadership",
    bio: "As a passionate environmental researcher and technology innovator, I thrive on bridging the gap between sustainability science and real-world solutions. My drive to make supply chains more transparent led me to found my startup, and my enthusiasm for transformative tech has opened doors to meaningful work with companies like TikTok and Google.",
    image: "/girl1.png",
    interests: ["Environmental Policy", "Technology", "Sustainability"],
    category: "Senior Leadership",
    affiliations: {
      workExperience: ["TikTok", "Google"]
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/neha-nair",
      instagram: "https://instagram.com/nehanair"
    }
  },
  {
    id: 5,
    name: "Oyindamola Akintola",
    role: "Policy Researcher",
    bio: "Hello!. I am Oyindamola Akintola. I currently focus on advocacy efforts, especially with book bans in Texas. I run a podcast on the topic where I interview student leaders, politicians, authors, librarians, etc, all who have been impacted by book bans. I also work on & run a lot of community initiatives i.e. food drives.",
    image: "",
    interests: ["Advocacy", "Education Policy", "Community Initiatives"],
    category: "Policy Researcher",
    affiliations: {
      organizations: ["Texas Education Advocacy"]
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/oyindamola-akintola",
      website: "https://oyindamolaakintola.com"
    }
  },
  {
    id: 6,
    name: "Sabrina Morency",
    role: "Research Fellow",
    bio: "My name is Sabrina Morency and I'm currently a senior in high school. I was born in Haiti but I've lived in Connecticut for the majority of my life. Next year I will be attending Barnard College and majoring in History & Economics. I've always been passionate about law and public policy.",
    image: "/experts/sabrina.jpg",
    interests: ["Law", "Public Policy", "Economics"],
    category: "Research Fellow",
    affiliations: {
      education: ["Barnard College"]
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/sabrina-morency"
    },
    stats: {
      sat: "1520"
    }
  },
  {
    id: 7,
    name: "Christian Wang",
    role: "Executive Leadership",
    bio: "Oxford PPE Commit",
    image: "",
    mentor: "Oxford",
    interests: ["Philosophy", "Politics", "Economics"],
    category: "Executive Leadership",
    affiliations: {
      education: ["Oxford University"]
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/christian-wang"
    },
    stats: {
      sat: "1580"
    }
  },
  {
    id: 8,
    name: "Sophie",
    role: "Founder",
    bio: "Sophie is a Coca-Cola Scholar Semifinalist and student rights advocate who speaks for fair educational legislation in her community. She also founded a program assisting Title 1 Students with attending Ivy League and top institutions.",
    image: "/experts/sophie.jpg",
    mentor: "Oxford",
    interests: ["Educational Policy", "Environmental Policy"],
    category: "Founder",
    affiliations: {
      education: ["Oxford University"],
      organizations: ["Coca-Cola Scholars"]
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/sophie",
      instagram: "https://instagram.com/sophie"
    },
    stats: {
      sat: "1550"
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Tech-inspired Header */}
      <div className="relative h-[30vh] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
        
        {/* Animated circuit lines */}
        <div className="absolute inset-0">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="rgba(59, 130, 246, 0.2)" 
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
            />
            <path 
              d="M0,50 L100,50" 
              fill="none" 
              stroke="rgba(59, 130, 246, 0.2)" 
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
            />
            <path 
              d="M50,0 L50,100" 
              fill="none" 
              stroke="rgba(59, 130, 246, 0.2)" 
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        
        {/* Digital particles effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-indigo-400 rounded-full"></div>
          <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-indigo-400 rounded-full"></div>
          <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-blue-400 rounded-full"></div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-indigo-900/20 to-slate-900/90"></div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-10">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Expert Card */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-slate-700"
          >
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Image */}
                <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                  {expert.image ? (
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-indigo-900/40">
                      <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                        {expert.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {expert.category && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20">
                      {expert.category}
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-2">
                      {expert.name}
                    </h1>
                    <p className="text-blue-400 font-medium text-lg">
                      {expert.role}
                    </p>
                  </div>
                  
                  {/* Social Links */}
                  {expert.socialLinks && (
                    <div className="flex gap-4">
                      {expert.socialLinks.linkedin && (
                        <motion.a 
                          href={expert.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-900/30 text-blue-400 rounded-full hover:bg-blue-800/50 transition-colors border border-blue-700/50"
                          aria-label="LinkedIn"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiLinkedin size={20} />
                        </motion.a>
                      )}
                      {expert.socialLinks.instagram && (
                        <motion.a 
                          href={expert.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-purple-900/30 text-purple-400 rounded-full hover:bg-purple-800/50 transition-colors border border-purple-700/50"
                          aria-label="Instagram"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiInstagram size={20} />
                        </motion.a>
                      )}
                      {expert.socialLinks.website && (
                        <motion.a 
                          href={expert.socialLinks.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-700/50 text-slate-300 rounded-full hover:bg-slate-600/50 transition-colors border border-slate-600"
                          aria-label="Personal Website"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiGlobe size={20} />
                        </motion.a>
                      )}
                    </div>
                  )}
                  
                  {expert.mentor && (
                    <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30 backdrop-blur-sm">
                      <span className="font-medium text-blue-300">Mentor: </span>
                      <span className="text-blue-100">{expert.mentor}</span>
                    </div>
                  )}

                  <p className="text-slate-300 leading-relaxed text-lg">
                    {expert.bio}
                  </p>
                </div>
              </div>

              {/* Stats Section */}
              {expert.stats && Object.keys(expert.stats).length > 0 && (
                <motion.div 
                  variants={itemVariants}
                  className="mt-12 pt-8 border-t border-slate-700"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <HiOutlineChartBar className="text-blue-400" />
                    Academic Stats
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {expert.stats.sat && (
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-slate-700/50 p-5 rounded-lg border border-slate-600 backdrop-blur-sm"
                      >
                        <div className="text-sm text-slate-400">SAT Score</div>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                          {expert.stats.sat}
                        </div>
                      </motion.div>
                    )}
                    {expert.stats.act && (
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-slate-700/50 p-5 rounded-lg border border-slate-600 backdrop-blur-sm"
                      >
                        <div className="text-sm text-slate-400">ACT Score</div>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                          {expert.stats.act}
                        </div>
                      </motion.div>
                    )}
                    {expert.stats.lsat && (
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-slate-700/50 p-5 rounded-lg border border-slate-600 backdrop-blur-sm"
                      >
                        <div className="text-sm text-slate-400">LSAT Score</div>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                          {expert.stats.lsat}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Research Interests */}
              {expert.interests && expert.interests.length > 0 && (
                <motion.div 
                  variants={itemVariants}
                  className="mt-12 pt-8 border-t border-slate-700"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <HiOutlineUserGroup className="text-blue-400" />
                    Research Interests
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {expert.interests.map((interest, index) => (
                      <motion.span 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-blue-900/20 text-blue-300 rounded-full font-medium
                          border border-blue-800/30 hover:bg-blue-800/30 transition-colors"
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Affiliations Section */}
          {expert.affiliations && (
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700"
            >
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <HiOutlineChip className="text-blue-400" />
                Affiliations & Experience
              </h2>
              
              <div className="space-y-8">
                {/* Education */}
                {expert.affiliations.education && expert.affiliations.education.length > 0 && (
                  <div className="relative pl-8 border-l-2 border-blue-800/50">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <HiOutlineAcademicCap className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-4">Education</h3>
                    <ul className="space-y-4">
                      {expert.affiliations.education.map((edu, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          whileHover={{ x: 5 }}
                          className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span>{edu}</span>
                            <FiExternalLink className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Work Experience */}
                {expert.affiliations.workExperience && expert.affiliations.workExperience.length > 0 && (
                  <div className="relative pl-8 border-l-2 border-green-800/50">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                      <HiOutlineOfficeBuilding className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-300 mb-4">Work Experience</h3>
                    <ul className="space-y-4">
                      {expert.affiliations.workExperience.map((work, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          whileHover={{ x: 5 }}
                          className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 backdrop-blur-sm"
                        >
                          {work}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Organizations */}
                {expert.affiliations.organizations && expert.affiliations.organizations.length > 0 && (
                  <div className="relative pl-8 border-l-2 border-purple-800/50">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <HiOutlineUserGroup className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-4">Organizations</h3>
                    <ul className="space-y-4">
                      {expert.affiliations.organizations.map((org, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          whileHover={{ x: 5 }}
                          className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 backdrop-blur-sm"
                        >
                          {org}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Current Research Focus */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <HiOutlineChip className="text-blue-400" />
              Current Research Focus
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Working on cutting-edge policy research and analysis in their areas of expertise.
            </p>
            
            {/* Tech-inspired decorative element */}
            <div className="mt-6 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </div>
  )
} 