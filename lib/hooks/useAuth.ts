import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/signin')
    }
  }, [router])

  return {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    userEmail: localStorage.getItem('userEmail')
  }
} 