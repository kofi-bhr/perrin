'use client';

import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';

export default function NewsletterSubscription() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white py-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-b from-teal-50 to-white border border-teal-100 rounded-xl p-6 sm:p-8 shadow-lg shadow-teal-100/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-500/10 px-2.5 py-1 rounded-full mb-4 border border-teal-200/50">
                <span className="w-1 h-1 bg-teal-500 rounded-full"></span>
                <span className="text-teal-700 text-xs font-medium tracking-wide">UPDATES</span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                Join our research network
              </h3>
              
              <p className="text-gray-600 max-w-md">
                Receive the latest policy insights and event invitations directly in your inbox. No spam, just valuable content.
              </p>
            </div>
            
            {/* Form Section */}
            <div className="w-full md:w-auto md:min-w-[300px]">
              <div className="bg-white rounded-lg shadow-sm border border-teal-100 p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center relative">
                    <div className="absolute left-3 text-teal-400">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-teal-100 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-teal-300 focus:ring-1 focus:ring-teal-300"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium py-3 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center shadow-sm shadow-teal-200/50">
                    <span>Subscribe</span>
                    <FiSend className="ml-2 w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 text-center text-xs text-gray-500">
                  Your data privacy is respected. Unsubscribe anytime.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 