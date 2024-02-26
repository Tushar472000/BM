const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: '#E49E2F',
        secondary: '#0F4463',
        'secondary-dark': '#09334B',
        'dark-grey': '#3A3A3A',
        muted: '#CCCCCC',
        danger: '#FF2A2A',
        success: '#27D24A',
        'dark-black': '#181818'
      },
      maxWidth: {
        '8xl': '90rem'
      },
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        serif: ['Montserrat', ...fontFamily.serif],
        montserrat: ['Montserrat', ...fontFamily.sans]
      },
      container: {
        padding: {
          DEFAULT: '1rem'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('prettier-plugin-tailwindcss'),
    require('autoprefixer')
  ],
  important: true
};
