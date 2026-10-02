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
        foreground: '#0F151D',
        background: '#FFF9F6',
        primary: '#FF7448',
        highlight1: '#FF8D69',
        highlight2: '#FFA88D',
        highlight3: '#FFC8B7',
        secondary: '#D3E1FF',
        darkSurface: '#1B232E',
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