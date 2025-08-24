/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
    },
      keyframes: {
        loadingDot: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      animation: {
        loadingDot: 'loadingDot 1.5s infinite',
      },
    },
  },
  plugins: [],
};
