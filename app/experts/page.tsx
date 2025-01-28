"use client";
import Image from "next/image";
import { images } from "@/lib/images";

interface Expert {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  mentor?: string;
  interests?: string[];
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
  },
  {
    id: 2,
    name: "Lexie Hobbs",
    role: "Research Fellow",
    bio: "Lexie Hobbs is a current senior at Ringgold High School and admitted to Smith College through Questbridge National College Match. She intends to major in government and molecular biology. She is currently a fellow at Grassroots Democrats HQ and an emergency technician at Hamilton Medical Center as well.",
    image: "/experts/anonymous.jpg",
    interests: ["Government", "Molecular Biology", "Healthcare"],
  },
  {
    id: 3,
    name: "Kiro Moussa",
    role: "Research Fellow",
    bio: "Hello! I'm Kiro Moussa. I've lived in Alexandria, Egypt for the first seven years of my life. Seeing extraordinary events such as the Egyptian Revolution of 2011 has allowed me to develop a passion to fight for social justice and equality. I will be studying Electrical Engineering & Computer Science with a minor in Political Science at MIT.",
    image: "/experts/kiro.jpg",
    interests: ["Social Justice", "Technology", "Political Science"],
  },
  {
    id: 4,
    name: "Neha Nair",
    role: "Research Fellow",
    bio: "As a passionate environmental researcher and technology innovator, I thrive on bridging the gap between sustainability science and real-world solutions. My drive to make supply chains more transparent led me to found my startup, and my enthusiasm for transformative tech has opened doors to meaningful work with companies like TikTok and Google.",
    image: "/experts/neha.jpg",
    interests: ["Environmental Policy", "Technology", "Sustainability"],
  },
  {
    id: 5,
    name: "Oyindamola Akintola",
    role: "Research Fellow",
    bio: "Hello!. I am Oyindamola Akintola. I currently focus on advocacy efforts, especially with book bans in Texas. I run a podcast on the topic where I interview student leaders, politicians, authors, librarians, etc, all who have been impacted by book bans. I also work on & run a lot of community initiatives i.e. food drives.",
    image: "/experts/default-profile.jpg",
    interests: ["Advocacy", "Education Policy", "Community Initiatives"],
  },
  {
    id: 6,
    name: "Sabrina Morency",
    role: "Research Fellow",
    bio: "My name is Sabrina Morency and I'm currently a senior in high school. I was born in Haiti but I've lived in Connecticut for the majority of my life. Next year I will be attending Barnard College and majoring in History & Economics. I've always been passionate about law and public policy.",
    image: "/experts/sabrina.jpg",
    interests: ["Law", "Public Policy", "Economics"],
  },
  {
    id: 7,
    name: "Christian Wang",
    role: "Research Fellow",
    bio: "Oxford PPE Commit",
    image: "/experts/default-profile.jpg",
    mentor: "Oxford",
    interests: ["Philosophy", "Politics", "Economics"],
  },
  {
    id: 8,
    name: "Sophie",
    role: "Research Fellow",
    bio: "Sophie is a Coca-Cola Scholar Semifinalist and student rights advocate who speaks for fair educational legislation in her community. She also founded a program assisting Title 1 Students with attending Ivy League and top institutions.",
    image: "/experts/sophie.jpg",
    mentor: "Oxford",
    interests: ["Educational Policy", "Environmental Policy"],
  },
];

export default function ExpertsPage() {
  return (
    <div className="min-h-screen mt-24">
      {/* Hero Section */}
      <section className="relative top-0 flex items-center border-b border-bg py-20 text-bg">
        <div className="absolute inset-0 bg-linear-to-r from-fg/40 to-fg/20" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-sm font-semibold text-accent-alt bg-bg py-2 px-3 rounded-sm">
              Our Team
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-bg leading-tight">
              Meet Our Research Fellows
            </h1>
            <p className="mt-6 text-xl text-bg max-w-3xl">
              A diverse group of emerging scholars and policy experts shaping
              the future of public policy.
            </p>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="relative py-20 bg-gradient-to-br from-accent-alt-2 to-accent-alt z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {EXPERTS.map((expert) => (
              <div
                key={expert.id}
                className="group bg-bg border border-bg rounded-lg shadow-sm 
                  hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-fg/60 via-fg/20 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-fg">{expert.name}</h3>
                  <p className="text-accent-alt-2 text-sm font-medium mt-1">
                    {expert.role}
                  </p>

                  {expert.mentor && (
                    <p className="text-fg/75 text-sm mt-2">
                      Mentor: {expert.mentor}
                    </p>
                  )}

                  <p className="mt-4 text-fg/75 text-sm line-clamp-4">
                    {expert.bio}
                  </p>

                  {expert.interests && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expert.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-accent text-bg text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
