/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', "sans-serif"],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'toast-progress': {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-reverse': 'float 6s ease-in-out infinite reverse',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'toast-slide-up': 'toast-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-progress': 'toast-progress linear forwards',
      }
    },
  },
  plugins: [],
};
