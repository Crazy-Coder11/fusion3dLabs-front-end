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
        background: '#FAFBF9',
        primary: '#10B981',
        highlight1: '#059669',
        highlight2: '#34D399',
        highlight3: '#6EE7B7',
        secondary: '#E6F7ED',
        darkSurface: '#0F1D17',
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