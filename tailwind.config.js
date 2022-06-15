module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl' : '1380px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}