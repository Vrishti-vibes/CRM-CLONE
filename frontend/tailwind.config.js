/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0a3651',
        },
        royal: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#1e1b4b',
          950: '#0a091d',
        },
        darkbg: {
          DEFAULT: '#0B0F17',
          card: '#131A26',
          hover: '#1C2638',
          border: '#222E42',
        }
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(79, 70, 229, 0.25)',
        'royal-dark': '0 12px 35px -10px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}