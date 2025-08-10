"use client";
import React, { useState, useEffect, createContext } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isSplineLoaded, setSplineLoaded] = useState(false);
  const [hasMinimumTimeElapsed, setHasMinimumTimeElapsed] = useState(false);

  useEffect(() => {
    // Check if this is a first-time visitor or if we want to force the full experience
    const hasVisitedBefore = localStorage.getItem('perrin-visited');
    const forceFullLoading = window.location.search.includes('fullloading=true');
    const firstVisit = !hasVisitedBefore || forceFullLoading;
    setIsFirstVisit(firstVisit);

    // Mark as visited for future visits (unless forcing full loading)
    if (firstVisit && !forceFullLoading) {
      localStorage.setItem('perrin-visited', 'true');
    }

    // Keep a very short minimum to allow a brief fade without blocking LCP
    const minimumTime = firstVisit ? 300 : 0;
    
    console.log('GlobalLoading initialized:', { firstVisit, minimumTime, isFirstVisit });

    // Set minimum time elapsed
    const minimumTimer = setTimeout(() => {
      setHasMinimumTimeElapsed(true);
    }, minimumTime);

    // Fallback maximum loading time (in case something hangs)
    const maxLoadingTime = firstVisit ? 2000 : 1000;
    const maxTimer = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadingTime);

    return () => {
      clearTimeout(minimumTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  // Hide loading screen as soon as the minimal duration has elapsed.
  // Do NOT wait for Spline, to avoid delaying LCP.
  useEffect(() => {
    console.log('Loading state check:', { hasMinimumTimeElapsed, pathname: window.location.pathname });
    if (hasMinimumTimeElapsed) {
      const hideTimer = setTimeout(() => {
        setIsLoading(false);
      }, 150);
      return () => clearTimeout(hideTimer);
    }
  }, [hasMinimumTimeElapsed]);

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