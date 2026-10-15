/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- ADD THIS LINE
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          DEFAULT: '#080A0B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          800: '#161B1E',
          900: '#101315',
          950: '#080A0B',
        },
        charcoal: {
          DEFAULT: '#101315',
          surface: '#12171A',
          card: '#161B1F',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        lime: {
          DEFAULT: '#C5F54A',
          light: '#D4F76E',
          dark: '#A5D62B',
          glow: 'rgba(197, 245, 74, 0.25)',
        },
        cobalt: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
          glow: 'rgba(37, 99, 235, 0.25)',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}