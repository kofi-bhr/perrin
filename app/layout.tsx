import type { Metadata } from 'next';
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Perrin Institute",
  description: "A student-led think tank at the University of Virginia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${playfair.variable}`}>
      <head>
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
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Navbar />
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
