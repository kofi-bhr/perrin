import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Roboto_Condensed } from 'next/font/google'
import { Inter as InterFont, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSubscription from "@/components/NewsletterSubscription";

// Initialize the Roboto Condensed font
const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-condensed',
})

// Keep this for fallback if needed
const inter = Inter({ subsets: ['latin'] })

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: 'The Perrin Institute',
  description: 'AI-Powered Policy Research Lab',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${robotoCondensed.variable} ${playfair.variable}`}>
      <head>
        {/* Theme color to match site's dark theme on mobile devices */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preload critical hero images */}
        <link
          rel="preload"
          href="/uva-stock-1.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/uva-stock-2.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/uva-stock-3.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/uva-stock-4.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className={`${robotoCondensed.className} ${inter.className} ${playfair.variable} font-sans`}>
        <Navbar />
        <main className="w-full">{children}</main>
        <NewsletterSubscription />
        <Footer />
      </body>
    </html>
  );
}
