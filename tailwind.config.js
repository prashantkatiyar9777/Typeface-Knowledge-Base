/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        'sm': '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '0',
      },
      fontFamily: {
        sans: ['SuisseIntl', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['SuisseIntl', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SuisseIntl', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['SuisseIntl', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['SuisseIntl', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        button: {
          primary: {
            text: '#111013',
            bg: '#FAF7F6',
          },
          secondary: {
            text: '#111013',
            bg: '#F3F3F4',
          },
        },
      },
    },
  },
  plugins: [],
}
