'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Navbar from '../../../components/Navbar';

// Define program types for type safety
type ProgramKey = '1' | '2';
type ProgramInfo = {
  title: string;
  formId: string;
};

export default function ApplicationFormPage() {
  const jotformContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const programIdParam = searchParams.get('program');
  const [loading, setLoading] = useState(true);
  const [formHeight, setFormHeight] = useState(1800);
  
  // Define program details with proper typing
  const programDetails: Record<ProgramKey, ProgramInfo> = {
    '1': {
      title: 'Research Internship, Technology Policy Group',
      formId: '250707836203050' // Updated with your actual JotForm ID
    },
    '2': {
      title: 'News Department Correspondent',
      formId: '251317514581050' // Policy Journalism Department Application
    }
  };
  
  // Use type guard to check if programId is a valid key
  const isProgramKey = (key: string | null): key is ProgramKey => {
    return key === '1' || key === '2';
  };
  
  // Get current program details or use defaults with type safety
  const currentProgram: ProgramInfo = isProgramKey(programIdParam) 
    ? programDetails[programIdParam] 
    : { title: 'Our Program', formId: '240535192284154' }; // Default form
  
  // Add this effect to properly load the JotForm script
  useEffect(() => {
    // Only run on client side
    if (!jotformContainerRef.current) return;
    
    // Clear previous content first
    jotformContainerRef.current.innerHTML = '';
    
    if (isProgramKey(programIdParam) && programIdParam === '1') {
      // For program 1, dynamically load the script
      const script = document.createElement('script');
      script.src = `https://form.jotform.com/jsform/${programDetails['1'].formId}`;
      script.type = 'text/javascript';
      script.async = true;
      
      script.onload = () => {
        setLoading(false);
      };
      
      jotformContainerRef.current.appendChild(script);
    } else {
      // For other programs, use iframe
      const iframe = document.createElement('iframe');
      iframe.id = 'JotFormIFrame';
      iframe.title = `Apply for ${currentProgram.title}`;
      iframe.src = `https://form.jotform.com/${currentProgram.formId}?programName=${encodeURIComponent(currentProgram.title)}&programId=${isProgramKey(programIdParam) ? programIdParam : 'default'}`;
      iframe.style.width = '100%';
      iframe.style.height = `${formHeight}px`;
      iframe.style.border = 'none';
      iframe.setAttribute('allowFullScreen', 'true');
      iframe.setAttribute('scrolling', 'yes');
      
      iframe.onload = () => {
        setLoading(false);
      };
      
      jotformContainerRef.current.appendChild(iframe);
    }
    
    // Keep the event listener for iframe resizing
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === 'setHeight' && event.origin.indexOf('jotform') > -1) {
        setFormHeight(event.data.height + 100); // Add extra height to prevent scrolling issues
        setLoading(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [programIdParam, currentProgram, formHeight]);

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 via-[#0a0a18] to-black pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/application" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
              <FiArrowLeft className="mr-2" />
              Back to Programs
            </Link>
            <h1 className="text-3xl font-serif font-bold text-white sm:text-4xl sm:tracking-tight lg:text-5xl">
              Apply for {currentProgram.title}
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Complete the form below to apply.
            </p>
          </div>
        </div>
      </div>
      
      {/* JotForm Integration */}
      <div className="bg-black min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl overflow-visible">
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {/* JotForm container - simplified */}
            <div 
              ref={jotformContainerRef}
              className="w-full min-h-[500px]"
              style={{
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.5s ease'
              }}
            />
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Having trouble with the form? <a href={`https://form.jotform.com/${currentProgram.formId}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Open in a new window</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
} 