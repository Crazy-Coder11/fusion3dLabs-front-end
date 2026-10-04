import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        foreground: '#0F172A',
        background: '#FFFFFF',
        primary: '#22C55E',
        highlight1: '#16A34A',
        highlight2: '#4ADE80',
        highlight3: '#86EFAC',
        secondary: '#F0FDF4',
        darkSurface: '#F8FAF8',
      },
      borderRadius: {
        landing: '50px',
        'landing-mobile': '24px',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config