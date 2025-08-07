import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ExternalLink, ArrowRight } from "lucide-react";

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 text-white',
  emerald: 'from-emerald-500 to-emerald-600 text-white',
  purple: 'from-purple-500 to-purple-600 text-white',
  orange: 'from-orange-500 to-orange-600 text-white',
  indigo: 'from-indigo-500 to-indigo-600 text-white',
  teal: 'from-teal-500 to-teal-600 text-white'
};

const MetricCard = ({ metric, color }: { metric: any, color: string }) => (
  <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200/60 rounded-xl p-4 hover:bg-white hover:shadow-sm transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-light text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
          {metric.value}
        </div>
        <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
      </div>
      <metric.icon className={`h-6 w-6 transition-colors ${
        color === 'blue' ? 'text-blue-500 group-hover:text-blue-600' : 
        color === 'emerald' ? 'text-emerald-500 group-hover:text-emerald-600' : 
        color === 'purple' ? 'text-purple-500 group-hover:text-purple-600' : 
        color === 'orange' ? 'text-orange-500 group-hover:text-orange-600' : 
        color === 'indigo' ? 'text-indigo-500 group-hover:text-indigo-600' : 
        'text-teal-500 group-hover:text-teal-600'
      }`} />
    </div>
  </div>
);

const PartnershipCard = ({ partnership, index }: { partnership: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100); // Faster transition
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0' 
          : 'opacity-0 translate-y-20 translate-x-10'
      }`}
      style={{
        transitionDelay: `${index * 40}ms`
      }}
    >
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-700 group-hover:border-gray-300/80 group-hover:-translate-y-2">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative p-8 lg:p-12">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100/80 backdrop-blur-sm border border-gray-200/60 rounded-full hover:scale-105 transition-transform duration-300">
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {partnership.category}
              </span>
            </div>
            <div className={`px-4 py-2 bg-gradient-to-r ${colorClasses[partnership.color as keyof typeof colorClasses]} rounded-full shadow-sm`}>
              <span className="text-xs font-semibold uppercase tracking-wider">
                {partnership.status}
              </span>
            </div>
          </div>
          {/* Main Content - Horizontal Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
            {/* Left: Image */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src={partnership.image}
                  alt={partnership.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              {/* Metrics */}
              <div className="grid grid-cols-1 gap-4">
                {partnership.metrics.map((metric: any, metricIndex: number) => (
                  <MetricCard 
                    key={metricIndex} 
                    metric={metric} 
                    color={partnership.color} 
                  />
                ))}
              </div>
            </div>
            {/* Right: Content Details */}
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-tight tracking-tight group-hover:text-gray-700 transition-colors duration-300">
                {partnership.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                {partnership.description}
              </p>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {partnership.longDescription}
                  </p>
                </div>
              </div>
              <button
                className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:translate-x-1"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Learn More'}
                <ChevronRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-90' : 'rotate-0'
                }`} />
              </button>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {partnership.website && (
                  <a
                    href={partnership.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${colorClasses[partnership.color as keyof typeof colorClasses]} rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1`}
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
                <button className="inline-flex items-center px-6 py-3 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:scale-105">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Hover Effect Border */}
        <div className={`absolute inset-0 rounded-3xl border-2 ${
          partnership.color === 'blue' ? 'border-blue-200' : 
          partnership.color === 'emerald' ? 'border-emerald-200' : 
          partnership.color === 'purple' ? 'border-purple-200' : 
          partnership.color === 'orange' ? 'border-orange-200' : 
          partnership.color === 'indigo' ? 'border-indigo-200' : 
          'border-teal-200'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      </div>
    </div>
  );
};

export default PartnershipCard;