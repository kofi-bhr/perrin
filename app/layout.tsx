import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Perrin Think Tank",
  description: "Leading research and policy analysis institution",
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
      <body className={`${inter.className}`}>
        <div className="hidden">
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg">
            <filter id="noise" x="0" y="0">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feBlend mode="screen" />
            </filter>
          </svg>
        </div>
        <div className="c-container"></div>
        <Navbar />
        <main className="w-full c-container">
          <div className="c-container-2">
            <div className="c1"></div>
            <div className="c2"></div>
            <div className="c3"></div>
            <div className="c4"></div>
            <div className="c5"></div>
            <div className="c6"></div>
            <div className="c7"></div>
            <div className="c8"></div>
            <div className="c9"></div>
            <div className="c10"></div>
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
