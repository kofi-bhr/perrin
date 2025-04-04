'use client';

import { motion } from 'framer-motion';

export default function NewsletterSubscription() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-black py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 max-w-xl">
                Subscribe to our newsletter to receive updates about upcoming events, workshops, and opportunities at the Perrin Institute.
              </p>
            </div>
            
            <div className="w-full sm:w-auto">
              <iframe 
                src="https://embeds.beehiiv.com/a208b3ed-1ed4-4adc-9bd4-668b3341f5fd?slim=true" 
                data-test-id="beehiiv-embed" 
                height="52" 
                frameBorder="0" 
                scrolling="no" 
                style={{ margin: 0, borderRadius: 0, backgroundColor: 'transparent' }}
                className="w-full sm:w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 