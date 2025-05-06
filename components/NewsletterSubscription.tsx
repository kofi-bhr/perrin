'use client';

import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

export default function NewsletterSubscription() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-black py-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.06] rounded-xl p-6 sm:p-8 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/5 px-2.5 py-1 rounded-full mb-4">
                <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                <span className="text-blue-400 text-xs font-medium tracking-wide">UPDATES</span>
              </div>
              
              <h3 className="text-xl font-medium text-white mb-3">
                Join our research network
              </h3>
              
              <p className="text-sm text-white/60 max-w-md">
                Receive the latest policy insights and event invitations directly in your inbox. No spam, just valuable content.
              </p>
            </div>
            
            {/* Form Section */}
            <div className="w-full md:w-auto md:min-w-[300px]">
              <div className="bg-gradient-to-r from-blue-700/5 via-transparent to-blue-700/5 rounded-lg p-[1px]">
                <div className="bg-black/30 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://embeds.beehiiv.com/a208b3ed-1ed4-4adc-9bd4-668b3341f5fd?slim=true" 
                    data-test-id="beehiiv-embed" 
                    height="52" 
                    frameBorder="0" 
                    scrolling="no" 
                    style={{
                      margin: 0,
                      borderRadius: '0.375rem',
                      backgroundColor: 'transparent',
                      width: '100%'
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 text-center text-[10px] text-white/40">
                Your data privacy is respected. Unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 