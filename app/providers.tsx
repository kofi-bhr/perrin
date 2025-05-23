'use client';

import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ParallaxProvider>
      {children}
    </ParallaxProvider>
  );
} 