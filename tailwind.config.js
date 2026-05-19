/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#0B1120',
        panel: '#111827',
        panelSoft: '#162033',
        cyanGlow: '#22D3EE',
        mint: '#34D399',
        warning: '#FBBF24',
        danger: '#FB7185',
      },
      boxShadow: {  
        glow: '0 20px 70px rgba(34, 211, 238, 0.12)',
      },
    },
  },
  plugins: [],
};
