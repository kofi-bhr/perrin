"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function TermsOfUse() {
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
            <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-4">
                By accessing or using the Perrin Institute website ("Site"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Site.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Use License</h2>
              <p className="text-gray-300 mb-4">
                Permission is granted to temporarily download one copy of the materials on the Perrin Institute's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the Perrin Institute's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              <p className="text-gray-300 mb-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by the Perrin Institute at any time.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. Intellectual Property Rights</h2>
              <p className="text-gray-300 mb-4">
                All content on this Site, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of the Perrin Institute or its content suppliers and is protected by United States and international copyright laws.
              </p>
              <p className="text-gray-300 mb-4">
                The Perrin Institute name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of the Perrin Institute or its affiliates. You may not use such marks without the prior written permission of the Perrin Institute.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. User Responsibilities</h2>
              <p className="text-gray-300 mb-4">
                When using our Site, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li>Provide accurate, current, and complete information when submitting any forms or applications</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not use the Site for any unlawful purpose or in any way that could damage, disable, or impair the Site</li>
                <li>Not attempt to gain unauthorized access to any part of the Site or any systems or networks connected to the Site</li>
                <li>Not harass, abuse, or harm another person through your use of the Site</li>
                <li>Not use the Site to distribute unsolicited promotional or commercial content</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Third-Party Links</h2>
              <p className="text-gray-300 mb-4">
                The Perrin Institute may provide links to third-party websites or resources. You acknowledge and agree that we are not responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                <li>The availability or accuracy of such websites or resources</li>
                <li>The content, products, or services on or available from such websites or resources</li>
              </ul>
              <p className="text-gray-300 mb-4">
                Links to such websites or resources do not imply any endorsement by the Perrin Institute. You acknowledge sole responsibility for and assume all risk arising from your use of any such websites or resources.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-gray-300 mb-4">
                The Site and all content, materials, information, and services provided on the Site are provided on an "as is" and "as available" basis. The Perrin Institute expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p className="text-gray-300 mb-4">
                The Perrin Institute makes no warranty that the Site will meet your requirements, be available on an uninterrupted, secure, or error-free basis, or that defects will be corrected.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                In no event shall the Perrin Institute be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Indemnification</h2>
              <p className="text-gray-300 mb-4">
                You agree to defend, indemnify, and hold harmless the Perrin Institute, its affiliates, and their respective officers, directors, employees, and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Use or your use of the Site.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
              <p className="text-gray-300 mb-4">
                These Terms of Use and your use of the Site will be governed by and construed in accordance with the laws of the Commonwealth of Virginia, without giving effect to any choice or conflict of law provision or rule.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Changes to Terms of Use</h2>
              <p className="text-gray-300 mb-4">
                We may revise these Terms of Use at any time without notice. By using this Site, you are agreeing to be bound by the current version of these Terms of Use.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Information</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms of Use, please contact us at admin@perrin.org.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 