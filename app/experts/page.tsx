'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiSearch, FiFilter, FiX, FiUsers, FiExternalLink, FiChevronRight } from 'react-icons/fi'
import { HiOutlineOfficeBuilding, HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineChip } from 'react-icons/hi'

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
    affiliations: {
      education: ["MIT"]
    },
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
    affiliations: {
      education: ["Smith College"]
    }
  },
  {
    id: 35,
    name: "Anaise Lopez-Rodriguez",
    role: "Research Fellow | Brown University",
    bio: "Research Fellow affiliated with Brown University, focusing on policy development.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Brown University"]
    }
  },
  {
    id: 36,
    name: "Jawhar Yasin",
    role: "Research Fellow | Princeton University",
    bio: "Research Fellow affiliated with Princeton University, studying policy implementation.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Princeton University"]
    }
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
    affiliations: {
      education: ["Tufts University"]
    }
  },
  {
    id: 39,
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
    affiliations: {
      education: ["Vassar College"]
    }
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
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors border border-slate-600"
              >
                <FiFilter className="text-blue-300" />
                <span>Filters</span>
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
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 rounded-lg transition-colors border border-blue-500/30"
                >
                  <FiX />
                  <span>Clear</span>
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
                  
                  <div className="mt-6 md:mt-0">
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
          <div className="mt-4 text-slate-400 text-center md:text-left">
            Showing <span className="text-blue-400 font-medium">{filteredExperts.length}</span> of <span className="text-blue-400 font-medium">{totalEmployees}</span> team members
          </div>
        </div>
      </section>

      {/* Classic Directory-Style Experts Table */}
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
              <>
                {/* Desktop View - Hidden on mobile */}
                <div className="hidden md:block bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 overflow-hidden">
                  {/* Table Headers */}
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-800 border-b border-slate-700 text-sm font-medium text-slate-300 uppercase tracking-wider">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-5">Email</div>
                    <div className="col-span-1">Details</div>
                  </div>
                  
                  {/* Expert Rows */}
                  {filteredExperts.map((expert, index) => (
                    <motion.div
                      key={`desktop-${expert.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      exit={{ opacity: 0 }}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                        index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
                      }`}
                    >
                      {/* Name Column */}
                      <div className="col-span-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                            {expert.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-white">{expert.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Role Column */}
                      <div className="col-span-3 text-slate-300">
                        {expert.role}
                      </div>
                      
                      {/* Email Column */}
                      <div className="col-span-5">
                        {expert.email && (
                          <a 
                            href={`mailto:${expert.email}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center truncate"
                          >
                            {expert.email}
                          </a>
                        )}
                      </div>
                      
                      {/* Details Link Column */}
                      <div className="col-span-1 text-right">
                        <Link href={`/experts/${expert.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/20 text-blue-400 hover:bg-blue-800/40 transition-colors border border-blue-800/30"
                          >
                            <FiChevronRight size={16} />
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile View - Card Layout */}
                <div className="md:hidden space-y-4">
                  {filteredExperts.map((expert, index) => (
                    <motion.div
                      key={`mobile-${expert.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 overflow-hidden p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-lg">
                            {expert.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-white text-lg">{expert.name}</p>
                            <p className="text-sm text-blue-300">{expert.category}</p>
                          </div>
                        </div>
                        <Link href={`/experts/${expert.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-900/20 text-blue-400 border border-blue-800/30"
                          >
                            <FiChevronRight size={18} />
                          </motion.div>
                        </Link>
                      </div>
                      
                      <div className="py-2 border-t border-slate-700/50">
                        <div className="mb-2">
                          <span className="text-xs text-slate-400 uppercase tracking-wider">Role</span>
                          <p className="text-slate-300">{expert.role}</p>
                        </div>
                        
                        {expert.email && (
                          <div>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Email</span>
                            <a 
                              href={`mailto:${expert.email}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors block truncate"
                            >
                              {expert.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
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