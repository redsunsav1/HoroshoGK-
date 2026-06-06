/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  // Динамические классы из данных (маркеры инфраструктуры -400, способы покупки -500,
  // кнопки админки -600). Берутся из server/data, поэтому держим их в safelist,
  // иначе сборка их не сгенерит.
  safelist: [
    {
      pattern:
        /^bg-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(400|500|600)$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: '#4a4036', // Dark Brown text
        secondary: '#a8a29e', // Warm Grey
        sand: '#e7e5e4', // Light Sand (backgrounds)
        beige: '#f5f5f4', // Very light warm grey
        accent: '#cca378', // Gold/Sand accent
        dark: '#292524', // Stone 800 for footer/buttons
        success: '#22c55e',
        danger: '#ef4444',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
