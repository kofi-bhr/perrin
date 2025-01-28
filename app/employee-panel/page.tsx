"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RESEARCH_CATEGORIES } from "@/lib/constants";
import LoadingSpinner from "@/components/LoadingSpinner";

type SubmissionStep = "draft" | "review" | "success";

interface Paper {
  id: string;
  title: string;
  description: string;
  category: string;
  abstract: string;
  author: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  url: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function EmployeePanel() {
  const router = useRouter();
  const [step, setStep] = useState<SubmissionStep>("draft");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Economic Policy",
    abstract: "",
    file: null as File | null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    fetchPapers();
  }, [router]);

  const fetchPapers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/papers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched papers:", data);
      setPapers(data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "draft") {
      setStep("review");
      return;
    }

    if (step === "review" && formData.file) {
      const form = new FormData();
      form.append("file", formData.file);
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("abstract", formData.abstract);

      try {
        const token = localStorage.getItem("token");
        // Don't set Content-Type header - browser will set it with boundary for FormData
        const response = await fetch(`${API_URL}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        });

        if (response.ok) {
          const paper = await response.json();
          console.log("Upload successful:", paper);
          setStep("success");
          fetchPapers();
          // Reset form
          setFormData({
            title: "",
            description: "",
            category: "Economic Policy",
            abstract: "",
            file: null,
          });
        } else {
          const error = await response.json();
          console.error("Upload failed:", error);
          alert(
            "Error uploading research: " + (error.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error uploading:", error);
        alert("Network error while uploading. Please try again.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  if (isLoading)
    return (
      <div className="bg-fg/10">
        <div className="relative h-[30vh] bg-fg">
          <div className="absolute inset-0 bg-linear-to-r from-fg/70 to-fg/50" />
          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
              <h1 className="text-4xl font-serif font-bold text-bg">
                Employee Dashboard
              </h1>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <LoadingSpinner />
        </div>
      </div>
    );

  return (
    <div className="bg-fg/10 ">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-fg">
        <div className="absolute inset-0 bg-linear-to-r from-fg/70 to-fg/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
            <h1 className="text-4xl font-serif font-bold text-bg">
              Employee Dashboard
            </h1>
            <p className="mt-2 text-fg/50">
              Upload and manage your research publications
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {step === "success" ? (
              <div className="bg-bg shadow-xs p-8 text-center">
                <div className="text-green-500 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Research Submitted Successfully!
                </h2>
                <p className="text-fg/75 mb-6">
                  Your research paper has been submitted and is pending review.
                </p>
                <button
                  onClick={() => setStep("draft")}
                  className="bg-accent-alt-2 text-bg px-6 py-3 hover:bg-accent-alt-2"
                >
                  Submit Another Paper
                </button>
              </div>
            ) : (
              <div className="bg-bg shadow-xs p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-fg">
                    {step === "draft"
                      ? "Submit New Research"
                      : "Review Submission"}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-fg/100">
                    <span
                      className={
                        step === "draft" ? "text-accent-alt-2 font-bold" : ""
                      }
                    >
                      Draft
                    </span>
                    <span>→</span>
                    <span
                      className={
                        step === "review" ? "text-accent-alt-2 font-bold" : ""
                      }
                    >
                      Review
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-fg/75 mb-2">
                      Research Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      disabled={step === "review"}
                      className="w-full px-4 py-3 border border-fg/50 focus:ring-2 focus:ring-accent-alt 
                        focus:border-transparent outline-hidden transition-colors disabled:bg-fg/10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-fg/75 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      disabled={step === "review"}
                      className="w-full px-4 py-3 border border-fg/50 focus:ring-2 focus:ring-accent-alt 
                        focus:border-transparent outline-hidden transition-colors disabled:bg-fg/10"
                      required
                    >
                      {RESEARCH_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-fg/75 mb-2">
                      Brief Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      disabled={step === "review"}
                      rows={3}
                      className="w-full px-4 py-3 border border-fg/50 focus:ring-2 focus:ring-accent-alt 
                        focus:border-transparent outline-hidden transition-colors disabled:bg-fg/10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-fg/75 mb-2">
                      Abstract
                    </label>
                    <textarea
                      value={formData.abstract}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          abstract: e.target.value,
                        }))
                      }
                      disabled={step === "review"}
                      rows={6}
                      className="w-full px-4 py-3 border border-fg/50 focus:ring-2 focus:ring-accent-alt 
                        focus:border-transparent outline-hidden transition-colors disabled:bg-fg/10"
                      required
                    />
                  </div>

                  {step === "draft" && (
                    <div>
                      <label className="block text-sm font-medium text-fg/75 mb-2">
                        PDF File
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full"
                        required
                      />
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    {step === "review" && (
                      <button
                        type="button"
                        onClick={() => setStep("draft")}
                        className="px-6 py-3 border border-fg/50 text-fg/75 hover:bg-fg/10"
                      >
                        Back to Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-6 py-3 bg-accent-alt-2 text-bg hover:bg-accent-alt-2"
                    >
                      {step === "draft"
                        ? "Review Submission"
                        : "Submit Research"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            <div className="bg-bg shadow-xs p-6">
              <h2 className="text-lg font-bold text-fg mb-4">
                Your Submissions
              </h2>
              {papers.length === 0 ? (
                <p className="text-fg/100">No submissions yet</p>
              ) : (
                <div className="space-y-4">
                  {papers.map((paper) => (
                    <div
                      key={paper.id}
                      className="border-l-4 border-accent-alt-2 pl-4"
                    >
                      <h3 className="font-medium">{paper.title}</h3>
                      <div className="flex justify-between items-center mt-1 text-sm">
                        <span className="text-fg/75">
                          {new Date(paper.date).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            paper.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : paper.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {paper.status.charAt(0).toUpperCase() +
                            paper.status.slice(1)}
                        </span>
                      </div>
                      {paper.url && (
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-alt-2 hover:text-accent-alt text-sm mt-2 inline-block"
                        >
                          View PDF →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
