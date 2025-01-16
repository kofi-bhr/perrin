'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  
  const isTransparentPage = ['/', '/employee-panel', '/admin'].includes(pathname)

  useEffect(() => {
    // Check login status and admin status
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('userEmail')
    setIsLoggedIn(!!token)
    setIsAdmin(email === 'employee@perrin.org')

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    
    setIsScrolled(!isTransparentPage && window.scrollY > 0)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTransparentPage])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    setIsAdmin(false)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className={`text-2xl font-serif font-bold ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                PERRIN
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 ml-12">
              <Link 
                href="/research" 
                className={`font-medium hover:opacity-75 transition-opacity ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                Research
              </Link>
              <Link 
                href="/experts" 
                className={`font-medium hover:opacity-75 transition-opacity ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                Experts
              </Link>
              <Link 
                href="/events" 
                className={`font-medium hover:opacity-75 transition-opacity ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                Events
              </Link>
              <Link 
                href="/about" 
                className={`font-medium hover:opacity-75 transition-opacity ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                About
              </Link>
              {isLoggedIn && (
                <Link 
                  href="/employee-panel" 
                  className={`font-medium hover:opacity-75 transition-opacity ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Employee Panel
                </Link>
              )}
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className={`font-medium hover:opacity-75 transition-opacity ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  } ${pathname === '/admin' ? 'border-b-2 border-blue-500' : ''}`}
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className={`font-medium hover:opacity-75 transition-opacity ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Contact
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className={`border-2 px-4 py-2 font-medium transition-colors ${
                  isScrolled 
                    ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className={`border-2 px-4 py-2 font-medium transition-colors ${
                  isScrolled 
                    ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                Employee Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 