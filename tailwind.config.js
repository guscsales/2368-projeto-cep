/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,css,js}',
    './src/**/*.{html,css,js}',
    'index.html',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        lg: '1rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
      backgroundPosition: {
        'left-center': 'left center',
      },
    },
  },
  plugins: [],
};
