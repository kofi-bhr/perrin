'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children?: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  delay?: number;
  duration?: number;
  scale?: [number, number];
  rotate?: [number, number];
  repeatType?: "loop" | "reverse" | "mirror";
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  x = 20,
  y = 20,
  delay = 0,
  duration = 6,
  scale = [1, 1.05],
  rotate = [0, 0],
  repeatType = "reverse"
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, x],
        y: [0, y],
        scale: scale,
        rotate: rotate,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: repeatType,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement; 