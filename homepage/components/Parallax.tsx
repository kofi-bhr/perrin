'use client';

import React, { ReactNode } from 'react';
import { useParallax, ParallaxProps as ScrollParallaxProps } from 'react-scroll-parallax';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  easing?: 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInQuad' | 'easeInCubic' | 'easeInQuart';
  translateX?: [number, number];
  translateY?: [number, number];
  rotate?: [number, number];
  scale?: [number, number];
  opacity?: [number, number];
  startScroll?: number;
  endScroll?: number;
  className?: string;
  direction?: 'up' | 'down';
  overflow?: boolean;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 10,
  easing,
  translateX,
  translateY,
  rotate,
  scale,
  opacity,
  startScroll,
  endScroll,
  className = '',
  direction = 'up',
  overflow = false,
}) => {
  // Create parallax effect with appropriate speed direction
  const parallaxRef = useParallax<HTMLDivElement>({
    speed: direction === 'down' ? -speed : speed,
    easing,
    translateX,
    translateY,
    rotate,
    scale,
    opacity,
    startScroll,
    endScroll,
    shouldAlwaysCompleteAnimation: true
  });

  return (
    <div 
      ref={parallaxRef.ref} 
      className={`${className} ${overflow ? '' : 'overflow-hidden'}`}
    >
      {children}
    </div>
  );
};

export default Parallax; 