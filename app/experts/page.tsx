'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { images } from '@/lib/images'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiSearch, FiFilter, FiX, FiUsers } from 'react-icons/fi'
import { HiOutlineOfficeBuilding, HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineChip } from 'react-icons/hi'

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

// Get all unique categories
const allCategories = Array.from(new Set(EXPERTS.map(expert => expert.category || 'Other')));

// Get all unique affiliations
const getAllAffiliations = () => {
  const affiliations = new Set<string>();
  
  EXPERTS.forEach(expert => {
    if (expert.affiliations) {
      if (expert.affiliations.education) {
        expert.affiliations.education.forEach(edu => affiliations.add(edu));
      }
      if (expert.affiliations.workExperience) {
        expert.affiliations.workExperience.forEach(work => affiliations.add(work));
      }
      if (expert.affiliations.organizations) {
        expert.affiliations.organizations.forEach(org => affiliations.add(org));
      }
    }
  });
  
  return Array.from(affiliations).sort();
};

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAffiliation, setSelectedAffiliation] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredExperts, setFilteredExperts] = useState(EXPERTS);
  
  const allAffiliations = getAllAffiliations();
  const totalEmployees = EXPERTS.length;

  useEffect(() => {
    let result = EXPERTS;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(expert => 
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(expert => expert.category === selectedCategory);
    }
    
    // Filter by affiliation
    if (selectedAffiliation) {
      result = result.filter(expert => {
        const affiliations = expert.affiliations;
        if (!affiliations) return false;
        
        return (
          (affiliations.education && affiliations.education.includes(selectedAffiliation)) ||
          (affiliations.workExperience && affiliations.workExperience.includes(selectedAffiliation)) ||
          (affiliations.organizations && affiliations.organizations.includes(selectedAffiliation))
        );
      });
    }
    
    setFilteredExperts(result);
  }, [searchTerm, selectedCategory, selectedAffiliation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Tech-inspired Hero Section */}
      <section className="relative py-20 overflow-hidden">
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
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 font-semibold tracking-wider uppercase">
                  Our Team
                </span>
                <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 mb-6">
                Meet Our Team
              </h1>
              
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center bg-blue-500/20 backdrop-blur-sm p-3 rounded-full border border-blue-500/30"
                >
                  <FiUsers className="text-blue-400 text-xl" />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-blue-100"
                >
                  <span className="font-bold text-2xl">{totalEmployees}</span> experts shaping the future of public policy
                </motion.p>
              </div>
              
              {/* Tech-inspired decorative element */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-10 h-1 w-full max-w-xl mx-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full origin-left"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 bg-slate-800/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors border border-slate-600"
              >
                <FiFilter className="text-blue-300" />
                Filters
              </motion.button>
              
              {(selectedCategory || selectedAffiliation || searchTerm) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedAffiliation(null);
                    setSearchTerm('');
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 rounded-lg transition-colors border border-blue-500/30"
                >
                  <FiX />
                  Clear Filters
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-700/50 backdrop-blur-md rounded-lg border border-slate-600">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                      <HiOutlineUserGroup className="text-blue-400" />
                      Filter by Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map(category => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20'
                              : 'bg-slate-800 border border-slate-600 hover:border-blue-400 text-slate-300'
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                      <HiOutlineOfficeBuilding className="text-blue-400" />
                      Filter by Affiliation
                    </h3>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {allAffiliations.map(affiliation => (
                        <motion.button
                          key={affiliation}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedAffiliation(selectedAffiliation === affiliation ? null : affiliation)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedAffiliation === affiliation
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20'
                              : 'bg-slate-800 border border-slate-600 hover:border-blue-400 text-slate-300'
                          }`}
                        >
                          {affiliation}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Results Count */}
          <div className="mt-4 text-slate-400">
            Showing <span className="text-blue-400 font-medium">{filteredExperts.length}</span> of <span className="text-blue-400 font-medium">{totalEmployees}</span> team members
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence>
            {filteredExperts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <h3 className="text-2xl font-medium text-white mb-2">No results found</h3>
                <p className="text-slate-400">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredExperts.map((expert, index) => (
                  <motion.div
                    key={expert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                  >
                    <Link 
                      href={`/experts/${expert.id}`}
                      className="block group bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl 
                        hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full overflow-hidden"
                    >
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        {expert.image ? (
                          <Image
                            src={expert.image}
                            alt={expert.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-b border-slate-700">
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                              {expert.name.charAt(0)}
                            </div>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow-lg shadow-blue-500/20">
                          {expert.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {expert.name}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3">{expert.role}</p>
                        
                        {/* Interests Tags */}
                        {expert.interests && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {expert.interests.slice(0, 2).map((interest, i) => (
                              <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                                {interest}
                              </span>
                            ))}
                            {expert.interests.length > 2 && (
                              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                                +{expert.interests.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Affiliations Preview */}
                        {expert.affiliations?.education && expert.affiliations.education.length > 0 && (
                          <div className="mt-3 flex items-center text-xs text-slate-400">
                            <HiOutlineAcademicCap className="mr-1 text-blue-400" />
                            {expert.affiliations.education[0]}
                          </div>
                        )}
                      </div>
                      
                      {/* Hover effect - blue glow at bottom */}
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Tech-inspired decorative elements */}
      <div className="fixed top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  )
} 