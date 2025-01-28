"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login...");
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response received:", response.status);
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        router.push("/employee-panel");
      } else {
        console.log("Login failed");
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex z-10">
      {/* Left side - Image */}
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="/login-bg.jpg"
          alt="Think tank interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-fg/70 to-transparent" />
        <div className="absolute top-1/3 left-12 right-12">
          <Link href="/" className="text-bg text-2xl font-serif font-bold">
            PERRIN
          </Link>
          <h2 className="mt-8 text-4xl font-serif font-bold text-bg leading-tight">
            Welcome to the <br />
            Employee Portal
          </h2>
          <p className="mt-4 text-bg/75 max-w-md">
            Access your research dashboard, upload publications, and collaborate
            with fellow experts.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16 bg-bg z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <Link
              href="/"
              className="text-3xl font-serif font-bold text-fg lg:hidden"
            >
              PERRIN
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-fg">
              Employee Sign In
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-fg/75"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-fg/50 rounded-none
                  focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent
                  text-fg bg-bg"
                placeholder="name@perrin.org"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-fg/75"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-fg/50 rounded-none
                  focus:outline-hidden focus:ring-2 focus:ring-accent-alt focus:border-transparent
                  text-fg bg-bg"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-fg/50 text-accent focus:ring-accent-alt"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-fg/75"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-accent hover:text-accent-alt"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent
                text-sm font-medium text-bg bg-accent hover:bg-accent-alt
                focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-accent-alt
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-sm text-fg/75">
              Need help? Contact{" "}
              <a
                href="mailto:it@perrin.org"
                className="text-accent hover:text-accent-alt"
              >
                IT Support
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
