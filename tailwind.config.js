/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dental': {
          50: '#f0fdf6',
          100: '#dcf1e4',
          200: '#bbe3cc',
          300: '#8ed1ad',
          400: '#5bb489',
          500: '#39996b',
          600: '#287b55',
          700: '#226346',
          800: '#1e4f39',
          900: '#1a4131',
        },
        'accent': {
          300: '#fcd34d',
          400: '#d4b86a',
          500: '#c9a962',
          600: '#b8943d',
        },
        'cream': '#faf8f5',
        'charcoal': '#1a1a1a',
        'warm-gray': '#6b7280',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
