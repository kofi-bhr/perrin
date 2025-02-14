'use client'
import Image from 'next/image'
import { images } from '@/lib/images'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Expert {
  id: number
  name: string
  role: string
  bio: string
  image: string
  mentor?: string
  interests?: string[]
}

const EXPERTS: Expert[] = [
  {
    id: 1,
    name: "Kaylee Tate",
    role: "Research Fellow",
    bio: "Kaylee is a local journalist and aspiring politician from Jim Thorpe, Pennsylvania. She is a Leukemia & Lymphoma Society SVOY candidate as well as alumni of National History Academy and PSJP.",
    image: "/experts/kaylee.jpg",
    mentor: "Princeton University (Simran)",
    interests: ["Journalism", "Politics", "Public Policy"]
  },
  {
    id: 2,
    name: "Lexie Hobbs",
    role: "Research Fellow",
    bio: "Lexie Hobbs is a current senior at Ringgold High School and admitted to Smith College through Questbridge National College Match. She intends to major in government and molecular biology. She is currently a fellow at Grassroots Democrats HQ and an emergency technician at Hamilton Medical Center as well.",
    image: "/experts/anonymous.jpg",
    interests: ["Government", "Molecular Biology", "Healthcare"]
  },
  {
    id: 3,
    name: "Kiro Moussa",
    role: "Research Fellow",
    bio: "Hello! I'm Kiro Moussa. I've lived in Alexandria, Egypt for the first seven years of my life. Seeing extraordinary events such as the Egyptian Revolution of 2011 has allowed me to develop a passion to fight for social justice and equality. I will be studying Electrical Engineering & Computer Science with a minor in Political Science at MIT.",
    image: "/experts/kiro.jpg",
    interests: ["Social Justice", "Technology", "Political Science"]
  },
  {
    id: 4,
    name: "Neha Nair",
    role: "Research Fellow",
    bio: "As a passionate environmental researcher and technology innovator, I thrive on bridging the gap between sustainability science and real-world solutions. My drive to make supply chains more transparent led me to found my startup, and my enthusiasm for transformative tech has opened doors to meaningful work with companies like TikTok and Google.",
    image: "/girl1.png",
    interests: ["Environmental Policy", "Technology", "Sustainability"]
  },
  {
    id: 5,
    name: "Oyindamola Akintola",
    role: "Research Fellow",
    bio: "Hello!. I am Oyindamola Akintola. I currently focus on advocacy efforts, especially with book bans in Texas. I run a podcast on the topic where I interview student leaders, politicians, authors, librarians, etc, all who have been impacted by book bans. I also work on & run a lot of community initiatives i.e. food drives.",
    image: "/experts/default-profile.jpg",
    interests: ["Advocacy", "Education Policy", "Community Initiatives"]
  },
  {
    id: 6,
    name: "Sabrina Morency",
    role: "Research Fellow",
    bio: "My name is Sabrina Morency and I'm currently a senior in high school. I was born in Haiti but I've lived in Connecticut for the majority of my life. Next year I will be attending Barnard College and majoring in History & Economics. I've always been passionate about law and public policy.",
    image: "/experts/sabrina.jpg",
    interests: ["Law", "Public Policy", "Economics"]
  },
  {
    id: 7,
    name: "Christian Wang",
    role: "Research Fellow",
    bio: "Oxford PPE Commit",
    image: "/experts/default-profile.jpg",
    mentor: "Oxford",
    interests: ["Philosophy", "Politics", "Economics"]
  },
  {
    id: 8,
    name: "Sophie",
    role: "Research Fellow",
    bio: "Sophie is a Coca-Cola Scholar Semifinalist and student rights advocate who speaks for fair educational legislation in her community. She also founded a program assisting Title 1 Students with attending Ivy League and top institutions.",
    image: "/experts/sophie.jpg",
    mentor: "Oxford",
    interests: ["Educational Policy", "Environmental Policy"]
  }
]

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <Image
          src={images.heroFellows}
          alt="UVA Research Fellows"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2 backdrop-blur-sm">
              Our Team
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Meet Our Research Fellows
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl">
              A diverse group of emerging scholars and policy experts shaping the future of public policy.
            </p>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {EXPERTS.map((expert, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={expert.id}
              >
                <Link 
                  href={`/experts/${expert.id}`}
                  className="block group bg-white border border-gray-100 rounded-lg shadow-sm 
                    hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      layout="fill"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {expert.name}
                    </h3>
                    <p className="text-sm text-gray-500">{expert.role}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 