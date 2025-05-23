'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MorphingShapeProps {
  className?: string;
  color?: string;
  duration?: number;
  size?: string;
  blurAmount?: string;
  opacity?: number;
  initialRadius?: string;
  finalRadius?: string;
}

const MorphingShape: React.FC<MorphingShapeProps> = ({
  className = '',
  color = 'rgba(33, 95, 104, 0.3)',
  duration = 8,
  size = '250px',
  blurAmount = '60px',
  opacity = 0.5,
  initialRadius = '60% 40% 30% 70% / 60% 30% 70% 40%',
  finalRadius = '30% 60% 70% 40% / 50% 60% 30% 60%'
}) => {
  return (
    <motion.div
      className={`absolute animate-morph ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blurAmount})`,
        opacity: opacity,
        borderRadius: initialRadius,
      }}
      animate={{
        borderRadius: [
          initialRadius,
          finalRadius,
          initialRadius
        ],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

export default MorphingShape; 