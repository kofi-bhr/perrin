import React, { useState } from "react";
import { Play, Pause } from "lucide-react";

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 text-white',
  emerald: 'from-emerald-500 to-emerald-600 text-white',
  purple: 'from-purple-500 to-purple-600 text-white',
  orange: 'from-orange-500 to-orange-600 text-white',
  indigo: 'from-indigo-500 to-indigo-600 text-white',
  teal: 'from-teal-500 to-teal-600 text-white'
};

const NameCarousel = ({ partnerships }: { partnerships: any[] }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Duplicate the array for seamless infinite scroll
  const duplicatedNames = [...partnerships, ...partnerships, ...partnerships];

  return (
    <div className="relative overflow-hidden py-16 bg-gradient-to-r from-gray-50 to-blue-50/30">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10"></div>
      <div className="flex items-center justify-center mb-8">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="text-sm font-medium text-gray-700">
            {isPlaying ? 'Pause' : 'Play'} Carousel
          </span>
        </button>
      </div>
      <div className="relative">
        <div 
          className={`flex gap-12 ${isPlaying ? 'animate-slide' : ''}`}
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
          {duplicatedNames.map((partnership, index) => (
            <div
              key={`${partnership.name}-${index}`}
              className="flex-shrink-0 px-8 py-4 bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClasses[partnership.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[partnership.color as keyof typeof colorClasses].split(' ')[1]}`}></div>
                <h3 className="text-xl font-light text-gray-900 whitespace-nowrap group-hover:text-gray-600 transition-colors">
                  {partnership.name}
                </h3>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {partnership.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NameCarousel;