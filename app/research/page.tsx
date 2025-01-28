"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RESEARCH_CATEGORIES } from "@/lib/constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import { images } from "@/lib/images";

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

export default function ResearchPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`${API_URL}/papers`);
        if (!response.ok) throw new Error("Failed to fetch papers");
        const data = await response.json();
        setPapers(data);
      } catch (error) {
        console.error("Error fetching papers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const filteredPapers = papers.filter((paper) => {
    const matchesCategory =
      selectedCategory === "all" || paper.category === selectedCategory;
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center border-b border-bg py-20 bg-gradient-to-br from-accent-alt to-accent-alt-2 w-full text-bg">
        <Image
          src={images.heroResearch}
          alt="UVA Research"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-fg/40 to-fg/20" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-sm font-semibold text-accent-alt bg-bg py-2 px-3 rounded-sm">
              Research & Publications
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-bg leading-tight">
              Our Research
            </h1>
            <p className="mt-6 text-xl text-fg/25 max-w-3xl">
              Explore our collection of policy research and analysis from UVA
              scholars.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative bg-bg border-b z-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 border-2 
                  ${
                    selectedCategory === "all"
                      ? "border-accent-alt-2 text-bg bg-accent-alt"
                      : "bg-bg border-fg text-fg hover:bg-accent hover:border-accent-alt-2 hover:text-bg"
                  }`}
              >
                All Research
              </button>
              {RESEARCH_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 text-sm font-medium transition-all duration-300 border-2 
                    ${
                      selectedCategory === category
                        ? "border-accent-alt-2 text-bg bg-accent-alt"
                        : "bg-bg border-fg text-fg hover:bg-accent hover:border-accent-alt-2 hover:text-bg"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <input
                type="search"
                placeholder="Search research..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-fg rounded-md focus:ring-2 
                  focus:ring-accent-alt focus:border-transparent outline-hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Papers Grid - Updated with Links */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPapers.map((paper) => (
              <Link
                key={paper.id}
                href={`/research/${paper.id}`}
                className="group bg-bg border border-accent rounded-lg shadow-sm hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3
                      className="text-xl font-bold text-fg group-hover:text-accent-alt-2 
                      transition-colors"
                    >
                      {paper.title}
                    </h3>
                  </div>
                  <p className="text-fg/75 mb-4 line-clamp-2">
                    {paper.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-fg/100 mb-4">
                    <span>{paper.category}</span>
                    <span>{new Date(paper.date).toLocaleDateString()}</span>
                  </div>
                  <div className="inline-flex items-center text-accent-alt-2 font-medium group-hover:text-accent-alt-2">
                    View Details
                    <svg
                      className="w-4 h-4 ml-2"
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
