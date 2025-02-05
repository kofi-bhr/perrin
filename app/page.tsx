"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FlipWords } from "../components/ui/flip-words";
import { images } from "@/lib/images";
import nasa from "@/public/nasa.png";
import { getImageUrl } from '@/lib/utils'

interface Paper {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  status: string;
  url: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://perrin-production.up.railway.app";

export default function Home() {
  const [latestPapers, setLatestPapers] = useState<Paper[]>([]);
  const words = ["Future", "Policy", "World", "Legislation"];

  useEffect(() => {
    async function fetchLatestPapers() {
      try {
        const response = await fetch(`${API_URL}/papers`);
        if (!response.ok) throw new Error("Failed to fetch papers");
        const data = await response.json();
        // Sort by date and take latest 3
        const sorted = data
          .sort(
            (a: Paper, b: Paper) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 3);
        setLatestPapers(sorted);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    }

    fetchLatestPapers();
  }, []);

  const fadeIn: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const fadeInTransition = {
    duration: 0.6,
    ease: "easeOut",
  };

  const staggerChildren: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-white w-full overflow-clip">
      {/* Hero Section */}
      <section className="relative h-screen md:h-[900px] flex items-center">
        <Image
          src={images.heroHome}
          alt="UVA campus"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />

        <div className="absolute w-full z-10">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="2xl:max-w-3xl space-y-2 2xl:space-y-8"
            >
              <div>
                <span className="text-xs md:text-md text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2">
                  An Institution at The University of Virginia
                </span>
                <h1 className="mt-4 text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.15] tracking-tight drop-shadow-lg">
                  Shaping Tomorrow&apos;s <br /> <FlipWords words={words} />
                </h1>
              </div>
              <p className="text-gray-200 text-sm md:text-lg leading-relaxed max-w-4xl drop-shadow-lg">
                Leading research institution dedicated to advancing public
                policy through rigorous analysis and innovative solutions for a
                more prosperous and equitable society.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-4 pt-4">
                <Link
                  href="/research"
                  className="bg-white text-gray-900 px-2 md:px-6 py-2 text-md md:text-lg font-semibold 
                    hover:bg-gray-100 transition-colors border-2 border-white"
                >
                  View Our Research
                </Link>
                <Link
                  href="/experts"
                  className="border-2 border-white text-white px-2 md:px-6 py-2 text-md md:text-lg font-semibold 
                    hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Meet Our Experts
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="absolute -bottom-14 md:bottom-0 left-0 right-0 z-10"
        >
          <div className="max-w-7xl mx-auto px-4 pb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { number: "250+", label: "Policy Researchers" },
                { number: "$3.7M+", label: "Alumni Scholarships Secured" },
                { number: "200+", label: "Research Publications" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  transition={fadeInTransition}
                  className="text-white border-l-2 border-blue-400 pl-6"
                >
                  <div className="text-4xl font-bold font-serif">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 mt-1 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Featured Research Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold mb-12 text-center"
          >
            Featured Research
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: nasa,
                category: "Technology",
                title:
                  "NASA Research Journal: CHAPEA Operation Dynamics and Performance Utility Delta",
                description:
                  "A comprehensive analysis of Mars analog missions and recommendations for enhanced data collection",
                link: "/research/1738121086204",
              },
              {
                image: getImageUrl('/research-2.jpg'),
                category: "Economic Policy",
                title: "Economic Impact of Green Energy Transition",
                description:
                  "Analyzing the economic implications of transitioning to renewable energy sources across different sectors",
                link: "/research/2",
              },
              {
                image: getImageUrl('/research-3.jpg'),
                category: "Social Policy",
                title: "Digital Inclusion in Rural Communities",
                description:
                  "Examining barriers to digital access and proposing solutions for rural development",
                link: "/research/3",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={`${item.title} thumbnail`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-blue-600 font-semibold text-sm">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link
                    href={item.link}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Kashaf Alvi BBC Feature */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-blue-400 font-semibold tracking-wider uppercase bg-blue-50/80 px-4 py-2 rounded-full">
                Featured Research Fellow
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
                Breaking Barriers:
                <br />
                <span className="text-blue-600">Kashaf Alvi</span> on BBC
              </h2>
              <div className="space-y-4">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Meet our distinguished research fellow, Kashaf Alvi, a
                  pioneering voice in disability inclusivity and technological
                  innovation. Featured on BBC, his groundbreaking work
                  challenges conventional narratives and pushes boundaries in
                  advocacy and social change.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Pioneer Deaf Author",
                    "Tech Innovator",
                    "Peace Advocate",
                    "Climate Justice Champion",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-50/50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/experts/kashaf-alvi"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 
                    font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More About Our Research Fellows
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/xS_3pUX3Qvg?autoplay=1&mute=1&loop=1&playlist=xS_3pUX3Qvg"
                title="Kashaf Alvi BBC Feature"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Experts Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold mb-12 text-center"
          >
            Our Experts
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative h-64 mb-4 overflow-hidden">
                  <Image
                    src={getImageUrl(`/expert-${item}.jpg`)}
                    alt="Expert portrait"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Dr. Sarah Johnson</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Senior Fellow, Economic Policy
                </p>
                <Link
                  href="/experts/1"
                  className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                >
                  View Profile →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Publications - Updated */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold mb-12 text-center"
          >
            Latest Publications
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {latestPapers.map((paper) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden 
                  hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full 
                      bg-blue-600/20 text-blue-400"
                    >
                      {paper.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(paper.date).toLocaleDateString()}
                    </span>
                  </div>

                  <motion.h3
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 
                      transition-colors"
                  >
                    {paper.title}
                  </motion.h3>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {paper.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <span className="text-sm text-gray-400">
                      {paper.author}
                    </span>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                      Read More
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/research"
              className="inline-block border-2 border-blue-400 text-blue-400 px-8 py-3 
                font-medium hover:bg-blue-400 hover:text-gray-900 transition-colors"
            >
              View All Research
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
