"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiCheck, FiX, FiClock } from "react-icons/fi";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Paper {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  url: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function AdminPanel() {
  const router = useRouter();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  useEffect(() => {
    // Check if user is admin
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (!token || email !== "employee@perrin.org") {
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
      if (!response.ok) throw new Error("Failed to fetch papers");
      const data = await response.json();
      console.log("Admin papers:", data);
      setPapers(data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (paperId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/papers/${paperId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchPapers();
      } else {
        alert("Failed to update paper status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating paper status:", error);
      alert("Failed to update paper status. Please try again.");
    }
  };

  const filteredPapers = papers.filter(
    (paper) => selectedStatus === "all" || paper.status === selectedStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FiCheck className="text-green-500" />;
      case "rejected":
        return <FiX className="text-red-500" />;
      default:
        return <FiClock className="text-yellow-500" />;
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
                Admin Dashboard
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
    <div className="bg-fg/10">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-fg">
        <div className="absolute inset-0 bg-linear-to-r from-fg/70 to-fg/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
            <h1 className="text-4xl font-serif font-bold text-bg">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-fg/50">
              Manage research submissions and publications
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Submissions", value: papers.length },
            {
              label: "Pending Review",
              value: papers.filter((p) => p.status === "pending").length,
            },
            {
              label: "Approved Papers",
              value: papers.filter((p) => p.status === "approved").length,
            },
          ].map((stat, index) => (
            <div key={index} className="bg-bg p-6 shadow-xs">
              <div className="text-3xl font-bold text-fg">{stat.value}</div>
              <div className="text-fg/75">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-bg p-4 shadow-xs mb-6">
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? "bg-accent-alt-2 text-bg"
                    : "bg-gray-100 text-fg/75 hover:bg-fg/25"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-bg shadow-xs overflow-hidden">
          <table className="min-w-full divide-y divide-fg/25">
            <thead className="bg-fg/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-fg/100 uppercase tracking-wider">
                  Paper
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-fg/100 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-fg/100 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-fg/100 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-fg/100 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg divide-y divide-fg/25">
              {filteredPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-fg/10">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-fg">
                      {paper.title}
                    </div>
                    <div className="text-sm text-fg/100">
                      {paper.description}
                    </div>
                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-alt-2 hover:text-accent-alt text-sm mt-1 inline-block"
                      >
                        View PDF →
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-fg/100">
                    {paper.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-fg/100">
                    {paper.author}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(paper.status)}
                      <span className="ml-2 text-sm text-fg">
                        {paper.status.charAt(0).toUpperCase() +
                          paper.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {paper.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(paper.id, "approved")
                            }
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(paper.id, "rejected")
                            }
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
