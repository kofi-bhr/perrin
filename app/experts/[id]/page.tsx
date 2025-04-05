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
    email: "admin@perrin.org",
    category: "Leadership"
  },
  {
    id: 3,
    name: "Samuel Riverson",
    role: "Chief Marketing Officer",
    bio: "Chief Marketing Officer responsible for all marketing initiatives.",
    image: "",
    email: "rgf9kk@virginia.edu",
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
    name: "Khoa Duong",
    role: "Vice President of Marketing",
    bio: "Vice President of Marketing leading brand strategy and market growth initiatives.",
    image: "",
    email: "duongdangkhoa0328@gmail.com",
    phone: "(+84) 981880698",
    category: "Leadership"
  },
  {
    id: 15,
    name: "Vick Volovnyk",
    role: "Director of Communications",
    bio: "Director of Communications managing external communications and public relations.",
    image: "",
    category: "Leadership"
  },
  {
    id: 16,
    name: "Yiren Jing",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing and developing policy recommendations.",
    image: "",
    email: "jingyiren345@gmail.com",
    category: "Research"
  },
  {
    id: 17,
    name: "Rienat Kharian",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing policy implications and opportunities.",
    image: "",
    category: "Research"
  },
  {
    id: 18,
    name: "Kashaf Alvi",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting research on various policy areas.",
    image: "",
    category: "Research"
  },
  {
    id: 19,
    name: "Aayam Bansal",
    role: "Policy Researcher",
    bio: "Policy Researcher specializing in policy analysis and development.",
    image: "",
    category: "Research"
  },
  {
    id: 20,
    name: "Daniel Tu",
    role: "Policy Researcher",
    bio: "Policy Researcher focusing on policy implementation and evaluation.",
    image: "",
    category: "Research"
  },
  {
    id: 21,
    name: "Lucas Benardete",
    role: "Policy Researcher",
    bio: "Policy Researcher investigating policy impacts and effectiveness.",
    image: "",
    category: "Research"
  },
  {
    id: 22,
    name: "Anirudh Polagani",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative policy solutions.",
    image: "",
    email: "anirudh.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 23,
    name: "Riya Dutta",
    role: "Policy Researcher",
    bio: "Policy Researcher examining policy frameworks and outcomes.",
    image: "",
    email: "rdutta.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 24,
    name: "Jacob Wolmetz",
    role: "Policy Researcher",
    bio: "Policy Researcher studying emerging policy trends and challenges.",
    image: "",
    category: "Research"
  },
  {
    id: 25,
    name: "Yash Laddha",
    role: "Policy Researcher",
    bio: "Policy Researcher contributing to policy innovation and research.",
    image: "",
    email: "yashladdha75@gmail.com",
    category: "Research"
  },
  {
    id: 26,
    name: "Noah Diaz",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing complex policy issues and solutions.",
    image: "",
    category: "Research"
  },
  {
    id: 27,
    name: "Saanvi Gowda",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting thorough policy analysis and research.",
    image: "",
    category: "Research"
  },
  {
    id: 28,
    name: "Shuwei Guo",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative approaches to policy challenges.",
    image: "",
    email: "shuweiguo1@gmail.com",
    category: "Research"
  },
  {
    id: 29,
    name: "Simran Sahoo",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher reviewing and overseeing content publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 30,
    name: "Mohammad Ibrahim",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher contributing to content analysis and publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 31,
    name: "Aaron Zeleke",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher supporting content development and research.",
    image: "",
    category: "Editorial"
  },
  {
    id: 32,
    name: "Rebekah Mekonen",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher and Outreach Chair facilitating research communication.",
    image: "",
    email: "qhu4bv@virginia.edu",
    phone: "5714993544",
    category: "Editorial"
  },
  {
    id: 33,
    name: "Kiro Moussa",
    role: "Research Fellow | Massachusetts Institute of Technology",
    bio: "Research Fellow affiliated with MIT, specializing in technology policy intersection.",
    image: "/experts/kiro.jpg",
    interests: ["Social Justice", "Technology", "Political Science"],
    category: "Research Fellow",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kiro-moussa",
      website: "https://kiromoussa.com"
    }
  },
  {
    id: 34,
    name: "Lexie Hobbs",
    role: "Research Fellow | Smith College",
    bio: "Research Fellow affiliated with Smith College, conducting policy research.",
    image: "/experts/anonymous.jpg",
    interests: ["Government", "Policy Research", "Higher Education"],
    category: "Research Fellow",
  },
  {
    id: 35,
    name: "Anaise Lopez-Rodriguez",
    role: "Research Fellow | Brown University",
    bio: "Research Fellow affiliated with Brown University, focusing on policy development.",
    image: "",
    category: "Research Fellow",
  },
  {
    id: 36,
    name: "Jawhar Yasin",
    role: "Research Fellow | Princeton University",
    bio: "Research Fellow affiliated with Princeton University, studying policy implementation.",
    image: "",
    category: "Research Fellow",
  },
  {
    id: 37,
    name: "Neha Nair",
    role: "Research Fellow | Not Applicable Yet",
    bio: "Research Fellow preparing for institutional affiliation, researching policy innovation.",
    image: "/girl1.png",
    interests: ["Environmental Policy", "Technology", "Sustainability"],
    category: "Research Fellow"
  },
  {
    id: 38,
    name: "Lourdes Ronquillo",
    role: "Research Fellow | Tufts University",
    bio: "Research Fellow affiliated with Tufts University, focusing on policy research.",
    image: "",
    category: "Research Fellow",
  },
  {
    id: 39,
    name: "Christian Wang",
    role: "Research Fellow | University of Oxford",
    bio: "Research Fellow affiliated with Oxford University, focusing on philosophy, politics, and economics.",
    image: "",
    interests: ["Philosophy", "Politics", "Economics"],
    category: "Research Fellow",
  },
  {
    id: 40,
    name: "Oz Smith",
    role: "Research Fellow | Not Applicable",
    bio: "Research Fellow conducting independent policy research.",
    image: "",
    category: "Research Fellow"
  },
  {
    id: 41,
    name: "Heba Elkouraichi",
    role: "Research Fellow | Vassar College",
    bio: "Research Fellow affiliated with Vassar College, studying policy implementation.",
    image: "",
    category: "Research Fellow",
  },
  {
    id: 42,
    name: "Sophie Sarazin",
    role: "Research Fellow | Not Applicable Yet",
    bio: "Research Fellow preparing for institutional affiliation, focusing on policy research.",
    image: "/experts/sophie.jpg",
    email: "ssarazin.07@gmail.com",
    category: "Research Fellow",
    interests: ["Educational Policy", "Environmental Policy"]
  },
  {
    id: 43,
    name: "Noah Wondwossen",
    role: "Co-President",
    bio: "Co-President of Perrin at The University of Virginia.",
    image: "",
    email: "kqe8kv@virginia.edu",
    phone: "2408107421",
    category: "UVA Chapter"
  },
  {
    id: 44,
    name: "Nehemiah Kim",
    role: "Treasurer",
    bio: "Treasurer of Perrin at The University of Virginia.",
    image: "",
    email: "kyi5ra@virginia.edu",
    phone: "3176280361",
    category: "UVA Chapter"
  },
  {
    id: 45,
    name: "Naomi Million",
    role: "Secretary",
    bio: "Secretary of Perrin at The University of Virginia.",
    image: "",
    email: "uwm4xh@virginia.edu",
    phone: "7033990711",
    category: "UVA Chapter"
  },
  {
    id: 46,
    name: "Manuella Kodwo",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "pyv7wx@virginia.edu",
    phone: "7038592870",
    category: "UVA Chapter"
  },
  {
    id: 47,
    name: "Mikael Tefferi",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "dne7vg@virginia.edu",
    phone: "7033464967",
    category: "UVA Chapter"
  },
  {
    id: 48,
    name: "Heran Dereje",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "rqh5rc@virginia.edu",
    category: "UVA Chapter"
  },
  {
    id: 49,
    name: "Abel Alexander",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "fct4zy@virginia.edu",
    category: "UVA Chapter"
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