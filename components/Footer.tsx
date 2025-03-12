"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TechGrid from "@/components/TechGrid";
import { FiArrowRight } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative bg-black px-6 py-16 border-t border-white/10 overflow-hidden">
      {/* Subtle tech background */}
      <TechGrid animated={false} opacity={0.003} />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4"
          >
            <div className="flex items-center mb-6">
              {/* Enhanced PERRIN logo with better visibility */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-md rounded-lg"></div>
                <div className="text-2xl font-serif font-bold mr-2 relative px-3 py-1 bg-gradient-to-r from-blue-900/30 to-transparent backdrop-blur-sm border border-white/10 rounded-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">PERRIN</span>
                </div>
              </div>
              <div className="text-xs font-mono text-white/40 px-2 py-1 bg-white/5 rounded-full">EST. 2023</div>
            </div>
            <p className="text-white/60 max-w-md mb-6">
              A student-led think tank at the University of Virginia dedicated to advancing 
              innovative solutions for complex policy challenges.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github', 'instagram'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -3, color: '#3b82f6' }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white/90 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-sm text-white/40 mb-4 uppercase tracking-wider font-medium">Navigation</h3>
                <ul className="space-y-3">
                  {['Home', 'About', 'Research', 'Events', 'Fellows'].map((item, index) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + 0.05 * index }}
                    >
                      <Link 
                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        className="text-white/70 hover:text-white transition-colors flex items-center group"
                      >
                        <motion.span 
                          className="w-0 h-px bg-blue-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                        />
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-sm text-white/40 mb-4 uppercase tracking-wider font-medium">Resources</h3>
                <ul className="space-y-3">
                  {['Papers', 'Publications', 'Data', 'Press'].map((item, index) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + 0.05 * index }}
                    >
                      <Link 
                        href={`/${item.toLowerCase()}`}
                        className="text-white/70 hover:text-white transition-colors flex items-center group"
                      >
                        <motion.span 
                          className="w-0 h-px bg-blue-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                        />
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-sm text-white/40 mb-4 uppercase tracking-wider font-medium">Connect</h3>
                <ul className="space-y-3">
                  {['Contact', 'Newsletter', 'Careers', 'Support'].map((item, index) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + 0.05 * index }}
                    >
                      <Link 
                        href={`/${item.toLowerCase()}`}
                        className="text-white/70 hover:text-white transition-colors flex items-center group"
                      >
                        <motion.span 
                          className="w-0 h-px bg-blue-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                        />
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h3 className="text-sm text-white/40 mb-4 uppercase tracking-wider font-medium">Legal</h3>
                <ul className="space-y-3">
                  {['Privacy', 'Terms', 'Cookies', 'Licenses'].map((item, index) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + 0.05 * index }}
                    >
                      <Link 
                        href={`/${item.toLowerCase()}`}
                        className="text-white/70 hover:text-white transition-colors flex items-center group"
                      >
                        <motion.span 
                          className="w-0 h-px bg-blue-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                        />
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Newsletter subscription - FAANG style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-medium mb-2">Stay updated with our newsletter</h3>
              <p className="text-white/60 text-sm">Get the latest research and policy insights delivered to your inbox</p>
            </div>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom footer with tech elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-white/40 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Perrin Institute. All rights reserved.
          </div>
          
          <div className="flex items-center">
            <div className="text-xs font-mono text-white/40 mr-4">Made with ❤️ at UVA</div>
            <div className="flex items-center bg-white/5 px-3 py-1 rounded-full">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-xs font-mono text-white/60">v2.1.0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
