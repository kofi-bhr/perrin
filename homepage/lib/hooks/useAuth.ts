'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Only access localStorage in useEffect (client-side)
    const token = localStorage?.getItem('token')
    const email = localStorage?.getItem('userEmail')
    
    setIsAuthenticated(!!token)
    setUserEmail(email)

    if (!token) {
      router.push('/auth/signin')
    }
  }, [router])

  return {
    isAuthenticated,
    userEmail
  }
} 