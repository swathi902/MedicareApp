/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0066FE',
        brandDark: '#0052CC',
        lavender: '#DEE5FF',
        page: '#EFEFEF',
        cardBg: '#ECEEF3',
        imageArea: '#D2D2D2',
        placeholder: '#9CA3AF',
        subtext: '#1F2937',
      },
    },
  },
  presets: [require('nativewind/preset')],
  plugins: [],
};
