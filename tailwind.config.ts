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
        foreground: '#062817',
        background: '#F2FAF4',
        primary: '#4ADE80',
        highlight1: '#86EFAC',
        highlight2: '#BBF7D0',
        highlight3: '#DCFCE7',
        secondary: '#DCFCE7',
        darkSurface: '#081F12',
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