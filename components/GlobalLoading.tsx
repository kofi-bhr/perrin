"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PerrinLoadingScreen } from './LoadingSpinner';

export default function GlobalLoading({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extended loading time for better user experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // 4.5 seconds for sophisticated loading experience

    // Ensure all critical resources are loaded
    const handleLoad = () => {
      // Add a longer minimum loading time for branding/UX
      setTimeout(() => {
        setIsLoading(false);
      }, 3800); // 3.8 seconds minimum
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
        {isLoading && <PerrinLoadingScreen key="loading" />}
      </AnimatePresence>
      
      {/* Main content - hidden during loading with longer transition */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 ease-out'}>
        {children}
      </div>
    </>
  );
} 