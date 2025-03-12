'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isTransparentPage = ['/'].includes(pathname)

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    setIsScrolled(!isTransparentPage && window.scrollY > 0)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTransparentPage])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
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
                href="/experts"
                className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                Directory
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
              <Link
                href="/application"
                className={`font-medium hover:opacity-75 transition-opacity ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                Apply
              </Link>
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
            <Link
              href="/contact"
              className={`border-2 px-4 py-2 font-medium transition-colors ${isScrolled
                ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-gray-900'
                }`}
            >
              Contact Us
            </Link>
          </div>

            {isMenuOpen && (
              <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start py-4 px-4 space-y-3">
                <Link href="/experts" className="text-gray-900 font-medium hover:opacity-75">Directory</Link>
                <Link href="/events" className="text-gray-900 font-medium hover:opacity-75">Events</Link>
                <Link href="/about" className="text-gray-900 font-medium hover:opacity-75">About</Link>
                <Link href="/application" className="text-gray-900 font-medium hover:opacity-75">Apply</Link>
              </div>
            )}
        </div>
      </div>
    </nav>
  )
}