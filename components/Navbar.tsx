'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)


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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className={`text-2xl font-serif font-bold ${isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                PERRIN
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8 ml-12">
              <Link
                href="/research"
                className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                Research
              </Link>
              <Link
                href="/experts"
                className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                Research Fellows
              </Link>
              <Link
                href="/events"
                className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                Events
              </Link>
              <Link
                href="/about"
                className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                About
              </Link>
              {isLoggedIn && (
                <Link
                  href="/employee-panel"
                  className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                    }`}
                >
                  Employee Panel
                </Link>
              )}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                    } ${pathname === '/admin' ? 'border-b-2 border-blue-500' : ''}`}
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="md:hidden flex flex-col items-center justify-center space-y-1 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
              <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
              <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
            </button>
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className={`border-2 px-4 py-2 font-medium transition-colors ${isScrolled
                  ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-gray-900'
                  }`}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className={`border-2 px-4 py-2 font-medium transition-colors ${isScrolled
                  ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-gray-900'
                  }`}
              >
                Employee Login
              </Link>
            )}

            {isMenuOpen && (
              <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start py-4 px-4 space-y-3">
                <Link href="/research" className="text-gray-900 font-medium hover:opacity-75">Research</Link>
                <Link href="/experts" className="text-gray-900 font-medium hover:opacity-75">Research Fellows</Link>
                <Link href="/events" className="text-gray-900 font-medium hover:opacity-75">Events</Link>
                <Link href="/about" className="text-gray-900 font-medium hover:opacity-75">About</Link>
                {isLoggedIn && (
                  <Link href="/employee-panel" className="text-gray-900 font-medium hover:opacity-75">Employee Panel</Link>
                )}
                {isAdmin && (
                  <Link href="/admin" className="text-gray-900 font-medium hover:opacity-75">Admin Panel</Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}