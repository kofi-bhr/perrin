'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiSearch, FiChevronDown } from 'react-icons/fi'
import Head from 'next/head'

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
    bio: "Finn Järvi is the visionary Founder and President of the Perrin Institute, leading groundbreaking research in technology policy and governance. With extensive experience in public policy and organizational leadership, Finn has established the Institute as a premier destination for innovative policy research and analysis.",
    image: "",
    email: "finnjarvi@perrininstitution.org",
    category: "Leadership",
    interests: ["Technology Policy", "Public Governance", "Innovation Strategy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 2,
    name: "Cash Hilinski",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Cash Hilinski serves as Co-Founder and Chief Technology Officer, spearheading the technical strategy and digital innovation initiatives at the Perrin Institute. His expertise in technology implementation and systems architecture drives the Institute's technological advancement and research capabilities.",
    image: "",
    email: "admin@perrininstitution.org",
    category: "Leadership",
    interests: ["Technology Strategy", "Digital Innovation", "Systems Architecture"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 3,
    name: "Samuel Riverson",
    role: "Chief Marketing Officer",
    bio: "Samuel Riverson leads all marketing initiatives as Chief Marketing Officer, developing comprehensive strategies to amplify the Institute's research impact and expand its reach within the policy community. His expertise in strategic communications and brand development enhances the Institute's visibility and influence.",
    image: "",
    email: "rgf9kk@virginia.edu",
    category: "Leadership",
    interests: ["Strategic Marketing", "Brand Development", "Communications Strategy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 4,
    name: "Thomas Fang",
    role: "Chief of Staff",
    bio: "Thomas Fang serves as Chief of Staff, overseeing operations and team coordination across all Institute initiatives. His strategic leadership ensures efficient workflow and effective collaboration between departments while maintaining the Institute's high standards of excellence.",
    image: "",
    email: "hayobro7512@gmail.com",
    category: "Leadership",
    interests: ["Operations Management", "Strategic Planning", "Team Leadership"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 5,
    name: "Agneya Tharun",
    role: "Chief Information Security Officer",
    bio: "Agneya Tharun leads the Institute's cybersecurity initiatives as Chief Information Security Officer, ensuring robust data protection and security protocols. His expertise in information security safeguards the Institute's research data and maintains the highest standards of digital security.",
    image: "",
    category: "Leadership",
    interests: ["Cybersecurity", "Data Protection", "Information Security"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 6,
    name: "Arian Rakhmetzhanov",
    role: "Chief Information Officer",
    bio: "Arian Rakhmetzhanov oversees the Institute's information technology strategy as Chief Information Officer, driving digital transformation and ensuring technological infrastructure supports the Institute's research objectives and operational efficiency.",
    image: "",
    category: "Leadership",
    interests: ["IT Strategy", "Digital Transformation", "Technology Infrastructure"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 7,
    name: "Emmanuel Asamoah",
    role: "Chief Compliance Officer",
    bio: "Emmanuel Asamoah ensures regulatory compliance and ethical standards as Chief Compliance Officer, maintaining the Institute's commitment to transparency and accountability in all research and operational activities.",
    image: "",
    category: "Leadership",
    interests: ["Regulatory Compliance", "Ethics", "Risk Management"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 8,
    name: "Danielle Dee",
    role: "Editor-In-Chief",
    bio: "Danielle Dee leads the Institute's publication strategy as Editor-In-Chief, managing content development and editorial oversight. Her expertise in academic publishing and content strategy enhances the Institute's research dissemination and impact.",
    image: "",
    email: "danielled7599@gmail.com",
    category: "Leadership",
    interests: ["Editorial Strategy", "Academic Publishing", "Content Development"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 9,
    name: "Larry Franklin",
    role: "Chief Design Officer",
    bio: "Larry Franklin leads visual design and user experience as Chief Design Officer, creating compelling visual communications and intuitive user interfaces that enhance the Institute's digital presence and research accessibility.",
    image: "",
    category: "Leadership",
    interests: ["Visual Design", "User Experience", "Brand Identity"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 10,
    name: "Avani Agarwal",
    role: "Software Engineer",
    bio: "Avani Agarwal contributes to the Institute's technical capabilities as a Software Engineer, developing and maintaining applications that support research operations and enhance the Institute's digital infrastructure.",
    image: "",
    email: "avanipersonal7@gmail.com",
    category: "Engineering",
    interests: ["Software Development", "Web Applications", "Technical Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 11,
    name: "Chankyu Kim",
    role: "Software Engineer",
    bio: "Chankyu Kim specializes in software development and technical solutions as a Software Engineer, contributing to the Institute's technological advancement through innovative programming and system development.",
    image: "",
    email: "nehemiahk.perrin@gmail.com",
    category: "Engineering",
    interests: ["Software Engineering", "System Development", "Technical Solutions"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 12,
    name: "Cody Coleman",
    role: "Director of Technology",
    bio: "Cody Coleman oversees technical initiatives and strategy as Director of Technology, leading the development of innovative technological solutions that enhance the Institute's research capabilities and operational efficiency.",
    image: "",
    category: "Engineering",
    interests: ["Technology Leadership", "Technical Strategy", "Innovation Management"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 13,
    name: "Khoa Duong",
    role: "Vice President of Marketing",
    bio: "Khoa Duong leads brand strategy and market growth initiatives as Vice President of Marketing, developing comprehensive marketing campaigns that increase the Institute's visibility and influence in the policy research community.",
    image: "",
    email: "duongdangkhoa0328@gmail.com",
    phone: "(+84) 981880698",
    category: "Leadership",
    interests: ["Brand Strategy", "Market Growth", "Marketing Analytics"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 14,
    name: "Vick Volovnyk",
    role: "Director of Communications",
    bio: "Vick Volovnyk manages external communications and public relations as Director of Communications, crafting strategic messaging that effectively communicates the Institute's research findings and mission to diverse audiences.",
    image: "",
    category: "Leadership",
    interests: ["Public Relations", "Strategic Communications", "Media Relations"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 15,
    name: "Yiren Jing",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing and developing policy recommendations.",
    image: "",
    email: "jingyiren345@gmail.com",
    category: "Research"
  },
  {
    id: 16,
    name: "Rienat Kharian",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing policy implications and opportunities.",
    image: "",
    category: "Research"
  },
  {
    id: 17,
    name: "Kashaf Alvi",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting research on various policy areas.",
    image: "",
    category: "Research"
  },
  {
    id: 18,
    name: "Aayam Bansal",
    role: "Policy Researcher",
    bio: "Policy Researcher specializing in policy analysis and development.",
    image: "",
    category: "Research"
  },
  {
    id: 19,
    name: "Daniel Tu",
    role: "Policy Researcher",
    bio: "Policy Researcher focusing on policy implementation and evaluation.",
    image: "",
    category: "Research"
  },
  {
    id: 20,
    name: "Lucas Benardete",
    role: "Policy Researcher",
    bio: "Policy Researcher investigating policy impacts and effectiveness.",
    image: "",
    category: "Research"
  },
  {
    id: 21,
    name: "Anirudh Polagani",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative policy solutions.",
    image: "",
    email: "anirudh.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 22,
    name: "Riya Dutta",
    role: "Policy Researcher",
    bio: "Policy Researcher examining policy frameworks and outcomes.",
    image: "",
    email: "rdutta.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 23,
    name: "Jacob Wolmetz",
    role: "Policy Researcher",
    bio: "Policy Researcher studying emerging policy trends and challenges.",
    image: "",
    category: "Research"
  },
  {
    id: 24,
    name: "Yash Laddha",
    role: "Policy Researcher",
    bio: "Policy Researcher contributing to policy innovation and research.",
    image: "",
    email: "yashladdha75@gmail.com",
    category: "Research"
  },
  {
    id: 25,
    name: "Noah Diaz",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing complex policy issues and solutions.",
    image: "",
    category: "Research"
  },
  {
    id: 26,
    name: "Saanvi Gowda",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting thorough policy analysis and research.",
    image: "",
    category: "Research"
  },
  {
    id: 27,
    name: "Shuwei Guo",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative approaches to policy challenges.",
    image: "",
    email: "shuweiguo1@gmail.com",
    category: "Research"
  },
  {
    id: 28,
    name: "Simran Sahoo",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher reviewing and overseeing content publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 29,
    name: "Mohammad Ibrahim",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher contributing to content analysis and publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 30,
    name: "Aaron Zeleke",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher supporting content development and research.",
    image: "",
    category: "Editorial"
  },
  {
    id: 31,
    name: "Rebekah Mekonen",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher and Outreach Chair facilitating research communication.",
    image: "",
    email: "qhu4bv@virginia.edu",
    phone: "5714993544",
    category: "Editorial"
  },
  {
    id: 32,
    name: "Kiro Moussa",
    role: "Research Fellow",
    bio: "Kiro Moussa is a distinguished Research Fellow specializing in the intersection of technology policy and social justice. His research focuses on ensuring equitable access to emerging technologies and developing frameworks for inclusive policy development. Kiro brings a unique perspective to technology governance through his interdisciplinary approach combining political science, technology studies, and social justice advocacy.",
    image: "/experts/kiro.jpg",
    interests: ["Social Justice", "Technology Policy", "Political Science", "Digital Equity", "Inclusive Innovation"],
    category: "Research Fellow",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kiro-moussa",
      website: "https://kiromoussa.com"
    },
    affiliations: {
      education: ["Harvard University", "MIT"],
      organizations: ["Perrin Institute", "Tech Justice Coalition"]
    }
  },
  {
    id: 33,
    name: "Lexie Hobbs",
    role: "Research Fellow",
    bio: "Lexie Hobbs is a Research Fellow with expertise in government relations and policy research, particularly in higher education policy. Her work focuses on analyzing educational governance structures and developing evidence-based recommendations for institutional improvement and student success initiatives.",
    image: "/experts/anonymous.jpg",
    interests: ["Government Relations", "Policy Research", "Higher Education", "Educational Governance"],
    category: "Research Fellow",
    affiliations: {
      education: ["Smith College"],
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 34,
    name: "Anaise Lopez-Rodriguez",
    role: "Research Fellow",
    bio: "Anaise Lopez-Rodriguez conducts policy research with a focus on social equity and community development. Her work examines the intersection of public policy and community welfare, developing frameworks for inclusive policy implementation.",
    image: "",
    category: "Research Fellow",
    interests: ["Social Equity", "Community Development", "Public Policy"],
    affiliations: {
      education: ["Brown University"],
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 35,
    name: "Jawhar Yasin",
    role: "Research Fellow",
    bio: "Jawhar Yasin specializes in policy implementation and evaluation as a Research Fellow. His research focuses on developing metrics for policy effectiveness and creating frameworks for evidence-based policy adjustment and improvement.",
    image: "",
    category: "Research Fellow",
    interests: ["Policy Implementation", "Policy Evaluation", "Evidence-Based Policy"],
    affiliations: {
      education: ["Princeton University"],
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 36,
    name: "Neha Nair",
    role: "Research Fellow",
    bio: "Neha Nair is a Research Fellow specializing in environmental policy and sustainability initiatives. Her research explores the intersection of technology and environmental governance, developing innovative approaches to climate policy and sustainable development.",
    image: "/girl1.png",
    interests: ["Environmental Policy", "Technology", "Sustainability", "Climate Governance"],
    category: "Research Fellow",
    affiliations: {
      organizations: ["Perrin Institute", "Climate Policy Initiative"]
    }
  },
  {
    id: 37,
    name: "Lourdes Ronquillo",
    role: "Research Fellow",
    bio: "Research Fellow focusing on policy research.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Tufts University"]
    }
  },
  {
    id: 38,
    name: "Christian Wang",
    role: "Research Fellow",
    bio: "Research Fellow focusing on philosophy, politics, and economics.",
    image: "",
    interests: ["Philosophy", "Politics", "Economics"],
    category: "Research Fellow",
    affiliations: {
      education: ["Oxford University"]
    }
  },
  {
    id: 39,
    name: "Oz Smith",
    role: "Research Fellow",
    bio: "Research Fellow conducting independent policy research.",
    image: "",
    category: "Research Fellow"
  },
  {
    id: 40,
    name: "Heba Elkouraichi",
    role: "Research Fellow",
    bio: "Research Fellow studying policy implementation.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Vassar College"]
    }
  },
  {
    id: 41,
    name: "Sophie Sarazin",
    role: "Research Fellow",
    bio: "Research Fellow focusing on policy research.",
    image: "/experts/sophie.jpg",
    email: "ssarazin.07@gmail.com",
    category: "Research Fellow",
    interests: ["Educational Policy", "Environmental Policy"]
  },
  {
    id: 42,
    name: "Noah Wondwossen",
    role: "Co-President",
    bio: "Co-President of Perrin at The University of Virginia.",
    image: "",
    email: "kqe8kv@virginia.edu",
    phone: "2408107421",
    category: "UVA Chapter"
  },
  {
    id: 43,
    name: "Nehemiah Kim",
    role: "Treasurer",
    bio: "Treasurer of Perrin at The University of Virginia.",
    image: "",
    email: "kyi5ra@virginia.edu",
    phone: "3176280361",
    category: "UVA Chapter"
  },
  {
    id: 44,
    name: "Naomi Million",
    role: "Secretary",
    bio: "Secretary of Perrin at The University of Virginia.",
    image: "",
    email: "uwm4xh@virginia.edu",
    phone: "7033990711",
    category: "UVA Chapter"
  },
  {
    id: 45,
    name: "Manuella Kodwo",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "pyv7wx@virginia.edu",
    phone: "7038592870",
    category: "UVA Chapter"
  },
  {
    id: 46,
    name: "Mikael Tefferi",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "dne7vg@virginia.edu",
    phone: "7033464967",
    category: "UVA Chapter"
  },
  {
    id: 47,
    name: "Heran Dereje",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "rqh5rc@virginia.edu",
    category: "UVA Chapter"
  },
  {
    id: 48,
    name: "Abel Alexander",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "fct4zy@virginia.edu",
    category: "UVA Chapter"
  },
  // New Research Associates
  {
    id: 51,
    name: "Aashi Jain",
    role: "Research Associate",
    bio: "Research Associate focused on policy development and implementation.",
    image: "",
    email: "foreveraashijain@gmail.com",
    category: "Research Associates"
  },
  {
    id: 52,
    name: "Shivam Bhatt",
    role: "Research Associate",
    bio: "Research Associate specializing in policy analysis and research.",
    image: "",
    email: "shivamb0608@gmail.com",
    category: "Research Associates"
  },
  {
    id: 53,
    name: "Aashrith Tatineni",
    role: "Research Associate",
    bio: "Research Associate examining policy frameworks and outcomes.",
    image: "",
    email: "atatineni09@gmail.com",
    category: "Research Associates"
  },
  {
    id: 54,
    name: "Matthew Ma",
    role: "Research Associate",
    bio: "Research Associate investigating policy impacts and effectiveness.",
    image: "",
    email: "matthewma347@gmail.com",
    category: "Research Associates"
  },
  {
    id: 55,
    name: "Amrith Ponneth",
    role: "Research Associate",
    bio: "Research Associate exploring innovative approaches to policy challenges.",
    image: "",
    email: "amrith.ponneth@gmail.com",
    category: "Research Associates"
  },
  {
    id: 56,
    name: "Afia Mubashir",
    role: "Research Associate",
    bio: "Research Associate conducting policy research and analysis.",
    image: "",
    email: "mubashir.afia@gmail.com",
    category: "Research Associates"
  },
  {
    id: 57,
    name: "Aiyana Bage",
    role: "Research Associate",
    bio: "Research Associate studying policy implications and opportunities.",
    image: "",
    email: "aiyanabag10@gmail.com",
    category: "Research Associates"
  },
  {
    id: 58,
    name: "Nivriti Deshpande",
    role: "Research Associate",
    bio: "Research Associate developing policy recommendations and solutions.",
    image: "",
    email: "nivriti.deshpande@gmail.com",
    category: "Research Associates"
  },
  {
    id: 59,
    name: "Shreshtha Aggarwal",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "shreshtha.aggarwal01@gmail.com",
    category: "Research Associates"
  },
  {
    id: 60,
    name: "Saahir Vazirani",
    role: "Research Associate",
    bio: "Research Associate focused on policy analysis and development.",
    image: "",
    email: "saahir.vazirani@gmail.com",
    category: "Research Associates"
  },
  {
    id: 61,
    name: "Bhavana Karthik",
    role: "Research Associate",
    bio: "Research Associate examining policy trends and challenges.",
    image: "",
    email: "bhavana22.karthik@gmail.com",
    category: "Research Associates"
  },
  {
    id: 62,
    name: "Eva Dubey",
    role: "Research Associate",
    bio: "Research Associate specializing in policy research and evaluation.",
    image: "",
    email: "evasalt92@Gmail.com",
    category: "Research Associates"
  },
  {
    id: 63,
    name: "Arvind Salem",
    role: "Research Associate",
    bio: "Research Associate investigating policy solutions and impacts.",
    image: "",
    email: "arvindsalem1613@gmail.com",
    category: "Research Associates"
  },
  {
    id: 64,
    name: "Daniel Neuner",
    role: "Research Associate",
    bio: "Research Associate focused on policy development and analysis.",
    image: "",
    email: "dxneuner08@gmail.com",
    category: "Research Associates"
  },
  {
    id: 65,
    name: "Iris Tang",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "tangiris2008@gmail.com",
    category: "Research Associates"
  },
  {
    id: 66,
    name: "Tanmay Rai",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research and analysis.",
    image: "",
    email: "tanmayraisa@gmail.com",
    category: "Research Associates"
  },
  {
    id: 67,
    name: "Aaron Kunnikuru",
    role: "Research Associate",
    bio: "Research Associate exploring policy development and implementation.",
    image: "",
    email: "aaronkunnik@gmail.com",
    category: "Research Associates"
  },
  {
    id: 68,
    name: "Jared Rodnick",
    role: "Research Associate",
    bio: "Research Associate specializing in policy analysis and research.",
    image: "",
    email: "jaredrodnick@gmail.com",
    category: "Research Associates"
  },
  {
    id: 69,
    name: "Samarth Pandey",
    role: "Research Associate",
    bio: "Research Associate examining policy frameworks and outcomes.",
    image: "",
    email: "samarthpan945@gmail.com",
    category: "Research Associates"
  },
  {
    id: 70,
    name: "Danielle Kim",
    role: "Research Associate",
    bio: "Research Associate investigating policy impacts and effectiveness.",
    image: "",
    email: "kimelledani@gmail.com",
    category: "Research Associates"
  },
  {
    id: 71,
    name: "Serra Aksoy",
    role: "Research Associate",
    bio: "Research Associate exploring innovative approaches to policy challenges.",
    image: "",
    email: "serurays@gmail.com",
    category: "Research Associates"
  },
  {
    id: 72,
    name: "Mahanth Komuravelli",
    role: "Research Associate",
    bio: "Research Associate conducting policy research and analysis.",
    image: "",
    email: "mahanthf112@gmail.com",
    category: "Research Associates"
  },
  {
    id: 73,
    name: "Vaishnavi Singh",
    role: "Research Associate",
    bio: "Research Associate studying policy implications and opportunities.",
    image: "",
    email: "vaish2003singh@gmail.com",
    category: "Research Associates"
  },
  {
    id: 74,
    name: "Sunkalp Chandra",
    role: "Research Associate",
    bio: "Research Associate developing policy recommendations and solutions.",
    image: "",
    email: "sunkalp.chandra@gmail.com",
    category: "Research Associates"
  },
  {
    id: 75,
    name: "Sophie Glass",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "sophieglass212@gmail.com",
    category: "Research Associates"
  },
  {
    id: 76,
    name: "Cason Noll",
    role: "Research Associate",
    bio: "Research Associate focused on policy analysis and development.",
    image: "",
    email: "casonnoll1@gmail.com",
    category: "Research Associates"
  },
  {
    id: 77,
    name: "Neel Iyer",
    role: "Research Associate",
    bio: "Research Associate examining policy trends and challenges.",
    image: "",
    email: "neeliyer14@gmail.com",
    category: "Research Associates"
  }
]

// Get all unique categories and interests for filtering
const allCategories = Array.from(new Set(EXPERTS.map(expert => expert.category || 'Other')));
const allInterests = Array.from(new Set(EXPERTS.flatMap(expert => expert.interests || [])));

// Generate alphabet for navigation
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [filteredExperts, setFilteredExperts] = useState(EXPERTS);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isRegionsOpen, setIsRegionsOpen] = useState(false);
  
  const totalExperts = EXPERTS.length;

  useEffect(() => {
    let result = EXPERTS;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(expert => 
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (expert.interests && expert.interests.some(interest => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(expert => expert.category === selectedCategory);
    }
    
    // Filter by first letter
    if (selectedLetter) {
      result = result.filter(expert => 
        expert.name.charAt(0).toUpperCase() === selectedLetter
      );
    }
    
    // Sort by hierarchy when "All" is selected, alphabetically when specific category is selected
    if (!selectedCategory) {
      // Hierarchy-based sorting
      const hierarchyOrder: { [key: string]: number } = {
        // Executive Leadership
        'Founder & President': 1,
        'Co-Founder & Chief Technology Officer': 2,
        'Chief Marketing Officer': 3,
        'Chief of Staff': 4,
        'Chief Information Security Officer': 5,
        'Chief Information Officer': 6,
        'Chief Compliance Officer': 7,
        'Editor-In-Chief': 8,
        'Chief Design Officer': 9,
        
        // Senior Leadership
        'Vice President of Marketing': 10,
        'Director of Technology': 11,
        'Director of Communications': 12,
        
        // Co-Presidents and Chapter Leadership
        'Co-President': 13,
        'Treasurer': 14,
        'Secretary': 15,
        
        // Research and Academic Roles
        'Policy Researcher': 16,
        'Editorial Board Researcher': 17,
        'Research Fellow': 18,
        'Research Associate': 19,
        
        // Technical Roles
        'Software Engineer': 20,
        
        // General Members
        'Member': 21
      };
      
      result.sort((a, b) => {
        const orderA = hierarchyOrder[a.role] || 999;
        const orderB = hierarchyOrder[b.role] || 999;
        
        // If same hierarchy level, sort alphabetically
        if (orderA === orderB) {
          return a.name.localeCompare(b.name);
        }
        
        return orderA - orderB;
      });
    } else {
      // Sort alphabetically when specific category is selected
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredExperts(result);
  }, [searchTerm, selectedCategory, selectedLetter]);

  const getExpertsByLetter = (letter: string) => {
    return EXPERTS.filter(expert => expert.name.charAt(0).toUpperCase() === letter).length;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Head>
        <title>All Experts | The Perrin Institution</title>
        <meta name="description" content="Browse our complete directory of experts, researchers, and policy analysts at The Perrin Institution." />
      </Head>

      {/* Simple Header */}
      <section className="bg-white border-b border-gray-200 pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-normal text-black mb-4">All Experts</h1>
          <p className="text-lg text-gray-600 mb-2">
            Browse our directory of distinguished researchers, policy analysts, and thought leaders
          </p>
          <p className="text-sm text-gray-500">
            {totalExperts} experts across multiple disciplines and research areas
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                <span>Topics ({allCategories.length})</span>
                <FiChevronDown className={`h-4 w-4 transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-48 py-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsCategoriesOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm ${!selectedCategory ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                  >
                    All Topics
                  </button>
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoriesOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm ${selectedCategory === category ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsRegionsOpen(!isRegionsOpen)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                <span>Regions (1)</span>
                <FiChevronDown className={`h-4 w-4 transform transition-transform ${isRegionsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isRegionsOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-40 py-2">
                  <button
                    onClick={() => setIsRegionsOpen(false)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                  >
                    Global
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Alphabetical Navigation */}
          <div className="flex items-center gap-1 flex-wrap mb-8">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`px-3 py-2 text-sm font-medium border rounded transition-all ${
                !selectedLetter 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              All
            </button>
            {alphabet.map(letter => {
              const count = getExpertsByLetter(letter);
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                  disabled={count === 0}
                  className={`px-3 py-2 text-sm font-medium border rounded transition-all ${
                    selectedLetter === letter
                      ? 'bg-blue-600 text-white border-blue-600'
                      : count > 0
                        ? 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="text-gray-500 text-sm mb-6">
            {filteredExperts.length} RESULTS
          </div>
        </div>
      </section>

      {/* Expert List */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="space-y-6">
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0"
              >
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {expert.image && expert.image !== "" ? (
                      <img 
                        src={expert.image} 
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-lg bg-gray-400 w-full h-full flex items-center justify-center">
                        {expert.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                      <Link href={`/experts/${expert.id}`}>
                        <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer transition-colors mb-1">
                          {expert.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {expert.role}
                        {expert.category && (
                          <span className="text-gray-500"> • {expert.category}</span>
                        )}
                      </p>
                      {expert.email && (
                        <p className="text-gray-500 text-sm leading-relaxed mt-1">
                          {expert.email}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 ml-4">
                      {expert.interests && expert.interests.slice(0, 2).map((interest, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap"
                        >
                          {interest}
                        </span>
                      ))}
                      {expert.category && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full whitespace-nowrap">
                          {expert.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredExperts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No experts found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setSelectedLetter(null);
                    setIsCategoriesOpen(false);
                    setIsRegionsOpen(false);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 