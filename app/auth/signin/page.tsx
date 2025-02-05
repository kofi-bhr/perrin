'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleDebugLogin = () => {
    localStorage.setItem('userEmail', 'employee@perrin.org')
    localStorage.setItem('token', 'test-token')
    router.push('/admin')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      console.log('Attempting login...')
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      console.log('Response received:', response.status)
      if (response.ok) {
        const { token } = await response.json()
        localStorage.setItem('token', token)
        localStorage.setItem('userEmail', email)
        router.push('/employee-panel')
      } else {
        console.log('Login failed')
        setError('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Connection error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left side - Image with extremely minimal gradient fade */}
      <div className="hidden lg:block relative w-[60%]">
        <Image
          src="/uvasignin.jpg"
          alt="UVA campus"
          fill
          className="object-cover brightness-[0.95]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        {/* Barely visible fade to white */}
        <div className="absolute inset-y-0 right-0 w-[4%] bg-gradient-to-r from-transparent via-white/5 to-white" />
        <div className="absolute top-1/3 left-12 right-24">
          <Link href="/" className="text-white text-2xl font-serif font-bold">PERRIN</Link>
          <h2 className="mt-8 text-4xl font-serif font-bold text-white leading-tight">
            Welcome to the <br />Employee Portal
          </h2>
          <p className="mt-4 text-gray-300 max-w-md">
            Access your research dashboard, upload publications, and collaborate with fellow experts.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center px-8 lg:px-16 bg-white relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <Link href="/" className="text-3xl font-serif font-bold text-gray-900 lg:hidden">
              PERRIN
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-none
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-gray-900 bg-white"
                placeholder="name@perrin.org"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-none
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-gray-900 bg-white"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent
                text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-sm text-gray-500">
              Need help? Contact{' '}
              <a href="mailto:it@perrin.org" className="text-blue-600 hover:text-blue-500">
                IT Support
              </a>
            </span>
          </div>

          {/* Add Debug Login Button - only in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 text-center">
              <button
                onClick={handleDebugLogin}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Debug Admin Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 