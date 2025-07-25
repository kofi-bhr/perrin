"use client";

import { motion } from 'framer-motion';

interface TechGridProps {
  animated?: boolean;
  dataPoints?: number;
  opacity?: number;
}

export default function TechGrid({ 
  animated = false, 
  dataPoints = 5, 
  opacity = 0.02 
}: TechGridProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <div className="absolute inset-0" style={{ opacity: opacity / 2 }}>
        <div className="grid grid-cols-4 h-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`col-${i}`} className="border-l border-white/5 h-full"></div>
          ))}
        </div>
        <div className="grid grid-rows-4 w-full absolute inset-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`row-${i}`} className="border-t border-white/5 w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Animated data points */}
      {animated && (
        <>
          {Array.from({ length: dataPoints }).map((_, i) => (
            <motion.div
              key={`point-${i}`}
              className="absolute w-1 h-1 rounded-full bg-blue-400/20"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.2 + 0.1
              }}
              animate={{ 
                x: [
                  `${Math.random() * 100}%`, 
                  `${Math.random() * 100}%`, 
                  `${Math.random() * 100}%`
                ],
                y: [
                  `${Math.random() * 100}%`, 
                  `${Math.random() * 100}%`, 
                  `${Math.random() * 100}%`
                ]
              }}
              transition={{ 
                duration: 20 + Math.random() * 30, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </>
      )}
    </div>
  );
} 