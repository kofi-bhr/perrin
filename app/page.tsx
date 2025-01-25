"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlipWords } from "../components/ui/flip-words";

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
  const words = ["Future", "Public Policy", "World", "Legislation"];

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

  return (
    <main className="bg-bg">
      {/* Hero Section */}
      <section className="relative flex items-center md:mt-24 border-b border-fg py-20">
        <div className="w-full z-10 h-full">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-row justify-between items-center">
            <div className="max-w-3xl space-y-2 2xl:space-y-4">
              <div>
                <span className="text-sm font-semibold text-accent bg-accent/25 p-2">
                  In collaboration with the University of Virginia
                </span>
                <h1 className="text-5xl/tight lg:text-7xl/tight font-serif font-bold text-fg leading-[1.15]">
                  Shaping Tomorrow&apos;s <br /> <FlipWords words={words} />
                </h1>
              </div>
              <p className="text-xl md:text-lg leading-relaxed max-w-4xl">
                Leading research institution dedicated to advancing public
                policy through rigorous analysis and innovative solutions for a
                more prosperous and equitable society.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="relative inline-block overflow-hidden border-2 border-accent/10 bg-accent/10 px-8 py-4 text-sm font-medium text-fg hover:text-accent focus:ring active:bg-accent active:text-bg-alt-2 hover:border-accent outline- transition-colors"
                >
                  View Our Research
                </Link>
                <Link
                  href="/experts"
                  className="relative inline-block overflow-hidden border-2 border-accent/10 bg-accent/10 px-8 py-4 text-sm font-medium text-fg hover:text-accent focus:ring active:bg-accent active:text-bg-alt-2 hover:border-accent transition-colors"
                >
                  Meet Our Experts
                </Link>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="pr-12 h-full ">
              <div className="grid grid-rows-3 gap-8">
                {[
                  { number: "25+", label: "Years of Excellence" },
                  { number: "200+", label: "Research Publications" },
                  { number: "50+", label: "Policy Experts" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="border-r-2 pr-6 border-accent flex flex-col justify-center"
                  >
                    <div className="text-4xl font-bold">{stat.number}</div>
                    <div className="mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="relative flex flex-col justify-center border-b border-fg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-left">
            Featured Research
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="shadow-sm hover:shadow-md transition-shadow border-2 border-accent"
              >
                <div className="relative h-48">
                  <Image
                    src={`/research-${item}.jpg`}
                    alt="Research thumbnail"
                    fill
                    className="object-cover"
                  />
                  <Image
                    src={`/research-1.jpg`}
                    alt="Research thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className=" font-semibold text-sm">
                    Policy Analysis
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3">
                    Understanding Global Economic Trends
                  </h3>
                  <p className="mb-4">
                    An in-depth analysis of emerging economic patterns and their
                    implications for policy makers
                  </p>
                  <Link
                    href="/research/1"
                    className="group font-semibold flex items-center"
                  >
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 group-hover:translate-x-2 transition-transform w-4 stroke-2"
                    >
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="relative flex flex-col items-center border-b border-fg py-20">
        <div className="max-w-7xl px-4 mx-auto w-full">
          <h2 className="text-4xl font-serif font-bold mb-12 text-left">
            Our Experts
          </h2>
          <div className="grid md:grid-cols-4 gap-8 w-full">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group border-2 border-accent">
                <div className="relative h-64 mb-4 overflow-hidden">
                  <Image
                    src={`/expert-${item}.jpg`}
                    alt="Expert portrait"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Dr. Sarah Johnson</h3>
                  <p className="text-fg/75 text-sm mb-2">
                    Senior Fellow, Economic Policy
                  </p>
                  <Link
                    href="/experts/1"
                    className="group/link font-semibold flex items-center text-sm"
                  >
                    <span>View Profile</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 group-hover/link:translate-x-2 transition-transform w-4 stroke-2"
                    >
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Publications - Updated */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">
            Latest Publications
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {latestPapers.map((paper) => (
              <Link
                key={paper.id}
                href={`/research/${paper.id}`}
                className="group backdrop-blur-sm overflow-hidden 
                   transition-all duration-300 transform hover:-translate-y-1 border-2 border-accent"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2 text-xs">
                    <span
                      className="pr-3 py-1 font-semibold rounded-full 
                     "
                    >
                      {paper.category}
                    </span>
                    <span className="text-fg/75">
                      {new Date(paper.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-3 
                    transition-colors"
                  >
                    {paper.title}
                  </h3>

                  <p className="mb-4 line-clamp-2">{paper.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-fg/10">
                    <span className="text-sm">{paper.author}</span>
                    <div className="flex items-center gap-2 text-sm font-medium ">
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 group-hover:translate-x-1 transition-transform w-4 stroke-2"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/research"
              className="inline-block border-2 px-8 py-3 font-medium transition-colors hover:text-accent hover:border-accent border-accent/10"
            >
              View All Research
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
