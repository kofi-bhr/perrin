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

    // Different loading times based on visit status - made longer and more sophisticated
    const minimumTime = firstVisit ? 6200 : 1000;  // 6.2s minimum for first, 1s for returning
    
    console.log('GlobalLoading initialized:', { firstVisit, minimumTime, isFirstVisit });

    // Set minimum time elapsed
    const minimumTimer = setTimeout(() => {
      setHasMinimumTimeElapsed(true);
    }, minimumTime);

    // Fallback maximum loading time (in case Spline never loads)
    const maxLoadingTime = firstVisit ? 10000 : 3000; // 10s max for first visit, 3s for returning
    const maxTimer = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadingTime);

    return () => {
      clearTimeout(minimumTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  // Hide loading screen when both conditions are met:
  // 1. Minimum time has elapsed
  // 2. Spline has loaded (or we're on a page without Spline)
  useEffect(() => {
    console.log('Loading state check:', { hasMinimumTimeElapsed, isSplineLoaded, pathname: window.location.pathname });
    
    if (hasMinimumTimeElapsed) {
      // Check if we're on the homepage (which has Spline)
      const isHomepage = window.location.pathname === '/';
      
      console.log('Minimum time elapsed. Homepage:', isHomepage, 'Spline loaded:', isSplineLoaded);
      
      if (!isHomepage || isSplineLoaded) {
        console.log('Hiding loading screen...');
        // Small delay to ensure smooth transition
        const hideTimer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
        return () => clearTimeout(hideTimer);
      }
    }
  }, [hasMinimumTimeElapsed, isSplineLoaded]);

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
      
      {/* Main content - hidden during loading with transition */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 ease-out'}>
        {children}
      </div>
    </GlobalLoadingContext.Provider>
  );
} 