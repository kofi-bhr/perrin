"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeInRight {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeInDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out 0.2s both;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out 0.4s both;
        }
                 .animate-fadeInDown {
           animation: fadeInDown 0.8s ease-out 0.3s both;
         }
         @keyframes float {
           0%, 100% {
             transform: translateY(0);
           }
           50% {
             transform: translateY(-2px);
           }
         }
         .animate-float {
           animation: float 3s ease-in-out infinite;
         }
      `}</style>
      {/* Ultra-refined FAANG Header with Animations */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-3xl border-b border-gray-100/40 animate-slideDown">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Enhanced back button */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group px-2 py-1.5 rounded-lg hover:bg-gray-50/80 transition-all duration-300 hover:scale-105 animate-fadeInLeft"
            >
              <div className="w-7 h-7 rounded-full bg-gray-100/80 flex items-center justify-center group-hover:bg-gray-200/80 transition-all duration-300 group-hover:rotate-[-5deg] group-hover:shadow-sm">
                <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-all duration-300">Back</span>
            </Link>

            {/* Center - Animated logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 animate-fadeInDown">
              <div className="group cursor-pointer">
                <Image 
                  src="/moretechperrin-removebg-preview.png" 
                  alt="Perrin Institution" 
                  width={140} 
                  height={48}
                  className="h-9 w-auto transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </div>
            
            {/* Right side - Animated portal indicator */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-teal-50 to-teal-50/80 rounded-full border border-teal-100/50 animate-fadeInRight hover:shadow-sm transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-teal-700">Employee Portal</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen pt-16">
                 {/* Left side - Enhanced Apple-style branding */}
         <div className="hidden lg:flex lg:w-3/5 relative animate-fadeInLeft"
              style={{ 
                animation: 'fadeInLeft 0.8s ease-out 0.6s both' 
              }}>
          <div className="absolute inset-0">
            <Image
              src="/congress.webp"
              alt="The Perrin Institution"
              fill
              className="object-cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-20 py-24">
            <div className="max-w-md">
              <div className="mb-20">
                <h1 className="text-6xl font-extralight text-white mb-8 leading-none tracking-tight">
                  The Perrin Institution
                </h1>
                <p className="text-xl text-gray-200 font-light leading-relaxed">
                  Advanced analytics and machine learning for transformative policy solutions.
                </p>
              </div>
              
              <div className="space-y-10">
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Trusted by Government</h3>
                    <p className="text-gray-300 text-sm">Policy recommendations across federal agencies</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Expert Network</h3>
                    <p className="text-gray-300 text-sm">250+ policy researchers and analysts</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Secure Access</h3>
                    <p className="text-gray-300 text-sm">Enterprise-grade security and privacy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

                 {/* Right side - Ultra-polished Apple-style login form */}
         <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-20 bg-white animate-fadeInRight"
              style={{ 
                animation: 'fadeInRight 0.8s ease-out 0.8s both' 
              }}>
          <div className="max-w-sm w-full">
            {/* Mobile hero section */}
            <div className="lg:hidden text-center mb-20">
              <Image 
                src="/moretechperrin-removebg-preview.png" 
                alt="Perrin Institution" 
                width={180} 
                height={60}
                className="h-14 w-auto mx-auto mb-8"
              />
              <h1 className="text-3xl font-extralight text-gray-900 mb-3 tracking-tight">The Perrin Institution</h1>
              <p className="text-gray-500 text-base">Advanced analytics for policy solutions</p>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-5xl font-extralight text-gray-900 mb-4 tracking-tight">Sign in</h2>
              <p className="text-gray-500 text-lg">to continue to Employee Portal</p>
            </div>

                         <div className={`transition-all duration-300 animate-float ${isShaking ? 'animate-shake' : ''}`}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className={`w-full px-5 py-4 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-400 transition-all duration-300 text-lg font-light tracking-wide ${
                        isFocused 
                          ? 'border-teal-500 ring-4 ring-teal-500/10 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300 shadow-sm'
                      } focus:outline-none`}
                      placeholder="Employee access code"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 font-light">Contact your administrator for access credentials</p>
                </div>
                
                {error && (
                  <div className="p-5 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-sm text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl text-white font-medium transition-all duration-300 text-lg shadow-lg ${
                    isLoading 
                      ? "bg-gray-400 cursor-not-allowed shadow-sm" 
                      : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800 hover:shadow-xl hover:shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.2 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            </div>
            
            {/* Ultra-refined footer */}
            <div className="mt-20 text-center">
              <div className="flex items-center justify-center space-x-10 mb-8">
                <div className="flex items-center text-gray-400 text-xs">
                  <svg className="w-4 h-4 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Secure</span>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <svg className="w-4 h-4 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-medium">Private</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm font-light">
                © {new Date().getFullYear()} Perrin Institution
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 