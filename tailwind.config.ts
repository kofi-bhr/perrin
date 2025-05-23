import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd2ff',
          300: '#92b2ff',
          400: '#6686ff',
          500: '#4361fc',
          600: '#3141f2',
          700: '#2832de',
          800: '#252cb3',
          900: '#262e8c',
          950: '#1a1d50',
        },
        secondary: {
          50: '#f5f9fb',
          100: '#e9f2f7',
          200: '#d3e5ee',
          300: '#afcfe1',
          400: '#84b0ce',
          500: '#6594b8',
          600: '#4f789a',
          700: '#40617d',
          800: '#385368',
          900: '#31465a',
          950: '#1a2530',
        },
        accent: {
          50: '#fff6ed',
          100: '#ffebd3',
          200: '#ffd2a5',
          300: '#ffb46d',
          400: '#ff8c36',
          500: '#fd6d11',
          600: '#ee4d06',
          700: '#c53908',
          800: '#9c2f0e',
          900: '#7e280f',
          950: '#441205',
        },
        // Teal color palette
        teal: {
          50: '#effffd',
          100: '#d3fffc',
          200: '#a7fff9',
          300: '#69fff5',
          400: '#22f5eb',
          500: '#0adbd1',
          600: '#05b0a8',
          700: '#088c85',
          800: '#0b6d68',
          900: '#0f5854',
          950: '#003735',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config;
