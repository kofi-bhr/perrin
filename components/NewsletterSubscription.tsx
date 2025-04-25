'use client';

import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

export default function NewsletterSubscription() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-black py-12"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative rounded-2xl bg-zinc-900/20 border border-zinc-800 p-6 backdrop-blur-sm">
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <FiMail className="text-blue-500" />
                <span className="text-blue-500 text-sm font-medium tracking-wide">NEWSLETTER</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Stay updated with Perrin Institute
              </h3>
              <p className="text-sm text-zinc-400">
                Get the latest updates on policy research and events
              </p>
            </div>
            
            <div className="w-full md:w-auto min-w-[300px]">
              <div className="group rounded-lg transition-all duration-300">
                <div className="bg-transparent rounded-lg ring-1 ring-zinc-800 hover:ring-blue-500/50 transition-all duration-300">
              <iframe 
                src="https://embeds.beehiiv.com/a208b3ed-1ed4-4adc-9bd4-668b3341f5fd?slim=true" 
                data-test-id="beehiiv-embed" 
                height="52" 
                frameBorder="0" 
                scrolling="no" 
                    style={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      backgroundColor: 'transparent',
                      width: '100%'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 