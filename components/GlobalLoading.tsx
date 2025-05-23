"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PerrinLoadingScreen } from './LoadingSpinner';

export default function GlobalLoading({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if this is a first-time visitor
    const hasVisitedBefore = localStorage.getItem('perrin-visited');
    const firstVisit = !hasVisitedBefore;
    setIsFirstVisit(firstVisit);

    // Mark as visited for future visits
    if (firstVisit) {
      localStorage.setItem('perrin-visited', 'true');
    }

    // Different loading times based on visit status
    const loadingTime = firstVisit ? 4500 : 1200; // 4.5s for first visit, 1.2s for returning
    const minimumTime = firstVisit ? 3800 : 800;  // 3.8s minimum for first, 0.8s for returning

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    // Ensure all critical resources are loaded
    const handleLoad = () => {
      // Different minimum loading times
      setTimeout(() => {
        setIsLoading(false);
      }, minimumTime);
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PerrinLoadingScreen key="loading" isFirstVisit={isFirstVisit} />}
      </AnimatePresence>
      
      {/* Main content - hidden during loading with transition */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 ease-out'}>
        {children}
      </div>
    </>
  );
} 