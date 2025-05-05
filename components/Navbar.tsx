'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'
import Image from 'next/image'
import { DM_Sans } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const dmSans = DM_Sans({ subsets: ['latin'] })

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isTransparentPage = ['/'].includes(pathname)
  const isExpertsPage = pathname.includes('/experts')

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    setIsScrolled(!isTransparentPage && window.scrollY > 0)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTransparentPage])

  // Close menu when changing pages
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Determine navbar styling based on current page and scroll state
  const navbarBg = isExpertsPage 
    ? isScrolled ? 'bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50' : 'bg-transparent' 
    : isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
  
  const textColor = isExpertsPage
    ? 'text-white'
    : isScrolled ? 'text-gray-900' : 'text-white'
  
  const hoverEffect = isExpertsPage
    ? 'hover:text-blue-400'
    : 'hover:opacity-75'

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg} py-3`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group relative overflow-hidden">
                <div className="transition-all duration-300 transform group-hover:scale-105">
                  <Image 
                    src="/moretechperrin-removebg-preview.png" 
                    alt="Perrin Institution Logo" 
                    width={180} 
                    height={60}
                    className="h-12 w-auto object-contain my-1 transition-opacity duration-300 group-hover:opacity-95"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300"></div>
              </Link>

              <div className="hidden md:flex items-center space-x-8 ml-6">
                <Link
                  href="/experts"
                  className={`font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes('/experts') ? isExpertsPage ? 'text-blue-400' : 'opacity-75' : ''}`}
                >
                  Directory
                </Link>
                <Link
                  href="/Labs"
                  className={`font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes('/Labs') ? isExpertsPage ? 'text-blue-400' : 'opacity-75' : ''}`}
                >
                  Labs
                </Link>
                <Link
                  href="/events"
                  className={`font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes('/events') ? isExpertsPage ? 'text-blue-400' : 'opacity-75' : ''}`}
                >
                  Events
                </Link>
                <Link
                  href="/application"
                  className={`font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes('/application') ? isExpertsPage ? 'text-blue-400' : 'opacity-75' : ''}`}
                >
                  Programs
                </Link>
                <Link
                  href="/careers"
                  className={`font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes('/careers') ? isExpertsPage ? 'text-blue-400' : 'opacity-75' : ''}`}
                >
                  Careers
                </Link>
                <Link
                  href="/news"
                  className={`font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes('/news') ? isExpertsPage ? 'text-blue-400' : 'opacity-75' : ''}`}
                >
                  News
                </Link>
                <Link
                  href="/scholarship-center"
                  className={`font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes('/scholarship-center') ? isExpertsPage ? 'text-blue-400' : 'opacity-75' : ''}`}
                >
                  Scholarships
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 focus:outline-none ${textColor}`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu, separate from nav */}
      {isMenuOpen && (
        <div 
          className={`fixed inset-0 z-40 ${isExpertsPage ? 'bg-slate-900' : 'bg-white'}`}
          style={{ top: '60px' }} // Adjust based on your navbar height
        >
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/experts"
              className={`block px-3 py-4 rounded-md text-base font-medium border-b ${
                isExpertsPage 
                  ? 'text-white hover:text-blue-400 border-slate-700' 
                  : 'text-gray-900 hover:bg-gray-50 border-gray-200'
              } ${pathname.includes('/experts') ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Directory
            </Link>
            <Link
              href="/Labs"
              className={`block px-3 py-4 rounded-md text-base font-medium border-b ${
                isExpertsPage 
                  ? 'text-white hover:text-blue-400 border-slate-700' 
                  : 'text-gray-900 hover:bg-gray-50 border-gray-200'
              } ${pathname.includes('/Labs') ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Labs
            </Link>
            <Link
              href="/events"
              className={`block px-3 py-4 rounded-md text-base font-medium border-b ${
                isExpertsPage 
                  ? 'text-white hover:text-blue-400 border-slate-700' 
                  : 'text-gray-900 hover:bg-gray-50 border-gray-200'
              } ${pathname.includes('/events') ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/application"
              className={`block px-3 py-4 rounded-md text-base font-medium ${
                isExpertsPage 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:bg-gray-50'
              } ${pathname.includes('/application') ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/careers"
              className={`block px-3 py-4 rounded-md text-base font-medium ${
                isExpertsPage 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:bg-gray-50'
              } ${pathname.includes('/careers') ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
            <Link
              href="/news"
              className={`block px-3 py-4 rounded-md text-base font-medium ${
                isExpertsPage 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:bg-gray-50'
              } ${pathname.includes('/news') ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </Link>
            <Link
              href="/scholarship-center"
              className={`block px-3 py-4 rounded-md text-base font-medium ${
                isExpertsPage 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:bg-gray-50'
              } ${pathname.includes('/scholarship-center') ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Scholarships
            </Link>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              <Link
                href="/"
                className={`block py-2 text-base font-medium ${
                  isActive('/') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/labs"
                className={`block py-2 text-base font-medium ${
                  isActive('/labs') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Labs
              </Link>
              <Link
                href="/Programs"
                className={`block py-2 text-base font-medium ${
                  isActive('/Programs') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/about"
                className={`block py-2 text-base font-medium ${
                  isActive('/about') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/careers"
                className={`block py-2 text-base font-medium ${
                  isActive('/careers') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/news"
                className={`block py-2 text-base font-medium ${
                  isActive('/news') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link
                href="/scholarship-center"
                className={`block py-2 text-base font-medium ${
                  isActive('/scholarship-center') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Scholarships
              </Link>
              <Link
                href="/contact"
                className="block mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}