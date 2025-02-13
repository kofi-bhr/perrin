export const RESEARCH_CATEGORIES = [
  'Economic Policy',
  'Foreign Relations',
  'Climate Change',
  'Healthcare',
  'Education',
  'Technology'
] as const

export type ResearchCategory = typeof RESEARCH_CATEGORIES[number]

export interface Expert {
  id: number
  name: string
  role: string
  bio: string
  image: string
  mentor?: string
  interests?: string[]
}

export const EXPERTS: Expert[] = [
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
    image: "/default-avatar-photo-placeholder-profile-picture-vector.jpg",
    interests: ["Government", "Molecular Biology", "Healthcare"]
  },
  {
    id: 3,
    name: "Kiro Moussa",
    role: "Research Fellow",
    bio: "Hello! I'm Kiro Moussa. I've lived in Alexandria, Egypt for the first seven years of my life. Seeing extraordinary events such as the Egyptian Revolution of 2011 has allowed me to develop a passion to fight for social justice and equality. I will be studying Electrical Engineering & Computer Science with a minor in Political Science at MIT.",
    image: "/guypng1.png",
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
    image: "/default-avatar-photo-placeholder-profile-picture-vector.jpg",
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
    image: "/default-avatar-photo-placeholder-profile-picture-vector.jpg",
    mentor: "Oxford",
    interests: ["Philosophy", "Politics", "Economics"]
  },
  {
    id: 8,
    name: "Sophie",
    role: "Research Fellow",
    bio: "Sophie is a Coca-Cola Scholar Semifinalist and student rights advocate who speaks for fair educational legislation in her community. She also founded a program assisting Title 1 Students with attending Ivy League and top institutions.",
    image: "/girl2.png",
    mentor: "Oxford",
    interests: ["Educational Policy", "Environmental Policy"]
  },
  {
    id: 9,
    name: "Lourdes Ronquillo-Castro",
    role: "Research Fellow",
    bio: "Dedicated to advancing public policy solutions with a focus on social justice and community development.",
    image: "/girl3png.png",
    interests: ["Social Justice", "Public Policy", "Community Development"]
  },
  {
    id: 10,
    name: "Heba Elkouraichi",
    role: "Research Fellow",
    bio: "Passionate about international relations and policy research, with a focus on global development and cross-cultural understanding.",
    image: "/girl4.png",
    interests: ["International Relations", "Global Development", "Policy Research"]
  }
]

export const images = {
  heroHome: '/uva-stock-1.jpg',
  heroResearch: '/uva-stock-2.jpg',
  heroEvents: '/uva-stock-3.jpg',
  heroFellows: '/uva-stock-4.jpg',
  defaultProfile: '/default-profile.jpg'
} 