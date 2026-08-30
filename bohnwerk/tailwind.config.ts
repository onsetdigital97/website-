import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem', xl: '2.5rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1400px' },
    },
    extend: {
      colors: {
        espresso: {
          950: '#0d0908',
          900: '#151009',
          850: '#1b140f',
          800: '#241a13',
          700: '#33241a',
          600: '#463327',
        },
        anthracite: {
          950: '#0b0c0c',
          900: '#121415',
          800: '#1c1f20',
          700: '#2a2e30',
          600: '#3d4245',
        },
        copper: {
          50: '#fbf2e9',
          100: '#f4dfc7',
          200: '#e9c397',
          300: '#dba468',
          400: '#c98a48',
          500: '#b87333',
          600: '#9c5d27',
          700: '#7d4a22',
          800: '#5f3a1e',
        },
        terracotta: {
          400: '#d17a4f',
          500: '#c1652f',
          600: '#a0521f',
        },
        cream: {
          50: '#fefdfb',
          100: '#faf5ec',
          200: '#f4ecdc',
          300: '#ece0c9',
          400: '#e0cfae',
        },
        sand: {
          100: '#efe6d8',
          200: '#e3d5bf',
          300: '#d3c0a4',
        },
        ink: {
          900: '#1a1512',
          700: '#3c332c',
          500: '#6b5d52',
          300: '#a89a8c',
        },
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.4rem, 2vw, 1.875rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: { '8xl': '90rem' },
      boxShadow: {
        soft: '0 8px 30px -8px rgba(26, 21, 18, 0.15)',
        lift: '0 20px 60px -15px rgba(13, 9, 8, 0.45)',
        glow: '0 0 0 1px rgba(184, 115, 51, 0.25), 0 20px 50px -20px rgba(184, 115, 51, 0.35)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        steam: { '0%,100%': { transform: 'translateY(0) scaleX(1)', opacity: '0.5' }, '50%': { transform: 'translateY(-14px) scaleX(1.15)', opacity: '0.15' } },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.6s ease both',
        marquee: 'marquee 28s linear infinite',
        steam: 'steam 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
