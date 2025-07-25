'use client';

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Transform3DProps = {
  children: ReactNode;
  className?: string;
  perspective?: number;
  sensitivity?: number;
  reset?: boolean;
  resetDelay?: number;
};

const Transform3D: React.FC<Transform3DProps> = ({
  children,
  className = '',
  perspective = 1000,
  sensitivity = 0.5,
  reset = true,
  resetDelay = 500,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Get mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for smoother transitions
  const springX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  // Transform values from cursor position (degrees between -15 and 15)
  const rotateX = useTransform(springY, [0, bounds.height], [15, -15]);
  const rotateY = useTransform(springX, [0, bounds.width], [-15, 15]);

  // Scale on hover for subtle zoom effect
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { damping: 20, stiffness: 200 });

  // Update element bounds on resize
  useEffect(() => {
    if (!ref.current) return;

    const updateBounds = () => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        setBounds({ left, top, width, height });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // Calculate mouse position relative to element
    const { clientX, clientY } = e;
    const { left, top } = bounds;
    const x = clientX - left;
    const y = clientY - top;

    // Apply sensitivity
    mouseX.set(x * sensitivity);
    mouseY.set(y * sensitivity);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    if (reset) {
      // Reset to initial position
      setTimeout(() => {
        mouseX.set(bounds.width / 2);
        mouseY.set(bounds.height / 2);
        scale.set(1);
        setIsHovered(false);
      }, resetDelay);
    }
  };

  return (
    <div 
      ref={ref}
      className={`perspective-${perspective} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full transform-preserve-3d"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: scaleSpring,
          transformPerspective: perspective,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Transform3D; 