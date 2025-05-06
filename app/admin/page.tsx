"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call server-side API to verify access code
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode }),
      });

      const data = await response.json();

      if (data.success) {
        // Store auth state in sessionStorage
        sessionStorage.setItem("perrinAdminAuth", "true");
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid access code");
        setIsLoading(false);
        // Add shaking animation for invalid login
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", zIndex: 9999 }}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center items-center mb-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-0.5 rounded-full mr-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-blue-400 text-xs font-medium tracking-wider uppercase">Staff Portal</p>
            </div>
            <Image 
              src="/moretechperrin-removebg-preview.png" 
              alt="Perrin Institution Logo" 
              width={180} 
              height={60}
              className="h-14 w-auto mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-white">Employee Access</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to manage Perrin Institution content</p>
          </div>
          
          <div className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/80 shadow-2xl transition-all ${isShaking ? 'animate-shake' : ''}`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Employee Access Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800/70 text-white shadow-inner focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter access code"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Enter the shared employee access code</p>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-lg flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-300 shadow-lg ${
                  isLoading 
                    ? "bg-blue-700/50 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-900/20 hover:shadow-blue-900/40 transform hover:-translate-y-0.5"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Continue to Dashboard"
                )}
              </button>
            </form>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} Perrin Institution. All rights reserved.</p>
            <p className="mt-1">This is a secure portal for authorized staff only.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 