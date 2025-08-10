/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'esg-green': '#22c55e',
        'esg-blue': '#3b82f6',
        'esg-purple': '#8b5cf6'
      }
    },
  },
  plugins: [],
}