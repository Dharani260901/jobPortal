/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0EA5E9',   // bright blue used for Apply buttons
        lightBlue: '#E6F8FF',
        panelBg: '#F8FAFF',
        muted: '#6B7280'
      },
      boxShadow: {
        card: '0 6px 18px rgba(11,35,75,0.08)'
      }
    },
  },
  plugins: [],
}
