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
        foreground: '#0D1F15',
        background: '#F7FAF7',
        primary: '#22C55E',
        highlight1: '#4ADE80',
        highlight2: '#86EFAC',
        highlight3: '#BBF7D0',
        secondary: '#DCFCE7',
        darkSurface: '#0F2418',
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