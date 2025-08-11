"use client";
import React, { useState, useEffect, createContext } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { PerrinLoadingScreen } from './LoadingSpinner';

interface GlobalLoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isSplineLoaded: boolean;
  setSplineLoaded: (loaded: boolean) => void;
  isFirstVisit: boolean;
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export default function GlobalLoading({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [isSplineLoaded, setSplineLoaded] = useState(false)
  const [hasMinimumTimeElapsed, setHasMinimumTimeElapsed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('perrin-visited')
    const forceFullLoading = window.location.search.includes('fullloading=true')
    const firstVisit = !hasVisitedBefore || forceFullLoading
    setIsFirstVisit(firstVisit)
    if (firstVisit && !forceFullLoading) {
      localStorage.setItem('perrin-visited', 'true')
    }

    const isHome = typeof window !== 'undefined' && window.location.pathname === '/'
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    const verySlow = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g'

    // Non-home: short minimum then allow
    let minimumTimer: any
    if (!isHome) {
      const minimumTime = firstVisit ? (isMobile || verySlow ? 800 : 500) : 300
      minimumTimer = setTimeout(() => setHasMinimumTimeElapsed(true), minimumTime)
    } else {
      // Home: gate by Spline load; mark minimum as true
      setHasMinimumTimeElapsed(true)
    }

    // Watchdog to prevent infinite loading
    const maxLoadingTime = isHome ? 15000 : 4000
    const maxTimer = setTimeout(() => setIsLoading(false), maxLoadingTime)

    return () => {
      if (minimumTimer) clearTimeout(minimumTimer)
      clearTimeout(maxTimer)
    }
  }, [])

  useEffect(() => {
    const isHome = typeof window !== 'undefined' && window.location.pathname === '/'
    if (isHome) {
      if (isSplineLoaded) {
        const hideTimer = setTimeout(() => setIsLoading(false), 150)
        return () => clearTimeout(hideTimer)
      }
    } else {
      if (hasMinimumTimeElapsed) {
        const hideTimer = setTimeout(() => setIsLoading(false), 100)
        return () => clearTimeout(hideTimer)
      }
    }
  }, [isSplineLoaded, hasMinimumTimeElapsed])

  // Re-trigger loading when navigating to home so it always matches Spline load
  useEffect(() => {
    const isHome = pathname === '/'
    let watchdog: any
    if (isHome) {
      // Show loading and wait for Spline again
      setIsLoading(true)
      setSplineLoaded(false)
      setHasMinimumTimeElapsed(true)
      // Watchdog to avoid indefinite overlay
      watchdog = setTimeout(() => setIsLoading(false), 15000)
    }
    return () => {
      if (watchdog) clearTimeout(watchdog)
    }
  }, [pathname])

  const contextValue: GlobalLoadingContextType = {
    isLoading,
    setIsLoading,
    isSplineLoaded,
    setSplineLoaded,
    isFirstVisit
  };

  return (
    <GlobalLoadingContext.Provider value={contextValue}>
      <AnimatePresence mode="wait">
        {isLoading && <PerrinLoadingScreen key="loading" isFirstVisit={isFirstVisit} />}
      </AnimatePresence>
      
      {/* Always render main content to allow the browser to paint LCP promptly. */}
      {children}
    </GlobalLoadingContext.Provider>
  );
} 