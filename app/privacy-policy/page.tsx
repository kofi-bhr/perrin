"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                The Perrin Institute ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
              </p>
              <p className="text-gray-300 mb-4">
                We encourage you to read this Privacy Policy carefully to understand our policies and practices regarding your information. By accessing or using our website, you acknowledge that you have read and understood this Privacy Policy.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                We may collect several types of information from and about users of our website, including:
              </p>
              <h3 className="text-lg font-medium mt-6 mb-3 text-blue-300">2.1 Personal Information</h3>
              <p className="text-gray-300 mb-4">
                Personal information you provide to us directly, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Academic information when applying to our programs (education history, transcripts, etc.)</li>
                <li>Professional information (work experience, skills, etc.)</li>
                <li>Any other information you choose to provide to us through forms or communications</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-6 mb-3 text-blue-300">2.2 Automatic Information</h3>
              <p className="text-gray-300 mb-4">
                Information automatically collected through cookies and similar technologies:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li>IP address and location data</li>
                <li>Browser and device information</li>
                <li>Usage data (pages visited, time spent, clicks, etc.)</li>
                <li>Referral source</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Process and manage applications to our research programs</li>
                <li>Communicate with you about events, opportunities, and updates</li>
                <li>Improve our website functionality and user experience</li>
                <li>Analyze usage patterns to enhance our content and services</li>
                <li>Protect against unauthorized access and legal liability</li>
                <li>Fulfill any other purpose for which you provide your information</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Disclosure of Your Information</h2>
              <p className="text-gray-300 mb-4">
                We may disclose information that we collect in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li><span className="font-medium">To Our Service Providers:</span> We may share information with third parties that perform services on our behalf, such as hosting providers and analytics services.</li>
                <li><span className="font-medium">For Legal Purposes:</span> We may disclose information in response to a subpoena, court order, or other legal request.</li>
                <li><span className="font-medium">With Your Consent:</span> We may share information with third parties when you consent to such sharing.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
              <p className="text-gray-300 mb-4">
                We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, which may include:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li>Accessing, correcting, or deleting your personal information</li>
                <li>Withdrawing consent where processing is based on consent</li>
                <li>Restricting or objecting to our use of your personal information</li>
                <li>Requesting portability of your personal information</li>
              </ul>
              <p className="text-gray-300 mb-4">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-300 mb-4">
                Our website is not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Our Privacy Policy</h2>
              <p className="text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at admin@perrin.org.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 