export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandBackground: 'var(--bg-color)',
        brandText: 'var(--text-color)',
      },
    },
  },
  plugins: [],
}