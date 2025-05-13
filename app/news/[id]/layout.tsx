import { Roboto_Condensed } from "next/font/google";
import { Inter, Playfair_Display } from "next/font/google";

// Initialize fonts
const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-condensed',
});

const inter = Inter({ subsets: ['latin'] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full">
        {children}
      </main>
    </>
  );
} 