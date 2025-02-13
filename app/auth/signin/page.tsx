'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

type AuthMode = 'pin' | 'request'

export default function SignIn() {
  const [mode, setMode] = useState<AuthMode>('pin')
  const [pin, setPin] = useState('')
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    reason: '',
    department: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [requestStatus, setRequestStatus] = useState<{
    status?: 'pending' | 'approved'
    pin?: string
    message?: string
  } | null>(null)
  const router = useRouter()

  const handlePinLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Hardcoded PIN check
    if (pin === '000000') {
      localStorage.setItem('token', 'test-token')
      localStorage.setItem('userEmail', 'employee@perrin.org')
      router.push('/employee-panel')
      return
    }

    try {
      const response = await fetch(`${API_URL}/auth/verify-pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pin })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('userEmail', data.email)
        router.push('/employee-panel')
      } else {
        setError('Invalid PIN')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Connection error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccessRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_URL}/auth/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestForm)
      })

      if (response.ok) {
        setSuccess('Request submitted successfully. Please wait for admin approval.')
        setRequestForm({ name: '', email: '', reason: '', department: '' })
      } else {
        setError('Failed to submit request')
      }
    } catch (error) {
      console.error('Request error:', error)
      setError('Connection error')
    } finally {
      setIsLoading(false)
    }
  }

  const checkRequestStatus = async (email: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/request-status?email=${email}`)
      if (response.ok) {
        const data = await response.json()
        setRequestStatus(data)
      }
    } catch (error) {
      console.error('Error checking status:', error)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden lg:block relative w-[60%]">
        <Image
          src="/uvasignin.jpg"
          alt="UVA campus"
          fill
          className="object-cover brightness-[0.95]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
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

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-[40%] flex items-center justify-center px-8 lg:px-16 bg-white relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-serif font-bold text-gray-900 lg:hidden">
              PERRIN
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Employee Access
            </h1>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setMode('pin')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors
                ${mode === 'pin' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Enter PIN
            </button>
            <button
              onClick={() => setMode('request')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors
                ${mode === 'request' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Request Access
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              {success}
            </div>
          )}

          {mode === 'pin' ? (
            <form onSubmit={handlePinLogin} className="space-y-6">
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                  Access PIN
                </label>
                <input
                  id="pin"
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your PIN"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
                  hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAccessRequest} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={requestForm.name}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={requestForm.email}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={requestForm.department}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Access
                </label>
                <textarea
                  required
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="mb-6">
                <button
                  onClick={() => checkRequestStatus(requestForm.email)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Check Request Status
                </button>

                {requestStatus && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    requestStatus.status === 'approved' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    {requestStatus.status === 'approved' ? (
                      <>
                        <p className="text-green-800 font-medium">Your request has been approved!</p>
                        <p className="text-green-700 mt-2">Your PIN: <span className="font-mono font-bold">{requestStatus.pin}</span></p>
                      </>
                    ) : (
                      <p className="text-yellow-800">Your request is pending approval.</p>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
                  hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Request Access'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}