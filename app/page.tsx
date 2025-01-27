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

const gridStyle1 = [
  "md:col-span-5 md:row-span-4",
  "md:col-span-3 md:row-span-4 md:col-start-6",
  "md:col-span-4 md:row-span-4 md:row-start-5",
  "md:col-span-4 md:row-span-4 md:col-start-5 md:row-start-5",
];

const gridStyle2 = [
  "md:col-span-4 md:row-span-6",
  "md:col-span-3 md:row-span-2 md:col-start-5",
  "md:col-span-3 md:row-span-2 md:col-start-5 md:row-start-3",
  "md:col-span-3 md:row-span-2 md:col-start-5 md:row-start-5",
];

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
          .slice(0, 4);

        setLatestPapers(sorted);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    }

    fetchLatestPapers();
  }, []);

  return (
    <main className="mt-24">
      {/* Hero Section */}
      <section className="relative top-0 flex items-center border-b border-bg py-20 text-bg">
        <div className="w-full z-10 h-full">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col md:flex-row justify-between items-center">
            <div className="max-w-3xl space-y-6 2xl:space-y-8">
              <div>
                <span className="text-sm font-semibold text-accent-alt bg-bg py-2 px-3 rounded-sm">
                  In collaboration with the University of Virginia
                </span>
              </div>
              <h1 className="text-5xl/tight lg:text-7xl/tight font-serif font-bold leading-[1.15]">
                Shaping Tomorrow&apos;s <br /> <FlipWords words={words} />
              </h1>
              <p className="text-xl md:text-lg leading-relaxed max-w-4xl">
                Leading research institution dedicated to advancing public
                policy through rigorous analysis and innovative solutions for a
                more prosperous and equitable society.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="relative inline-block overflow-hidden bg-bg px-8 py-4 text-sm font-medium text-fg transform hover:-translate-y-1 hover:translate-x-1 hover:bg-bg active:bg-accent active:border-bg active:text-bg transition-all hover:shadow-bg hover:shadow-[-3px_3px_0_0] hover:border-accent border-2 border-bg rounded-md"
                >
                  View Our Research
                </Link>
                <Link
                  href="/experts"
                  className="relative inline-block overflow-hidden bg-bg px-8 py-4 text-sm font-medium text-fg transform hover:-translate-y-1 hover:translate-x-1 hover:bg-bg active:bg-accent active:border-bg active:text-bg transition-all hover:shadow-bg hover:shadow-[-3px_3px_0_0] hover:border-accent border-2 border-bg rounded-md"
                >
                  Meet Our Experts
                </Link>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="pr-0 lg:pr-12 h-full md:ml-10 pt-10">
              <div className="grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-8">
                {[
                  { number: "25+", label: "Years of Excellence" },
                  { number: "200+", label: "Research Publications" },
                  { number: "50+", label: "Policy Experts" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="border-b-2 md:border-r-2 pb-4 md:pr-6 border-bg flex flex-col justify-center rounded-br-lg"
                  >
                    <span className="text-4xl">{stat.number}</span>
                    <span className="mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="relative flex flex-col justify-center border-b border-bg py-20 bg-gradient-to-br from-accent-alt to-accent-alt-2 w-full text-bg noise">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <h2 className="text-4xl font-serif font-bold mb-12 text-le00">
            Featured Research
          </h2>
          <div className="grid md:grid-cols-8 md:grid-rows-8 gap-4 w-full md:h-[69rem]">
            {[1, 2, 3, 4].map((item) => (
              <Link
                href="/research/1"
                key={item}
                className={`group justify-between h-96 md:h-full rounded-xl overflow-clip ${
                  gridStyle1[item - 1]
                }`}
              >
                <div className="relative top-0 left-0 h-full rounded-xl overflow-clip">
                  <Image
                    src={`/uva-stock-1.jpg`}
                    alt="Research thumbnail"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative -translate-y-full left-0 pt-7 bg-gradient-to-b from-transparent to-fg/75 rounded-b-xl">
                  <div className="p-6">
                    <span className=" font-semibold text-sm">
                      Policy Analysis
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3">
                      Understanding Global Economic Trends
                    </h3>
                    <p className="mb-4">
                      An in-depth analysis of emerging economic patterns and
                      their implications for policy makers
                    </p>
                    <div className="group font-semibold flex items-center">
                      <span>Read More</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 group-hover:translate-x-2 transition-transform w-4 stroke-2"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="relative flex flex-col items-center border-b border-bg py-20 bg-gradient-to-bl from-accent-alt-2 to-accent text-bg noise">
        <div className="max-w-7xl px-4 mx-auto w-full">
          <h2 className="text-4xl font-serif font-bold mb-12 text-left">
            Our Experts
          </h2>
          <div className="grid md:grid-cols-3 gap-8 w-full md:h-[42rem]">
            {[1, 2, 3].map((item) => (
              <Link
                href="/experts/1"
                key={item}
                className="group overflow-clip md:h-full h-96 rounded-xl"
              >
                <div className="relative top-0 left-0 h-full rounded-xl overflow-clip">
                  <Image
                    src={`/experts.jpg`}
                    alt="Expert portrait"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* <Image
                    src={`/expert-${item}.jpg`}
                    alt="Expert portrait"
                    fill
                    className="object-fill group-hover:scale-105 transition-transform duration-300"
                  /> */}
                </div>
                <div className="relative -translate-y-full left-0 pt-7 bg-gradient-to-b from-transparent to-fg/75 rounded-b-xl">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">
                      Dr. Sarah Johnson
                    </h3>
                    <p className="text-sm mb-2">
                      Senior Fellow, Economic Policy
                    </p>
                    <div className="font-semibold flex items-center text-sm">
                      <span>View Profile</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 group-hover:translate-x-2 transition-transform w-4 stroke-2"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Publications - Updated */}
      <section className="relative flex flex-col items-center py-20 bg-gradient-to-br from-accent to-accent-alt text-bg noise">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12">
            Latest Publications
          </h2>

          <div className="grid md:grid-cols-7 md:grid-rows-6 gap-8">
            {latestPapers.map((paper, i) => (
              <Link
                key={paper.id}
                href={`/research/${paper.id}`}
                className={`group backdrop-blur-xs overflow-hidden 
                   transition-all duration-300 transform hover:-translate-y-1 border-2 border-accent ${gridStyle2[i]}`}
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
              className="inline-block border-2 px-8 py-3 font-medium transition-colors hover:text-accent hover:border-accent border-accent/10 bg-accent/10"
            >
              View All Research
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
