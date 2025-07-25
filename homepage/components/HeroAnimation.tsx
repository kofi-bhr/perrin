'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Declare the custom element type for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string;
        'background-color'?: string;
        'ambient-light'?: string;
        'environment-light'?: string;
      }, HTMLElement>;
    }
  }
}

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add CSS to hide the watermark and ensure proper visibility
    const style = document.createElement('style');
    style.textContent = `
      spline-viewer::part(logo),
      spline-viewer::part(banner),
      spline-viewer div[style*="position: absolute"][style*="right: 8px"][style*="bottom: 8px"],
      spline-viewer div[style*="z-index: 999"],
      spline-viewer a[href*="spline.design"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      
      /* Additional selectors */
      .spline-watermark, 
      [data-spline-watermark],
      div[class*="watermark"],
      div[class*="logo"],
      a[href*="spline"] {
        display: none !important;
        opacity: 0 !important;
      }
      
      /* Moderate visibility enhancement */
      spline-viewer {
        filter: brightness(1.2) contrast(1.1) !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Dark gradient background similar to terminal27's style */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#0a0a20] z-0"></div>
      
      {/* Load the Spline Viewer script */}
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.9.75/build/spline-viewer.js" 
        strategy="afterInteractive"
        type="module"
      />
      
      {/* Use the spline-viewer web component with better lighting */}
      <spline-viewer 
        url="https://prod.spline.design/S8EBFn43-fNSiPL7/scene.splinecode"
        className="absolute inset-0 w-full h-full z-10"
        ambient-light="1.5"
        environment-light="1.2"
        background-color="transparent"
      />
      
      {/* Subtle vignette effect like terminal27 */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 pointer-events-none z-20"></div>
      
      {/* Ensure watermark is covered */}
      <div className="absolute right-0 bottom-0 w-32 h-12 bg-black z-30"></div>
    </div>
  );
} 