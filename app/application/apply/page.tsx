'use client';

import { useState, useEffect } from 'react';
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
  const searchParams = useSearchParams();
  const programIdParam = searchParams.get('program');
  const [loading, setLoading] = useState(true);
  const [formHeight, setFormHeight] = useState(1800);
  
  // Define program details with proper typing
  const programDetails: Record<ProgramKey, ProgramInfo> = {
    '1': {
      title: 'Policy Research Fellowship',
      formId: '240535192284154' // Replace with your actual JotForm ID for program 1
    },
    '2': {
      title: 'Data Science for Policy Innovation',
      formId: '240535343187155' // Replace with your actual JotForm ID for program 2
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
  
  // Listen for JotForm messages to resize iframe
  useEffect(() => {
    window.addEventListener('message', function(event) {
      if (event.data.action === 'setHeight' && event.origin.indexOf('jotform') > -1) {
        setFormHeight(event.data.height);
        setLoading(false);
      }
    });
    
    // Set a fallback loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

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
              Complete the form below to apply. A $15 application fee will be required.
            </p>
          </div>
        </div>
      </div>
      
      {/* JotForm Integration */}
      <div className="bg-black min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl overflow-hidden">
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {/* JotForm iframe */}
            <iframe
              id="JotFormIFrame"
              title={`Apply for ${currentProgram.title}`}
              onLoad={() => setLoading(false)}
              src={`https://form.jotform.com/${currentProgram.formId}?programName=${encodeURIComponent(currentProgram.title)}&programId=${isProgramKey(programIdParam) ? programIdParam : 'default'}`}
              style={{
                width: '100%',
                height: `${formHeight}px`,
                border: 'none',
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.5s ease'
              }}
              allowFullScreen
              scrolling="no"
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