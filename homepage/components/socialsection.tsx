"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiUsers, FiExternalLink } from 'react-icons/fi';

export default function SocialSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background elements similar to other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#0a0a18]"></div>
      
      {/* Tech grid like other sections */}
      <div className="absolute inset-0 w-full h-full" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}>
      </div>
      
      {/* Subtle animated particles - matching site style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/10"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.1 + 0.05
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header - styled like other sections */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 inline-flex items-center bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-full"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-400 text-xs uppercase tracking-widest">
                Social Community
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Join Our </span>
              <span className="text-blue-400">Growing </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Community</span>
            </motion.h2>
            
            <motion.p 
              className="mt-6 text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Follow us on social media for the latest research, events, and opportunities
            </motion.p>
          </motion.div>
          
          {/* Social platforms grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* TikTok Card - styled like site cards */}
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
            >
              {/* Corner accent - like other section cards */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EE1D52]/20 to-transparent rotate-45 transform origin-top-right"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-[#EE1D52]/10 flex items-center justify-center mr-4 border border-[#EE1D52]/20">
                      <svg className="w-7 h-7 text-[#EE1D52]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">TikTok</h3>
                      <p className="text-white/60 text-sm">@theperrininstitution</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 shadow-lg shadow-black/20">
                    <div className="flex items-center mb-2">
                      <FiUsers className="w-5 h-5 text-[#EE1D52] mr-2" />
                      <div className="text-sm text-white/60 uppercase tracking-wider font-mono">Follower Count</div>
                    </div>
                    <div className="flex items-baseline">
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF004F] to-[#EE1D52]">48K</div>
                      <div className="text-xl ml-1 text-white/80">+</div>
                    </div>
                    <div className="mt-2 text-white/40 text-sm">Growing by hundreds daily</div>
                    
                    {/* Data visualization bar - matching the tech style */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#FF004F] to-[#EE1D52]"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "75%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="https://www.tiktok.com/@theperrininstitution?_t=ZT-8ugIWNNxeqw&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-[#FF004F] to-[#EE1D52] text-white rounded-lg transition-all duration-300 z-10 relative font-medium w-full justify-center"
                  >
                    Follow on TikTok <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Lemon8 Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm group"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFE135]/20 to-transparent rotate-45 transform origin-top-right"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-[#FFE135]/10 flex items-center justify-center mr-4 border border-[#FFE135]/20">
                      <svg className="w-7 h-7 text-[#FFE135]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.45 8.19c-1.36-1.36-3.92-1.17-5.72.53l-6.18 6.18c-1.8 1.8-1.99 4.36-.63 5.72 1.36 1.36 3.92 1.17 5.72-.63l6.18-6.18c1.8-1.8 1.99-4.36.63-5.72zm-1.41 1.42c.59.59.59 1.76-.72 3.07l-6.18 6.18c-1.3 1.3-2.48 1.31-3.07.72-.59-.59-.59-1.76.72-3.07l6.18-6.18c1.3-1.3 2.47-1.31 3.07-.72z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Lemon8</h3>
                      <p className="text-white/60 text-sm">@theperrininstitution</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 shadow-lg shadow-black/20">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-[#FFE135] mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-7h10v-2H7v2zm0-4h10V7H7v2z"/>
                      </svg>
                      <div className="text-sm text-white/60 uppercase tracking-wider font-mono">Premium Content</div>
                    </div>
                    <div className="flex items-baseline">
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD100] to-[#FFE135]">Photos</div>
                    </div>
                    <div className="mt-2 text-white/40 text-sm">Visual stories & research updates</div>
                    
                    {/* Data visualization elements */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#FFD100] to-[#FFE135]"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "65%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="https://www.lemon8-app.com/@theperrininstitution?_r=1&_t=MGcEDJSsUpTM0hN1%2FAEbUQRFyOmB02V%2BMIHsUs9SjlevWPuqEk4jDpyOhGEumD%2FzKwbIEmZiaU%2BM5ZGda7WkaHv6D%2B5aVD6q6JpkfVLEn0B1YoVWT5WqBBAx5G%2FEEKzHpbfZ6FdcsMKf&language=en&region=us&share_platform=copy&ui_language=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-[#FFD100] to-[#FFE135] text-black rounded-lg transition-all duration-300 z-10 relative font-medium w-full justify-center"
                  >
                    Follow on Lemon8 <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Premium spotlight effect - matching site style */}
          <div className="absolute -bottom-36 -right-36 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
