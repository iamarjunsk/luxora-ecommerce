/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        luxora: {
          gold: '#D4AF37',
          'gold-light': '#F4D06F',
          'gold-dark': '#AA8C2C',
          black: '#0F0F0F',
          charcoal: '#1A1A1A',
          cream: '#F5F5F0',
          white: '#FFFFFF',
          gray: '#888888'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
